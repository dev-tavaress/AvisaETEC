import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';
import { useNotifications } from '../../context/NotificationContext';
import { Radio, X } from 'lucide-react';

export default function MainLayout() {
  const { novoAvisoToast, fecharToast } = useNotifications();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col transition-colors dark:bg-slate-950">
      <Navbar />

      <div className="flex-1 max-w-7xl w-full mx-auto flex">
        <Sidebar />
        
        {/* Conteúdo Central */}
        <main className="flex-1 p-4 sm:p-7 lg:p-9 pb-20 md:pb-8 overflow-y-auto max-w-5xl">
          <Outlet />
        </main>
      </div>

      <BottomNav />

      {novoAvisoToast && (
        <aside 
          role="alert" 
          aria-live="assertive"
          className="fixed bottom-18 md:bottom-6 right-4 sm:right-6 z-50 max-w-sm w-full bg-white dark:bg-slate-900 border border-red-200 dark:border-red-900/60 shadow-2xl rounded-2xl p-4 flex items-start space-x-3"
        >
          <div className="p-2 bg-red-50 text-red-800 rounded flex-shrink-0">
            <Radio className="w-4 h-4 animate-pulse stroke-[2.5]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold text-red-800 uppercase tracking-widest">
                Novo comunicado
              </span>
              <button
                type="button"
                onClick={fecharToast}
                aria-label="Dispensar alerta"
                className="p-1 min-w-[28px] min-h-[28px] flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1 truncate">
              {novoAvisoToast.titulo}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 line-clamp-2 leading-relaxed">
              {novoAvisoToast.mensagem}
            </p>
            <div className="mt-2 pt-1.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
              <span>Por {novoAvisoToast.remetente}</span>
              <span>Agora</span>
            </div>
          </div>
        </aside>
      )}
    </div>
  );
}
