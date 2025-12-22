 export interface Atendimento {
  id: number;
  cliente_id: number;
  data_hora_inicio: string;
  data_hora_fim: string;
  tipo_servico: string;
  duracao: string;
  resumo: string;
  observacoes: string;
  intervencoes: string;
  recomendacoes: string;
  status: string;
}