export interface Cliente {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  telefone?: string;
  endereco?: string;
  cep?: string;
  logradouro?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  localidade?: string;
  uf?: string;
  estado?: string;
  observacoes?: string;
}