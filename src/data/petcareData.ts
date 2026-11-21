import { Pet, Veterinarian, Appointment } from '../types';

export const USER_PROFILE = {
  name: 'Lucía',
  fullName: 'Lucía Fernández Ramos',
  city: 'Lima, Perú',
  currentDistrict: 'Santiago de Surco, Lima',
  email: 'lucia.fernandez@example.pe',
  phone: '+51 987 654 321',
  avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
  fallbackAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDY7spWL2QewEKy7kh7r9lZlX96KdI0A3bviD-qaPiX9MA5hoy-5i37EOJ8WpmGooZdUisxp73T5QdJwhNLxS2nShV08fl2ZjecPvOM112hpvNxUHgaX84JbYvlYrBjUz9sbPkII5L-jB11XhM5j0AFc3n1dvw2XFCDMK6M01uqGH7sr8RXc9fyPDBnkqk2MTVnAqdDp-iWBISqf-gJG52m61Tc17BUXEg0kayDunk',
};

export const INITIAL_PETS: Pet[] = [
  {
    id: 'bella',
    name: 'Bella',
    species: 'Perro',
    type: 'Perrita',
    age: '3 años',
    gender: 'female',
    breed: 'Border Collie',
    statusText: 'Salud Óptima',
    statusType: 'optimal',
    photo: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=400&q=80',
    fallbackPhoto: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0aAcwvtOb3T67JU3zBYgDeY_1_-kvsbre5HQwCeHH0rnXFNyNdPJJ0oB1p4ybvWvUzcFwfDdU7_Xwpls2uG7_OjVZymQxFVP60tiXpIeJTpt8VreQmdSksHvoOVi6-NELphOASJlfIg3RPQMR0PXsmI61DH1FGIBjBWvFfo7-g04VSqBxblQvOHsD5S2K9-Jm40DfeZYH_E8IcvvhPcJQ8OslWJd3h5qVBMyPunU',
    weight: '16.5 kg',
    nextEvent: 'Chequeo preventivo en 2 meses'
  },
  {
    id: 'rocky',
    name: 'Rocky',
    species: 'Perro',
    type: 'Perro',
    age: '5 años',
    gender: 'male',
    breed: 'Rottweiler',
    statusText: 'Vacuna pronto',
    statusType: 'warning',
    photo: 'https://images.unsplash.com/photo-1567752881298-894bb81f9379?auto=format&fit=crop&w=400&q=80',
    fallbackPhoto: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzOETjSqyGlifBesZEjeB0gMz2jAetO8ES2V32avKAcmxNVmB_yZ61NZNvxw8_pJ-tqoFUh_u0q_Gl049f80XS35jNlSxg7YlcY-rmh-wBNNQXO821nZ0NQMLatKTsuVnpJcug3oC4dCv7h-Cahcjor84MTJS91aY1ofYFy0wzr_cTd6e9Nbt4uReGpoHAyx5jGLp9z7GpEGNYDtJYthpaXBnOKYzLn_7HFUKLVZ0',
    weight: '42.0 kg',
    nextEvent: 'Vacuna Séxtuple canina requerida'
  }
];

export const VETERINARIANS: Veterinarian[] = [
  {
    id: 'valeria-rojas',
    name: 'Dra. Valeria Rojas',
    specialty: 'Medicina veterinaria general',
    clinic: 'Clínica Veterinaria Huellitas',
    address: 'Av. Primavera 1234, Santiago de Surco',
    district: 'Santiago de Surco',
    distance: '2.5 km',
    rating: 4.9,
    reviewsCount: 128,
    price: 90.00,
    photo: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=500&q=80',
    fallbackPhoto: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBDLEGYwYNH8To4fWXq742ymTOomMBeW7IVTyP5VHnfeqJs1i6Ts63ilLbPQB-3x2rpYbUmF0oKx9fT1tCxZV9OVu8uYbs4r7HJSzy56RlUOyW6EAz9HBXxK6G_bpH1Fr8fCk7zYk1ngUwRdfoGBDNT0DTnZU4oHz2lss33tVwLLc4dCZR8L6ODArYwUIWKxH6iH3HLP16zTD_camcPnOc_wFQRVXSymlBD0cTZXi8',
    detailHeroPhoto: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1200&q=80',
    availabilityText: 'Disponible: Mar 17 nov · 10:30 a. m.',
    availabilityBadge: undefined,
    experienceYears: 10,
    specialtyTags: ['10 años de experiencia', 'Atención canina y felina'],
    bio: 'Médica veterinaria egresada de la UNMSM con especialidad en medicina preventiva, diagnóstico clínico y bienestar animal. Dedicada a una atención sin estrés para tus mascotas.',
    consultationDuration: '30 min',
    paymentMethod: 'Pago directo en clínica',
    isFavorite: false,
    serviceTypeIcon: 'medical_services',
    nextSlotTime: 'Hoy, 10:30 a. m.',
    availableSlots: ['9:00 a. m.', '9:30 a. m.', '10:30 a. m.', '3:00 p. m.', '3:30 p. m.', '4:30 p. m.'],
    reviews: [
      {
        id: 'rev-1',
        author: 'Mariana P.',
        initial: 'M',
        rating: 5,
        text: '“Excelente trato con mi perrita Bella, muy paciente y amorosa en todo momento.”',
        date: 'Hace 3 días',
        avatarBg: 'bg-primary-container text-on-primary'
      },
      {
        id: 'rev-2',
        author: 'Carlos G.',
        initial: 'C',
        rating: 5,
        text: '“Muy puntual y clara en sus indicaciones. Se nota su vocación y cuidado minucioso.”',
        date: 'Hace 1 semana',
        avatarBg: 'bg-secondary text-on-secondary'
      }
    ]
  },
  {
    id: 'carlos-mendoza',
    name: 'Dr. Carlos Mendoza',
    specialty: 'Odontología Veterinaria',
    clinic: 'Clínica Petz & Vetz',
    address: 'Av. Javier Prado Este 2840, San Borja',
    district: 'San Borja',
    distance: '3.1 km',
    rating: 4.8,
    reviewsCount: 94,
    price: 110.00,
    photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=500&q=80',
    fallbackPhoto: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDetW-yAl9nveH11MU2TE8WH0slAbvk7M2EqqJRjSU9oqW6kB5oRTqoVTmCU8TLD9Rg1cCg7xauzCP_zA6HAT-6m4_kTYI_8pSIkEuFihsSz2uymuOcoM4Pmn7Hm_WMoThHd32r52JQ9Zyjd73S0mwuQAXyHSGGxPDtBstXzXBzBBEyR-W211ENdV9Vzs1cl_NSqq4hSPKoJsom-Zcqppf4PCfJtr1NzaX_k2v3O5o',
    detailHeroPhoto: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
    availabilityText: 'Disponible mañana · Turno tarde',
    availabilityBadge: 'Turno tarde',
    experienceYears: 8,
    specialtyTags: ['8 años de experiencia', 'Profilaxis y Cirugía Dental'],
    bio: 'Especialista en salud bucal y procedimientos odontológicos avanzados para perros y gatos. Certificado internacional en endodoncia veterinaria.',
    consultationDuration: '40 min',
    paymentMethod: 'Pago directo en clínica',
    isFavorite: false,
    serviceTypeIcon: 'dentistry',
    nextSlotTime: 'Mañana, 3:00 p. m.',
    availableSlots: ['10:00 a. m.', '11:30 a. m.', '3:00 p. m.', '4:00 p. m.', '5:00 p. m.'],
    reviews: [
      {
        id: 'rev-3',
        author: 'Fabiola R.',
        initial: 'F',
        rating: 5,
        text: '“Le realizó una limpieza dental ultrasónica a mi gatito sin ningún trauma. Muy recomendable.”',
        date: 'Hace 5 días',
        avatarBg: 'bg-primary-container text-on-primary'
      }
    ]
  },
  {
    id: 'andrea-silva',
    name: 'Dra. Andrea Silva',
    specialty: 'Dermatología y Control',
    clinic: 'Centro Veterinario Lima Sur',
    address: 'Calle Las Orquídeas 412, Santiago de Surco',
    district: 'Santiago de Surco',
    distance: '1.8 km',
    rating: 5.0,
    reviewsCount: 65,
    price: 85.00,
    photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAf_d5oNxwJdezJ5pldTQoKp2Jc8BfruZEQiuHq4ZOho1LYq9uXl2bPl0u42y7uhUNFBIixI322eKgiRqmnNk1S0vERWUNo9k-1Y2ciPnlSJhr1Lrnwb_P57jCK3nFGxASAnIO2wvUDg_iX-s_9X7K0azMWocEjCFRgrqdrMCGYpei-mJHYvglbAJx6rpo2Rb4wXKKw-S8Xz_0e2_uJk6JCpWAcoR6AZgxjkkR4Z9E',
    fallbackPhoto: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=500&q=80',
    detailHeroPhoto: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAf_d5oNxwJdezJ5pldTQoKp2Jc8BfruZEQiuHq4ZOho1LYq9uXl2bPl0u42y7uhUNFBIixI322eKgiRqmnNk1S0vERWUNo9k-1Y2ciPnlSJhr1Lrnwb_P57jCK3nFGxASAnIO2wvUDg_iX-s_9X7K0azMWocEjCFRgrqdrMCGYpei-mJHYvglbAJx6rpo2Rb4wXKKw-S8Xz_0e2_uJk6JCpWAcoR6AZgxjkkR4Z9E',
    availabilityText: 'Disponible hoy (Tarde) · Cupos 3',
    availabilityBadge: 'Cupos 3',
    experienceYears: 6,
    specialtyTags: ['6 años de experiencia', 'Alergias y Dermatología'],
    bio: 'Especialista en alergias estacionales, problemas dermatológicos y nutrición clínica dermatológica en animales de compañía.',
    consultationDuration: '30 min',
    paymentMethod: 'Pago directo en clínica',
    isFavorite: false,
    serviceTypeIcon: 'health_and_safety',
    nextSlotTime: 'Hoy, 4:00 p. m.',
    availableSlots: ['2:30 p. m.', '3:15 p. m.', '4:00 p. m.', '5:30 p. m.'],
    reviews: [
      {
        id: 'rev-4',
        author: 'Esteban M.',
        initial: 'E',
        rating: 5,
        text: '“Trató la dermatitis atópica de Rocky con resultados notorios en menos de dos semanas.”',
        date: 'Hace 2 semanas',
        avatarBg: 'bg-secondary text-on-secondary'
      }
    ]
  },
  {
    id: 'carlos-morales',
    name: 'Dr. Carlos Morales',
    specialty: 'Dermatología',
    clinic: 'Veterinaria San Borja Pets',
    address: 'Av. Las Artes Norte 680, San Borja',
    district: 'San Borja',
    distance: '3.8 km',
    rating: 4.8,
    reviewsCount: 82,
    price: 110.00,
    photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=500&q=80',
    fallbackPhoto: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqMTNQfFDpZRJ0a5Fb9R7riIvQ5XCXl3sxWDFHNmgwsZsNuYhDHsQmmjyLu2KcBOssJDUNRX9Fi5Mk2Ga2KSS-pbJk1KsKKkPl_mLMedzpm_SPA4rPXqCn9E4Iw0o-iaT3XzTPpsXD6Nk2RCvNlnyP1VOCw1Z_w3aVX225ZzFaw1TmllybuhlWCyM0gZfrVt3lGpCpPPFSVvbIQez6sE9yY5y8nt36FsaARwOkXOo',
    detailHeroPhoto: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=1200&q=80',
    availabilityText: 'Disponible: Jueves 19 nov · 11:00 a. m.',
    availabilityBadge: undefined,
    experienceYears: 9,
    specialtyTags: ['9 años de experiencia', 'Dermatología avanzada'],
    bio: 'Médico veterinario clínico enfocado en dermatología, control de ectoparásitos y nutrición preventiva.',
    consultationDuration: '30 min',
    paymentMethod: 'Pago directo en clínica',
    isFavorite: false,
    serviceTypeIcon: 'medical_services',
    nextSlotTime: 'Jueves, 11:00 a. m.',
    availableSlots: ['11:00 a. m.', '11:45 a. m.', '4:00 p. m.'],
    reviews: [
      {
        id: 'rev-5',
        author: 'Patricia V.',
        initial: 'P',
        rating: 5,
        text: '“Muy atento y detallista con el examen clínico general.”',
        date: 'Hace 4 días',
        avatarBg: 'bg-primary-container text-on-primary'
      }
    ]
  }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-101',
    doctorId: 'valeria-rojas',
    doctorName: 'Dra. Valeria Rojas',
    doctorSpecialty: 'Medicina veterinaria general',
    doctorClinic: 'Clínica Veterinaria Huellitas',
    doctorPhoto: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=500&q=80',
    petId: 'bella',
    petName: 'Bella',
    petPhoto: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=400&q=80',
    dateFormatted: 'Mar 17 nov',
    fullDateString: 'Martes 17 de noviembre · 10:30 a. m.',
    dayNumber: 17,
    timeSlot: '10:30 a. m.',
    price: 90.00,
    status: 'confirmada',
    reason: 'Control de rutina y chequeo general',
    address: 'Av. Primavera 1234, Santiago de Surco, Lima'
  }
];

export const DISTRICTS = [
  'Santiago de Surco, Lima',
  'San Borja, Lima',
  'Miraflores, Lima',
  'San Isidro, Lima',
  'La Molina, Lima',
  'Barranco, Lima',
  'Magdalena del Mar, Lima'
];

export const SPECIALTIES = [
  'Todas',
  'Medicina veterinaria general',
  'Odontología Veterinaria',
  'Dermatología y Control',
  'Cirugía menor',
  'Nutrición y Vacunación'
];
