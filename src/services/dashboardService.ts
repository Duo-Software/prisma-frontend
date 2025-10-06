import axios from 'axios';

interface DashboardData {
    totalAlunos: number;
    porcentagemNovosAlunosHoje: number;
    porcentagemNovosAlunosMes: number;
    totalProfissionais: number;
    porcentagemNovosProfissionaisHoje: number;
    porcentagemNovosProfissionaisMes: number;
    totalDiagnostico: number;
    porcentagemNovosDiagnosticoHoje: number;
    porcentagemNovosDiagnosticoMes: number;
    totalUsuarios: number;
    porcentagemNovosUsuariosHoje: number;
    porcentagemNovosUsuariosMes: number;
    totalInstituicoes: number;
    porcentagemNovosInstituicoesHoje: number;
    porcentagemNovosInstituicoesMes: number;
}

export const getDashboardData = async (): Promise<DashboardData> => {
    try {
        const response = await axios.get<DashboardData>(
            `${import.meta.env.VITE_API_URL}/dashboard`
        );
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar dados do dashboard:', error);
        throw error;
    }
};
