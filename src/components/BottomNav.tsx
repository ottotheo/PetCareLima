import React from 'react';
import { ScreenType } from '../types';

interface BottomNavProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  activeAppointmentsCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentScreen,
  onNavigate,
  activeAppointmentsCount = 1,
}) => {
  // Only show on primary bottom-tab screens
  const showNav = currentScreen === 'inicio' || 
                  currentScreen === 'veterinarios' || 
                  currentScreen === 'mis-citas' || 
                  currentScreen === 'perfil';

  if (!showNav) return null;

  const tabs: Array<{ id: ScreenType; label: string; icon: string }> = [
    { id: 'inicio', label: 'Inicio', icon: 'home' },
    { id: 'veterinarios', label: 'Veterinarios', icon: 'stethoscope' },
    { id: 'mis-citas', label: 'Mis citas', icon: 'calendar_today' },
    { id: 'perfil', label: 'Perfil', icon: 'account_circle' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 pb-safe bg-surface-container-lowest/95 backdrop-blur-xl border-t border-surface-container-high/60 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      <div className="max-w-md mx-auto flex justify-around items-center h-[68px] px-space-xs">
        {tabs.map((tab) => {
          const isActive = currentScreen === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className={`flex flex-col items-center justify-center gap-0.5 min-w-[68px] min-h-[48px] py-1 transition-all rounded-xl active:scale-95 cursor-pointer relative ${
                isActive
                  ? 'text-primary font-semibold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <div className="relative">
                <span
                  className="material-symbols-outlined text-[24px] transition-transform duration-200"
                  style={{
                    fontVariationSettings: isActive ? "'FILL' 1, 'wght' 600" : "'FILL' 0, 'wght' 400",
                  }}
                >
                  {tab.icon}
                </span>

                {tab.id === 'mis-citas' && activeAppointmentsCount > 0 && (
                  <span className="absolute -top-1 -right-2 px-1.5 py-0.2 bg-primary text-on-primary text-[10px] font-bold rounded-full min-w-[16px] text-center">
                    {activeAppointmentsCount}
                  </span>
                )}
              </div>
              <span className={`text-[11px] leading-[14px] ${isActive ? 'font-bold' : 'font-medium'}`}>
                {tab.label}
              </span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-0.5 animate-in fade-in zoom-in-50"></span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
