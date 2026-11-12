import React, { useState, useMemo, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  CalendarDays, 
  Clock, 
  MapPin, 
  X
} from 'lucide-react';
import { ACADEMIC_EVENTS, TIPOS_EVENTO } from '../data/academicEventsMock';

export default function CalendarPage() {
  const [dataAtual, setDataAtual] = useState(new Date(2026, 10, 1)); // Novembro 2026
  const [eventoSelecionado, setEventoSelecionado] = useState(null);

  const ano = dataAtual.getFullYear();
  const mes = dataAtual.getMonth();

  const nomeMesAno = dataAtual.toLocaleDateString('pt-BR', {
    month: 'long',
    year: 'numeric'
  });

  // Fechar modal com Escape
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && eventoSelecionado) {
        setEventoSelecionado(null);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [eventoSelecionado]);

  function mesAnterior() {
    setDataAtual(new Date(ano, mes - 1, 1));
  }

  function proximoMes() {
    setDataAtual(new Date(ano, mes + 1, 1));
  }

  function mesAtual() {
    setDataAtual(new Date(2026, 10, 1));
  }

  const diasDaGrade = useMemo(() => {
    const primeiroDiaSemana = new Date(ano, mes, 1).getDay();
    const totalDiasMes = new Date(ano, mes + 1, 0).getDate();

    const dias = [];

    for (let i = 0; i < primeiroDiaSemana; i++) {
      dias.push({ dia: null, dataIso: null });
    }

    for (let d = 1; d <= totalDiasMes; d++) {
      const mesStr = String(mes + 1).padStart(2, '0');
      const diaStr = String(d).padStart(2, '0');
      const dataIso = `${ano}-${mesStr}-${diaStr}`;
      const eventosDoDia = ACADEMIC_EVENTS.filter((evt) => evt.data === dataIso);

      dias.push({
        dia: d,
        dataIso,
        eventos: eventosDoDia
      });
    }

    return dias;
  }, [ano, mes]);

  const proximosEventos = useMemo(() => {
    return [...ACADEMIC_EVENTS].sort((a, b) => a.data.localeCompare(b.data));
  }, []);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <span className="text-[11px] font-semibold text-red-800 uppercase tracking-widest block mb-2">
            Organização do ano letivo
          </span>
          <h1 className="page-heading text-2xl sm:text-3xl font-bold text-slate-900">
            Calendário Escolar
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Dias letivos, feriados e eventos da escola
          </p>
        </div>

        {/* Controles de Mês */}
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={mesAtual}
            className="px-3 py-1.5 rounded text-xs font-semibold border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Mês Atual
          </button>
          <div className="flex items-center bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded">
            <button
              type="button"
              onClick={mesAnterior}
              aria-label="Mês anterior"
              className="p-1.5 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <ChevronLeft className="w-4 h-4 stroke-[2]" />
            </button>
            <span className="px-3 text-xs font-semibold text-slate-900 dark:text-white capitalize min-w-[130px] text-center">
              {nomeMesAno}
            </span>
            <button
              type="button"
              onClick={proximoMes}
              aria-label="Próximo mês"
              className="p-1.5 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <ChevronRight className="w-4 h-4 stroke-[2]" />
            </button>
          </div>
        </div>
      </div>

      {/* Legenda de Categorias */}
      <div className="flex flex-wrap items-center gap-3 p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md text-xs">
        <span className="font-semibold text-slate-500 uppercase text-[10px]">Legenda</span>
        {Object.entries(TIPOS_EVENTO).map(([chave, info]) => (
          <div key={chave} className="flex items-center space-x-1.5">
            <span className={`w-2 h-2 rounded-full ${info.color.split(' ')[0]}`} />
            <span className="text-slate-700 dark:text-slate-300 text-[11px] font-semibold">{info.label}</span>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden shadow-sm">
        {/* Cabeçalho dos Dias da Semana */}
        <div className="grid grid-cols-7 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/70 text-center text-[11px] font-semibold text-slate-500 py-2">
          <span>DOM</span>
          <span>SEG</span>
          <span>TER</span>
          <span>QUA</span>
          <span>QUI</span>
          <span>SEX</span>
          <span>SÁB</span>
        </div>

        {/* Células */}
        <div className="grid grid-cols-7 divide-x divide-y divide-slate-100 dark:divide-slate-800/80">
          {diasDaGrade.map((item, idx) => {
            if (!item.dia) {
              return (
                <div
                  key={`vazio-${idx}`}
                  className="min-h-[75px] sm:min-h-[90px] bg-slate-50/40 dark:bg-slate-950/20"
                />
              );
            }

            const temEventos = item.eventos && item.eventos.length > 0;

            if (temEventos) {
              return (
                <button
                  type="button"
                  key={item.dataIso}
                  onClick={() => setEventoSelecionado(item.eventos[0])}
                  aria-label={`Dia ${item.dia}, ${item.eventos.length} evento(s): ${item.eventos.map((e) => e.titulo).join(', ')}`}
                  className="min-h-[75px] sm:min-h-[90px] p-2 text-left transition-colors flex flex-col justify-between bg-red-50/20 dark:bg-red-950/10 hover:bg-red-50/40 dark:hover:bg-red-950/20 focus:outline-none focus:ring-1 focus:ring-red-600"
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-xs font-bold text-red-700 dark:text-red-400">
                      {item.dia}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                  </div>

                  <div className="space-y-1 mt-1 w-full">
                    {item.eventos.map((evt) => {
                      const tipoInfo = TIPOS_EVENTO[evt.tipo] || TIPOS_EVENTO.EVENTO;
                      return (
                        <div
                          key={evt.id}
                          className={`px-1.5 py-0.5 rounded text-[10px] font-semibold truncate ${tipoInfo.color}`}
                        >
                          {evt.titulo}
                        </div>
                      );
                    })}
                  </div>
                </button>
              );
            }

            return (
              <div
                key={item.dataIso}
                className="min-h-[75px] sm:min-h-[90px] p-2 flex flex-col justify-between bg-white dark:bg-slate-900"
              >
                <span className="text-xs text-slate-500">
                  {item.dia}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lista de Eventos Semestrais */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-5">
        <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2 mb-3">
          <CalendarDays className="w-4 h-4 text-red-700 stroke-[2]" />
          <span>Agenda Completa do Semestre</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {proximosEventos.map((evt) => {
            const tipoInfo = TIPOS_EVENTO[evt.tipo] || TIPOS_EVENTO.EVENTO;
            const dataObj = new Date(evt.data + 'T00:00:00');

            return (
              <button
                type="button"
                key={evt.id}
                onClick={() => setEventoSelecionado(evt)}
                aria-label={`Ver detalhes do evento: ${evt.titulo}`}
                className="p-3 rounded border border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 bg-slate-50/50 dark:bg-slate-950/40 text-left flex items-start space-x-3 transition-colors focus:outline-none focus:border-slate-900"
              >
                <div className={`px-2 py-1 rounded text-center flex-shrink-0 font-mono ${tipoInfo.color}`}>
                  <span className="block text-sm font-bold leading-none">
                    {dataObj.getDate()}
                  </span>
                  <span className="block text-[8px] uppercase font-bold tracking-tight mt-0.5">
                    {dataObj.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '')}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {evt.titulo}
                  </h3>
                  <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                    {evt.descricao}
                  </p>
                  <div className="flex items-center space-x-3 text-[10px] text-slate-400 mt-1">
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{evt.horario}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3" />
                      <span>{evt.local}</span>
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Modal de Detalhe do Evento */}
      {eventoSelecionado && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="calendar-modal-title"
        >
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-lg shadow-xl border border-slate-200 dark:border-slate-800 p-5 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className={`inline-block px-2 py-0.5 rounded font-mono text-[10px] font-bold uppercase mb-1.5 ${
                  TIPOS_EVENTO[eventoSelecionado.tipo]?.color || 'bg-slate-500 text-white'
                }`}>
                  {TIPOS_EVENTO[eventoSelecionado.tipo]?.label || 'Evento'}
                </span>
                <h3 id="calendar-modal-title" className="text-base font-bold text-slate-900 dark:text-white">
                  {eventoSelecionado.titulo}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEventoSelecionado(null)}
                aria-label="Fechar detalhes do evento"
                className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {eventoSelecionado.descricao}
            </p>

            <div className="p-3 rounded bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1.5 font-mono text-xs">
              <div className="flex items-center space-x-2 text-slate-700 dark:text-slate-300">
                <CalendarDays className="w-3.5 h-3.5 text-red-700" />
                <span className="font-bold">DATA:</span>
                <span>
                  {new Date(eventoSelecionado.data + 'T00:00:00').toLocaleDateString('pt-BR', {
                    weekday: 'short',
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric'
                  })}
                </span>
              </div>

              <div className="flex items-center space-x-2 text-slate-700 dark:text-slate-300">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                <span className="font-bold">HORÁRIO:</span>
                <span>{eventoSelecionado.horario}</span>
              </div>

              <div className="flex items-center space-x-2 text-slate-700 dark:text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                <span className="font-bold">LOCAL:</span>
                <span>{eventoSelecionado.local}</span>
              </div>
            </div>

            <div className="pt-1 text-right">
              <button
                type="button"
                onClick={() => setEventoSelecionado(null)}
                className="px-3.5 py-1.5 rounded text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
