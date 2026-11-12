import React from 'react';
import { Bell, LogOut, Shield, GraduationCap } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import ThemeToggle from '../common/ThemeToggle';

export default function Navbar() {
  const { user, logout, isFuncionario } = useAuth();
  const { unreadCount, isConnected } = useNotifications();

  return (
    <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="h-1 institutional-rule" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[4.75rem] flex items-center justify-between">
        <div className="flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-red-700 flex items-center justify-center text-white font-bold text-lg shadow-sm">
            A
          </div>
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-[1.05rem] tracking-tight text-slate-900 dark:text-white">
                Avisa<span className="text-red-800">ETEC</span>
              </span>
            </div>
            <span className="text-[11px] text-slate-500 font-medium tracking-tight hidden sm:block">
              Comunicados oficiais da comunidade escolar
            </span>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div 
            title={isConnected ? 'Conexão em tempo real ativa' : 'Desconectado do servidor'} 
            className="hidden sm:flex items-center space-x-2 px-2.5 py-1.5 rounded-full text-[11px] bg-slate-50 text-slate-600 border border-slate-200"
          >
            <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-emerald-600' : 'bg-red-600'}`} />
            <span className="font-medium">
              {isConnected ? 'Conectado' : 'Sem conexão'}
            </span>
          </div>

          {/* Notificações / Contador */}
          <div 
            role="status"
            aria-label={`${unreadCount} avisos não lidos`}
            className="relative p-2 text-slate-600 hover:text-red-800 transition-colors"
          >
            <Bell className="w-5 h-5 stroke-[1.75]" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 px-1.5 py-0.2 min-w-[18px] h-[18px] bg-red-800 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </div>

          <ThemeToggle />

          {/* Perfil do Usuário com Estilo Institucional */}
          <div className="hidden sm:flex items-center space-x-2.5 pl-3 border-l border-slate-200">
            <div className="w-8 h-8 rounded-full bg-red-50 border border-red-100 flex items-center justify-center text-red-800">
              {isFuncionario ? (
                <Shield className="w-4 h-4 text-red-800 stroke-[2]" />
              ) : (
                <GraduationCap className="w-4 h-4 text-slate-700 stroke-[2]" />
              )}
            </div>
            <div className="text-left text-xs">
              <p className="font-semibold text-slate-900 truncate max-w-[130px]">
                {user?.nome}
              </p>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">
                {isFuncionario ? user?.perfil : (user?.moduloNome?.split('|')[0]?.trim() || 'Aluno')}
              </p>
            </div>
          </div>

          {/* Logout */}
          <button
            type="button"
            onClick={logout}
            aria-label="Sair da conta"
            title="Sair do sistema"
            className="p-2 min-w-[36px] min-h-[36px] flex items-center justify-center rounded text-slate-500 hover:text-red-800 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-4 h-4 stroke-[2]" />
          </button>
        </div>
      </div>
    </header>
  );
}
