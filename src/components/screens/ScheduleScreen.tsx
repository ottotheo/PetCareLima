import React, { useState } from 'react';
import { Veterinarian, Pet, Appointment } from '../../types';

interface ScheduleScreenProps {
  doctor: Veterinarian;
  pets: Pet[];
  onCompleteBooking: (appointment: Appointment) => void;
  onBack: () => void;
}

export const ScheduleScreen: React.FC<ScheduleScreenProps> = ({
  doctor,
  pets,
  onCompleteBooking,
  onBack,
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [selectedDay, setSelectedDay] = useState<number>(17);
  const [selectedSlot, setSelectedSlot] = useState<string>('10:30 a. m.');
  const [selectedPetId, setSelectedPetId] = useState<string>(pets[0]?.id || 'bella');
  const [reason, setReason] = useState<string>('Control de rutina y chequeo general');

  // Days configuration for November 2026
  const availableDays = [16, 17, 18, 19, 20, 21, 23, 24, 25, 26, 27, 28, 30];

  const getDayName = (day: number) => {
    // Nov 2026: Nov 1 is Sunday.
    // 16 is Monday, 17 is Tuesday, etc.
    const names = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const date = new Date(2026, 10, day);
    return names[date.getDay()];
  };

  const getDayNameAbbr = (day: number) => {
    const map: Record<number, string> = {
      16: 'Lunes 16 nov',
      17: 'Martes 17 nov',
      18: 'Miércoles 18 nov',
      19: 'Jueves 19 nov',
      20: 'Viernes 20 nov',
      21: 'Sábado 21 nov',
      23: 'Lunes 23 nov',
      24: 'Martes 24 nov',
      25: 'Miércoles 25 nov',
      26: 'Jueves 26 nov',
      27: 'Viernes 27 nov',
      28: 'Sábado 28 nov',
      30: 'Lunes 30 nov',
    };
    return map[day] || `${getDayName(day)} ${day} nov`;
  };

  const getFullDateString = () => {
    return `${getDayName(selectedDay)} ${selectedDay} de noviembre · ${selectedSlot}`;
  };

  const handleConfirmReservation = () => {
    const selectedPet = pets.find(p => p.id === selectedPetId) || pets[0];
    const newAppointment: Appointment = {
      id: `apt-${Date.now()}`,
      doctorId: doctor.id,
      doctorName: doctor.name,
      doctorSpecialty: doctor.specialty,
      doctorClinic: doctor.clinic,
      doctorPhoto: doctor.photo,
      petId: selectedPet.id,
      petName: selectedPet.name,
      petPhoto: selectedPet.photo,
      dateFormatted: `${getDayName(selectedDay).slice(0, 3)} ${selectedDay} nov`,
      fullDateString: getFullDateString(),
      dayNumber: selectedDay,
      timeSlot: selectedSlot,
      price: doctor.price,
      status: 'confirmada',
      reason: reason,
      address: doctor.address
    };

    onCompleteBooking(newAppointment);
  };

  const selectedPet = pets.find(p => p.id === selectedPetId) || pets[0];

  return (
    <div className="flex flex-col w-full px-margin pb-36">
      
      {/* Stepper Indicator */}
      <div className="flex flex-col gap-space-xs mt-space-sm mb-space-lg">
        <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
          <span>
            {currentStep === 1 && 'Paso 1 de 3 · Horario'}
            {currentStep === 2 && 'Paso 2 de 3 · Mascota y Motivo'}
            {currentStep === 3 && 'Paso 3 de 3 · Confirmación'}
          </span>
          <span className="text-primary font-label-md text-label-md font-semibold">
            {currentStep === 1 && '33% completado'}
            {currentStep === 2 && '66% completado'}
            {currentStep === 3 && '100% completado'}
          </span>
        </div>
        <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden flex">
          <div
            className={`h-full bg-primary rounded-full transition-all duration-300 ${
              currentStep === 1 ? 'w-1/3' : currentStep === 2 ? 'w-2/3' : 'w-full'
            }`}
          ></div>
        </div>
      </div>

      {/* Professional Summary Card */}
      <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm border border-surface-container-high/60 mb-space-lg flex items-center gap-space-md">
        <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0 bg-surface-container shadow-sm">
          <img
            className="w-full h-full object-cover"
            src={doctor.photo}
            alt={doctor.name}
            onError={(e) => {
              const target = e.currentTarget;
              if (doctor.fallbackPhoto && target.src !== doctor.fallbackPhoto) {
                target.src = doctor.fallbackPhoto;
              }
            }}
          />
          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-primary rounded-full ring-2 ring-surface-container-lowest"></span>
        </div>
        <div className="flex flex-col min-w-0 flex-1">
          <div className="flex items-center justify-between gap-space-xs">
            <h2 className="font-headline-md text-headline-md text-on-surface truncate">
              {doctor.name}
            </h2>
            <span className="font-price-display text-price-display text-primary flex-shrink-0 font-bold">
              S/ {doctor.price.toFixed(2)}
            </span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
            {doctor.clinic} · {doctor.specialty}
          </p>
          <div className="flex items-center gap-space-xs mt-space-xs">
            <span
              className="material-symbols-outlined text-[15px] text-tertiary-fixed-dim"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              star
            </span>
            <span className="font-label-sm text-label-sm text-on-surface font-bold">
              {doctor.rating}
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              · {doctor.district}, Lima
            </span>
          </div>
        </div>
      </div>

      {currentStep === 1 && (
        <>
          {/* Calendar Section */}
          <div className="flex flex-col gap-space-md mb-space-xl">
            <div className="flex items-center justify-between">
              <h3 className="font-headline-md text-headline-md text-on-surface">Elige fecha</h3>
              <div className="flex items-center gap-space-xs bg-surface-container-low px-space-md py-1.5 rounded-full text-on-surface font-label-md text-label-md border border-surface-container">
                <span className="font-semibold">Noviembre 2026</span>
                <span className="material-symbols-outlined text-[18px] text-on-surface-variant">expand_more</span>
              </div>
            </div>

            {/* Calendar Container */}
            <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm border border-surface-container-high/60">
              {/* Weekday Headers */}
              <div className="grid grid-cols-7 text-center font-label-md text-label-md text-on-surface-variant mb-space-sm font-semibold">
                <div>Lu</div>
                <div>Ma</div>
                <div>Mi</div>
                <div>Ju</div>
                <div>Vi</div>
                <div>Sá</div>
                <div>Do</div>
              </div>

              {/* Calendar Days Grid */}
              <div className="grid grid-cols-7 gap-y-1.5 text-center items-center font-label-md text-label-md">
                {/* Oct 26 to Oct 31 */}
                <span className="h-10 flex items-center justify-center text-outline-variant font-normal">26</span>
                <span className="h-10 flex items-center justify-center text-outline-variant font-normal">27</span>
                <span className="h-10 flex items-center justify-center text-outline-variant font-normal">28</span>
                <span className="h-10 flex items-center justify-center text-outline-variant font-normal">29</span>
                <span className="h-10 flex items-center justify-center text-outline-variant font-normal">30</span>
                <span className="h-10 flex items-center justify-center text-outline-variant font-normal">31</span>
                {/* Nov 1 */}
                <span className="h-10 flex items-center justify-center text-outline-variant">1</span>

                {/* Week 2: Nov 2-8 past dates */}
                {[2, 3, 4, 5, 6, 7].map(d => (
                  <span key={d} className="h-10 flex items-center justify-center text-outline-variant line-through decoration-outline-variant/60">
                    {d}
                  </span>
                ))}
                <span className="h-10 flex items-center justify-center text-outline-variant">8</span>

                {/* Week 3: Nov 9-15 past dates */}
                {[9, 10, 11, 12, 13, 14].map(d => (
                  <span key={d} className="h-10 flex items-center justify-center text-outline-variant line-through decoration-outline-variant/60">
                    {d}
                  </span>
                ))}
                <span className="h-10 flex items-center justify-center text-outline-variant">15</span>

                {/* Week 4: Nov 16-22 (Current: 16 Today, 17 Default Selected) */}
                {[16, 17, 18, 19, 20, 21].map(d => {
                  const isSelected = selectedDay === d;
                  const isToday = d === 16;
                  return (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setSelectedDay(d)}
                      className={`h-10 flex flex-col items-center justify-center rounded-full transition-all cursor-pointer relative ${
                        isSelected
                          ? 'bg-primary text-on-primary font-bold shadow-md scale-105'
                          : 'text-on-surface hover:bg-surface-container active:scale-95'
                      }`}
                    >
                      <span>{d}</span>
                      <span className={`w-1.5 h-1.5 rounded-full -mb-1 ${
                        isSelected ? 'bg-on-primary' : isToday ? 'bg-outline' : 'bg-primary'
                      }`}></span>
                    </button>
                  );
                })}
                <span className="h-10 flex items-center justify-center text-outline-variant font-normal">22</span>

                {/* Week 5: Nov 23-29 */}
                {[23, 24, 25, 26, 27, 28].map(d => {
                  const isSelected = selectedDay === d;
                  return (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setSelectedDay(d)}
                      className={`h-10 flex flex-col items-center justify-center rounded-full transition-all cursor-pointer relative ${
                        isSelected
                          ? 'bg-primary text-on-primary font-bold shadow-md scale-105'
                          : 'text-on-surface hover:bg-surface-container active:scale-95'
                      }`}
                    >
                      <span>{d}</span>
                      <span className={`w-1.5 h-1.5 rounded-full -mb-1 ${
                        isSelected ? 'bg-on-primary' : 'bg-primary'
                      }`}></span>
                    </button>
                  );
                })}
                <span className="h-10 flex items-center justify-center text-outline-variant font-normal">29</span>

                {/* Week 6: Nov 30 */}
                <button
                  type="button"
                  onClick={() => setSelectedDay(30)}
                  className={`h-10 flex flex-col items-center justify-center rounded-full transition-all cursor-pointer relative ${
                    selectedDay === 30
                      ? 'bg-primary text-on-primary font-bold shadow-md scale-105'
                      : 'text-on-surface hover:bg-surface-container'
                  }`}
                >
                  <span>30</span>
                  <span className={`w-1.5 h-1.5 rounded-full -mb-1 ${
                    selectedDay === 30 ? 'bg-on-primary' : 'bg-primary'
                  }`}></span>
                </button>
                <span className="h-10 flex items-center justify-center text-outline-variant font-normal">1</span>
                <span className="h-10 flex items-center justify-center text-outline-variant font-normal">2</span>
                <span className="h-10 flex items-center justify-center text-outline-variant font-normal">3</span>
                <span className="h-10 flex items-center justify-center text-outline-variant font-normal">4</span>
                <span className="h-10 flex items-center justify-center text-outline-variant font-normal">5</span>
                <span className="h-10 flex items-center justify-center text-outline-variant font-normal">6</span>
              </div>

              {/* Calendar Legend */}
              <div className="mt-space-md pt-space-sm flex items-center justify-center gap-space-lg text-on-surface-variant font-body-sm text-body-sm border-t border-surface-container">
                <div className="flex items-center gap-space-xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
                  <span>Disponible</span>
                </div>
                <div className="flex items-center gap-space-xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-outline-variant"></span>
                  <span>No disponible</span>
                </div>
                <div className="flex items-center gap-space-xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-surface-container-highest"></span>
                  <span>Pasado</span>
                </div>
              </div>
            </div>
          </div>

          {/* Available Time Slots Section */}
          <div className="flex flex-col gap-space-md mb-space-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-xs">
                <h3 className="font-headline-md text-headline-md text-on-surface">Horarios disponibles</h3>
                <span className="bg-secondary-container text-on-secondary-container font-label-sm text-label-sm px-2 py-0.5 rounded-full font-bold">
                  {doctor.consultationDuration}
                </span>
              </div>
              <span className="font-body-sm text-body-sm text-primary font-medium">
                {getDayNameAbbr(selectedDay)}
              </span>
            </div>

            {/* 2-Column Grid of Slots */}
            <div className="grid grid-cols-2 gap-space-md">
              {['9:00 a. m.', '9:30 a. m.', '10:30 a. m.', '3:00 p. m.', '3:30 p. m.', '4:30 p. m.'].map((slot) => {
                const isSelected = selectedSlot === slot;
                return (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedSlot(slot)}
                    className={`h-12 rounded-xl font-label-lg text-label-lg flex items-center justify-center gap-space-xs active:scale-95 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-primary text-on-primary shadow-md font-bold'
                        : 'bg-surface-container-lowest text-on-surface shadow-sm border border-surface-container-high/60 hover:border-primary'
                    }`}
                  >
                    {isSelected && (
                      <span className="material-symbols-outlined text-[18px]">check_circle</span>
                    )}
                    <span>{slot}</span>
                  </button>
                );
              })}

              {/* Slot 11:00 AM Ocupado */}
              <button
                className="h-12 rounded-xl bg-surface-container text-outline-variant font-label-lg text-label-lg flex items-center justify-center gap-space-xs opacity-70 cursor-not-allowed border border-transparent"
                disabled
                type="button"
              >
                <span className="line-through">11:00 a. m.</span>
                <span className="font-label-sm text-[10px] uppercase text-outline ml-1">Ocupado</span>
              </button>
            </div>
          </div>

          {/* Reassurance / Clinic Note */}
          <div className="bg-surface-container-low rounded-2xl p-space-md flex items-start gap-space-md mb-space-lg border border-surface-container">
            <div className="w-9 h-9 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center flex-shrink-0 shadow-sm">
              <span className="material-symbols-outlined text-[20px]">verified_user</span>
            </div>
            <div className="flex flex-col min-w-0">
              <h4 className="font-label-md text-label-md text-on-surface font-bold">
                Atención puntual en consultorio
              </h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                Llegar 10 minutos antes con cartilla de vacunación de la mascota. Cancelación sin costo hasta 2 hrs previas.
              </p>
            </div>
          </div>
        </>
      )}

      {currentStep === 2 && (
        <div className="flex flex-col gap-space-lg animate-in fade-in duration-200">
          <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm border border-surface-container-high/60 flex flex-col gap-space-md">
            <h3 className="font-headline-md text-headline-md text-on-surface">¿Para cuál de tus mascotas es la consulta?</h3>
            <div className="grid grid-cols-2 gap-space-sm">
              {pets.map((p) => {
                const isChosen = selectedPetId === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedPetId(p.id)}
                    className={`p-space-md rounded-2xl flex flex-col items-center text-center gap-space-xs transition-all cursor-pointer border ${
                      isChosen
                        ? 'border-primary bg-secondary-container/30 ring-2 ring-primary/20'
                        : 'border-surface-container-high bg-surface-container-low hover:bg-surface-container'
                    }`}
                  >
                    <img
                      src={p.photo}
                      alt={p.name}
                      className="w-16 h-16 rounded-full object-cover shadow-sm"
                    />
                    <span className="font-headline-md text-on-surface font-bold">{p.name}</span>
                    <span className="text-xs text-on-surface-variant">{p.type} · {p.age}</span>
                    {isChosen && (
                      <span className="mt-1 text-xs font-bold text-primary flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">check_circle</span>
                        Seleccionado
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm border border-surface-container-high/60 flex flex-col gap-space-sm">
            <h3 className="font-headline-md text-headline-md text-on-surface">Motivo principal de la consulta</h3>
            <div className="flex flex-col gap-2">
              {[
                'Control de rutina y chequeo general',
                'Vacunación o refuerzo de cartilla',
                'Molestia digestiva o inapetencia',
                'Problemas en la piel o rascado excesivo',
                'Revisión preventiva antes de viaje',
              ].map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setReason(m)}
                  className={`px-4 py-3 rounded-xl text-left text-sm transition-all cursor-pointer flex items-center justify-between border ${
                    reason === m
                      ? 'border-primary bg-primary-container/10 text-primary font-semibold'
                      : 'border-surface-container bg-surface-container-low text-on-surface hover:bg-surface-container'
                  }`}
                >
                  <span>{m}</span>
                  {reason === m && (
                    <span className="material-symbols-outlined text-primary text-[18px]">check</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {currentStep === 3 && (
        <div className="flex flex-col gap-space-lg animate-in fade-in duration-200">
          <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm border border-surface-container-high/60 flex flex-col gap-space-md">
            <h3 className="font-headline-md text-headline-md text-on-surface">Resumen de tu cita</h3>
            
            <div className="flex items-center gap-space-md p-space-md bg-surface-container-low rounded-xl">
              <img
                src={selectedPet.photo}
                alt={selectedPet.name}
                className="w-14 h-14 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <span className="text-xs text-outline uppercase font-semibold">Paciente</span>
                <span className="font-headline-md text-on-surface">{selectedPet.name}</span>
                <span className="text-xs text-on-surface-variant">{selectedPet.type} · {selectedPet.breed}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 text-sm border-t border-b border-surface-container py-3">
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Especialista:</span>
                <span className="font-semibold text-on-surface">{doctor.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Sede:</span>
                <span className="font-semibold text-on-surface">{doctor.clinic}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Fecha:</span>
                <span className="font-semibold text-primary">{getDayNameAbbr(selectedDay)}, 2026</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Hora:</span>
                <span className="font-semibold text-primary">{selectedSlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Motivo:</span>
                <span className="font-semibold text-on-surface truncate max-w-[200px]">{reason}</span>
              </div>
            </div>

            <div className="flex justify-between items-baseline pt-1">
              <span className="text-sm font-semibold text-on-surface">Total a pagar en clínica:</span>
              <span className="font-price-display text-primary text-xl font-bold">
                S/ {doctor.price.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Floating Sticky Booking Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-surface-container-lowest/95 backdrop-blur-md shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-margin py-3 pb-safe border-t border-surface-container-high/60">
        <div className="max-w-[420px] mx-auto flex flex-col gap-2">
          
          {/* Selected Slot Summary Pill */}
          <div className="flex items-center justify-between px-space-xs">
            <div className="flex items-center gap-space-xs text-on-surface min-w-0">
              <span className="material-symbols-outlined text-primary text-[18px] shrink-0">event_available</span>
              <span className="font-label-md text-label-md font-semibold truncate" id="selected-summary-text">
                {getFullDateString()}
              </span>
            </div>
            <span className="font-body-sm text-body-sm text-on-surface-variant font-medium shrink-0">
              ({doctor.consultationDuration})
            </span>
          </div>

          {/* Action Button */}
          {currentStep === 1 && (
            <button
              onClick={() => setCurrentStep(2)}
              className="w-full h-12 bg-primary hover:bg-primary-container text-on-primary rounded-xl font-label-lg text-label-lg shadow-md flex items-center justify-center gap-space-sm active:scale-[0.98] transition-all cursor-pointer"
              id="btn-continue"
              type="button"
            >
              <span>Continuar con la reserva</span>
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>
          )}

          {currentStep === 2 && (
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentStep(1)}
                className="h-12 px-4 rounded-xl bg-surface-container text-on-surface font-label-md hover:bg-surface-container-high transition-colors cursor-pointer"
              >
                Atrás
              </button>
              <button
                onClick={() => setCurrentStep(3)}
                className="flex-1 h-12 bg-primary text-on-primary rounded-xl font-label-lg shadow-md flex items-center justify-center gap-space-sm active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Revisar resumen</span>
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </button>
            </div>
          )}

          {currentStep === 3 && (
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentStep(2)}
                className="h-12 px-4 rounded-xl bg-surface-container text-on-surface font-label-md hover:bg-surface-container-high transition-colors cursor-pointer"
              >
                Modificar
              </button>
              <button
                onClick={handleConfirmReservation}
                className="flex-1 h-12 bg-primary-container text-on-primary rounded-xl font-label-lg shadow-lg flex items-center justify-center gap-space-sm active:scale-[0.98] transition-all cursor-pointer font-bold animate-pulse"
              >
                <span>Confirmar cita (S/ {doctor.price.toFixed(2)})</span>
                <span className="material-symbols-outlined text-[20px]">check</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
