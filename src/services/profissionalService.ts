import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

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
