import axios from 'axios';
import type {Avaliacao, AvaliacaoPayload} from "../types/avaliacao.ts";

const API_URL = import.meta.env.VITE_API_URL;

// POST /avaliacoes
export const criarAvaliacao = async (payload: AvaliacaoPayload): Promise<any> => {
  try {
    const response = await axios.post(`${API_URL}/avaliacoes`, payload);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar avaliação:', error);
    throw error;
  }
};

// GET /avaliacoes/{id}
export const buscarAvaliacaoPorId = async (id: number): Promise<Avaliacao> => {
  try {
    const response = await axios.get<Avaliacao>(`${API_URL}/avaliacoes/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar avaliação com ID ${id}:`, error);
    throw error;
  }
};

