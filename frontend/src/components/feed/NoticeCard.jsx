import React from 'react';
import { Check, CheckCheck, Clock, Users, User, Trash2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import api from '../../services/api';

export default function NoticeCard({ aviso }) {
  const { isFuncionario } = useAuth();
  const { marcarComoLida, carregarNotificacoes } = useNotifications();

  const dataFormatada = new Date(aviso.data).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const isLido = aviso.status;
  const isDestinoTurma = !!aviso.id_modulo_destino;

  async function handleExcluir() {
    if (window.confirm('Confirma a exclusão deste aviso?')) {
      try {
        await api.delete(`/notificacoes/${aviso.id_notificacao}`);
        carregarNotificacoes();
      } catch (err) {
        alert('Erro ao excluir comunicado.');
      }
    }
  }

  return (
    <article
      className={`rounded-2xl border transition-all ${
        isLido
          ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm'
          : 'bg-white dark:bg-slate-900 border-red-300 dark:border-red-900/60 shadow-md shadow-red-500/5'
      }`}
    >
      {/* Faixa Superior de Metadados / Protocolo */}
      <div className="px-4 py-2.5 border-b border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center space-x-2.5">
          {isDestinoTurma ? (
            <span className="inline-flex items-center px-2 py-1 rounded-lg text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 dark:bg-blue-950/40 dark:border-blue-900 dark:text-blue-300">
              <Users className="w-3 h-3 mr-1" />
              TURMA: {aviso.moduloDestino?.nome || 'Geral'}
            </span>
          ) : (
            <span className="inline-flex items-center px-2 py-1 rounded-lg text-[10px] font-bold text-violet-700 bg-violet-50 border border-violet-200 dark:bg-violet-950/40 dark:border-violet-900 dark:text-violet-300">
              <User className="w-3 h-3 mr-1" />
              INDIVIDUAL: {aviso.alunoDestino?.nome?.split(' ')[0] || 'Aluno'}
            </span>
          )}

          <span
            className={`text-[10px] font-bold px-1.5 py-1 rounded-lg ${
              isLido
                ? 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900'
                : 'text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900'
            }`}
          >
            {isLido ? 'Lido' : 'Não lido'}
          </span>
        </div>

        <div className="flex items-center space-x-1.5 text-[11px] text-slate-500">
          <Clock className="w-3.5 h-3.5" />
          <span>{dataFormatada}</span>
        </div>
      </div>

      {/* Conteúdo Central */}
      <div className="p-5 sm:p-6 space-y-2">
        <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
          {aviso.titulo}
        </h3>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
          {aviso.mensagem}
        </p>
      </div>

      {/* Faixa Inferior de Assinatura e Ações */}
      <div className="px-5 py-4 bg-slate-50/70 dark:bg-slate-950/40 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
        {/* Assinatura do Emissor */}
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded-full bg-red-50 flex items-center justify-center font-bold text-[10px] text-red-800">
            {aviso.funcionario?.nome?.charAt(0) || 'E'}
          </div>
          <span className="font-semibold text-slate-800 dark:text-slate-200">
            {aviso.funcionario?.nome || 'Equipe Escolar'}
          </span>
          <span className="text-[11px] text-slate-400">
            {aviso.funcionario?.perfil || 'Docente'}
          </span>
        </div>

        {/* Ações */}
        <div className="flex items-center space-x-2">
          {!isLido && (
            <button
              type="button"
              onClick={() => marcarComoLida(aviso.id_notificacao)}
              aria-label={`Confirmar leitura do aviso ${aviso.titulo}`}
              className="inline-flex items-center space-x-1.5 min-h-[42px] px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
            >
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Marcar como lido</span>
            </button>
          )}

          {isFuncionario && (
            <button
              type="button"
              onClick={handleExcluir}
              aria-label={`Revogar aviso ${aviso.titulo}`}
              title="Revogar comunicado"
              className="p-1.5 rounded text-slate-400 hover:text-red-700 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
            >
              <Trash2 className="w-4 h-4 stroke-[2]" />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
