import { StatusAluno } from "./status-aluno";
import type {Aluno} from "../types/aluno";

export const mockAlunos: Aluno[] = [
  {
    id: 1,
    pessoa: {
      id: "101",
      nome: "Ana Paula Souza",
      cpf: "123.456.789-01",
      sexo: "F",
      etnia: "BRANCA",
      dataNascimento: "2000-05-15",
      paisNaturalidade: { id: "1", nome: "Brasil" },
      ufNaturalidade: { id: "25", sigla: "SP", nome: "São Paulo" },
      municipioNaturalidade: { id: "3550308", nome: "São Paulo", uf: "SP" },
      nomeMae: "Maria Souza",
      nomePai: "José Souza",
      endereco: "Rua A, 123, São Paulo/SP",
      email: "ana.souza@exemplo.com",
      telefone: "(11) 99999-1111",
      dataCadastro: "2023-01-15T14:30:00",
      dataAlteracao: "2023-01-15T14:30:00"
    },
    instituicaoEnsino: {
      id: 42,
      nome: "Universidade Federal de São Paulo",
      sigla: "UNIFESP",
      tipoInstituicaoEnsino: "PUBLICA_FEDERAL",
      municipio: {
        id: 3550308,
        nome: "São Paulo",
        codigoIbge: 3550308,
        unidadeFederativa: {
          id: 25,
          nome: "São Paulo",
          sigla: "SP",
          pais: {
            id: 1,
            nome: "Brasil",
            sigla: "BR"
          }
        }
      },
      ativo: true
    },
    status: StatusAluno.MATRICULADO,
    dataIngresso: "2022-02-01T08:00:00",
    dataEgresso: undefined,
    dataCadastro: "2022-01-10T14:25:00",
    dataAlteracao: "2022-01-15T09:30:00",
    matricula: '2022000001'
  },
  {
    id: 2,
    pessoa: {
      id: "102",
      nome: "Bruno Henrique Lima",
      cpf: "987.654.321-01",
      sexo: "M",
      etnia: "PARDA",
      dataNascimento: "1999-08-20",
      paisNaturalidade: { id: "1", nome: "Brasil" },
      ufNaturalidade: { id: "33", sigla: "RJ", nome: "Rio de Janeiro" },
      municipioNaturalidade: { id: "3304557", nome: "Rio de Janeiro", uf: "RJ" },
      nomeMae: "Juliana Lima",
      nomePai: "Roberto Lima",
      endereco: "Av. B, 456, Rio de Janeiro/RJ",
      email: "bruno.lima@exemplo.com",
      telefone: "(21) 99999-2222",
      dataCadastro: "2023-01-16T10:45:00",
      dataAlteracao: "2023-01-16T10:45:00"
    },
    instituicaoEnsino: {
      id: 43,
      nome: "Universidade Federal do Rio de Janeiro",
      sigla: "UFRJ",
      tipoInstituicaoEnsino: "PUBLICA_FEDERAL",
      municipio: {
        id: 3304557,
        nome: "Rio de Janeiro",
        codigoIbge: 3304557,
        unidadeFederativa: {
          id: 33,
          nome: "Rio de Janeiro",
          sigla: "RJ",
          pais: {
            id: 1,
            nome: "Brasil",
            sigla: "BR"
          }
        }
      },
      ativo: true
    },
    status: StatusAluno.MATRICULADO,
    dataIngresso: "2022-02-01T08:00:00",
    dataEgresso: undefined,
    dataCadastro: "2022-01-12T11:30:00",
    dataAlteracao: "2022-01-18T14:20:00",
    matricula: '2022000002'
  },
  {
    id: 3,
    pessoa: {
      id: "103",
      nome: "Carla Mendes",
      cpf: "111.222.333-44",
      sexo: "F",
      etnia: "NEGRA",
      dataNascimento: "2001-03-10",
      paisNaturalidade: { id: "1", nome: "Brasil" },
      ufNaturalidade: { id: "31", sigla: "MG", nome: "Minas Gerais" },
      municipioNaturalidade: { id: "3106200", nome: "Belo Horizonte", uf: "MG" },
      nomeMae: "Sandra Mendes",
      nomePai: "Carlos Mendes",
      endereco: "Rua C, 789, Belo Horizonte/MG",
      email: "carla.mendes@exemplo.com",
      telefone: "(31) 99999-3333",
      dataCadastro: "2023-01-17T09:15:00",
      dataAlteracao: "2023-01-17T09:15:00"
    },
    instituicaoEnsino: {
      id: 44,
      nome: "Universidade Federal de Minas Gerais",
      sigla: "UFMG",
      tipoInstituicaoEnsino: "PUBLICA_FEDERAL",
      municipio: {
        id: 3106200,
        nome: "Belo Horizonte",
        codigoIbge: 3106200,
        unidadeFederativa: {
          id: 31,
          nome: "Minas Gerais",
          sigla: "MG",
          pais: {
            id: 1,
            nome: "Brasil",
            sigla: "BR"
          }
        }
      },
      ativo: true
    },
    status: StatusAluno.TRANCADO,
    dataIngresso: "2022-02-01T08:00:00",
    dataEgresso: undefined,
    dataCadastro: "2022-01-14T16:40:00",
    dataAlteracao: "2022-03-22T10:15:00",
    matricula: '2022000003'
  },
  {
    id: 4,
    pessoa: {
      id: "104",
      nome: "Diego Farias",
      cpf: "444.555.666-77",
      sexo: "M",
      etnia: "BRANCA",
      dataNascimento: "1998-12-05",
      paisNaturalidade: { id: "1", nome: "Brasil" },
      ufNaturalidade: { id: "41", sigla: "PR", nome: "Paraná" },
      municipioNaturalidade: { id: "4106902", nome: "Curitiba", uf: "PR" },
      nomeMae: "Marcia Farias",
      nomePai: "Paulo Farias",
      endereco: "Av. D, 1011, Curitiba/PR",
      email: "diego.farias@exemplo.com",
      telefone: "(41) 99999-4444",
      dataCadastro: "2023-01-18T11:20:00",
      dataAlteracao: "2023-01-18T11:20:00"
    },
    instituicaoEnsino: {
      id: 45,
      nome: "Universidade Federal do Paraná",
      sigla: "UFPR",
      tipoInstituicaoEnsino: "PUBLICA_FEDERAL",
      municipio: {
        id: 4106902,
        nome: "Curitiba",
        codigoIbge: 4106902,
        unidadeFederativa: {
          id: 41,
          nome: "Paraná",
          sigla: "PR",
          pais: {
            id: 1,
            nome: "Brasil",
            sigla: "BR"
          }
        }
      },
      ativo: true
    },
    status: StatusAluno.MATRICULADO,
    dataIngresso: "2022-02-01T08:00:00",
    dataEgresso: undefined,
    dataCadastro: "2022-01-18T09:30:00",
    dataAlteracao: "2022-01-20T14:10:00",
    matricula: '2022000004'
  },
  {
    id: 5,
    pessoa: {
      id: "105",
      nome: "Eduarda Silva",
      cpf: "777.888.999-00",
      sexo: "F",
      etnia: "INDIGENA",
      dataNascimento: "2000-07-22",
      paisNaturalidade: { id: "1", nome: "Brasil" },
      ufNaturalidade: { id: "29", sigla: "BA", nome: "Bahia" },
      municipioNaturalidade: { id: "2927408", nome: "Salvador", uf: "BA" },
      nomeMae: "Regina Silva",
      nomePai: "Fernando Silva",
      endereco: "Rua E, 1213, Salvador/BA",
      email: "eduarda.silva@exemplo.com",
      telefone: "(71) 99999-5555",
      dataCadastro: "2023-01-19T13:40:00",
      dataAlteracao: "2023-01-19T13:40:00"
    },
    instituicaoEnsino: {
      id: 46,
      nome: "Universidade Federal da Bahia",
      sigla: "UFBA",
      tipoInstituicaoEnsino: "PUBLICA_FEDERAL",
      municipio: {
        id: 2927408,
        nome: "Salvador",
        codigoIbge: 2927408,
        unidadeFederativa: {
          id: 29,
          nome: "Bahia",
          sigla: "BA",
          pais: {
            id: 1,
            nome: "Brasil",
            sigla: "BR"
          }
        }
      },
      ativo: true
    },
    status: StatusAluno.FORMADO,
    dataIngresso: "2021-02-01T08:00:00",
    dataEgresso: "2023-12-20T10:00:00",
    dataCadastro: "2021-01-10T11:25:00",
    dataAlteracao: "2023-12-20T10:00:00",
    matricula: '2021000005'
  }
];