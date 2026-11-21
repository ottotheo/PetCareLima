import React, { useState, useMemo } from 'react';
import { Veterinarian } from '../../types';

interface DoctorSearchScreenProps {
  veterinarians: Veterinarian[];
  currentDistrict: string;
  onOpenDistrictModal: () => void;
  onSelectDoctor: (doctor: Veterinarian) => void;
  onOpenEmergencyModal: () => void;
  onToggleFavorite: (doctorId: string) => void;
}

export const DoctorSearchScreen: React.FC<DoctorSearchScreenProps> = ({
  veterinarians,
  currentDistrict,
  onOpenDistrictModal,
  onSelectDoctor,
  onOpenEmergencyModal,
  onToggleFavorite,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterToday, setFilterToday] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('Todas');
  const [showSpecialtyMenu, setShowSpecialtyMenu] = useState(false);
  const [sortBy, setSortBy] = useState<'distancia' | 'rating' | 'precio'>('distancia');
  const [favoriteMap, setFavoriteMap] = useState<Record<string, boolean>>({});

  const toggleFav = (e: React.MouseEvent, docId: string) => {
    e.stopPropagation();
    setFavoriteMap(prev => ({ ...prev, [docId]: !prev[docId] }));
    onToggleFavorite(docId);
  };

  const specialtiesList = ['Todas', 'General', 'Odontología', 'Dermatología'];

  // Filter and sort veterinarians
  const filteredDoctors = useMemo(() => {
    return veterinarians.filter((doc) => {
      const matchSearch =
        doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.clinic.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.district.toLowerCase().includes(searchTerm.toLowerCase());

      const matchSpecialty =
        selectedSpecialty === 'Todas' ||
        doc.specialty.toLowerCase().includes(selectedSpecialty.toLowerCase());

      const matchToday = !filterToday || doc.availabilityText.toLowerCase().includes('hoy');

      return matchSearch && matchSpecialty && matchToday;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'precio') return a.price - b.price;
      // Default: distancia
      return parseFloat(a.distance) - parseFloat(b.distance);
    });
  }, [veterinarians, searchTerm, selectedSpecialty, filterToday, sortBy]);

  const cycleSort = () => {
    if (sortBy === 'distancia') setSortBy('rating');
    else if (sortBy === 'rating') setSortBy('precio');
    else setSortBy('distancia');
  };

  const sortLabels = {
    distancia: 'Más cercanos',
    rating: 'Mejor valorados',
    precio: 'Menor precio',
  };

  return (
    <div className="flex flex-col w-full pb-24">
      {/* Sub-header & Localized Location */}
      <section className="px-margin pt-space-md pb-space-sm flex flex-col gap-space-xs">
        <div className="flex items-center justify-between">
          <h1 className="font-headline-lg text-headline-lg text-on-surface">Buscar veterinario</h1>
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container">
            <span className="material-symbols-outlined text-[18px]">verified</span>
          </span>
        </div>

        {/* Location bar selector */}
        <div className="flex items-center justify-between py-space-xs">
          <div 
            onClick={onOpenDistrictModal}
            className="flex items-center gap-space-xs text-on-surface-variant min-w-0 cursor-pointer group"
          >
            <span className="material-symbols-outlined text-primary text-[18px] shrink-0">near_me</span>
            <span className="font-label-md text-label-md text-on-surface truncate group-hover:text-primary transition-colors">
              {currentDistrict}
            </span>
          </div>
          <button
            onClick={onOpenDistrictModal}
            className="shrink-0 text-primary font-label-md text-label-md hover:underline active:opacity-80 transition-opacity ml-space-sm cursor-pointer"
            type="button"
          >
            Cambiar
          </button>
        </div>
      </section>

      {/* Search Bar with Micro-interactions */}
      <section className="px-margin pb-space-sm">
        <div className="relative flex items-center bg-surface-container-lowest rounded-2xl shadow-sm border border-surface-container-high/60 focus-within:border-primary transition-colors">
          <div className="absolute left-space-md flex items-center pointer-events-none text-outline">
            <span className="material-symbols-outlined text-[20px]">search</span>
          </div>
          <input
            className="w-full h-12 pl-11 pr-11 bg-transparent font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none"
            placeholder="Nombre, clínica o especialidad"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              aria-label="Limpiar búsqueda"
              onClick={() => setSearchTerm('')}
              className="absolute right-space-sm w-8 h-8 rounded-full flex items-center justify-center text-outline hover:text-on-surface active:bg-surface-container transition-colors cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">cancel</span>
            </button>
          )}
        </div>
      </section>

      {/* Filter Chips (Horizontal Carousel) */}
      <section className="pb-space-md relative">
        <div className="flex items-center gap-space-sm overflow-x-auto px-margin no-scrollbar py-1">
          {/* Active chip: Especialidad dropdown trigger */}
          <div className="relative shrink-0">
            <button
              onClick={() => setShowSpecialtyMenu(!showSpecialtyMenu)}
              className={`flex items-center gap-space-xs h-9 px-space-md rounded-full font-label-md text-label-md shadow-sm active:scale-95 transition-transform cursor-pointer ${
                selectedSpecialty !== 'Todas'
                  ? 'bg-primary-container text-on-primary'
                  : 'bg-primary-container text-on-primary'
              }`}
              type="button"
            >
              <span>{selectedSpecialty !== 'Todas' ? selectedSpecialty : 'Especialidad'}</span>
              <span className="w-2 h-2 rounded-full bg-secondary-fixed"></span>
              <span className="material-symbols-outlined text-[16px]">expand_more</span>
            </button>

            {showSpecialtyMenu && (
              <div className="absolute top-11 left-0 z-30 bg-surface-container-lowest rounded-xl shadow-xl border border-surface-container-high py-1 min-w-[170px] animate-in fade-in zoom-in-95">
                {specialtiesList.map((spec) => (
                  <button
                    key={spec}
                    onClick={() => {
                      setSelectedSpecialty(spec);
                      setShowSpecialtyMenu(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-sm flex items-center justify-between hover:bg-surface-container cursor-pointer ${
                      selectedSpecialty === spec ? 'text-primary font-bold bg-surface-container-low' : 'text-on-surface'
                    }`}
                  >
                    <span>{spec}</span>
                    {selectedSpecialty === spec && (
                      <span className="material-symbols-outlined text-primary text-[16px]">check</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Active Filter Pill: Atención hoy */}
          <button
            onClick={() => setFilterToday(!filterToday)}
            className={`shrink-0 flex items-center gap-space-xs h-9 px-space-md rounded-full font-label-md text-label-md active:scale-95 transition-all cursor-pointer ${
              filterToday
                ? 'bg-secondary-container text-on-secondary-container ring-1 ring-primary'
                : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
            }`}
            type="button"
          >
            <span
              className="material-symbols-outlined text-[16px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              bolt
            </span>
            <span>Atención hoy</span>
          </button>

          {/* Filter: Fecha */}
          <button
            onClick={() => setFilterToday(prev => !prev)}
            className="shrink-0 flex items-center gap-space-xs h-9 px-space-md rounded-full bg-surface-container-lowest text-on-surface-variant font-label-md text-label-md shadow-sm border border-surface-container-high hover:bg-surface-container active:scale-95 transition-all cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">calendar_month</span>
            <span>Fecha</span>
          </button>

          {/* Filter: Distancia */}
          <button
            onClick={() => setSortBy(sortBy === 'distancia' ? 'rating' : 'distancia')}
            className={`shrink-0 flex items-center gap-space-xs h-9 px-space-md rounded-full font-label-md text-label-md shadow-sm border border-surface-container-high active:scale-95 transition-all cursor-pointer ${
              sortBy === 'distancia'
                ? 'bg-surface-container text-primary font-semibold'
                : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">distance</span>
            <span>Distancia</span>
          </button>
        </div>
      </section>

      {/* Results Count and Sort Trigger */}
      <section className="px-margin pb-space-sm flex items-center justify-between">
        <div className="flex items-center gap-space-xs">
          <span className="font-label-md text-label-md text-on-surface font-semibold">
            {filteredDoctors.length} veterinario{filteredDoctors.length !== 1 ? 's' : ''}
          </span>
          <span className="text-outline text-body-sm font-body-sm">disponibles</span>
        </div>
        <button
          onClick={cycleSort}
          className="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm hover:text-primary transition-colors py-1.5 px-2.5 rounded-lg bg-surface-container-low active:bg-surface-container cursor-pointer"
          type="button"
        >
          <span className="text-outline">Ordenar por:</span>
          <span className="font-label-md text-label-md text-on-surface font-bold">
            {sortLabels[sortBy]}
          </span>
          <span className="material-symbols-outlined text-[16px]">sort</span>
        </button>
      </section>

      {/* Veterinarian Directory List */}
      <section className="px-margin flex flex-col gap-space-lg pb-space-xl">
        {filteredDoctors.length === 0 ? (
          <div className="bg-surface-container-lowest rounded-2xl p-space-xl text-center flex flex-col items-center gap-space-sm border border-surface-container">
            <span className="material-symbols-outlined text-[44px] text-outline">search_off</span>
            <p className="font-headline-md text-on-surface">No se encontraron veterinarios</p>
            <p className="font-body-sm text-on-surface-variant">Prueba ajustando los filtros o buscando otro término.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedSpecialty('Todas');
                setFilterToday(false);
              }}
              className="mt-2 px-4 py-2 bg-primary-container text-on-primary rounded-xl font-label-md text-sm"
            >
              Restablecer búsqueda
            </button>
          </div>
        ) : (
          filteredDoctors.map((doc) => (
            <article
              key={doc.id}
              onClick={() => onSelectDoctor(doc)}
              className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm border border-surface-container-high/60 flex flex-col gap-space-md hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex gap-space-md items-start">
                <div className="relative shrink-0">
                  <img
                    className="w-16 h-16 rounded-2xl object-cover bg-surface-container-high shadow-sm"
                    src={doc.photo}
                    alt={doc.name}
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (doc.fallbackPhoto && target.src !== doc.fallbackPhoto) {
                        target.src = doc.fallbackPhoto;
                      }
                    }}
                  />
                  <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-primary-container text-on-primary flex items-center justify-center shadow-sm">
                    <span className="material-symbols-outlined text-[12px]">
                      {doc.serviceTypeIcon}
                    </span>
                  </span>
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-space-xs">
                    <h2 className="font-headline-md text-headline-md text-on-surface truncate">
                      {doc.name}
                    </h2>
                    <button
                      aria-label="Guardar favorito"
                      onClick={(e) => toggleFav(e, doc.id)}
                      className={`p-0.5 active:scale-90 transition-transform cursor-pointer ${
                        favoriteMap[doc.id] ? 'text-error' : 'text-outline hover:text-error'
                      }`}
                      type="button"
                    >
                      <span 
                        className="material-symbols-outlined text-[20px]"
                        style={{ fontVariationSettings: favoriteMap[doc.id] ? "'FILL' 1" : "'FILL' 0" }}
                      >
                        favorite
                      </span>
                    </button>
                  </div>
                  <span className="font-body-sm text-body-sm text-primary font-semibold truncate">
                    {doc.specialty}
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                    {doc.clinic}
                  </span>
                  <span className="font-label-sm text-label-sm text-outline truncate">
                    {doc.address}
                  </span>

                  <div className="flex items-center gap-space-md mt-space-xs flex-wrap">
                    <div className="flex items-center gap-space-xs bg-tertiary-fixed/30 px-space-xs py-0.5 rounded">
                      <span
                        className="material-symbols-outlined text-[14px] text-tertiary-container"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      <span className="font-label-md text-label-md text-tertiary-container font-bold">
                        {doc.rating}
                      </span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">
                        ({doc.reviewsCount})
                      </span>
                    </div>

                    <div className="flex items-center gap-space-xs text-on-surface-variant">
                      <span className="material-symbols-outlined text-[14px] text-primary">location_on</span>
                      <span className="font-body-sm text-body-sm">{doc.distance}</span>
                    </div>

                    <div className="ml-auto">
                      <span className="font-price-display text-price-display text-primary font-bold">
                        S/ {doc.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Availability Badge & Booking Action */}
              <div className="pt-space-xs flex flex-col gap-space-sm bg-surface-container-low/70 p-space-sm rounded-xl border border-surface-container">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-space-xs text-on-primary-fixed-variant">
                    <span
                      className="material-symbols-outlined text-[16px] text-primary"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      event_available
                    </span>
                    <span className="font-label-sm text-label-sm font-semibold truncate">
                      {doc.availabilityText}
                    </span>
                  </div>
                  {doc.availabilityBadge ? (
                    <span className="inline-flex px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold">
                      {doc.availabilityBadge}
                    </span>
                  ) : (
                    <span className="inline-flex w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                  )}
                </div>

                <button
                  className="w-full h-11 rounded-xl bg-primary-container text-on-primary font-label-lg text-label-lg flex items-center justify-center gap-space-xs active:scale-[0.98] transition-transform shadow-sm hover:bg-primary cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectDoctor(doc);
                  }}
                  type="button"
                >
                  <span>Ver detalle</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </div>
            </article>
          ))
        )}
      </section>

      {/* Micro-Banner Encouragement */}
      <section className="px-margin pb-space-lg">
        <div
          onClick={onOpenEmergencyModal}
          className="bg-secondary-container/40 border border-secondary-container rounded-2xl p-space-md flex items-center gap-space-md cursor-pointer hover:bg-secondary-container/60 transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container shrink-0 shadow-sm">
            <span className="material-symbols-outlined text-[22px]">contact_support</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-label-md text-label-md text-on-surface font-bold">
              ¿Necesitas atención de urgencia?
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              Llama directamente al centro 24/7 de Surco.
            </span>
          </div>
          <span className="material-symbols-outlined text-primary text-[20px] ml-auto">
            chevron_right
          </span>
        </div>
      </section>
    </div>
  );
};
