import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// GET /diagnosticos/pessoa/{idPessoa}
export const buscarDiagnosticoPorPessoa = async (idPessoa: number | string): Promise<any[]> => {
  try {
    const response = await axios.get(`${API_URL}/diagnosticos/pessoa/${idPessoa}`);
    // Garante que o retorno seja sempre um array
    return Array.isArray(response.data) ? response.data : [response.data].filter(Boolean);
  } catch (error) {
    console.error(`Erro ao buscar diagnósticos da pessoa com ID ${idPessoa}:`, error);
    throw error;
  }
};

// PUT /diagnosticos/{idDiagnosticoPessoa}
export const atualizarDiagnostico = async (idDiagnosticoPessoa: number | undefined, diagnostico: any): Promise<any> => {
  try {
    const response = await axios.put(`${API_URL}/diagnosticos/${idDiagnosticoPessoa}`, diagnostico);
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar diagnóstico com ID ${idDiagnosticoPessoa}:`, error);
    throw error;
  }
};

// POST /diagnosticos
export const cadastrarDiagnostico = async (diagnostico: any): Promise<any> => {
  try {
    const response = await axios.post(`${API_URL}/diagnosticos`, diagnostico);
    return response.data;
  } catch (error) {
    console.error('Erro ao cadastrar diagnóstico:', error);
    throw error;
  }
};

// PUT /diagnosticos/principal/{idDiagnosticoPessoa}
export const definirDiagnosticoPrincipal = async (idDiagnosticoPessoa: number | string): Promise<any> => {
  try {
    return await axios.put(`${API_URL}/diagnosticos/principal/${idDiagnosticoPessoa}`);
  } catch (error) {
    console.error(`Erro ao definir diagnóstico com ID ${idDiagnosticoPessoa} como principal:`, error);
    throw error;
  }
};

// DELETE /diagnosticos/{idDiagnosticoPessoa}
export const deletarDiagnostico = async (idDiagnosticoPessoa: number | undefined): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/diagnosticos/${idDiagnosticoPessoa}`);
  } catch (error) {
    console.error(`Erro ao deletar diagnóstico com ID ${idDiagnosticoPessoa}:`, error);
    throw error;
  }
};