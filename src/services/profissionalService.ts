import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

export interface Profissional {
    id: number;
    cargo: string;
    ativo: boolean;
    pessoa: {
        nome: string;
        email: string;
        telefone: string;
    };
    instituicaoEnsino: {
        nome: string;
    };
}

export const profissionalService = {
    listarProfissionais: async (): Promise<Profissional[]> => {
        const response = await axios.get(`${BASE_URL}/profissionais`);
        return response.data;
    }
};
