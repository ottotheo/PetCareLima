import React, { useState } from 'react';
import { ScreenType, Pet, Veterinarian, Appointment } from './types';
import { INITIAL_PETS, VETERINARIANS, INITIAL_APPOINTMENTS, USER_PROFILE } from './data/petcareData';

import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';

import { HomeScreen } from './components/screens/HomeScreen';
import { DoctorSearchScreen } from './components/screens/DoctorSearchScreen';
import { DoctorDetailScreen } from './components/screens/DoctorDetailScreen';
import { ScheduleScreen } from './components/screens/ScheduleScreen';
import { MyAppointmentsScreen } from './components/screens/MyAppointmentsScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';

import { RegisterPetModal } from './components/modals/RegisterPetModal';
import { EmergencyModal } from './components/modals/EmergencyModal';
import { NotificationsModal } from './components/modals/NotificationsModal';
import { DistrictModal } from './components/modals/DistrictModal';
import { PetDetailModal } from './components/modals/PetDetailModal';
import { BookingSuccessModal } from './components/modals/BookingSuccessModal';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('inicio');
  const [screenHistory, setScreenHistory] = useState<ScreenType[]>(['inicio']);

  const [pets, setPets] = useState<Pet[]>(INITIAL_PETS);
  const [veterinarians, setVeterinarians] = useState<Veterinarian[]>(VETERINARIANS);
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
  const [currentDistrict, setCurrentDistrict] = useState<string>('Santiago de Surco, Lima');

  const [selectedDoctor, setSelectedDoctor] = useState<Veterinarian>(VETERINARIANS[0]);
  const [activePetForModal, setActivePetForModal] = useState<Pet | null>(null);

  // Modals
  const [isRegisterPetOpen, setIsRegisterPetOpen] = useState(false);
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isDistrictOpen, setIsDistrictOpen] = useState(false);
  const [isPetDetailOpen, setIsPetDetailOpen] = useState(false);
  const [isBookingSuccessOpen, setIsBookingSuccessOpen] = useState(false);
  const [lastBookedAppointment, setLastBookedAppointment] = useState<Appointment | null>(null);

  const navigateTo = (screen: ScreenType) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setScreenHistory((prev) => [...prev, screen]);
    setCurrentScreen(screen);
  };

  const goBack = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (screenHistory.length > 1) {
      const nextHistory = [...screenHistory];
      nextHistory.pop();
      const prev = nextHistory[nextHistory.length - 1];
      setScreenHistory(nextHistory);
      setCurrentScreen(prev);
    } else {
      setCurrentScreen('inicio');
    }
  };

  const handleSelectDoctor = (doctor: Veterinarian) => {
    setSelectedDoctor(doctor);
    navigateTo('detalle-veterinario');
  };

  const handleSelectPet = (pet: Pet) => {
    setActivePetForModal(pet);
    setIsPetDetailOpen(true);
  };

  const handleAddPet = (newPet: Pet) => {
    setPets((prev) => [newPet, ...prev]);
  };

  const handleToggleFavorite = (doctorId: string) => {
    setVeterinarians((prev) =>
      prev.map((doc) =>
        doc.id === doctorId ? { ...doc, isFavorite: !doc.isFavorite } : doc
      )
    );
  };

  const handleCompleteBooking = (newAppointment: Appointment) => {
    setAppointments((prev) => [newAppointment, ...prev]);
    setLastBookedAppointment(newAppointment);
    setIsBookingSuccessOpen(true);
  };

  const handleCancelAppointment = (id: string) => {
    setAppointments((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#e9f0e6] flex justify-center selection:bg-[#9ef797] selection:text-[#002203]">
      {/* 390px Mobile Viewport Container matching DESIGN.md baseline */}
      <div className="w-full max-w-md min-h-screen bg-surface flex flex-col relative shadow-2xl sm:border-x sm:border-surface-container-high/60 overflow-x-hidden">
        
        {/* Persistent Top Header */}
        <Header
          currentScreen={currentScreen}
          onNavigate={navigateTo}
          onBack={goBack}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          unreadNotificationsCount={2}
        />

        {/* Main Viewport Content */}
        <main className="flex-1 flex flex-col pt-16 relative">
          {currentScreen === 'inicio' && (
            <HomeScreen
              pets={pets}
              veterinarians={veterinarians}
              appointments={appointments}
              onNavigate={navigateTo}
              onSelectDoctor={handleSelectDoctor}
              onSelectPet={handleSelectPet}
              onOpenRegisterPet={() => setIsRegisterPetOpen(true)}
              onToggleFavorite={handleToggleFavorite}
            />
          )}

          {currentScreen === 'veterinarios' && (
            <DoctorSearchScreen
              veterinarians={veterinarians}
              currentDistrict={currentDistrict}
              onOpenDistrictModal={() => setIsDistrictOpen(true)}
              onSelectDoctor={handleSelectDoctor}
              onOpenEmergencyModal={() => setIsEmergencyOpen(true)}
              onToggleFavorite={handleToggleFavorite}
            />
          )}

          {currentScreen === 'detalle-veterinario' && (
            <DoctorDetailScreen
              doctor={selectedDoctor}
              onGoToSchedule={() => navigateTo('elegir-fecha-hora')}
              onBack={goBack}
            />
          )}

          {currentScreen === 'elegir-fecha-hora' && (
            <ScheduleScreen
              doctor={selectedDoctor}
              pets={pets}
              onCompleteBooking={handleCompleteBooking}
              onBack={goBack}
            />
          )}

          {currentScreen === 'mis-citas' && (
            <MyAppointmentsScreen
              appointments={appointments}
              onNavigate={navigateTo}
              onCancelAppointment={handleCancelAppointment}
            />
          )}

          {currentScreen === 'perfil' && (
            <ProfileScreen
              pets={pets}
              onNavigate={navigateTo}
              onOpenRegisterPet={() => setIsRegisterPetOpen(true)}
              onSelectPet={handleSelectPet}
            />
          )}
        </main>

        {/* Persistent Bottom Navigation Tab Bar */}
        <BottomNav
          currentScreen={currentScreen}
          onNavigate={navigateTo}
          activeAppointmentsCount={appointments.filter((a) => a.status === 'confirmada').length}
        />

        {/* Interactive Modals */}
        <RegisterPetModal
          isOpen={isRegisterPetOpen}
          onClose={() => setIsRegisterPetOpen(false)}
          onAddPet={handleAddPet}
        />

        <EmergencyModal
          isOpen={isEmergencyOpen}
          onClose={() => setIsEmergencyOpen(false)}
        />

        <NotificationsModal
          isOpen={isNotificationsOpen}
          onClose={() => setIsNotificationsOpen(false)}
          onNavigate={navigateTo}
        />

        <DistrictModal
          isOpen={isDistrictOpen}
          onClose={() => setIsDistrictOpen(false)}
          selectedDistrict={currentDistrict}
          onSelectDistrict={setCurrentDistrict}
        />

        <PetDetailModal
          isOpen={isPetDetailOpen}
          pet={activePetForModal}
          onClose={() => setIsPetDetailOpen(false)}
          onBookAppointmentForPet={(pet) => {
            setIsPetDetailOpen(false);
            navigateTo('veterinarios');
          }}
        />

        <BookingSuccessModal
          isOpen={isBookingSuccessOpen}
          appointment={lastBookedAppointment}
          onGoToAppointments={() => {
            setIsBookingSuccessOpen(false);
            navigateTo('mis-citas');
          }}
          onGoHome={() => {
            setIsBookingSuccessOpen(false);
            navigateTo('inicio');
          }}
        />

      </div>
    </div>
  );
}
