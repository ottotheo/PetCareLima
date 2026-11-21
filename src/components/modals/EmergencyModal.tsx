import React from 'react';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-surface-container-lowest rounded-t-[28px] sm:rounded-[24px] p-space-lg shadow-2xl flex flex-col gap-space-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-1 border-b border-surface-container">
          <div className="flex items-center gap-space-xs text-error">
            <span className="material-symbols-outlined text-[26px]">emergency</span>
            <h2 className="font-headline-md text-headline-md text-on-surface">Atención de Urgencia 24/7</h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center text-outline hover:bg-surface-container active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <p className="font-body-md text-body-md text-on-surface-variant">
          Si tu mascota presenta síntomas graves, vómitos repetitivos, dificultad respiratoria o traumatismos, comunícate de inmediato con las sedes veterinarias con guardia médica continua en Surco y San Borja.
        </p>

        <div className="flex flex-col gap-space-sm pt-1">
          <a
            href="tel:+5114800900"
            className="h-13 px-4 rounded-xl bg-error text-on-error font-label-lg flex items-center justify-between shadow-md active:scale-98 transition-transform"
          >
            <div className="flex items-center gap-space-sm">
              <span className="material-symbols-outlined text-[22px]">phone_in_talk</span>
              <div className="flex flex-col text-left">
                <span className="text-sm font-semibold">Central Emergencias Surco</span>
                <span className="text-xs opacity-90">(01) 480-0900 · 24 Horas</span>
              </div>
            </div>
            <span className="text-xs font-bold uppercase bg-white/20 px-2 py-1 rounded-md">Llamar</span>
          </a>

          <a
            href="https://wa.me/51987654321?text=Hola,%20tengo%20una%20urgencia%20veterinaria%20con%20mi%20mascota"
            target="_blank"
            rel="noopener noreferrer"
            className="h-13 px-4 rounded-xl bg-primary-container text-on-primary font-label-lg flex items-center justify-between shadow-sm active:scale-98 transition-transform"
          >
            <div className="flex items-center gap-space-sm">
              <span className="material-symbols-outlined text-[22px]">chat</span>
              <div className="flex flex-col text-left">
                <span className="text-sm font-semibold">WhatsApp Guardia Inmediata</span>
                <span className="text-xs opacity-90">+51 987 654 321 · Triaje rápido</span>
              </div>
            </div>
            <span className="text-xs font-bold uppercase bg-white/20 px-2 py-1 rounded-md">Chat</span>
          </a>
        </div>

        <div className="p-space-sm rounded-xl bg-surface-container-low flex flex-col gap-1 text-on-surface-variant text-xs">
          <span className="font-semibold text-on-surface">Sedes con quirófano activo:</span>
          <span>• Clínica Huellitas: Av. Primavera 1234, Surco</span>
          <span>• Centro Petz 24h: Av. Javier Prado Este 2840, San Borja</span>
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
