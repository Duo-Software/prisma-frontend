import { mockInstitutions } from "./instituicoes-mock";
import {Cargo} from "./cargo.ts";
import {Etnia} from "./etnia.ts";

export const mockProfissionais = [
  {
    id: 1,
    pessoa: {
      id: 101,
      nome: "João Silva",
      cpf: "123.456.789-10",
      sexo: "M",
      etnia: Etnia.BRANCA,
      dataNascimento: "1985-03-15",
      paisNaturalidade: { id: 1, nome: "Brasil" },
      ufNaturalidade: { id: 13, sigla: "MT", nome: "Mato Grosso" },
      municipioNaturalidade: { id: 142, nome: "Cuiabá", uf: "MT" },
      nomeMae: "Maria Silva",
      nomePai: "José Silva",
      endereco: "Rua das Flores, 123",
      email: "joao.silva@email.com",
      telefone: "(65) 99988-7777",
      dataCadastro: "2024-01-15T10:30:00",
      dataAlteracao: "2024-05-15T10:30:00",
      statusNecessidade: "NAO_INFORMADO"
    },
    instituicaoEnsino: mockInstitutions[0],
    cargo: Cargo.PROFESSOR,
    ativo: true,
    dataCadastro: "2024-05-15T10:30:00",
    dataAlteracao: "2024-05-15T10:30:00"
  },
  {
    id: 2,
    pessoa: {
      id: 102,
      nome: "Maria Oliveira",
      cpf: "987.654.321-00",
      sexo: "F",
      etnia: Etnia.PARDA,
      dataNascimento: "1990-05-20",
      paisNaturalidade: { id: 1, nome: "Brasil" },
      ufNaturalidade: { id: 13, sigla: "MT", nome: "Mato Grosso" },
      municipioNaturalidade: { id: 142, nome: "Cuiabá", uf: "MT" },
      nomeMae: "Ana Oliveira",
      nomePai: "Pedro Oliveira",
      endereco: "Avenida Central, 456",
      email: "maria.oliveira@email.com",
      telefone: "(65) 99977-6666",
      dataCadastro: "2024-01-10T14:20:00",
      dataAlteracao: "2024-05-12T09:15:00",
      statusNecessidade: "NAO_INFORMADO"
    },
    instituicaoEnsino: mockInstitutions[1],
    cargo: Cargo.GESTOR,
    ativo: true,
    dataCadastro: "2024-05-10T14:20:00",
    dataAlteracao: "2024-05-12T09:15:00"
  },
  {
    id: 3,
    pessoa: {
      id: 103,
      nome: "Carlos Pereira",
      email: "carlos.pereira@email.com",
      telefone: "(65) 99966-5555",
      statusNecessidade: "NAO_INFORMADO"
    },
    instituicaoEnsino: mockInstitutions[2],
    cargo: Cargo.GESTOR,
    ativo: false,
    dataCadastro: "2024-04-05T08:45:00",
    dataAlteracao: "2024-05-01T16:30:00"
  },
  {
    id: 4,
    pessoa: {
      id: 104,
      nome: "Ana Santos",
      email: "ana.santos@email.com",
      telefone: "(65) 99955-4444",
      etnia: Etnia.PARDA,
      dataNascimento: "1990-05-20",
      paisNaturalidade: { id: 1, nome: "Brasil" },
      ufNaturalidade: { id: 13, sigla: "MT", nome: "Mato Grosso" },
      municipioNaturalidade: { id: 142, nome: "Cuiabá", uf: "MT" },
      nomeMae: "Ana Oliveira",
      nomePai: "Pedro Oliveira",
      endereco: "Avenida Central, 456",
      dataCadastro: "2024-01-10T14:20:00",
      dataAlteracao: "2024-05-12T09:15:00",
      statusNecessidade: "NAO_INFORMADO"
    },
    instituicaoEnsino: mockInstitutions[0],
    cargo: Cargo.PROFESSOR,
    ativo: true,
    dataCadastro: "2024-05-18T11:10:00",
    dataAlteracao: "2024-05-18T11:10:00"
  },
  {
    id: 5,
    pessoa: {
      id: 105,
      nome: "Roberto Almeida",
      email: "roberto.almeida@email.com",
      telefone: "(65) 99944-3333",
      statusNecessidade: "NAO_INFORMADO"
    },
    instituicaoEnsino: mockInstitutions[3],
    cargo: Cargo.PROFESSOR,
    ativo: true,
    dataCadastro: "2024-05-02T13:25:00",
    dataAlteracao: "2024-05-02T13:25:00"
  },
  {
    id: 6,
    pessoa: {
      id: 106,
      nome: "Patrícia Lima",
      email: "patricia.lima@email.com",
      telefone: "(65) 99933-2222",
      statusNecessidade: "NAO_INFORMADO"
    },
    instituicaoEnsino: mockInstitutions[1],
    cargo: Cargo.PROFESSOR,
    ativo: true,
    dataCadastro: "2024-04-20T09:50:00",
    dataAlteracao: "2024-05-05T14:40:00"
  },
  {
    id: 7,
    pessoa: {
      id: 107,
      nome: "Lucas Ferreira",
      email: "lucas.ferreira@email.com",
      telefone: "(65) 99922-1111",
      statusNecessidade: "NAO_INFORMADO"
    },
    instituicaoEnsino: mockInstitutions[4],
    cargo: Cargo.PROFESSOR,
    ativo: false,
    dataCadastro: "2024-03-15T15:35:00",
    dataAlteracao: "2024-04-10T10:20:00"
  },
  {
    id: 8,
    pessoa: {
      id: 108,
      nome: "Juliana Costa",
      email: "juliana.costa@email.com",
      telefone: "(65) 99911-0000",
      statusNecessidade: "NAO_INFORMADO"
    },
    instituicaoEnsino: mockInstitutions[2],
    cargo: Cargo.PROFESSOR,
    ativo: true,
    dataCadastro: "2024-05-08T10:15:00",
    dataAlteracao: "2024-05-08T10:15:00"
  },
  {
    id: 9,
    pessoa: {
      id: 109,
      nome: "Fernando Souza",
      email: "fernando.souza@email.com",
      telefone: "(65) 99900-9999",
      statusNecessidade: "NAO_INFORMADO"
    },
    instituicaoEnsino: mockInstitutions[5],
    cargo: Cargo.GESTOR,
    ativo: true,
    dataCadastro: "2024-04-25T14:05:00",
    dataAlteracao: "2024-05-03T09:30:00"
  },
  {
    id: 10,
    pessoa: {
      id: 110,
      nome: "Mariana Vieira",
      email: "mariana.vieira@email.com",
      telefone: "(65) 99888-8888",
      statusNecessidade: "NAO_INFORMADO"
    },
    instituicaoEnsino: mockInstitutions[0],
    cargo: Cargo.PROFESSOR,
    ativo: true,
    dataCadastro: "2024-05-12T16:45:00",
    dataAlteracao: "2024-05-12T16:45:00"
  }
];
