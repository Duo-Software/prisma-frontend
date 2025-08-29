import axios from 'axios';

export interface Instituicao {
  id: number;
  nome: string;
  sigla: string;
  tipoInstituicaoEnsino: string;
  municipio: {
    id: number;
    nome: string;
    unidadeFederativa: {
      id: number;
      nome: string;
      sigla: string;
    }
  };
  ativo: boolean;
}

type InstituicaoCreate = Omit<Instituicao, 'id'> & { id?: null };

const API_URL = import.meta.env.VITE_API_URL;

// Função para buscar todas as instituições de ensino
export const buscarInstituicoes = async (): Promise<Instituicao[]> => {
  try {
    const response = await axios.get<Instituicao[]>(`${API_URL}/instituicoes-ensino`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar instituições:', error);
    throw error;
  }
};

// Função para buscar uma instituição específica por ID
export const buscarInstituicaoPorId = async (id: number): Promise<Instituicao> => {
  try {
    const response = await axios.get<Instituicao>(`${API_URL}/instituicoes-ensino/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar instituição com ID ${id}:`, error);
    throw error;
  }
};

// Função para criar uma nova instituição
export const criarInstituicao = async (instituicao: InstituicaoCreate): Promise<Instituicao> => {
  try {
    const response = await axios.post<Instituicao>(`${API_URL}/instituicoes-ensino`, instituicao);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar instituição:', error);
    throw error;
  }
};

// Função para atualizar uma instituição existente
export const atualizarInstituicao = async (id: number, instituicao: Partial<Instituicao>): Promise<Instituicao> => {
  try {
    const response = await axios.put<Instituicao>(`${API_URL}/instituicoes-ensino/${id}`, instituicao);
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar instituição com ID ${id}:`, error);
    throw error;
  }
};

// Função para excluir uma instituição
export const excluirInstituicao = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/instituicoes-ensino/${id}`);
  } catch (error) {
    console.error(`Erro ao excluir instituição com ID ${id}:`, error);
    throw error;
  }
};

// Função para buscar instituições por nome (para autocomplete)
export const buscarInstituicoesPorNome = async (nome: string): Promise<Instituicao[]> => {
  try {
    const response = await axios.get<Instituicao[]>(`${API_URL}/instituicoes-ensino`, {
      params: { nome }
    });
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar instituições com nome contendo "${nome}":`, error);
    throw error;
  }
};
