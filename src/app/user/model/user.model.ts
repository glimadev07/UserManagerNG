export interface User {
  id: number;
  nome: string;
  username: string;
  email: string;
  senha: string;
  dataCriacao: Date;
  ativo: boolean;
  telefone: string;
  endereco: string;
  isMaster: boolean;
}
