import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  const DATA_DIR = path.join(process.cwd(), 'data');
  const DB_FILE = path.join(DATA_DIR, 'rsvps.json');

  // Ensure data directory and database file exist
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify([], null, 2), 'utf-8');
  }

  const readRsvps = (): any[] => {
    try {
      if (fs.existsSync(DB_FILE)) {
        const content = fs.readFileSync(DB_FILE, 'utf-8');
        return JSON.parse(content);
      }
    } catch (e) {
      console.error('Error reading RSVPs database:', e);
    }
    return [];
  };

  const writeRsvps = (data: any[]): boolean => {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
      return true;
    } catch (e) {
      console.error('Error writing RSVPs database:', e);
      return false;
    }
  };

  // API Health Check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  // Admin Login Endpoint
  app.post('/api/admin/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'admin') {
      res.json({ success: true, message: 'Autenticación exitosa' });
    } else {
      res.status(401).json({ success: false, message: 'Usuario o contraseña incorrectos' });
    }
  });

  // GET all RSVPs
  app.get('/api/rsvps', (req, res) => {
    const rsvps = readRsvps();
    res.json({ success: true, data: rsvps });
  });

  // POST new RSVP
  app.post('/api/rsvps', (req, res) => {
    const { id, fullName, attending, peopleCount, dietary, comments } = req.body;
    if (!fullName || typeof fullName !== 'string' || !fullName.trim()) {
      return res.status(400).json({ success: false, message: 'El nombre es obligatorio' });
    }

    const trimmedName = String(fullName).trim();
    const isAttending = attending === 'yes' ? 'yes' : 'no';
    const count = isAttending === 'yes' ? Math.max(1, Number(peopleCount || 1)) : 0;
    const diet = dietary ? String(dietary).trim() : 'Ninguno';
    const comms = comments ? String(comments).trim() : '';

    const rsvps = readRsvps();

    // Duplicate protection: Check if identical submission occurred in the last 15 seconds
    const now = Date.now();
    const recentDuplicate = rsvps.find((item: any) => {
      const isSameName = item.fullName && item.fullName.toLowerCase() === trimmedName.toLowerCase();
      const isSameAttending = item.attending === isAttending;
      const isSameCount = Number(item.peopleCount || 0) === count;
      const itemTime = item.createdAt ? new Date(item.createdAt).getTime() : 0;
      const isRecent = Math.abs(now - itemTime) < 15000;
      return isSameName && isSameAttending && isSameCount && isRecent;
    });

    if (recentDuplicate) {
      return res.json({ success: true, data: recentDuplicate, duplicatePrevented: true });
    }

    const newEntry = {
      id: id && typeof id === 'string' ? id : Date.now().toString() + '-' + Math.random().toString(36).substring(2, 9),
      fullName: trimmedName,
      attending: isAttending,
      peopleCount: count,
      dietary: diet,
      comments: comms,
      createdAt: new Date().toISOString(),
    };

    rsvps.unshift(newEntry);
    const saved = writeRsvps(rsvps);

    if (saved) {
      res.json({ success: true, data: newEntry });
    } else {
      res.status(500).json({ success: false, message: 'Error al guardar en base de datos' });
    }
  });

  // DELETE an RSVP by ID
  app.delete('/api/rsvps/:id', (req, res) => {
    const { id } = req.params;
    let rsvps = readRsvps();
    rsvps = rsvps.filter((item: any) => item.id !== id);
    writeRsvps(rsvps);
    res.json({ success: true });
  });

  // CLEAR all RSVPs (Admin Reset)
  app.delete('/api/rsvps', (req, res) => {
    writeRsvps([]);
    res.json({ success: true, message: 'Todas las respuestas fueron eliminadas' });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
