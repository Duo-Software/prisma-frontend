import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// GET /diagnosticos/pessoa/{idPessoa}
export const recuperaArquivoById = async (idArquivo: number | string): Promise<Arquivo> => {
  try {
    const response = await axios.get(`${API_URL}/arquivos/${idArquivo}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar Arquivo com ID ${idArquivo}:`, error);
    throw error;
  }
};

export interface Arquivo {
  idArquivo?: number;
  nome: string;
  tipo: string;
  tamanho: number;
  conteudo: string | null;
  dtCadastro: string;
  ativo: boolean;
}