import React, { useState } from 'react';
import { Veterinarian, Review } from '../../types';

interface DoctorDetailScreenProps {
  doctor: Veterinarian;
  onGoToSchedule: () => void;
  onBack: () => void;
}

export const DoctorDetailScreen: React.FC<DoctorDetailScreenProps> = ({
  doctor,
  onGoToSchedule,
  onBack,
}) => {
  const [reviews, setReviews] = useState<Review[]>(doctor.reviews);
  const [showAddReview, setShowAddReview] = useState(false);
  const [newReviewText, setNewReviewText] = useState('');
  const [newRating, setNewRating] = useState(5);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewText.trim()) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      author: 'Lucía F.',
      initial: 'L',
      rating: newRating,
      text: `“${newReviewText.trim()}”`,
      date: 'Reciente',
      avatarBg: 'bg-primary-container text-on-primary',
    };

    setReviews([newRev, ...reviews]);
    setNewReviewText('');
    setShowAddReview(false);
  };

  return (
    <div className="flex flex-col w-full relative pb-32">
      {/* Top Hero Photo Section */}
      <div className="relative w-full h-72 sm:h-80 overflow-hidden bg-surface-container">
        <img
          className="w-full h-full object-cover object-top"
          src={doctor.detailHeroPhoto || doctor.photo}
          alt={doctor.name}
          onError={(e) => {
            const target = e.currentTarget;
            if (doctor.fallbackPhoto && target.src !== doctor.fallbackPhoto) {
              target.src = doctor.fallbackPhoto;
            }
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-black/25"></div>

        {/* Rating Floating Badge */}
        <div className="absolute top-4 right-4 flex items-center gap-space-xs bg-surface-container-lowest/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-md">
          <span
            className="material-symbols-outlined text-[18px] text-tertiary-fixed-dim"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            star
          </span>
          <span className="font-label-md text-label-md text-on-surface font-bold">
            {doctor.rating}
          </span>
          <span className="font-body-sm text-body-sm text-outline">
            ({doctor.reviewsCount + (reviews.length - doctor.reviews.length)})
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative -mt-8 px-margin flex flex-col gap-space-lg">
        
        {/* Profile Card */}
        <div className="bg-surface-container-lowest rounded-[24px] p-space-lg shadow-xl border border-surface-container-high/40 flex flex-col gap-space-md">
          <div className="flex flex-col">
            <div className="flex items-center justify-between gap-space-sm">
              <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
                {doctor.name}
              </h2>
              <span
                className="material-symbols-outlined text-primary text-[24px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified
              </span>
            </div>
            <p className="font-label-lg text-label-lg text-primary mt-0.5 font-semibold">
              {doctor.specialty}
            </p>
            <div className="flex items-center gap-space-xs mt-1 text-on-surface-variant">
              <span className="material-symbols-outlined text-[18px] text-outline">domain</span>
              <span className="font-body-md text-body-md font-semibold text-on-surface-variant">
                {doctor.clinic}
              </span>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-space-sm pt-1">
            {doctor.specialtyTags.map((tag, idx) => (
              <div
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container text-on-surface-variant"
              >
                <span className="material-symbols-outlined text-[16px] text-primary">
                  {idx === 0 ? 'workspace_premium' : 'pets'}
                </span>
                <span className="font-label-sm text-label-sm font-medium">{tag}</span>
              </div>
            ))}
          </div>

          {/* Bio */}
          <div className="bg-surface-container-low p-space-md rounded-xl border border-surface-container">
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              {doctor.bio}
            </p>
          </div>
        </div>

        {/* Consultation Service Card */}
        <div className="bg-surface-container-lowest rounded-[24px] p-space-lg shadow-md border border-surface-container-high/40 flex flex-col gap-space-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-space-sm">
              <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container shadow-sm">
                <span className="material-symbols-outlined text-[20px]">medical_services</span>
              </div>
              <div>
                <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
                  Consulta presencial
                </h3>
                <span className="font-body-sm text-body-sm text-outline">
                  Duración estimada: {doctor.consultationDuration}
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="font-headline-lg text-headline-lg text-primary font-bold">
                S/ {doctor.price.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between bg-surface-container-low px-space-md py-2.5 rounded-xl text-on-surface-variant">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-[18px] text-outline">payments</span>
              <span className="font-body-sm text-body-sm">Forma de pago</span>
            </div>
            <span className="font-label-sm text-label-sm text-on-surface font-semibold">
              {doctor.paymentMethod}
            </span>
          </div>
        </div>

        {/* Location & Map Card */}
        <div className="bg-surface-container-lowest rounded-[24px] p-space-lg shadow-md border border-surface-container-high/40 flex flex-col gap-space-md">
          <div className="flex items-start justify-between gap-space-sm">
            <div className="flex items-start gap-space-sm">
              <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[22px]">location_on</span>
              </div>
              <div className="flex flex-col min-w-0">
                <h4 className="font-label-lg text-label-lg text-on-surface font-semibold">
                  Ubicación y sede
                </h4>
                <p className="font-body-md text-body-md text-on-surface-variant mt-0.5 font-medium">
                  {doctor.clinic}
                </p>
                <p className="font-body-sm text-body-sm text-outline">
                  {doctor.address}, {doctor.district}, Lima
                </p>
              </div>
            </div>
            <div className="px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container shrink-0">
              <span className="font-label-sm text-label-sm font-semibold">{doctor.distance}</span>
            </div>
          </div>

          {/* Stylized Simulated Map Container */}
          <div className="relative w-full h-32 rounded-xl overflow-hidden shadow-inner bg-[#e4ede1] border border-surface-container-high flex items-center justify-center">
            {/* Visual map roads grid */}
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#126d1f_1px,transparent_1px)] [background-size:16px_16px]"></div>
            <div className="absolute w-full h-3 bg-white/70 -rotate-12"></div>
            <div className="absolute w-3 h-full bg-white/70 left-1/3"></div>
            
            <div className="relative z-10 w-11 h-11 rounded-full bg-primary flex items-center justify-center text-on-primary shadow-lg ring-4 ring-white animate-bounce">
              <span className="material-symbols-outlined text-[22px]">pin_drop</span>
            </div>
          </div>

          <a
            className="w-full h-11 bg-surface-container-low hover:bg-surface-container text-primary font-label-md text-label-md rounded-xl flex items-center justify-center gap-space-xs transition-colors cursor-pointer"
            href={`https://maps.google.com/?q=${encodeURIComponent(doctor.address + ', Lima, Peru')}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="material-symbols-outlined text-[18px]">directions</span>
            <span>Cómo llegar</span>
          </a>
        </div>

        {/* Reviews Section */}
        <div className="bg-surface-container-lowest rounded-[24px] p-space-lg shadow-md border border-surface-container-high/40 flex flex-col gap-space-md">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-headline-md text-headline-md text-on-surface">
                Opiniones de familias
              </h4>
              <p className="font-body-sm text-body-sm text-outline">
                {doctor.reviewsCount + (reviews.length - doctor.reviews.length)} reseñas verificadas
              </p>
            </div>
            <div className="flex items-center gap-1 bg-surface-container-low px-3 py-1.5 rounded-full">
              <span
                className="material-symbols-outlined text-[18px] text-tertiary-fixed-dim"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
              <span className="font-headline-md text-headline-md text-on-surface font-bold">
                {doctor.rating}
              </span>
              <span className="font-body-sm text-body-sm text-outline">/ 5</span>
            </div>
          </div>

          <div className="flex flex-col gap-space-md pt-1">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-xs border border-surface-container/60"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-space-sm">
                    <div className={`w-7 h-7 rounded-full ${rev.avatarBg || 'bg-primary-container text-on-primary'} font-label-sm text-label-sm flex items-center justify-center font-bold`}>
                      {rev.initial}
                    </div>
                    <span className="font-label-md text-label-md text-on-surface font-semibold">
                      {rev.author}
                    </span>
                  </div>
                  <div className="flex text-tertiary-fixed-dim">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className="material-symbols-outlined text-[16px]"
                        style={{ fontVariationSettings: i < rev.rating ? "'FILL' 1" : "'FILL' 0" }}
                      >
                        star
                      </span>
                    ))}
                  </div>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  {rev.text}
                </p>
              </div>
            ))}
          </div>

          {/* Add Review Accordion */}
          {!showAddReview ? (
            <button
              onClick={() => setShowAddReview(true)}
              className="mt-1 text-primary font-label-md text-center py-2 hover:underline cursor-pointer"
            >
              + Dejar una opinión sobre {doctor.name}
            </button>
          ) : (
            <form onSubmit={handleAddReview} className="flex flex-col gap-2 pt-2 border-t border-surface-container">
              <label className="text-xs font-semibold text-on-surface">Calificación:</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setNewRating(star)}
                    className="cursor-pointer text-tertiary-fixed-dim"
                  >
                    <span
                      className="material-symbols-outlined text-[24px]"
                      style={{ fontVariationSettings: star <= newRating ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      star
                    </span>
                  </button>
                ))}
              </div>
              <textarea
                value={newReviewText}
                onChange={(e) => setNewReviewText(e.target.value)}
                placeholder="Comparte tu experiencia con esta especialista..."
                className="w-full p-2.5 rounded-xl border border-outline-variant bg-surface-container-low text-sm outline-none focus:border-primary"
                rows={2}
                required
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddReview(false)}
                  className="px-3 py-1.5 rounded-lg bg-surface-container text-xs"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-primary text-white text-xs font-semibold"
                >
                  Publicar reseña
                </button>
              </div>
            </form>
          )}

        </div>
      </div>

      {/* Fixed Sticky Booking Bar */}
      <div className="fixed bottom-0 left-0 right-0 w-full bg-surface-container-lowest/95 backdrop-blur-xl p-margin pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.08)] z-40 border-t border-surface-container-high/60">
        <div className="max-w-[420px] mx-auto w-full flex items-center gap-space-md">
          <div className="flex flex-col">
            <span className="font-body-sm text-body-sm text-outline">Total consulta</span>
            <span className="font-headline-lg text-headline-lg text-primary tracking-tight font-bold">
              S/ {doctor.price.toFixed(2)}
            </span>
          </div>
          <button
            onClick={onGoToSchedule}
            className="flex-1 h-12 bg-primary-container hover:bg-primary text-on-primary font-label-lg text-label-lg rounded-2xl flex items-center justify-center gap-space-sm shadow-md active:scale-95 transition-all cursor-pointer"
            id="book-btn"
          >
            <span>Elegir fecha y hora</span>
            <span className="material-symbols-outlined text-[20px]">calendar_month</span>
          </button>
        </div>
      </div>
    </div>
  );
};
