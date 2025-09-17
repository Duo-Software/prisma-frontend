import type {Aluno, AlunoFilter} from "../types/aluno";
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Função para buscar aluno pelo CPF da pessoa
export const buscarAlunoPorCpf = async (cpf: string): Promise<{ encontrado: boolean; aluno?: Aluno }> => {
  try {
    const response = await axios.get(`${API_URL}/alunos/cpf/${cpf}`);
    return {
      encontrado: true,
      aluno: response.data
    };
  } catch (error: any) {
    if (error.response?.status === 404) {
      return {
        encontrado: false
      };
    }
    throw error;
  }
};

// Função para formatar CPF com máscara
export const formatarCpf = (cpf: string): string => {
  const cpfLimpo = cpf.replace(/\D/g, '');

  if (cpfLimpo.length <= 3) {
    return cpfLimpo;
  }

  if (cpfLimpo.length <= 6) {
    return `${cpfLimpo.slice(0, 3)}.${cpfLimpo.slice(3)}`;
  }

  if (cpfLimpo.length <= 9) {
    return `${cpfLimpo.slice(0, 3)}.${cpfLimpo.slice(3, 6)}.${cpfLimpo.slice(6)}`;
  }

  return `${cpfLimpo.slice(0, 3)}.${cpfLimpo.slice(3, 6)}.${cpfLimpo.slice(6, 9)}-${cpfLimpo.slice(9, 11)}`;
};

// Função para criar ou atualizar aluno
export const salvarAluno = async (aluno: Aluno): Promise<Aluno> => {
  console.log(aluno);
  if (aluno.id) {
    // Atualização
    const response = await axios.put(`${API_URL}/alunos/${aluno.id}`, aluno);
    return response.data;
  } else {
    // Criação
    const response = await axios.post(`${API_URL}/alunos`, {
      ...aluno,
      dataCadastro: new Date().toISOString(),
      dataAlteracao: new Date().toISOString()
    });
    return response.data;
  }
};

// Função para listar todos os alunos
export const listarTodos = async (): Promise<Aluno[]> => {
  const response = await axios.get(`${API_URL}/alunos`);
  return response.data;
};

export const listarByFilter = async (instituicaoId: number | undefined): Promise<Aluno[]> => {
  const alunoFilter: AlunoFilter = {
    instituicaoEnsino: instituicaoId,
    status: undefined
  };
  const response = await axios.post(`${API_URL}/alunos/filter`, alunoFilter);
  return response.data;
};
