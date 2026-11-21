import React, { useState } from 'react';
import { Pet, Veterinarian, ScreenType, Appointment } from '../../types';
import { USER_PROFILE } from '../../data/petcareData';

interface HomeScreenProps {
  pets: Pet[];
  veterinarians: Veterinarian[];
  appointments: Appointment[];
  onNavigate: (screen: ScreenType) => void;
  onSelectDoctor: (doctor: Veterinarian) => void;
  onSelectPet: (pet: Pet) => void;
  onOpenRegisterPet: () => void;
  onToggleFavorite: (doctorId: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  pets,
  veterinarians,
  appointments,
  onNavigate,
  onSelectDoctor,
  onSelectPet,
  onOpenRegisterPet,
  onToggleFavorite,
}) => {
  const [favoriteIds, setFavoriteIds] = useState<Record<string, boolean>>({});

  const toggleFav = (e: React.MouseEvent, docId: string) => {
    e.stopPropagation();
    setFavoriteIds(prev => ({ ...prev, [docId]: !prev[docId] }));
    onToggleFavorite(docId);
  };

  const draValeria = veterinarians.find(v => v.id === 'valeria-rojas') || veterinarians[0];
  const drMorales = veterinarians.find(v => v.id === 'carlos-morales') || veterinarians[1];

  const activeAppointmentsCount = appointments.filter(a => a.status === 'confirmada').length;

  return (
    <div className="flex flex-col w-full pb-24">
      <div className="flex flex-col w-full px-margin space-y-space-xl pb-6">
        
        {/* Saludo Personalizado y Encabezado de Usuario */}
        <section className="flex items-center justify-between pt-space-sm">
          <div className="flex flex-col">
            <div className="flex items-center gap-space-xs">
              <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">
                Hola, {USER_PROFILE.name}
              </h1>
              <span className="inline-block text-xl select-none animate-bounce">👋</span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Cuidemos de quienes más quieres
            </p>
          </div>
          <button 
            onClick={() => onNavigate('perfil')}
            className="relative cursor-pointer focus:outline-none"
            aria-label="Ver perfil"
          >
            <div className="w-12 h-12 rounded-full overflow-hidden shadow-sm bg-surface-container-high flex items-center justify-center p-0.5 ring-2 ring-primary/20 hover:ring-primary transition-all">
              <img
                className="w-full h-full object-cover rounded-full"
                src={USER_PROFILE.avatar}
                alt={USER_PROFILE.fullName}
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== USER_PROFILE.fallbackAvatar) {
                    target.src = USER_PROFILE.fallbackAvatar;
                  }
                }}
              />
            </div>
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-primary rounded-full ring-2 ring-surface"></span>
          </button>
        </section>

        {/* Tarjeta Hero Promocional Destacada */}
        <section className="relative overflow-hidden rounded-2xl bg-surface-container-low shadow-[0px_4px_16px_rgba(46,125,50,0.06)] p-space-lg flex flex-col justify-between border border-surface-container-high/40">
          <div className="absolute -right-6 -bottom-6 w-36 h-36 rounded-full bg-secondary-container/40 pointer-events-none blur-xl"></div>
          <div className="absolute top-2 right-4 opacity-15 pointer-events-none">
            <span className="material-symbols-outlined text-[80px] text-primary">medical_services</span>
          </div>
          
          <div className="relative z-10 flex flex-col space-y-space-xs max-w-[85%]">
            <div className="inline-flex items-center gap-space-xs self-start px-space-sm py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[14px]">verified</span>
              <span>Atención Prioritaria</span>
            </div>
            <h2 className="font-headline-md text-headline-md text-on-surface pt-1 leading-snug">
              ¿Tu mascota necesita una consulta?
            </h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant pb-space-sm">
              Encuentra un veterinario certificado y reserva tu horario al instante.
            </p>
          </div>

          <div className="relative z-10 pt-1">
            <button
              onClick={() => onNavigate('veterinarios')}
              className="inline-flex items-center justify-center gap-space-sm w-full h-12 px-space-lg rounded-xl bg-primary-container text-on-primary font-label-lg text-label-lg shadow-md active:scale-[0.98] transition-transform cursor-pointer hover:bg-primary"
            >
              <span className="material-symbols-outlined text-[20px]">search</span>
              <span>Buscar veterinario</span>
            </button>
          </div>
        </section>

        {/* Sección: Mis Mascotas */}
        <section className="flex flex-col space-y-space-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-primary text-[22px]">pets</span>
              <h2 className="font-headline-md text-headline-md text-on-surface">Mis mascotas</h2>
            </div>
            <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container-high px-space-sm py-1 rounded-full font-medium">
              {pets.length} registradas
            </span>
          </div>

          {/* Carrusel Horizontal de Mascotas */}
          <div className="flex items-center gap-space-md overflow-x-auto pb-2 -mx-margin px-margin no-scrollbar">
            {pets.map((pet) => (
              <div
                key={pet.id}
                onClick={() => onSelectPet(pet)}
                className="flex-shrink-0 w-40 bg-surface-container-lowest rounded-2xl p-space-md shadow-[0px_4px_16px_rgba(46,125,50,0.06)] border border-surface-container-high/40 flex flex-col items-center text-center relative group cursor-pointer hover:shadow-md transition-all active:scale-98"
              >
                <div className="relative w-20 h-20 mb-space-sm">
                  <img
                    className="w-full h-full object-cover rounded-full shadow-sm"
                    src={pet.photo}
                    alt={pet.name}
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (pet.fallbackPhoto && target.src !== pet.fallbackPhoto) {
                        target.src = pet.fallbackPhoto;
                      }
                    }}
                  />
                  <span className={`absolute bottom-0 right-1 w-5 h-5 rounded-full flex items-center justify-center shadow-sm ${
                    pet.gender === 'female' 
                      ? 'bg-secondary-container text-on-secondary-container' 
                      : 'bg-surface-container-highest text-on-surface-variant'
                  }`}>
                    <span className="material-symbols-outlined text-[12px]">
                      {pet.gender === 'female' ? 'female' : 'male'}
                    </span>
                  </span>
                </div>
                <h3 className="font-label-lg text-label-lg text-on-surface font-semibold">{pet.name}</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  {pet.type} • {pet.age}
                </p>
                <div className="mt-space-sm flex items-center gap-1 bg-surface-container-low px-space-sm py-0.5 rounded-full">
                  {pet.statusType === 'warning' ? (
                    <>
                      <span className="material-symbols-outlined text-[12px] text-tertiary">vaccines</span>
                      <span className="font-label-sm text-[11px] text-on-surface-variant font-medium">
                        {pet.statusText}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                      <span className="font-label-sm text-[11px] text-primary font-medium">
                        {pet.statusText}
                      </span>
                    </>
                  )}
                </div>
              </div>
            ))}

            {/* Botón Registrar Nueva Mascota */}
            <button
              onClick={onOpenRegisterPet}
              className="flex-shrink-0 w-36 h-[178px] rounded-2xl bg-surface-container-low border border-dashed border-outline-variant hover:border-primary flex flex-col items-center justify-center p-space-md text-primary active:scale-95 transition-all text-center cursor-pointer group"
              type="button"
            >
              <div className="w-12 h-12 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center mb-space-sm shadow-sm group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[24px]">add</span>
              </div>
              <span className="font-label-md text-label-md text-on-surface font-semibold">
                Registrar nueva mascota
              </span>
            </button>
          </div>
        </section>

        {/* Métricas Rápidas / Recordatorios del Día */}
        <section className="grid grid-cols-2 gap-space-md">
          <div 
            onClick={() => onNavigate('mis-citas')}
            className="bg-surface-container-lowest rounded-2xl p-space-md shadow-[0px_4px_16px_rgba(46,125,50,0.06)] border border-surface-container-high/40 flex items-center gap-space-sm cursor-pointer hover:bg-surface-container-low/40 active:scale-98 transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined text-[22px]">calendar_clock</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-label-sm text-label-sm text-on-surface-variant truncate">Citas activas</span>
              <span className="font-headline-md text-headline-md text-on-surface font-bold">
                {activeAppointmentsCount} pendiente{activeAppointmentsCount !== 1 ? 's' : ''}
              </span>
            </div>
          </div>

          <div 
            onClick={() => onNavigate('perfil')}
            className="bg-surface-container-lowest rounded-2xl p-space-md shadow-[0px_4px_16px_rgba(46,125,50,0.06)] border border-surface-container-high/40 flex items-center gap-space-sm cursor-pointer hover:bg-surface-container-low/40 active:scale-98 transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center text-tertiary shrink-0">
              <span className="material-symbols-outlined text-[22px]">medication</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-label-sm text-label-sm text-on-surface-variant truncate">Tratamientos</span>
              <span className="font-headline-md text-headline-md text-on-surface font-bold">Al día</span>
            </div>
          </div>
        </section>

        {/* Sección: Veterinarios Cerca de Ti */}
        <section className="flex flex-col space-y-space-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-primary text-[22px]">near_me</span>
              <h2 className="font-headline-md text-headline-md text-on-surface">Veterinarios cerca de ti</h2>
            </div>
            <button
              onClick={() => onNavigate('veterinarios')}
              className="font-label-md text-label-md text-primary flex items-center gap-0.5 hover:underline cursor-pointer"
            >
              <span>Ver todos</span>
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </div>

          {/* Tarjeta Principal Requerida: Dra. Valeria Rojas */}
          {draValeria && (
            <div 
              onClick={() => onSelectDoctor(draValeria)}
              className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-[0px_4px_16px_rgba(46,125,50,0.06)] border border-surface-container-high/40 flex flex-col space-y-space-md hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex items-start gap-space-md">
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden shrink-0 bg-surface-container-high shadow-sm">
                  <img
                    className="w-full h-full object-cover"
                    src={draValeria.photo}
                    alt={draValeria.name}
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (draValeria.fallbackPhoto && target.src !== draValeria.fallbackPhoto) {
                        target.src = draValeria.fallbackPhoto;
                      }
                    }}
                  />
                  <span className="absolute bottom-1 right-1 w-3 h-3 rounded-full bg-primary ring-2 ring-white"></span>
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-headline-md text-headline-md text-on-surface truncate">
                      {draValeria.name}
                    </h3>
                    <button
                      aria-label="Guardar en favoritos"
                      onClick={(e) => toggleFav(e, draValeria.id)}
                      className={`p-1 -mr-1 transition-colors cursor-pointer ${
                        favoriteIds[draValeria.id] ? 'text-error' : 'text-outline hover:text-error'
                      }`}
                    >
                      <span 
                        className="material-symbols-outlined text-[20px]"
                        style={{ fontVariationSettings: favoriteIds[draValeria.id] ? "'FILL' 1" : "'FILL' 0" }}
                      >
                        favorite
                      </span>
                    </button>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
                    {draValeria.specialty}
                  </p>
                  <div className="flex items-center gap-space-xs text-on-surface-variant pt-0.5">
                    <span className="material-symbols-outlined text-[14px] text-primary">store</span>
                    <span className="font-label-sm text-label-sm truncate">
                      {draValeria.clinic} • Surco
                    </span>
                  </div>
                </div>
              </div>

              {/* Reseñas, Distancia y Precio */}
              <div className="flex items-center justify-between py-space-xs px-space-sm bg-surface-container-low rounded-xl">
                <div className="flex items-center gap-1">
                  <span
                    className="material-symbols-outlined text-[16px] text-tertiary-fixed-dim"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span className="font-label-md text-label-md text-on-surface font-bold">
                    {draValeria.rating}
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    ({draValeria.reviewsCount})
                  </span>
                </div>
                <div className="flex items-center gap-1 text-on-surface-variant">
                  <span className="material-symbols-outlined text-[16px] text-primary">location_on</span>
                  <span className="font-label-sm text-label-sm">{draValeria.distance}</span>
                </div>
                <div className="flex items-baseline gap-0.5">
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Desde</span>
                  <span className="font-price-display text-price-display text-primary font-bold">
                    S/ {draValeria.price.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Disponibilidad y Acción */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-space-xs text-on-surface">
                  <span className="material-symbols-outlined text-[18px] text-primary">schedule</span>
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm text-on-surface-variant">Próxima cita</span>
                    <span className="font-label-md text-label-md text-on-surface font-semibold">
                      {draValeria.nextSlotTime}
                    </span>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectDoctor(draValeria);
                  }}
                  className="h-11 px-space-lg rounded-xl bg-surface-container-high text-primary font-label-md text-label-md flex items-center justify-center active:scale-95 transition-all hover:bg-primary-container hover:text-white cursor-pointer"
                >
                  <span>Ver detalle</span>
                </button>
              </div>
            </div>
          )}

          {/* Tarjeta Secundaria Adicional de Soporte para Densidad Visual */}
          {drMorales && (
            <div 
              onClick={() => onSelectDoctor(drMorales)}
              className="bg-surface-container-lowest rounded-2xl p-space-md shadow-[0px_4px_16px_rgba(46,125,50,0.06)] border border-surface-container-high/40 flex items-center justify-between hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex items-center gap-space-md min-w-0">
                <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-surface-container-high shadow-sm">
                  <img
                    className="w-full h-full object-cover"
                    src={drMorales.photo}
                    alt={drMorales.name}
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (drMorales.fallbackPhoto && target.src !== drMorales.fallbackPhoto) {
                        target.src = drMorales.fallbackPhoto;
                      }
                    }}
                  />
                </div>
                <div className="flex flex-col min-w-0">
                  <h4 className="font-label-lg text-label-lg text-on-surface font-bold truncate">
                    {drMorales.name}
                  </h4>
                  <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                    {drMorales.specialty} • {drMorales.district} ({drMorales.distance})
                  </span>
                  <div className="flex items-center gap-1 pt-0.5">
                    <span
                      className="material-symbols-outlined text-[14px] text-tertiary-fixed-dim"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface font-semibold">
                      {drMorales.rating}
                    </span>
                    <span className="text-outline font-label-sm text-label-sm">
                      • S/ {drMorales.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              <button 
                className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-primary shrink-0 active:scale-90 transition-transform cursor-pointer"
                aria-label="Ver detalles"
              >
                <span className="material-symbols-outlined text-[20px]">chevron_right</span>
              </button>
            </div>
          )}

        </section>
      </div>
    </div>
  );
};
