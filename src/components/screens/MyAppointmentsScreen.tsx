import React, { useState } from 'react';
import { Appointment, ScreenType } from '../../types';

interface MyAppointmentsScreenProps {
  appointments: Appointment[];
  onNavigate: (screen: ScreenType) => void;
  onCancelAppointment: (id: string) => void;
}

export const MyAppointmentsScreen: React.FC<MyAppointmentsScreenProps> = ({
  appointments,
  onNavigate,
  onCancelAppointment,
}) => {
  const [tab, setTab] = useState<'proximas' | 'pasadas'>('proximas');
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  const activeApts = appointments.filter(a => a.status === 'confirmada');

  const pastApts = [
    {
      id: 'past-1',
      doctorName: 'Dr. Carlos Morales',
      doctorSpecialty: 'Dermatología',
      doctorClinic: 'Veterinaria San Borja Pets',
      petName: 'Rocky',
      dateFormatted: '15 oct 2026',
      timeSlot: '4:00 p. m.',
      price: 110.00,
      status: 'completada' as const,
      reason: 'Control de alergia estacional y rascado',
    }
  ];

  return (
    <div className="flex flex-col w-full px-margin pb-24 pt-space-md">
      <div className="flex items-center justify-between pb-space-md">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface">Mis citas</h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Gestiona las consultas médicas de tus mascotas
          </p>
        </div>
        <span className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center">
          <span className="material-symbols-outlined text-[22px]">calendar_today</span>
        </span>
      </div>

      {/* Tabs */}
      <div className="flex bg-surface-container-low p-1 rounded-2xl mb-space-lg">
        <button
          onClick={() => setTab('proximas')}
          className={`flex-1 py-2 text-center rounded-xl font-label-md text-sm transition-all cursor-pointer ${
            tab === 'proximas'
              ? 'bg-surface-container-lowest text-primary font-bold shadow-sm'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          Próximas ({activeApts.length})
        </button>
        <button
          onClick={() => setTab('pasadas')}
          className={`flex-1 py-2 text-center rounded-xl font-label-md text-sm transition-all cursor-pointer ${
            tab === 'pasadas'
              ? 'bg-surface-container-lowest text-primary font-bold shadow-sm'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          Historial ({pastApts.length})
        </button>
      </div>

      {tab === 'proximas' && (
        <div className="flex flex-col gap-space-lg">
          {activeApts.length === 0 ? (
            <div className="bg-surface-container-lowest rounded-2xl p-space-xl text-center flex flex-col items-center gap-space-sm border border-surface-container shadow-sm">
              <span className="material-symbols-outlined text-[48px] text-outline">event_busy</span>
              <h3 className="font-headline-md text-on-surface">No tienes citas activas</h3>
              <p className="font-body-sm text-on-surface-variant max-w-xs">
                Cuando reserves una consulta para tus mascotas, aparecerá aquí con los detalles de acceso.
              </p>
              <button
                onClick={() => onNavigate('veterinarios')}
                className="mt-2 h-11 px-5 rounded-xl bg-primary-container text-on-primary font-label-md shadow-md active:scale-95 transition-all cursor-pointer"
              >
                Buscar veterinario
              </button>
            </div>
          ) : (
            activeApts.map((apt) => (
              <div
                key={apt.id}
                className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm border border-surface-container-high/60 flex flex-col gap-space-md"
              >
                {/* Header */}
                <div className="flex items-start justify-between border-b border-surface-container pb-space-sm">
                  <div className="flex items-center gap-space-sm">
                    <img
                      src={apt.doctorPhoto}
                      alt={apt.doctorName}
                      className="w-12 h-12 rounded-xl object-cover shadow-sm"
                    />
                    <div className="flex flex-col">
                      <span className="font-headline-md text-[16px] text-on-surface font-bold">
                        {apt.doctorName}
                      </span>
                      <span className="font-body-sm text-xs text-primary font-medium">
                        {apt.doctorSpecialty}
                      </span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-xs font-bold uppercase tracking-wider">
                    Confirmada
                  </span>
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-space-sm text-xs bg-surface-container-low p-space-md rounded-xl">
                  <div>
                    <span className="text-outline uppercase text-[10px] font-semibold">Mascota</span>
                    <p className="font-bold text-on-surface text-sm flex items-center gap-1 mt-0.5">
                      <img src={apt.petPhoto} alt={apt.petName} className="w-5 h-5 rounded-full object-cover" />
                      <span>{apt.petName}</span>
                    </p>
                  </div>
                  <div>
                    <span className="text-outline uppercase text-[10px] font-semibold">Horario</span>
                    <p className="font-bold text-primary text-sm mt-0.5">{apt.timeSlot}</p>
                  </div>
                  <div className="col-span-2 pt-1 border-t border-surface-container/60">
                    <span className="text-outline uppercase text-[10px] font-semibold">Fecha y Sede</span>
                    <p className="font-semibold text-on-surface text-xs mt-0.5">
                      {apt.dateFormatted} · {apt.doctorClinic}
                    </p>
                    <p className="text-outline text-[11px] truncate">{apt.address}</p>
                  </div>
                </div>

                {/* QR Pass / Clinic Badge */}
                <div className="flex items-center justify-between text-xs text-on-surface-variant px-1">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-primary">qr_code_2</span>
                    <span>Pase digital activo en recepción</span>
                  </span>
                  <span className="font-price-display text-primary font-bold">
                    S/ {apt.price.toFixed(2)}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-space-sm pt-1">
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(apt.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 h-10 rounded-xl bg-surface-container text-primary font-label-sm flex items-center justify-center gap-1 hover:bg-surface-container-high transition-colors text-xs font-semibold"
                  >
                    <span className="material-symbols-outlined text-[16px]">directions</span>
                    <span>Cómo llegar</span>
                  </a>

                  {cancellingId === apt.id ? (
                    <div className="flex gap-1 flex-1">
                      <button
                        onClick={() => {
                          onCancelAppointment(apt.id);
                          setCancellingId(null);
                        }}
                        className="flex-1 h-10 rounded-xl bg-error text-white font-label-sm text-xs font-bold"
                      >
                        Confirmar
                      </button>
                      <button
                        onClick={() => setCancellingId(null)}
                        className="px-2 h-10 rounded-xl bg-surface-container text-xs"
                      >
                        No
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setCancellingId(apt.id)}
                      className="px-3 h-10 rounded-xl border border-outline-variant/60 text-outline hover:text-error hover:border-error transition-colors text-xs font-medium cursor-pointer"
                    >
                      Cancelar
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {tab === 'pasadas' && (
        <div className="flex flex-col gap-space-md">
          {pastApts.map((p) => (
            <div
              key={p.id}
              className="bg-surface-container-lowest rounded-2xl p-space-md border border-surface-container shadow-sm flex flex-col gap-2 opacity-90"
            >
              <div className="flex justify-between items-center">
                <span className="font-headline-md text-sm font-bold text-on-surface">{p.doctorName}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-surface-container text-outline font-medium">
                  Completada
                </span>
              </div>
              <p className="text-xs text-on-surface-variant">{p.doctorClinic} · {p.petName}</p>
              <div className="flex justify-between text-xs text-outline pt-1 border-t border-surface-container">
                <span>{p.dateFormatted} · {p.timeSlot}</span>
                <span className="font-bold text-on-surface">S/ {p.price.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
