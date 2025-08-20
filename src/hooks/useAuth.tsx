import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

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
            setToken(storedToken);

            if (!isValid) {
                authService.logout();
                setToken(null);
                navigate('/login');
            }
        } catch (error) {
            console.error('Erro ao validar token:', error);
            setIsAuthenticated(false);
            setToken(null);
            authService.logout();
            navigate('/login');
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

    const logout = () => {
        authService.logout();
        setToken(null);
        setIsAuthenticated(false);
        navigate('/login');
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
