import axios from 'axios';
import type {Formulario} from "../types/formulario.ts";

export const buscarFormularios = async (): Promise<Formulario[]> => {
  try {
    const response = await axios.get<Formulario[]>(`${API_URL}/formularios`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar formulários:', error);
    throw error;
  }
}


const API_URL = import.meta.env.VITE_API_URL;

// Buscar todos os formulários
export const buscarTodosFormularios = async (): Promise<Formulario[]> => {
  try {
    const response = await axios.get<Formulario[]>(`${API_URL}/formularios`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar formulários:', error);
    throw error;
  }
};

// Buscar formulário por ID
export const buscarFormularioPorId = async (id: number): Promise<Formulario> => {
  try {
    const response = await axios.get<Formulario>(`${API_URL}/formularios/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar formulário com ID ${id}:`, error);
    throw error;
  }
};

