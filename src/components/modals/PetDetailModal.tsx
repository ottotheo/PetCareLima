import React from 'react';
import { Pet, ScreenType } from '../../types';

interface PetDetailModalProps {
  pet: Pet | null;
  isOpen: boolean;
  onClose: () => void;
  onBookAppointmentForPet: (pet: Pet) => void;
}

export const PetDetailModal: React.FC<PetDetailModalProps> = ({
  pet,
  isOpen,
  onClose,
  onBookAppointmentForPet,
}) => {
  if (!isOpen || !pet) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-surface-container-lowest rounded-t-[28px] sm:rounded-[24px] p-space-lg shadow-2xl flex flex-col gap-space-md max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-1 border-b border-surface-container">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-primary text-[24px]">pets</span>
            <h2 className="font-headline-md text-headline-md text-on-surface">Ficha de Mascota</h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center text-outline hover:bg-surface-container active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="flex items-center gap-space-md p-space-md bg-surface-container-low rounded-2xl">
          <div className="relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 bg-surface-container-high shadow-sm">
            <img
              src={pet.photo}
              alt={pet.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.currentTarget;
                if (pet.fallbackPhoto && target.src !== pet.fallbackPhoto) {
                  target.src = pet.fallbackPhoto;
                }
              }}
            />
            <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-[12px]">
                {pet.gender === 'female' ? 'female' : 'male'}
              </span>
            </span>
          </div>
          <div className="flex flex-col min-w-0">
            <h3 className="font-headline-md text-headline-md text-on-surface">{pet.name}</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">{pet.type} · {pet.breed}</p>
            <div className="mt-1 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface text-xs font-medium">
              <span className={`w-2 h-2 rounded-full ${pet.statusType === 'warning' ? 'bg-tertiary animate-pulse' : 'bg-primary'}`}></span>
              <span>{pet.statusText}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-space-sm">
          <div className="p-space-sm rounded-xl bg-surface-container-low flex flex-col">
            <span className="font-label-sm text-[11px] text-outline uppercase font-semibold">Edad</span>
            <span className="font-label-lg text-label-lg text-on-surface font-bold">{pet.age}</span>
          </div>
          <div className="p-space-sm rounded-xl bg-surface-container-low flex flex-col">
            <span className="font-label-sm text-[11px] text-outline uppercase font-semibold">Peso aprox.</span>
            <span className="font-label-lg text-label-lg text-on-surface font-bold">{pet.weight || '14 kg'}</span>
          </div>
        </div>

        <div className="p-space-md rounded-xl border border-surface-container-high bg-white flex flex-col gap-1.5">
          <div className="flex items-center gap-space-xs text-primary font-semibold text-sm">
            <span className="material-symbols-outlined text-[18px]">medical_services</span>
            <span>Próximo recordatorio médico</span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            {pet.nextEvent || 'Chequeo preventivo semestral recomendado'}
          </p>
        </div>

        <button
          onClick={() => {
            onClose();
            onBookAppointmentForPet(pet);
          }}
          className="h-12 w-full rounded-xl bg-primary-container text-on-primary font-label-lg shadow-md active:scale-98 transition-all flex items-center justify-center gap-space-xs cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">calendar_month</span>
          <span>Agendar consulta para {pet.name}</span>
        </button>
      </div>
    </div>
  );
};
