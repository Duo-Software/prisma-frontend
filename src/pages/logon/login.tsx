import React, { useState } from "react";
import {
    Card,
    StatContent,
    StatLabel,
    ButtonStyled,
    LoginContainer,
} from "../../components/layout/DefaultComponents.tsx";
import { useAuth } from "../../hooks/useAuth";
import logoPrisma from "../../assets/prisma_02.png";


const Login: React.FC = () => {
    const [username, setUsername] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState("");
    const { login, isLoading } = useAuth();

    const handleLogin = async () => {
        try {
            setError("");
            await login(username, senha);
        } catch (err) {
            setError("Credenciais inválidas. Por favor, tente novamente.");
            console.error("Erro no login:", err);
        }
    };

    return (
        <>
            <LoginContainer>

                <img src={logoPrisma} alt="Logo Prisma" height={200} />
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "180vh",
                }}>
                    <Card style={{
                        width: 600,
                        height: 400,
                        padding: 32,
                        display: "flex",
                        flexDirection: "column",
                        gap: 16,
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
                    }}>
                        <h1>Auth</h1>
                        <StatContent>
                            <h2 style={{ marginBottom: 8 }}>Login</h2>

                            {error && (
                                <div style={{ color: "red", marginBottom: 16 }}>
                                    {error}
                                </div>
                            )}

                            <StatLabel>Usuário</StatLabel>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                style={{
                                    padding: 10,
                                    fontSize: 16,
                                    borderRadius: 4,
                                    border: "1px solid #ccc",
                                }}
                            />

                            <StatLabel>Senha</StatLabel>
                            <input
                                type="password"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                style={{
                                    padding: 10,
                                    fontSize: 16,
                                    borderRadius: 4,
                                    border: "1px solid #ccc",
                                }}
                            />

                            <ButtonStyled
                                onClick={handleLogin}
                                disabled={isLoading}
                                style={{ marginTop: 16, padding: 12, fontSize: 16 }}
                            >
                                {isLoading ? "Entrando..." : "Entrar"}
                            </ButtonStyled>
                        </StatContent>
                    </Card>
                </div>
            </LoginContainer>
        </>
    );
};

export default Login;
