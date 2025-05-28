import React, { useState, useMemo } from "react";
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
    FixedHeader, ButtonStyled
} from "../../components/layout/DefaultComponents.tsx";
import { mockInstitutions } from "../../mocks/instituicoes-mock.ts";
import {useSidebar} from "../../context/SidebarContext.tsx";
import {useTheme} from "styled-components";
import {FiPlus} from "react-icons/fi";

const Instituicoes: React.FC = () => {
    const [search, setSearch] = useState("");
    const [institutions] = useState(mockInstitutions);
    const { isSidebarOpen } = useSidebar();
    const theme = useTheme();
    const navigate = useNavigate();


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
                    {filteredInstitutions.map((institution) => (
                        <StatsGrid key={institution.id}>
                            <Card style={{ marginBottom: '1rem' }}>
                                <StatContent>
                                    <StatValue>{institution.nome}</StatValue>
                                    <StatLabel>{institution.municipio.nome}-{institution.municipio.uf}</StatLabel>
                                    <StatLabel>Tipo: {institution.tipoInstituicaoEnsino}</StatLabel>
                                    <StatLabel>Alunos: {institution.totalAlunos}</StatLabel>
                                    <StatLabel>
                                        Status:
                                        <StatChange $isPositive={institution.ativo}>
                                            {institution.ativo ? ' Ativo' : ' Inativo'}
                                        </StatChange>
                                    </StatLabel>
                                </StatContent>
                            </Card>
                        </StatsGrid>
                    ))}
                    {filteredInstitutions.length === 0 && (
                        <div>Nenhuma instituição encontrada.</div>
                    )}
                </DashboardContainer>
        </>
    );
};

export default Instituicoes;