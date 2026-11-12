import React from 'react';
import { NavLink } from 'react-router-dom';
import { Radio, CalendarDays, Terminal, Shield, GraduationCap } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';

export default function Sidebar() {
  const { user, isFuncionario } = useAuth();
  const { unreadCount, notificacoes } = useNotifications();

  return (
    <aside className="hidden md:flex flex-col w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 transition-colors justify-between min-h-[calc(100vh-5rem)]">
      <div className="space-y-6">
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <div className="flex items-start justify-between">
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">
              Usuário conectado
            </span>
            <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${
              isFuncionario 
                ? 'bg-red-100 text-red-800' 
                : 'bg-slate-200 text-slate-800'
            }`}>
              {isFuncionario ? <Shield className="w-2.5 h-2.5 mr-1" /> : <GraduationCap className="w-2.5 h-2.5 mr-1" />}
              {user?.perfil || 'Discente'}
            </span>
          </div>

          <p className="font-bold text-sm text-slate-900 mt-1.5 truncate">
            {user?.nome}
          </p>
          <p className="text-xs text-slate-500 truncate">
            {user?.email}
          </p>

          {!isFuncionario && user?.moduloNome && (
            <div className="mt-2.5 pt-2 border-t border-slate-200">
              <span className="block text-[10px] text-slate-400 uppercase">Turma vinculada</span>
              <span className="text-xs font-medium text-slate-800 line-clamp-1">
                {user.moduloNome}
              </span>
            </div>
          )}
        </div>

        {/* Menu de Navegação */}
        <nav className="space-y-1">
          <span className="px-2 text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
            Navegação
          </span>

          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold tracking-tight transition-colors ${
                isActive
                  ? 'bg-red-800 text-white'
                  : 'text-slate-600 hover:bg-red-50 hover:text-red-800'
              }`
            }
          >
            <div className="flex items-center space-x-2.5">
              <Radio className="w-4 h-4 stroke-[2]" />
              <span>Mural de avisos</span>
            </div>
            {unreadCount > 0 && (
              <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-red-800 text-white">
                {unreadCount}
              </span>
            )}
          </NavLink>

          <NavLink
            to="/calendario"
            className={({ isActive }) =>
              `flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold tracking-tight transition-colors ${
                isActive
                  ? 'bg-red-800 text-white'
                  : 'text-slate-600 hover:bg-red-50 hover:text-red-800'
              }`
            }
          >
            <div className="flex items-center space-x-2.5">
              <CalendarDays className="w-4 h-4 stroke-[2]" />
              <span>Calendário Escolar</span>
            </div>
          </NavLink>
        </nav>
      </div>

      {/* Rodapé Técnico / Metadados de Sistema */}
      <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[11px] text-slate-500 space-y-1">
        <div className="flex items-center justify-between font-bold text-slate-700">
          <span className="flex items-center space-x-1">
            <Terminal className="w-3 h-3 text-red-800" />
            <span>Resumo</span>
          </span>
          <span className="text-[10px] text-emerald-700 font-semibold">ATIVO</span>
        </div>
        <p className="text-[10px] text-slate-500">
          Total de avisos: <span className="font-semibold text-slate-700">{notificacoes.length}</span>
        </p>
        <p className="text-[10px] text-slate-400 truncate">
          Atualização em tempo real
        </p>
      </div>
    </aside>
  );
}
