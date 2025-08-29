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
import { buscarInstituicoes, type Instituicao } from "../../services/instituicaoService.ts";
import {useSidebar} from "../../context/SidebarContext.tsx";
import {useTheme} from "styled-components";
import {FiEdit, FiPlus} from "react-icons/fi";

const Instituicoes: React.FC = () => {
    const [search, setSearch] = useState("");
    const [institutions, setInstitutions] = useState<Instituicao[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { isSidebarOpen } = useSidebar();
    const theme = useTheme();
    const navigate = useNavigate();

    useEffect(() => {
        const carregarInstituicoes = async () => {
            try {
                setLoading(true);
                const data = await buscarInstituicoes();
                setInstitutions(data);
                setError(null);
            } catch (err) {
                console.error("Erro ao carregar instituições:", err);
                setError("Erro ao carregar instituições. Por favor, tente novamente.");
            } finally {
                setLoading(false);
            }
        };

        carregarInstituicoes();
    }, []);


    // Filtrar instituições conforme busca, só aplica filtro com mais de 3 caracteres
    const filteredInstitutions = useMemo(() => {
        if (search.length <= 2) return institutions;
        const lowerValue = search.toLowerCase();

        // Verifica se QUALQUER campo da instituição contém o texto buscado
        return institutions.filter((institution) =>
            Object.values(institution).some((value) => {
                if (typeof value === "object" && value !== null) {
                    // Busca nos campos internos, ex: municipio.nome
                    return Object.values(value).some(
                        v => String(v).toLowerCase().includes(lowerValue)
                    );
                }
                return String(value).toLowerCase().includes(lowerValue);
            })
        );
    }, [institutions, search]);

    return (
        <>
            <DefaultContainer>
                <FixedHeader
                    $isSidebarOpen={isSidebarOpen}
                    $sidebarWidth={theme.sizes.sidebarWidth}
                    $sidebarCollapsedWidth={theme.sizes.sidebarWidthCollapsed}
                >
                    <CardTitle>
                        <h1>Instituições de Ensino</h1>
                        {loading && <span style={{ fontSize: '0.8rem', marginLeft: '10px' }}>(Carregando...)</span>}
                    </CardTitle>
                    <CardTitle>
                        <input
                            type="text"
                            placeholder="Digite para buscar..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            style={{minWidth: 320, padding: 8, fontSize: 16}}
                        />
                    </CardTitle>

                    <div style={{
                        position: "absolute",
                        bottom: 16,
                        right: 24,
                        zIndex: 10
                    }}>
                        <ButtonStyled
                            onClick={() => navigate("/Instituicoes/cadastro-instituicao")}
                            title="Cadastrar nova instituição"
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
                            Carregando instituições...
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

                    {!loading && !error && filteredInstitutions.map((institution) => (
                        <StatsGrid key={institution.id}>
                            <Card style={{ marginBottom: '1rem' }}>
                                <StatContent>
                                    <StatValue>{institution.nome}</StatValue>
                                    <StatLabel>{institution.municipio.nome} - {institution.municipio.unidadeFederativa.sigla}</StatLabel>
                                    <StatLabel>Tipo: {institution.tipoInstituicaoEnsino}</StatLabel>
                                    <StatLabel>
                                        Status:
                                        <StatChange $isPositive={institution.ativo}>
                                            {institution.ativo ? ' Ativo' : ' Inativo'}
                                        </StatChange>
                                    </StatLabel>
                                </StatContent>
                                <ButtonCardStyled
                                    onClick={() => navigate("/Instituicoes/cadastro-instituicao", {state: institution})}
                                    title="Editar instituição"
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
                    {!loading && !error && filteredInstitutions.length === 0 && (
                        <div style={{ padding: '2rem', textAlign: 'center', width: '100%' }}>
                            Nenhuma instituição encontrada.
                        </div>
                    )}
                </DashboardContainer>
        </>
    );
};

export default Instituicoes;