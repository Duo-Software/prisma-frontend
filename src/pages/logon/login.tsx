import React, { useState } from "react";
import {
    DefaultContainer,
    Card,
    StatContent,
    StatLabel,
    FixedHeader,
    ButtonStyled,
    CardTitle,
} from "../../components/layout/DefaultComponents.tsx";
import { useSidebar } from "../../context/SidebarContext.tsx";
import { useTheme } from "styled-components";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");
    const { isSidebarOpen } = useSidebar();
    const theme = useTheme();
    const navigate = useNavigate();

    const handleLogin = () => {
        console.log("Usuário:", usuario);
        console.log("Senha:", senha);

        // Simula login e redireciona para o dashboard
        navigate("/");
    };

    return (
        <DefaultContainer>
            <FixedHeader
                $isSidebarOpen={isSidebarOpen}
                $sidebarWidth={theme.sizes.sidebarWidth}
                $sidebarCollapsedWidth={theme.sizes.sidebarWidthCollapsed}
            >
                <CardTitle>
                    <h1>Bem-vindo ao PRIMA</h1>
                </CardTitle>
            </FixedHeader>

            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "80vh",
            }}>
                <Card style={{
                    width: 400,
                    padding: 32,
                    display: "flex",
                    flexDirection: "column",
                    gap: 16,
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
                }}>
                    <StatContent>
                        <h2 style={{ marginBottom: 8 }}>Login</h2>

                        <StatLabel>Usuário</StatLabel>
                        <input
                            type="text"
                            value={usuario}
                            onChange={(e) => setUsuario(e.target.value)}
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
                            style={{ marginTop: 16, padding: 12, fontSize: 16 }}
                        >
                            Entrar
                        </ButtonStyled>
                    </StatContent>
                </Card>
            </div>
        </DefaultContainer>
    );
};

export default Login;
