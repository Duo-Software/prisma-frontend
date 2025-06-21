import type {Pessoa} from "../services/pessoaService";
import { StatusAluno } from "../mocks/status-aluno";

export interface Aluno {
  id: number;
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
  dataEgresso: string | null;
  dataCadastro: string;
  dataAlteracao: string;
}
