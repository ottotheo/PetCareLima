export type ScreenType = 
  | 'inicio' 
  | 'veterinarios' 
  | 'detalle-veterinario' 
  | 'elegir-fecha-hora' 
  | 'mis-citas' 
  | 'perfil';

export interface Pet {
  id: string;
  name: string;
  species: string;
  type: 'Perrita' | 'Perro' | 'Gatita' | 'Gato';
  age: string;
  gender: 'female' | 'male';
  breed: string;
  statusText: string;
  statusType: 'optimal' | 'warning' | 'alert';
  photo: string;
  fallbackPhoto?: string;
  weight?: string;
  nextEvent?: string;
}

export interface Review {
  id: string;
  author: string;
  initial: string;
  rating: number;
  text: string;
  date?: string;
  avatarBg?: string;
}

export interface Veterinarian {
  id: string;
  name: string;
  specialty: string;
  clinic: string;
  address: string;
  district: string;
  distance: string;
  rating: number;
  reviewsCount: number;
  price: number;
  photo: string;
  fallbackPhoto?: string;
  detailHeroPhoto: string;
  availabilityText: string;
  availabilityBadge?: string;
  experienceYears: number;
  specialtyTags: string[];
  bio: string;
  consultationDuration: string;
  paymentMethod: string;
  isFavorite?: boolean;
  serviceTypeIcon: string;
  nextSlotTime: string;
  availableSlots: string[];
  reviews: Review[];
}

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialty: string;
  doctorClinic: string;
  doctorPhoto: string;
  petId: string;
  petName: string;
  petPhoto: string;
  dateFormatted: string; // e.g. "Martes 17 nov"
  fullDateString: string; // e.g. "Martes 17 de noviembre · 10:30 a. m."
  dayNumber: number;
  timeSlot: string; // e.g. "10:30 a. m."
  price: number;
  status: 'confirmada' | 'completada' | 'cancelada';
  reason: string;
  address: string;
}
