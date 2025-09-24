
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import axios from "axios";

interface AuthContextType {
    isAuthenticated: boolean;
    isLoading: boolean;
    token: string | null;
    login: (username: string, senha: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [token, setToken] = useState<string | null>(() => {
        // Inicializa o estado com o token do localStorage
        return authService.getToken();
    });
    const navigate = useNavigate();

    useEffect(() => {
        validateToken();
    }, []);

    const validateToken = async () => {
        try {
            const storedToken = authService.getToken();
            if (!storedToken) {
                setIsLoading(false);
                return;
            }

            const isValid = await authService.validateToken();
            setIsAuthenticated(isValid);

            if (isValid) {
                setToken(storedToken);
            } else {
                // Só executar logout se o token for inválido
                handleLogout();
            }
        } catch (error) {
            console.error('Erro ao validar token:', error);
            // Não fazer logout automático em caso de erro de rede ou servidor
            // Manter o usuário logado se já tiver um token
            if (authService.getToken()) {
                setIsAuthenticated(true);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (username: string, senha: string) => {
        try {
            const response = await authService.login({ username, senha });
            const newToken = response.access_token;

            if (newToken) {
                authService.setToken(newToken);
                setToken(newToken);
                setIsAuthenticated(true);
                navigate('/');
            } else {
                throw new Error('Token não recebido do servidor');
            }
        } catch (error) {
            console.error('Erro no login:', error);
            setIsAuthenticated(false);
            setToken(null);
            throw error;
        }
    };

    const handleLogout = () => {
        setToken(null);
        setIsAuthenticated(false);
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        navigate('/login');
    };

    const logout = () => {
        handleLogout();
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}