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
import { useSidebar } from "../../context/SidebarContext.tsx";
import { useTheme } from "styled-components";
import { FiEdit, FiPlus } from "react-icons/fi";
import {type Profissional, profissionalService} from "../../services/profissionalService";

const Profissionais: React.FC = () => {
    const [search, setSearch] = useState("");
    const [profissionais, setProfissionais] = useState<Profissional[]>([]);
    const [loading, setLoading] = useState(true);
    const { isSidebarOpen } = useSidebar();
    const theme = useTheme();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfissionais = async () => {
            try {
                const data = await profissionalService.listarProfissionais();
                setProfissionais(data);
            } catch (error) {
                console.error('Erro ao carregar profissionais:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfissionais();
    }, []);

    // Filtrar profissionais conforme busca, só aplica filtro com mais de 3 caracteres
    const filteredProfissionais = useMemo(() => {
        if (search.length <= 2) return profissionais;
        const lowerValue = search.toLowerCase();

        // Verifica se QUALQUER campo do profissional contém o texto buscado
        return profissionais.filter((profissional) =>
            Object.values(profissional).some((value) => {
                if (typeof value === "object" && value !== null) {
                    // Busca nos campos internos, ex: pessoa.nome
                    return Object.values(value).some(
                        v => String(v).toLowerCase().includes(lowerValue)
                    );
                }
                return String(value).toLowerCase().includes(lowerValue);
            })
        );
    }, [profissionais, search]);

    return (
        <>
            <DefaultContainer>
                <FixedHeader
                    $isSidebarOpen={isSidebarOpen}
                    $sidebarWidth={theme.sizes.sidebarWidth}
                    $sidebarCollapsedWidth={theme.sizes.sidebarWidthCollapsed}
                >
                    <CardTitle>
                        <h1>Profissionais</h1>
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
                            onClick={() => navigate("/profissionais/cadastro-profissional")}
                            title="Cadastrar novo profissional"
                            style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: 12 }}
                        >
                            <FiPlus size={24} />
                        </ButtonStyled>
                    </div>
                </FixedHeader>
            </DefaultContainer>

            <DashboardContainer>
                {loading && <div>Carregando profissionais...</div>}
                {!loading && filteredProfissionais.length === 0 && (
                    <div>Nenhum profissional encontrado.</div>
                )}
                {filteredProfissionais.map((profissional) => (
                    <StatsGrid key={profissional.id}>
                        <Card style={{ marginBottom: '1rem' }}>
                            <StatContent>
                                <StatValue>{profissional.pessoa.nome}</StatValue>
                                <StatLabel>Cargo: {profissional.cargo}</StatLabel>
                                <StatLabel>Email: {profissional.pessoa.email}</StatLabel>
                                <StatLabel>Telefone: {profissional.pessoa.telefone}</StatLabel>
                                <StatLabel>Instituição: {profissional.instituicaoEnsino?.nome}</StatLabel>
                                <StatLabel>
                                    Status:
                                    <StatChange $isPositive={profissional.ativo}>
                                        {profissional.ativo ? ' Ativo' : ' Inativo'}
                                    </StatChange>
                                </StatLabel>
                            </StatContent>
                            <ButtonCardStyled
                                onClick={() => navigate("/profissionais/cadastro-profissional", { state: profissional })}
                                title="Editar profissional"
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
            </DashboardContainer>
        </>
    );
};

export default Profissionais;
