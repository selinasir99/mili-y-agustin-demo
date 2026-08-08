export interface GuestInfo {
  name: string;
  seats: number;
  code?: string;
}

export interface WeddingDetails {
  couple: {
    bride: string;
    groom: string;
  };
  date: string;
  formattedDate: string;
  time: string;
  venue: {
    name: string;
    location: string;
    city: string;
  };
}

export interface WeddingEvent {
  id: string;
  title: string;
  time: string;
  subtitle: string;
  venueName: string;
  address: string;
  city: string;
  description: string;
  mapQuery: string;
}

export interface BankDetails {
  bankName: string;
  accountType: string;
  accountHolder: string;
  cbu: string;
  alias: string;
}

export interface AccommodationOption {
  id: string;
  name: string;
  category: string;
  location: string;
  distance: string;
  description: string;
  contact?: string;
  link?: string;
}

export interface RsvpData {
  fullName: string;
  attending: 'yes' | 'no' | '';
  companionName?: string;
  dietaryRestrictions: string;
  dietaryOther?: string;
  message?: string;
}
