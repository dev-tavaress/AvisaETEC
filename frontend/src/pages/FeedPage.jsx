import React, { useState, useMemo } from 'react';
import { Plus, RefreshCw, Inbox } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import NoticeCard from '../components/feed/NoticeCard';
import NoticeFilterBar from '../components/feed/NoticeFilterBar';
import CreateNoticeModal from '../components/modals/CreateNoticeModal';

export default function FeedPage() {
  const { user, isFuncionario } = useAuth();
  const { notificacoes, isLoading, unreadCount, carregarNotificacoes } = useNotifications();

  const [filtroAtivo, setFiltroAtivo] = useState('todos');
  const [termoBusca, setTermoBusca] = useState('');
  const [modalCriacaoAberto, setModalCriacaoAberto] = useState(false);

  // Filtragem e busca
  const avisosFiltrados = useMemo(() => {
    return notificacoes.filter((aviso) => {
      if (filtroAtivo === 'nao_lidos' && aviso.status) return false;
      if (filtroAtivo === 'turma' && !aviso.id_modulo_destino) return false;
      if (filtroAtivo === 'individual' && !aviso.id_aluno_destino) return false;

      if (termoBusca.trim()) {
        const query = termoBusca.toLowerCase();
        const noTitulo = aviso.titulo?.toLowerCase().includes(query);
        const naMensagem = aviso.mensagem?.toLowerCase().includes(query);
        const noRemetente = aviso.funcionario?.nome?.toLowerCase().includes(query);
        const noId = `#av-${String(aviso.id_notificacao).padStart(4, '0')}`.includes(query);
        return noTitulo || naMensagem || noRemetente || noId;
      }

      return true;
    });
  }, [notificacoes, filtroAtivo, termoBusca]);

  return (
    <div className="space-y-7">
      {/* Top Header do Mural */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <span className="text-[11px] font-semibold text-red-800 uppercase tracking-widest block mb-2">
            Comunicação escolar
          </span>
          <h1 className="page-heading text-2xl sm:text-3xl font-bold text-slate-900">
            Mural de avisos
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {isFuncionario
              ? 'Painel institucional de controle e monitoramento de avisos emitidos'
              : `Avisos para a turma ${user?.moduloNome || 'Geral'}`}
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={carregarNotificacoes}
            disabled={isLoading}
            aria-label="Atualizar mural"
            title="Sincronizar feed"
            className="p-2.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>

          {isFuncionario && (
            <button
              type="button"
              onClick={() => setModalCriacaoAberto(true)}
              className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded text-xs font-semibold bg-red-800 hover:bg-red-900 text-white transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Emitir Comunicado</span>
            </button>
          )}
        </div>
      </div>

      {/* Barra de Filtro e Busca */}
      <NoticeFilterBar
        filtroAtivo={filtroAtivo}
        setFiltroAtivo={setFiltroAtivo}
        termoBusca={termoBusca}
        setTermoBusca={setTermoBusca}
        totalAvisos={notificacoes.length}
        totalNaoLidos={unreadCount}
      />

      {isLoading && notificacoes.length === 0 ? (
        <div className="py-16 text-center space-y-2">
          <div className="w-6 h-6 border-2 border-red-700 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-slate-500">Carregando avisos...</p>
        </div>
      ) : avisosFiltrados.length === 0 ? (
        <div className="border border-dashed border-slate-300 dark:border-slate-800 rounded-lg p-12 text-center space-y-2">
          <div className="w-9 h-9 rounded bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-400 mx-auto">
            <Inbox className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Nenhum aviso encontrado
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {termoBusca
              ? `Sem registros para "${termoBusca}".`
              : 'Não constam avisos com o filtro ativo no momento.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3.5">
          {avisosFiltrados.map((aviso) => (
            <NoticeCard key={aviso.id_notificacao} aviso={aviso} />
          ))}
        </div>
      )}

      {/* Modal de Criação */}
      {isFuncionario && (
        <CreateNoticeModal
          isOpen={modalCriacaoAberto}
          onClose={() => setModalCriacaoAberto(false)}
        />
      )}
    </div>
  );
}
