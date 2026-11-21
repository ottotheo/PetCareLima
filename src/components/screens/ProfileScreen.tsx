import React from 'react';
import { Pet, ScreenType } from '../../types';
import { USER_PROFILE } from '../../data/petcareData';

interface ProfileScreenProps {
  pets: Pet[];
  onNavigate: (screen: ScreenType) => void;
  onOpenRegisterPet: () => void;
  onSelectPet: (pet: Pet) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  pets,
  onNavigate,
  onOpenRegisterPet,
  onSelectPet,
}) => {
  return (
    <div className="flex flex-col w-full px-margin pb-28 pt-space-md">
      {/* User Hero Card */}
      <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm border border-surface-container-high/60 flex flex-col items-center text-center gap-space-sm mb-space-lg">
        <div className="relative w-24 h-24 rounded-full overflow-hidden shadow-md ring-4 ring-secondary-container p-0.5 bg-surface-container">
          <img
            src={USER_PROFILE.avatar}
            alt={USER_PROFILE.fullName}
            className="w-full h-full object-cover rounded-full"
            onError={(e) => {
              const target = e.currentTarget;
              if (target.src !== USER_PROFILE.fallbackAvatar) {
                target.src = USER_PROFILE.fallbackAvatar;
              }
            }}
          />
          <span className="absolute bottom-1 right-1 w-4 h-4 bg-primary rounded-full ring-2 ring-white"></span>
        </div>

        <div className="flex flex-col">
          <h1 className="font-headline-lg text-headline-lg text-on-surface">
            {USER_PROFILE.fullName}
          </h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center justify-center gap-1 mt-0.5">
            <span className="material-symbols-outlined text-primary text-[16px]">location_on</span>
            <span>{USER_PROFILE.currentDistrict}</span>
          </p>
        </div>

        <div className="grid grid-cols-2 gap-space-sm w-full pt-2">
          <div className="p-space-sm rounded-xl bg-surface-container-low flex flex-col text-left">
            <span className="text-[10px] uppercase font-semibold text-outline">Teléfono</span>
            <span className="font-semibold text-xs text-on-surface truncate">{USER_PROFILE.phone}</span>
          </div>
          <div className="p-space-sm rounded-xl bg-surface-container-low flex flex-col text-left">
            <span className="text-[10px] uppercase font-semibold text-outline">Correo</span>
            <span className="font-semibold text-xs text-on-surface truncate">{USER_PROFILE.email}</span>
          </div>
        </div>
      </div>

      {/* Mascotas Registradas */}
      <div className="flex flex-col gap-space-md mb-space-lg">
        <div className="flex items-center justify-between">
          <h2 className="font-headline-md text-headline-md text-on-surface">Mis mascotas vinculadas</h2>
          <button
            onClick={onOpenRegisterPet}
            className="font-label-sm text-primary font-bold flex items-center gap-1 hover:underline cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            <span>Agregar</span>
          </button>
        </div>

        <div className="flex flex-col gap-space-sm">
          {pets.map((p) => (
            <div
              key={p.id}
              onClick={() => onSelectPet(p)}
              className="p-space-md rounded-2xl bg-surface-container-lowest border border-surface-container-high/60 shadow-sm flex items-center justify-between hover:bg-surface-container-low/40 cursor-pointer transition-all"
            >
              <div className="flex items-center gap-space-md min-w-0">
                <img
                  src={p.photo}
                  alt={p.name}
                  className="w-12 h-12 rounded-xl object-cover shadow-sm shrink-0"
                />
                <div className="flex flex-col min-w-0">
                  <span className="font-headline-md text-[16px] text-on-surface font-bold truncate">
                    {p.name}
                  </span>
                  <span className="font-body-sm text-xs text-on-surface-variant truncate">
                    {p.type} · {p.breed} ({p.age})
                  </span>
                  <span className={`text-[11px] font-medium mt-0.5 ${p.statusType === 'warning' ? 'text-tertiary' : 'text-primary'}`}>
                    • {p.statusText}
                  </span>
                </div>
              </div>
              <span className="material-symbols-outlined text-outline text-[20px]">chevron_right</span>
            </div>
          ))}
        </div>
      </div>

      {/* Preferencias y Accesos Rápidos */}
      <div className="flex flex-col gap-space-sm mb-space-lg">
        <h3 className="font-headline-md text-headline-md text-on-surface mb-1">Configuración y Soporte</h3>

        <button 
          onClick={() => onNavigate('mis-citas')}
          className="p-space-md rounded-xl bg-surface-container-lowest border border-surface-container flex items-center justify-between text-left hover:bg-surface-container-low cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-space-sm">
            <span className="material-symbols-outlined text-primary text-[20px]">calendar_today</span>
            <span className="font-body-md text-sm text-on-surface font-medium">Historial completo de citas</span>
          </div>
          <span className="material-symbols-outlined text-outline text-[18px]">chevron_right</span>
        </button>

        <button 
          onClick={() => onNavigate('veterinarios')}
          className="p-space-md rounded-xl bg-surface-container-lowest border border-surface-container flex items-center justify-between text-left hover:bg-surface-container-low cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-space-sm">
            <span className="material-symbols-outlined text-primary text-[20px]">store</span>
            <span className="font-body-md text-sm text-on-surface font-medium">Veterinarios y Sedes en Surco</span>
          </div>
          <span className="material-symbols-outlined text-outline text-[18px]">chevron_right</span>
        </button>

        <a 
          href="tel:+5114800900"
          className="p-space-md rounded-xl bg-surface-container-lowest border border-surface-container flex items-center justify-between text-left hover:bg-surface-container-low cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-space-sm text-error">
            <span className="material-symbols-outlined text-[20px]">emergency</span>
            <span className="font-body-md text-sm font-semibold">Línea de Urgencia 24 Horas</span>
          </div>
          <span className="font-label-sm text-xs font-bold text-error">(01) 480-0900</span>
        </a>
      </div>

      <div className="p-space-md rounded-2xl bg-secondary-container/20 border border-secondary-container/40 text-center flex flex-col gap-1">
        <span className="font-headline-md text-xs text-primary font-bold">PetCare Lima · Versión 1.2</span>
        <span className="text-[11px] text-on-surface-variant">Diseñado con dedicación para el cuidado y salud de mascotas en Lima, Perú</span>
      </div>
    </div>
  );
};
