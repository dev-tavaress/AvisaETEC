/**
 * Mock Estruturado do Calendário Acadêmico (RF05)
 * Cobre o calendário semestral padrão das ETECs (dias letivos, feriados, conselhos e eventos)
 */
export const TIPOS_EVENTO = {
  LETIVO: { label: 'Dia Letivo', color: 'bg-emerald-500 text-white dark:bg-emerald-600' },
  FERIADO: { label: 'Feriado / Recesso', color: 'bg-red-500 text-white dark:bg-red-600' },
  CONSELHO: { label: 'Conselho de Classe', color: 'bg-amber-500 text-white dark:bg-amber-600' },
  EVENTO: { label: 'Evento / Feira Tecnológica', color: 'bg-blue-500 text-white dark:bg-blue-600' }
};

export const ACADEMIC_EVENTS = [
  {
    id: 'evt-01',
    titulo: 'Início do 2º Semestre Letivo',
    data: '2026-08-03',
    tipo: 'LETIVO',
    horario: '13:30 - 22:30',
    local: 'Salas de Aula e Laboratórios',
    descricao: 'Acolhimento dos discentes veteranos e calouros com apresentação das normas e corpo docente.'
  },
  {
    id: 'evt-02',
    titulo: 'Feriado da Revolução Constitucionalista',
    data: '2026-07-09',
    tipo: 'FERIADO',
    horario: 'Dia todo',
    local: 'Geral',
    descricao: 'Feriado Estadual em comemoração à Revolução Constitucionalista de 1932. Sem atividades letivas.'
  },
  {
    id: 'evt-03',
    titulo: 'Independência do Brasil',
    data: '2026-09-07',
    tipo: 'FERIADO',
    horario: 'Dia todo',
    local: 'Geral',
    descricao: 'Feriado Nacional. Não haverá expediente na unidade escolar.'
  },
  {
    id: 'evt-04',
    titulo: 'Conselho de Classe Intermediário',
    data: '2026-10-08',
    tipo: 'CONSELHO',
    horario: '08:00 - 12:00',
    local: 'Sala dos Professores',
    descricao: 'Reunião pedagógica dos docentes e coordenação para avaliação de desempenho discente do 1º bimestre.'
  },
  {
    id: 'evt-05',
    titulo: 'Nossa Senhora Aparecida / Dia das Crianças',
    data: '2026-10-12',
    tipo: 'FERIADO',
    horario: 'Dia todo',
    local: 'Geral',
    descricao: 'Feriado Nacional.'
  },
  {
    id: 'evt-06',
    titulo: 'Dia do Professor e Funcionário Público',
    data: '2026-10-15',
    tipo: 'FERIADO',
    horario: 'Dia todo',
    local: 'Geral',
    descricao: 'Comemoração do Dia do Professor. Não haverá aulas presenciais.'
  },
  {
    id: 'evt-07',
    titulo: 'Finados',
    data: '2026-11-02',
    tipo: 'FERIADO',
    horario: 'Dia todo',
    local: 'Geral',
    descricao: 'Feriado Nacional.'
  },
  {
    id: 'evt-08',
    titulo: 'Proclamação da República',
    data: '2026-11-15',
    tipo: 'FERIADO',
    horario: 'Dia todo',
    local: 'Geral',
    descricao: 'Feriado Nacional.'
  },
  {
    id: 'evt-09',
    titulo: 'FETEPS, Feira Tecnológica do Centro Paula Souza',
    data: '2026-11-19',
    tipo: 'EVENTO',
    horario: '09:00 - 18:00',
    local: 'Pátio Central e Auditório',
    descricao: 'Exposição dos melhores projetos de inovação tecnológica e Trabalhos de Conclusão de Curso (TCC).'
  },
  {
    id: 'evt-10',
    titulo: 'Dia Nacional da Consciência Negra',
    data: '2026-11-20',
    tipo: 'FERIADO',
    horario: 'Dia todo',
    local: 'Geral',
    descricao: 'Feriado Nacional. Reflexão e celebração da cultura afro-brasileira.'
  },
  {
    id: 'evt-11',
    titulo: 'Bancas de Apresentação de TCC',
    data: '2026-12-04',
    tipo: 'EVENTO',
    horario: '14:00 - 21:00',
    local: 'Laboratórios de Informática',
    descricao: 'Apresentação formal dos projetos finais perante a banca examinadora composta por professores.'
  },
  {
    id: 'evt-12',
    titulo: 'Conselho de Classe Final',
    data: '2026-12-11',
    tipo: 'CONSELHO',
    horario: '08:30 - 13:00',
    local: 'Sala de Reuniões',
    descricao: 'Fechamento de menções, notas e atas de conclusão do semestre letivo.'
  },
  {
    id: 'evt-13',
    titulo: 'Término do Semestre Letivo',
    data: '2026-12-18',
    tipo: 'LETIVO',
    horario: '19:00',
    local: 'Auditório',
    descricao: 'Encerramento oficial das atividades escolares e início do recesso discente.'
  }
];
