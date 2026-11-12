import React, { useState, useEffect } from 'react';
import { X, Send, Users, User, AlertCircle } from 'lucide-react';
import api from '../../services/api';
import { useNotifications } from '../../context/NotificationContext';

export default function CreateNoticeModal({ isOpen, onClose }) {
  const { criarAviso } = useNotifications();

  const [titulo, setTitulo] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [tipoDestino, setTipoDestino] = useState('modulo'); // 'modulo' ou 'aluno'
  const [idModuloDestino, setIdModuloDestino] = useState('');
  const [idAlunoDestino, setIdAlunoDestino] = useState('');

  const [modulos, setModulos] = useState([]);
  const [alunos, setAlunos] = useState([]);
  const [loadingDados, setLoadingDados] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [erro, setErro] = useState('');

  // Fechar com Escape (A11y)
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Carregar opções de destinatário disponíveis
  useEffect(() => {
    if (!isOpen) return;

    async function carregarDestinatarios() {
      try {
        setLoadingDados(true);
        const [resModulos, resAlunos] = await Promise.all([
          api.get('/modulos'),
          api.get('/alunos')
        ]);
        setModulos(resModulos.data);
        setAlunos(resAlunos.data);

        if (resModulos.data.length > 0) {
          setIdModuloDestino(resModulos.data[0].id_modulo);
        }
        if (resAlunos.data.length > 0) {
          setIdAlunoDestino(resAlunos.data[0].id_aluno);
        }
      } catch (err) {
        setErro('Erro ao carregar lista de turmas e alunos.');
      } finally {
        setLoadingDados(false);
      }
    }

    carregarDestinatarios();
  }, [isOpen]);

  if (!isOpen) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    setErro('');

    const payload = {
      titulo,
      mensagem,
      id_modulo_destino: tipoDestino === 'modulo' ? Number(idModuloDestino) : null,
      id_aluno_destino: tipoDestino === 'aluno' ? Number(idAlunoDestino) : null
    };

    try {
      setIsSubmitting(true);
      const res = await criarAviso(payload);

      if (res.success) {
        setTitulo('');
        setMensagem('');
        onClose();
      } else {
        setErro(res.error || 'Falha ao emitir comunicado.');
      }
    } catch (err) {
      setErro('Erro de conexão ao servidor.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-notice-title"
    >
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden max-h-[92vh] flex flex-col transition-colors">
        <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900 flex-shrink-0">
          <div>
            <span className="text-[11px] font-semibold text-red-800 uppercase tracking-widest block mb-1">
              Novo aviso
            </span>
            <h2 id="modal-notice-title" className="text-base font-bold text-slate-900 dark:text-white">
              Publicar comunicado
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar janela"
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded hover:bg-slate-200/50 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4 stroke-[2]" />
          </button>
        </div>

        {/* Formulário com Scroll Contido */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 overflow-y-auto flex-1">
          {erro && (
            <div role="alert" className="p-3 rounded bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 text-xs text-red-700 dark:text-red-300 flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{erro}</span>
            </div>
          )}

          {/* Título */}
          <div>
            <label htmlFor="notice-title-input" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Assunto *
            </label>
            <input
              id="notice-title-input"
              type="text"
              required
              maxLength={120}
              placeholder="Exemplo: Alteração de sala"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>

          {/* Destinatários */}
          <fieldset>
            <legend className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Destinatários *
            </legend>
            <div className="grid grid-cols-2 gap-2 mb-2.5">
              <button
                type="button"
                onClick={() => setTipoDestino('modulo')}
                className={`min-h-[42px] py-2 px-3 rounded-xl text-xs font-semibold border flex items-center justify-center space-x-2 transition-all ${
                  tipoDestino === 'modulo'
                    ? 'bg-red-800 text-white border-transparent font-bold'
                    : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Módulo / Turma</span>
              </button>

              <button
                type="button"
                onClick={() => setTipoDestino('aluno')}
                className={`min-h-[42px] py-2 px-3 rounded-xl text-xs font-semibold border flex items-center justify-center space-x-2 transition-all ${
                  tipoDestino === 'aluno'
                    ? 'bg-red-800 text-white border-transparent font-bold'
                    : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Aluno Individual</span>
              </button>
            </div>

            {tipoDestino === 'modulo' ? (
              <div>
                <label htmlFor="notice-modulo-select" className="sr-only">Selecione o módulo ou turma de destino</label>
                <select
                  id="notice-modulo-select"
                  value={idModuloDestino}
                  onChange={(e) => setIdModuloDestino(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                >
                  {modulos.map((m) => (
                    <option key={m.id_modulo} value={m.id_modulo}>
                      {m.nome} ({m._count?.alunos || 0} alunos matriculados)
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div>
                <label htmlFor="notice-student-select" className="sr-only">Selecione o aluno de destino</label>
                <select
                  id="notice-student-select"
                  value={idAlunoDestino}
                  onChange={(e) => setIdAlunoDestino(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                >
                  {alunos.map((a) => (
                    <option key={a.id_aluno} value={a.id_aluno}>
                      {a.nome} | {a.modulo?.nome || 'Geral'}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </fieldset>

          {/* Mensagem */}
          <div>
            <label htmlFor="notice-message-input" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Mensagem *
            </label>
            <textarea
              id="notice-message-input"
              required
              rows={4}
              placeholder="Escreva o comunicado para os destinatários"
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-600 resize-none font-sans"
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-2 flex items-center justify-end space-x-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 rounded text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting || loadingDados}
              className="inline-flex items-center space-x-2 min-h-[42px] px-5 py-2.5 rounded-xl text-sm font-bold bg-red-700 hover:bg-red-800 text-white shadow-lg shadow-red-700/20 disabled:opacity-50 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Publicando...' : 'Publicar aviso'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
