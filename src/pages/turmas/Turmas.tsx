import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    DashboardContainer,
    Card,
    StatContent,
    StatValue,
    StatLabel,
    StatsGrid,
    DefaultContainer,
    CardTitle,
    StatChange,
    FixedHeader, ButtonStyled, ButtonCardStyled
} from "../../components/layout/DefaultComponents.tsx";
import { buscarTurmas, type Turma } from "../../services/turmaService.ts";
import { useSidebar } from "../../context/SidebarContext.tsx";
import { useTheme } from "styled-components";
import { FiEdit, FiPlus } from "react-icons/fi";

const Turmas: React.FC = () => {
    const [search, setSearch] = useState("");
    const [turmas, setTurmas] = useState<Turma[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { isSidebarOpen } = useSidebar();
    const theme = useTheme();
    const navigate = useNavigate();

    useEffect(() => {
        const carregarTurmas = async () => {
            try {
                setLoading(true);
                const data = await buscarTurmas();
                setTurmas(data);
                setError(null);
            } catch (err) {
                console.error("Erro ao carregar turmas:", err);
                setError("Erro ao carregar turmas. Por favor, tente novamente.");
            } finally {
                setLoading(false);
            }
        };
        carregarTurmas();
    }, []);

    // Filtro conforme a pesquisa
    const filteredTurmas = useMemo(() => {
        if (search.length <= 2) return turmas;
        const lowerValue = search.toLowerCase();
        return turmas.filter(turma =>
            Object.values(turma).some((value) => {
                if (typeof value === "object" && value !== null) {
                    return Object.values(value).some(
                        v => String(v).toLowerCase().includes(lowerValue)
                    );
                }
                return String(value).toLowerCase().includes(lowerValue);
            })
        );
    }, [turmas, search]);

    return (
        <>
            <DefaultContainer>
                <FixedHeader
                    $isSidebarOpen={isSidebarOpen}
                    $sidebarWidth={theme.sizes.sidebarWidth}
                    $sidebarCollapsedWidth={theme.sizes.sidebarWidthCollapsed}
                >
                    <CardTitle>
                        <h1>Turmas</h1>
                        {loading && <span style={{ fontSize: '0.8rem', marginLeft: '10px' }}>(Carregando...)</span>}
                    </CardTitle>
                    <CardTitle>
                        <input
                            type="text"
                            placeholder="Digite para buscar..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            style={{ minWidth: 320, padding: 8, fontSize: 16 }}
                        />
                    </CardTitle>

                    <div style={{
                        position: "absolute",
                        bottom: 16,
                        right: 24,
                        zIndex: 10
                    }}>
                        <ButtonStyled
                            onClick={() => navigate("/Turmas/cadastro-turma")}
                            title="Cadastrar nova turma"
                            style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: 12 }}
                        >
                            <FiPlus size={24} />
                        </ButtonStyled>
                    </div>
                </FixedHeader>
            </DefaultContainer>

            <DashboardContainer>
                {loading && (
                    <div style={{ padding: '2rem', textAlign: 'center', width: '100%' }}>
                        Carregando turmas...
                    </div>
                )}

                {error && (
                    <div style={{ padding: '2rem', textAlign: 'center', width: '100%', color: 'red' }}>
                        {error}
                        <div style={{ marginTop: '1rem' }}>
                            <ButtonStyled onClick={() => window.location.reload()}>
                                Tentar novamente
                            </ButtonStyled>
                        </div>
                    </div>
                )}

                {!loading && !error && filteredTurmas.map((turma) => (
                    <StatsGrid key={turma.id}>
                        <Card style={{ marginBottom: '1rem' }}>
                            <StatContent>
                                <StatValue>{turma.codigoTurma} - {turma.descricao}</StatValue>
                                <StatLabel>
                                    <strong>Instituição:</strong> {turma.instituicaoEnsino?.nome ?? "-"}
                                </StatLabel>
                                <StatLabel>
                                    <strong>Professor:</strong> {turma.profissional?.nome ?? "-"}
                                </StatLabel>
                                <StatLabel>
                                  <strong>Série:</strong> {turma.serie}
                                </StatLabel>
                                <StatLabel>
                                    <strong>Ano:</strong> {turma.anoTurma}
                                </StatLabel>
                                <StatLabel>
                                    <strong>Turno:</strong> {turma.turno}
                                </StatLabel>
                                <StatLabel>
                                    Status:
                                    <StatChange $isPositive={turma.ativo}>
                                        {turma.ativo ? ' Ativo' : ' Inativo'}
                                    </StatChange>
                                </StatLabel>
                            </StatContent>
                            <ButtonCardStyled
                                onClick={() => navigate("/Turmas/cadastro-turma", { state: turma })}
                                title="Editar turma"
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "flex-end",
                                    marginLeft: "auto",
                                    padding: 4,
                                    width: 24,
                                    height: 24,
                                    position: "absolute",
                                    bottom: 16,
                                    right: 16
                                }}
                            >
                                <FiEdit size={16} />
                            </ButtonCardStyled>
                        </Card>
                    </StatsGrid>
                ))}
                {!loading && !error && filteredTurmas.length === 0 && (
                    <div style={{ padding: '2rem', textAlign: 'center', width: '100%' }}>
                        Nenhuma turma encontrada.
                    </div>
                )}
            </DashboardContainer>
        </>
    );
};

export default Turmas;