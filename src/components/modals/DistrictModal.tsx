import React from 'react';
import { DISTRICTS } from '../../data/petcareData';

interface DistrictModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDistrict: string;
  onSelectDistrict: (district: string) => void;
}

export const DistrictModal: React.FC<DistrictModalProps> = ({
  isOpen,
  onClose,
  selectedDistrict,
  onSelectDistrict,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-surface-container-lowest rounded-t-[28px] sm:rounded-[24px] p-space-lg shadow-2xl flex flex-col gap-space-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-1 border-b border-surface-container">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-primary text-[24px]">location_on</span>
            <h2 className="font-headline-md text-headline-md text-on-surface">Selecciona tu distrito</h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center text-outline hover:bg-surface-container active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <p className="font-body-sm text-body-sm text-on-surface-variant">
          Te mostraremos los veterinarios y clínicas más cercanas a tu ubicación en Lima.
        </p>

        <div className="flex flex-col gap-1.5 max-h-[50vh] overflow-y-auto">
          {DISTRICTS.map((dist) => {
            const isSelected = selectedDistrict === dist;
            return (
              <button
                key={dist}
                onClick={() => {
                  onSelectDistrict(dist);
                  onClose();
                }}
                className={`flex items-center justify-between p-space-md rounded-xl text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-secondary-container/40 text-primary font-semibold'
                    : 'bg-surface-container-low hover:bg-surface-container text-on-surface'
                }`}
              >
                <div className="flex items-center gap-space-sm">
                  <span className={`material-symbols-outlined text-[20px] ${isSelected ? 'text-primary' : 'text-outline'}`}>
                    near_me
                  </span>
                  <span className="font-body-md text-body-md">{dist}</span>
                </div>
                {isSelected && (
                  <span className="material-symbols-outlined text-primary text-[20px]">check</span>
                )}
              </button>
            );
          })}
        </div>

        <button
          onClick={onClose}
          className="h-11 w-full rounded-xl bg-surface-container text-on-surface font-label-md hover:bg-surface-container-high transition-colors"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};
