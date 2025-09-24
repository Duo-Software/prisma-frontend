
import axios from 'axios';

interface LoginCredentials {
    username: string;
    senha: string;
}

interface AuthResponse {
    access_token: string;
    token_type: string;
    userId: number;
    name: string;
    role: string;
    username: string;
}

const API_URL = import.meta.env.VITE_API_URL;

// Configurar interceptor para tratar erros de autenticação globalmente
axios.interceptors.response.use(
    response => response,
    error => {
        // Só tratar erros de autenticação (401 ou 403)
        if (axios.isAxiosError(error) && error.response) {
            // Verificar se o erro é de autenticação E a requisição não é para o endpoint de autenticação
            const isAuthError = error.response.status === 401 || error.response.status === 403;
            const isAuthRequest = error.config?.url?.includes('/auth/');

            if (isAuthError && !isAuthRequest) {
                authService.logout();
            }
        }
        return Promise.reject(error);
    }
);

export const authService = {
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        const response = await axios.post(`${API_URL}/auth/authenticate`, credentials);
        return response.data;
    },

    async validateToken(): Promise<boolean> {
        try {
            const token = this.getToken();
            if (!token) return false;

            await axios.get(`${API_URL}/auth/validate`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return true;
        } catch (error) {
            // Verificar especificamente se o erro é de autenticação
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 401 || error.response.status === 403) {
                    return false;
                }
            }
            // Para outros erros durante a validação, assumimos que o token ainda é válido
            // mas houve um problema de rede ou servidor
            console.warn('Erro ao validar token, mas não é erro de autenticação:', error);
            return true; // Manter o usuário logado em caso de outros erros
        }
    },

    setToken(token: string) {
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    },

    getToken(): string | null {
        return localStorage.getItem('token');
    },

    logout() {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        window.location.href = '/login';
    }
};