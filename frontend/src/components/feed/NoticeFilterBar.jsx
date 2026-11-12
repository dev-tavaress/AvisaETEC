import React from 'react';
import { Search } from 'lucide-react';

export default function NoticeFilterBar({ 
  filtroAtivo, 
  setFiltroAtivo, 
  termoBusca, 
  setTermoBusca,
  totalAvisos,
  totalNaoLidos
}) {
  const filtros = [
    { id: 'todos', label: 'Todos os avisos', count: totalAvisos },
    { id: 'nao_lidos', label: 'Não Lidos', count: totalNaoLidos },
    { id: 'turma', label: 'Por turma' },
    { id: 'individual', label: 'Individuais' }
  ];

  return (
    <div className="space-y-3 mb-6">
      {/* Campo de Busca Limpo e Arquitetado */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Pesquisar por título, mensagem ou remetente..."
          value={termoBusca}
          onChange={(e) => setTermoBusca(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-600 transition-colors"
        />
      </div>

      {/* Segmented Controls / Tabs sem estética de bolha */}
      <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
        {filtros.map((f) => {
          const isActive = filtroAtivo === f.id;
          return (
            <button
              type="button"
              key={f.id}
              onClick={() => setFiltroAtivo(f.id)}
              className={              `px-3 py-2 rounded-xl text-xs font-semibold tracking-tight transition-all flex items-center space-x-1.5 ${
                isActive
                  ? 'bg-white text-slate-900 shadow-sm font-bold'
                  : 'text-slate-600 hover:text-red-800'
              }`}
            >
              <span>{f.label}</span>
              {f.count !== undefined && f.count > 0 && (
                <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                  isActive 
                    ? 'bg-red-700 text-white' 
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                }`}>
                  {f.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
