import axios from "axios";
import type {Instituicao} from "./instituicaoService.ts";
import type {Profissional} from "./profissionalService.ts";

// DTO conforme backend
export interface Turma {
    id: number | undefined;
    codigoTurma: string;
    descricao: string;
    turno: string;
    serie: string;
    anoTurma: number;
    instituicaoEnsino: Instituicao | undefined;
    profissional: Profissional | undefined;
    ativo: boolean;
}

// Type para criação/edição sem ID
export type TurmaCreate = Omit<Turma, 'id'> & { id?: null };

// URL base
const API_URL = import.meta.env.VITE_API_URL;

// Buscar todas as turmas
export const buscarTurmas = async (): Promise<Turma[]> => {
    try {
        const response = await axios.get<Turma[]>(`${API_URL}/turmas`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar turmas:", error);
        throw error;
    }
};

// Buscar turma por ID
export const buscarTurmaPorId = async (id: number): Promise<Turma> => {
    try {
        const response = await axios.get<Turma>(`${API_URL}/turmas/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Erro ao buscar turma com id ${id}:`, error);
        throw error;
    }
};

// Criar nova turma
export const criarTurma = async (turma: TurmaCreate): Promise<Turma> => {
    try {
        const response = await axios.post<Turma>(`${API_URL}/turmas`, turma);
        return response.data;
    } catch (error) {
        console.error("Erro ao criar turma:", error);
        throw error;
    }
};

// Atualizar turma
export const atualizarTurma = async (id: number | undefined, turma: Partial<Turma>): Promise<Turma> => {
    try {
        const response = await axios.put<Turma>(`${API_URL}/turmas/${id}`, turma);
        return response.data;
    } catch (error) {
        console.error(`Erro ao atualizar turma ${id}:`, error);
        throw error;
    }
};

// Excluir turma
export const excluirTurma = async (id: number): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/turmas/${id}`);
    } catch (error) {
        console.error(`Erro ao excluir turma ${id}:`, error);
        throw error;
    }
};

// Buscar turmas pelo código ou descrição (exemplo para autocomplete, se implementado)
export const buscarTurmasPorCodigoOuDescricao = async (query: string): Promise<Turma[]> => {
    try {
        const response = await axios.get<Turma[]>(`${API_URL}/turmas`, {
            params: { buscar: query }
        });
        return response.data;
    } catch (error) {
        console.error(`Erro ao buscar turmas por texto "${query}":`, error);
        throw error;
    }
};