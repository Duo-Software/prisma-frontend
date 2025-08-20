import type {Pessoa} from "../services/pessoaService";
import { StatusAluno } from "../mocks/status-aluno";

export interface Aluno {
  id: number;
  matricula?: string;
  pessoa: Pessoa;
  instituicaoEnsino: {
    id: number | string;
    nome: string;
    sigla: string;
    tipoInstituicaoEnsino: string;
    municipio: {
      id: number | string;
      nome: string;
      codigoIbge: number;
      unidadeFederativa: {
        id: number | string;
        nome: string;
        sigla: string;
        pais: {
          id: number | string;
          nome: string;
          sigla: string;
        };
      };
    };
    ativo: boolean;
  };
  status: StatusAluno;
  dataIngresso: string;
  dataEgresso?: string;
  dataCadastro: string;
  dataAlteracao: string;
}

export interface AlunoFilter {
    pessoaNome?: string;
    cpf?: number;
    instituicaoEnsino?: number;
    status?: StatusAluno;
}
