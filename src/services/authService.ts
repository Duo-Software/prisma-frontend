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
            if (axios.isAxiosError(error)
                && (error.response?.status === 401 || error.response?.status === 403)) {
                this.logout();
            }
            return false;
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
