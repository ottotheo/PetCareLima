import React from 'react';
import { ScreenType } from '../../types';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (screen: ScreenType) => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  if (!isOpen) return null;

  const notifications = [
    {
      id: 'notif-1',
      title: 'Próxima cita confirmada',
      desc: 'Dra. Valeria Rojas te espera con Bella el Martes 17 nov a las 10:30 a. m. en Surco.',
      time: 'Hace 10 minutos',
      icon: 'calendar_month',
      iconColor: 'text-primary bg-primary-container/10',
      action: () => {
        onClose();
        onNavigate('mis-citas');
      },
      actionText: 'Ver cita',
    },
    {
      id: 'notif-2',
      title: 'Vacuna próxima para Rocky',
      desc: 'Es momento del refuerzo de la vacuna séxtuple canina para mantener su inmunidad activa.',
      time: 'Ayer',
      icon: 'vaccines',
      iconColor: 'text-tertiary bg-tertiary-fixed/40',
      action: () => {
        onClose();
        onNavigate('veterinarios');
      },
      actionText: 'Agendar cita',
    },
    {
      id: 'notif-3',
      title: 'Cartilla de salud al día',
      desc: 'Bella completó con éxito su desparasitación preventiva trimestral.',
      time: 'Hace 3 días',
      icon: 'verified',
      iconColor: 'text-secondary bg-secondary-container/40',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-surface-container-lowest rounded-t-[28px] sm:rounded-[24px] p-space-lg shadow-2xl flex flex-col gap-space-md max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-1 border-b border-surface-container">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-primary text-[24px]">notifications</span>
            <h2 className="font-headline-md text-headline-md text-on-surface">Notificaciones</h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center text-outline hover:bg-surface-container active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="flex flex-col gap-space-sm">
          {notifications.map((item) => (
            <div
              key={item.id}
              className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-xs hover:bg-surface-container transition-colors"
            >
              <div className="flex items-start gap-space-sm">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${item.iconColor}`}>
                  <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-label-md text-label-md text-on-surface font-semibold">{item.title}</h3>
                    <span className="font-label-sm text-[10px] text-outline">{item.time}</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">{item.desc}</p>
                  {item.action && (
                    <button
                      onClick={item.action}
                      className="self-start mt-2 px-3 py-1 bg-surface-container-lowest border border-outline-variant/60 rounded-lg text-primary font-label-sm text-label-sm hover:bg-primary-container hover:text-white transition-all cursor-pointer"
                    >
                      {item.actionText} →
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="h-11 w-full rounded-xl bg-surface-container text-on-surface font-label-md hover:bg-surface-container-high transition-colors"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};
