import React from 'react';
import { Appointment } from '../../types';

interface BookingSuccessModalProps {
  isOpen: boolean;
  appointment: Appointment | null;
  onGoToAppointments: () => void;
  onGoHome: () => void;
}

export const BookingSuccessModal: React.FC<BookingSuccessModalProps> = ({
  isOpen,
  appointment,
  onGoToAppointments,
  onGoHome,
}) => {
  if (!isOpen || !appointment) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-surface-container-lowest rounded-t-[28px] sm:rounded-[24px] p-space-lg shadow-2xl flex flex-col items-center text-center gap-space-md max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-16 h-16 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shadow-md animate-bounce">
          <span className="material-symbols-outlined text-[36px]">check_circle</span>
        </div>

        <div className="flex flex-col gap-1">
          <h2 className="font-headline-lg text-headline-lg text-on-surface">¡Cita Agendada!</h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Tu reserva ha sido registrada en el sistema de la clínica.
          </p>
        </div>

        {/* Appointment ticket */}
        <div className="w-full p-space-md rounded-2xl bg-surface-container-low border border-surface-container-high flex flex-col gap-space-sm text-left">
          <div className="flex items-center gap-space-sm pb-space-sm border-b border-surface-container">
            <img
              src={appointment.doctorPhoto}
              alt={appointment.doctorName}
              className="w-12 h-12 rounded-xl object-cover shrink-0"
            />
            <div className="flex flex-col min-w-0">
              <span className="font-headline-md text-[16px] text-on-surface font-bold truncate">
                {appointment.doctorName}
              </span>
              <span className="font-body-sm text-xs text-primary font-medium truncate">
                {appointment.doctorClinic}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-space-xs text-xs">
            <div>
              <span className="text-outline uppercase font-semibold text-[10px]">Paciente:</span>
              <p className="font-bold text-on-surface text-sm flex items-center gap-1">
                <span>{appointment.petName}</span>
                <span className="material-symbols-outlined text-primary text-[14px]">pets</span>
              </p>
            </div>
            <div>
              <span className="text-outline uppercase font-semibold text-[10px]">Horario:</span>
              <p className="font-bold text-on-surface text-sm">{appointment.timeSlot}</p>
            </div>
          </div>

          <div className="pt-1 text-xs">
            <span className="text-outline uppercase font-semibold text-[10px]">Fecha:</span>
            <p className="font-bold text-on-surface text-sm">{appointment.dateFormatted} · 2026</p>
          </div>

          <div className="pt-1 text-xs flex justify-between items-baseline border-t border-surface-container">
            <span className="text-on-surface-variant">Monto a abonar en clínica:</span>
            <span className="font-price-display text-primary font-bold text-base">S/ {appointment.price.toFixed(2)}</span>
          </div>
        </div>

        <div className="w-full flex flex-col gap-space-sm pt-2">
          <button
            onClick={onGoToAppointments}
            className="w-full h-12 rounded-xl bg-primary-container text-on-primary font-label-lg shadow-md active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Ver en Mis Citas</span>
            <span className="material-symbols-outlined text-[18px]">calendar_today</span>
          </button>

          <button
            onClick={onGoHome}
            className="w-full h-11 rounded-xl bg-surface-container text-on-surface font-label-md hover:bg-surface-container-high transition-colors cursor-pointer"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
};
