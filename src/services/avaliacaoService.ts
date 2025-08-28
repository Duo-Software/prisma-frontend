import axios from 'axios';
import type {AvaliacaoPayload} from "../types/avaliacao.ts";
import type {Avaliacao} from "../types/formulario.ts";

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

// /api/avaliacoes/filter?idFormulario=1&idAluno=1&profissionalAvaliador=1
export const buscarAvaliacoesPorFiltros = async (
    idFormulario?: number, idInstituicao?: number, idAluno?: number): Promise<Avaliacao[]> => {
  try {
    const params: Record<string, number | undefined> = {};
    if (idAluno !== undefined && idAluno > 0) params.idAluno = idAluno;
    else if (idInstituicao !== undefined && idInstituicao > 0) params.idInstituicao = idInstituicao;
    else if (idFormulario !== undefined && idFormulario > 0) params.idFormulario = idFormulario;

    const response = await axios.get<Avaliacao[]>(`${API_URL}/avaliacoes/filter`, { params });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar avaliacoes por filtros:', error);
    throw error;
  }
};


