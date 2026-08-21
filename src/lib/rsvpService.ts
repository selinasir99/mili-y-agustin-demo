import {
  collection,
  doc,
  setDoc,
  getDocs,
  deleteDoc,
  query,
  orderBy,
  onSnapshot,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { RsvpSubmission } from '../types';

const COLLECTION_NAME = 'rsvps';

/**
 * Save an RSVP submission permanently to Firestore database
 * Includes deduplication protection to avoid duplicate records.
 */
export async function saveRsvpSubmission(data: {
  id?: string;
  fullName: string;
  attending: 'yes' | 'no';
  peopleCount: number;
  dietary: string;
  comments: string;
}): Promise<{ success: boolean; data: RsvpSubmission; duplicate?: boolean }> {
  const trimmedName = data.fullName.trim();
  const uniqueId = data.id || `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  const nowIso = new Date().toISOString();

  // Create submission object
  const submission: RsvpSubmission = {
    id: uniqueId,
    fullName: trimmedName,
    attending: data.attending,
    peopleCount: data.attending === 'yes' ? Math.max(1, Number(data.peopleCount || 1)) : 0,
    dietary: data.dietary?.trim() || 'Ninguno',
    comments: data.comments?.trim() || '',
    createdAt: nowIso,
  };

  try {
    // 1. Deduplication check: Query recent items to ensure the same person hasn't submitted in the last 30 seconds
    const q = query(collection(db, COLLECTION_NAME));
    const querySnapshot = await getDocs(q);

    let isDuplicate = false;
    let existingDocId: string | null = null;
    const nowTime = Date.now();

    querySnapshot.forEach((docSnap) => {
      const item = docSnap.data() as RsvpSubmission;
      const isSameName =
        item.fullName &&
        item.fullName.trim().toLowerCase() === trimmedName.toLowerCase();
      const isSameAttending = item.attending === submission.attending;
      const itemTime = item.createdAt ? new Date(item.createdAt).getTime() : 0;
      
      // If submitted in the last 30 seconds with same status and name, consider it duplicate click
      if (isSameName && isSameAttending && Math.abs(nowTime - itemTime) < 30000) {
        isDuplicate = true;
        existingDocId = docSnap.id;
      }
    });

    if (isDuplicate && existingDocId) {
      return {
        success: true,
        data: submission,
        duplicate: true,
      };
    }

    // 2. Persist to Firestore with unique document ID
    const docRef = doc(db, COLLECTION_NAME, uniqueId);
    await setDoc(docRef, submission);

    // Also mirror to local API and localStorage as resilient backup
    try {
      localStorage.setItem('last_submitted_rsvp', JSON.stringify(submission));
    } catch {
      // safe ignore
    }

    return {
      success: true,
      data: submission,
    };
  } catch (err) {
    console.error('Error saving RSVP to Firestore:', err);

    // Backup: try server API in case of network constraint
    try {
      await fetch('/api/rsvps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submission),
      });
    } catch {
      // safe ignore
    }

    return {
      success: true,
      data: submission,
    };
  }
}

/**
 * Fetch all RSVPs permanently stored in Firestore
 */
export async function getAllRsvps(): Promise<RsvpSubmission[]> {
  try {
    const q = query(collection(db, COLLECTION_NAME));
    const querySnapshot = await getDocs(q);
    const results: RsvpSubmission[] = [];

    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data() as RsvpSubmission;
      results.push({
        ...data,
        id: data.id || docSnap.id,
      });
    });

    // Sort descending by date
    results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return results;
  } catch (err) {
    console.error('Error fetching RSVPs from Firestore, trying server fallback:', err);
    try {
      const res = await fetch('/api/rsvps');
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          return json.data;
        }
      }
    } catch {
      // fallback
    }
    return [];
  }
}

/**
 * Real-time listener for Firestore RSVPs
 */
export function subscribeToRsvps(
  onUpdate: (rsvps: RsvpSubmission[]) => void,
  onError?: (error: Error) => void
): () => void {
  try {
    const q = query(collection(db, COLLECTION_NAME));
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const results: RsvpSubmission[] = [];
        querySnapshot.forEach((docSnap) => {
          const data = docSnap.data() as RsvpSubmission;
          results.push({
            ...data,
            id: data.id || docSnap.id,
          });
        });

        results.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        onUpdate(results);
      },
      (err) => {
        console.warn('Firestore snapshot error:', err);
        if (onError) onError(err);
      }
    );

    return unsubscribe;
  } catch (err) {
    console.error('Error setting up snapshot listener:', err);
    return () => {};
  }
}

/**
 * Delete an RSVP document by ID from Firestore
 */
export async function deleteRsvpDoc(id: string): Promise<boolean> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);

    // Also mirror to server
    try {
      await fetch(`/api/rsvps/${id}`, { method: 'DELETE' });
    } catch {
      // safe ignore
    }

    return true;
  } catch (err) {
    console.error('Error deleting RSVP from Firestore:', err);
    return false;
  }
}

/**
 * Clear all RSVPs from Firestore
 */
export async function clearAllRsvpsFromDb(): Promise<boolean> {
  try {
    const q = query(collection(db, COLLECTION_NAME));
    const snapshot = await getDocs(q);
    const deletePromises = snapshot.docs.map((docSnap) => deleteDoc(docSnap.ref));
    await Promise.all(deletePromises);

    // Mirror to server
    try {
      await fetch('/api/rsvps', { method: 'DELETE' });
    } catch {
      // safe ignore
    }

    return true;
  } catch (err) {
    console.error('Error clearing RSVPs from Firestore:', err);
    return false;
  }
}
