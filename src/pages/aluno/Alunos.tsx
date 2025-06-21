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
    FixedHeader, ButtonStyled, ButtonCardStyled
} from "../../components/layout/DefaultComponents.tsx";
import { mockAlunos } from "../../mocks/alunos-mock.ts";
import { useSidebar } from "../../context/SidebarContext.tsx";
import { useTheme } from "styled-components";
import { FiEdit, FiPlus } from "react-icons/fi";
import { StatusAluno } from "../../mocks/status-aluno.ts";

const Alunos: React.FC = () => {
    const [search, setSearch] = useState("");
    const [alunos] = useState(mockAlunos);
    const { isSidebarOpen } = useSidebar();
    const theme = useTheme();
    const navigate = useNavigate();

    // Filtrar alunos conforme busca, só aplica filtro com mais de 3 caracteres
    const filteredAlunos = useMemo(() => {
        if (search.length <= 2) return alunos;
        const lowerValue = search.toLowerCase();

        return alunos.filter((aluno) => {
            // Verificar no nome da pessoa
            if (aluno.pessoa.nome.toLowerCase().includes(lowerValue)) return true;

            // Verificar no CPF
            if (aluno?.pessoa?.cpf?.toLowerCase().includes(lowerValue)) return true;

            // Verificar na instituição
            if (aluno.instituicaoEnsino.nome.toLowerCase().includes(lowerValue)) return true;

            // Verificar no status
            return aluno.status.toLowerCase().includes(lowerValue);


        });
    }, [alunos, search]);

    // Função para formatar a data para exibição
    const formatarData = (dataString: string | null): string => {
        if (!dataString) return "";

        const data = new Date(dataString);
        return data.toLocaleDateString('pt-BR');
    };

    // Função para exibir o texto do status com formatação adequada
    const formatarStatus = (status: StatusAluno): { texto: string; positivo: boolean } => {
        switch(status) {
            case StatusAluno.MATRICULADO:
                return { texto: "Matriculado", positivo: true };
            case StatusAluno.TRANCADO:
                return { texto: "Trancado", positivo: false };
            case StatusAluno.FORMADO:
                return { texto: "Formado", positivo: true };
            case StatusAluno.DESISTENTE:
                return { texto: "Desistente", positivo: false };
            case StatusAluno.TRANSFERIDO:
                return { texto: "Transferido", positivo: false };
            default:
                return { texto: status, positivo: true };
        }
    };

    return (
        <>
            <DefaultContainer>
                <FixedHeader
                    $isSidebarOpen={isSidebarOpen}
                    $sidebarWidth={theme.sizes.sidebarWidth}
                    $sidebarCollapsedWidth={theme.sizes.sidebarWidthCollapsed}
                >
                    <CardTitle>
                        <h1>Alunos</h1>
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
                            onClick={() => navigate("/alunos/cadastro-aluno")}
                            title="Cadastrar novo aluno"
                            style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: 12 }}
                        >
                            <FiPlus size={24} />
                        </ButtonStyled>
                    </div>
                </FixedHeader>
            </DefaultContainer>

            <DashboardContainer>
                {filteredAlunos.map((aluno) => {
                    const statusInfo = formatarStatus(aluno.status);

                    return (
                        <StatsGrid key={aluno.id}>
                            <Card style={{ marginBottom: '1rem' }}>
                                <StatContent>
                                    <StatValue>{aluno.pessoa.nome}</StatValue>
                                    <StatLabel>CPF: {aluno.pessoa.cpf}</StatLabel>
                                    <StatLabel>Email: {aluno.pessoa.email}</StatLabel>
                                    <StatLabel>Instituição: {aluno.instituicaoEnsino.nome}</StatLabel>
                                    <StatLabel>Data de Ingresso: {formatarData(aluno.dataIngresso)}</StatLabel>
                                    {aluno.dataEgresso && (
                                        <StatLabel>Data de Egresso: {formatarData(aluno.dataEgresso)}</StatLabel>
                                    )}
                                    <StatLabel>
                                        Status:
                                        <StatChange $isPositive={statusInfo.positivo}>
                                            {' ' + statusInfo.texto}
                                        </StatChange>
                                    </StatLabel>
                                </StatContent>
                                <ButtonCardStyled
                                    onClick={() => navigate("/alunos/cadastro-aluno", {state: aluno})}
                                    title="Editar aluno"
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
                    );
                })}
                {filteredAlunos.length === 0 && (
                    <div>Nenhum aluno encontrado.</div>
                )}
            </DashboardContainer>
        </>
    );
};

export default Alunos;