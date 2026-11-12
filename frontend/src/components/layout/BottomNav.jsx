import React from 'react';
import { NavLink } from 'react-router-dom';
import { Radio, CalendarDays } from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';

export default function BottomNav() {
  const { unreadCount } = useNotifications();

  return (
    <nav 
      aria-label="Navegação móvel"
      className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 dark:bg-slate-950/95 backdrop-blur border-t border-slate-200 dark:border-slate-800 transition-colors"
    >
      <div className="flex items-center justify-around h-14 max-w-lg mx-auto px-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center space-x-2 py-2 px-4 rounded text-xs font-semibold tracking-tight transition-colors relative ${
              isActive 
                ? 'bg-red-800 text-white' 
                : 'text-slate-600 dark:text-slate-400'
            }`
          }
        >
          <div className="relative">
            <Radio className="w-4 h-4 stroke-[2]" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-2 px-1 min-w-[14px] h-[14px] bg-red-800 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </div>
          <span>Mural</span>
        </NavLink>

        <NavLink
          to="/calendario"
          className={({ isActive }) =>
            `flex items-center space-x-2 py-2 px-4 rounded text-xs font-semibold tracking-tight transition-colors ${
              isActive 
                ? 'bg-red-800 text-white' 
                : 'text-slate-600 dark:text-slate-400'
            }`
          }
        >
          <CalendarDays className="w-4 h-4 stroke-[2]" />
          <span>Calendário</span>
        </NavLink>
      </div>
    </nav>
  );
}
