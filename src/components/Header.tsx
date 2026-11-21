import React from 'react';
import { ScreenType } from '../types';
import { USER_PROFILE } from '../data/petcareData';

interface HeaderProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  onBack?: () => void;
  onOpenNotifications: () => void;
  unreadNotificationsCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  onBack,
  onOpenNotifications,
  unreadNotificationsCount = 2,
}) => {
  const isSubScreen = currentScreen === 'detalle-veterinario' || currentScreen === 'elegir-fecha-hora';

  const getSubScreenTitle = () => {
    if (currentScreen === 'detalle-veterinario') return 'Doctor Detail';
    if (currentScreen === 'elegir-fecha-hora') return 'Date & Time';
    return '';
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-safe bg-surface/85 backdrop-blur-xl border-b border-surface-container/60 shadow-[0_1px_8px_rgba(0,0,0,0.03)] transition-colors">
      <div className="max-w-md mx-auto h-16 px-margin flex items-center justify-between">
        {isSubScreen ? (
          <div className="flex items-center gap-space-sm">
            <button
              aria-label="Volver"
              onClick={onBack}
              className="w-11 h-11 -ml-1 flex items-center justify-center rounded-full text-on-surface hover:bg-surface-container active:scale-95 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[22px]">arrow_back_ios_new</span>
            </button>
            <h1 className="font-headline-md text-headline-md text-on-surface tracking-tight truncate max-w-[220px]">
              {getSubScreenTitle()}
            </h1>
          </div>
        ) : (
          <div 
            onClick={() => onNavigate('inicio')}
            className="flex items-center gap-space-sm cursor-pointer select-none group"
          >
            <div className="w-11 h-11 rounded-full bg-primary-container flex items-center justify-center text-on-primary shadow-sm group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[24px]">pets</span>
            </div>
            <div className="flex flex-col">
              <span className="font-headline-md text-headline-md text-on-surface tracking-tight font-bold">
                PetCare
              </span>
              <div className="flex items-center gap-space-xs text-on-surface-variant -mt-0.5">
                <span className="material-symbols-outlined text-[14px] text-primary">location_on</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Lima, Perú</span>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center gap-space-sm">
          {!isSubScreen && (
            <button
              aria-label="Notificaciones"
              onClick={onOpenNotifications}
              className="relative w-11 h-11 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container active:scale-95 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[22px]">notifications</span>
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-error ring-2 ring-surface"></span>
              )}
            </button>
          )}

          <button
            aria-label="Perfil de usuario"
            onClick={() => onNavigate('perfil')}
            className="relative w-9 h-9 rounded-full overflow-hidden ring-2 ring-primary-container/30 hover:ring-primary transition-all active:scale-95 cursor-pointer flex items-center justify-center bg-primary"
          >
            <img
              src={USER_PROFILE.avatar}
              alt={USER_PROFILE.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.currentTarget;
                if (target.src !== USER_PROFILE.fallbackAvatar) {
                  target.src = USER_PROFILE.fallbackAvatar;
                }
              }}
            />
          </button>
        </div>
      </div>
    </header>
  );
};
