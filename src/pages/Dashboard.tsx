import React, { useEffect, useState } from 'react';
import {FiUsers, FiFileMinus} from 'react-icons/fi';
import {BiBriefcase, BiSmile} from "react-icons/bi";
import {BsBuilding} from "react-icons/bs";
import {Link} from "react-router-dom";
import {
    Card,
    DashboardContainer, StatChange,
    StatContent, StatFooter,
    StatIconWrapper, StatLabel, StatPeriod,
    StatsGrid, StatValue
} from '../components/layout/DefaultComponents';
import {useSidebar} from "../context/SidebarContext.tsx";
import {useTheme} from "styled-components";
import { getDashboardData } from '../services/dashboardService';

export const Dashboard: React.FC = () => {
    const { isSidebarOpen } = useSidebar();
    const theme = useTheme();
    const [dashboardData, setDashboardData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getDashboardData();
                setDashboardData(data);
            } catch (error) {
                console.error('Erro ao buscar dados do dashboard:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <DashboardContainer
            $isSidebarOpen={isSidebarOpen}
            $sidebarWidth={theme.sizes.sidebarWidth}
            $sidebarCollapsedWidth={theme.sizes.sidebarWidthCollapsed}>
            Carregando...
        </DashboardContainer>;
    }

    return (
        <DashboardContainer
            $isSidebarOpen={isSidebarOpen}
            $sidebarWidth={theme.sizes.sidebarWidth}
            $sidebarCollapsedWidth={theme.sizes.sidebarWidthCollapsed}>

            <StatsGrid>
                <Link to="/alunos" style={{textDecoration: "none"}}>
                    <Card style={{ minHeight: 240 }}>
                        <StatIconWrapper $bgColor="rgba(14, 165, 233, 0.15)">
                            <BiSmile color="#0ea5e9"/>
                        </StatIconWrapper>
                        <StatContent>
                            <StatValue>{dashboardData?.totalAlunos || 0}</StatValue>
                            <StatLabel>Alunos</StatLabel>
                            <StatFooter>
                                <StatChange $isPositive={dashboardData?.porcentagemNovosAlunosHoje >= 0}>
                                    {dashboardData?.porcentagemNovosAlunosHoje >= 0 ? '+' : ''}{dashboardData?.porcentagemNovosAlunosHoje?.toFixed(1)}%
                                </StatChange>
                                <StatPeriod>Novos registros no hoje</StatPeriod>
                            </StatFooter>
                            <StatFooter>
                                <StatChange $isPositive={dashboardData?.porcentagemNovosAlunosMes >= 0}>
                                    {dashboardData?.porcentagemNovosAlunosMes >= 0 ? '+' : ''}{dashboardData?.porcentagemNovosAlunosMes?.toFixed(1)}%
                                </StatChange>
                                <StatPeriod>Novos registros no mês</StatPeriod>
                            </StatFooter>
                        </StatContent>
                    </Card>
                </Link>
            </StatsGrid>

            <StatsGrid>
                <Link to="/Instituicoes" style={{textDecoration: "none"}}>
                    <Card style={{ minHeight: 240 }}>
                        <StatIconWrapper $bgColor="rgba(14, 165, 233, 0.15)">
                            <BsBuilding color="#0ea5e9"/>
                        </StatIconWrapper>
                        <StatContent>
                            <StatValue>{dashboardData?.totalInstituicoes || 0}</StatValue>
                            <StatLabel>Instituições de ensino</StatLabel>
                            <StatFooter>
                                <StatChange $isPositive={dashboardData?.porcentagemNovosInstituicoesHoje >= 0}>
                                    {dashboardData?.porcentagemNovosInstituicoesHoje >= 0 ? '+' : ''}{dashboardData?.porcentagemNovosInstituicoesHoje?.toFixed(1)}%
                                </StatChange>
                                <StatPeriod>Novos registros hoje</StatPeriod>
                            </StatFooter>
                            <StatFooter>
                                <StatChange $isPositive={dashboardData?.porcentagemNovosInstituicoesMes >= 0}>
                                    {dashboardData?.porcentagemNovosInstituicoesMes >= 0 ? '+' : ''}{dashboardData?.porcentagemNovosInstituicoesMes?.toFixed(1)}%
                                </StatChange>
                                <StatPeriod>Novos registros no mês</StatPeriod>
                            </StatFooter>
                        </StatContent>
                    </Card>
                </Link>
            </StatsGrid>

            <StatsGrid>
                <Link to="/profissionais" style={{textDecoration: "none"}}>
                    <Card style={{ minHeight: 240 }}>
                        <StatIconWrapper $bgColor="rgba(14, 165, 233, 0.15)">
                            <BiBriefcase color="#0ea5e9"/>
                        </StatIconWrapper>
                        <StatContent>
                            <StatValue>{dashboardData?.totalProfissionais || 0}</StatValue>
                            <StatLabel>Profissionais</StatLabel>
                            <StatFooter>
                                <StatChange $isPositive={dashboardData?.porcentagemNovosProfissionaisHoje >= 0}>
                                    {dashboardData?.porcentagemNovosProfissionaisHoje >= 0 ? '+' : ''}{dashboardData?.porcentagemNovosProfissionaisHoje?.toFixed(1)}%
                                </StatChange>
                                <StatPeriod>Novos registros no hoje</StatPeriod>
                            </StatFooter>
                            <StatFooter>
                                <StatChange $isPositive={dashboardData?.porcentagemNovosProfissionaisMes >= 0}>
                                    {dashboardData?.porcentagemNovosProfissionaisMes >= 0 ? '+' : ''}{dashboardData?.porcentagemNovosProfissionaisMes?.toFixed(1)}%
                                </StatChange>
                                <StatPeriod>Novos registros no mês</StatPeriod>
                            </StatFooter>
                        </StatContent>
                    </Card>
                </Link>
            </StatsGrid>

            <StatsGrid>
                <Card style={{ minHeight: 240 }}>
                    <StatIconWrapper $bgColor="rgba(14, 165, 233, 0.15)">
                        <FiUsers color="#0ea5e9"/>
                    </StatIconWrapper>
                    <StatContent>
                        <StatValue>{dashboardData?.totalUsuarios || 0}</StatValue>
                        <StatLabel>Usuários</StatLabel>
                        <StatFooter>
                            <StatChange $isPositive={dashboardData?.porcentagemNovosUsuariosHoje >= 0}>
                                {dashboardData?.porcentagemNovosUsuariosHoje >= 0 ? '+' : ''}{dashboardData?.porcentagemNovosUsuariosHoje?.toFixed(1)}%
                            </StatChange>
                            <StatPeriod>Novos registros no hoje</StatPeriod>
                        </StatFooter>
                        <StatFooter>
                            <StatChange $isPositive={dashboardData?.porcentagemNovosUsuariosMes >= 0}>
                                {dashboardData?.porcentagemNovosUsuariosMes >= 0 ? '+' : ''}{dashboardData?.porcentagemNovosUsuariosMes?.toFixed(1)}%
                            </StatChange>
                            <StatPeriod>Novos registros no mês</StatPeriod>
                        </StatFooter>
                    </StatContent>
                </Card>
            </StatsGrid>

            <StatsGrid>
                <Link to="/relatorios" style={{textDecoration: "none"}}>
                    <Card style={{minHeight: 240}}>
                        <StatIconWrapper $bgColor="rgba(14, 165, 233, 0.15)">
                            <FiFileMinus color="#0ea5e9"/>
                        </StatIconWrapper>
                        <StatContent>
                            <StatValue>{dashboardData?.totalDiagnostico || 0}</StatValue>
                            <StatLabel>Diagnósticos</StatLabel>
                            <StatFooter>
                                <StatChange $isPositive={dashboardData?.porcentagemNovosDiagnosticoHoje >= 0}>
                                    {dashboardData?.porcentagemNovosDiagnosticoHoje >= 0 ? '+' : ''}{dashboardData?.porcentagemNovosDiagnosticoHoje?.toFixed(1)}%
                                </StatChange>
                                <StatPeriod>Novos registros no hoje</StatPeriod>
                            </StatFooter>
                            <StatFooter>
                                <StatChange $isPositive={dashboardData?.porcentagemNovosDiagnosticoMes >= 0}>
                                    {dashboardData?.porcentagemNovosDiagnosticoMes >= 0 ? '+' : ''}{dashboardData?.porcentagemNovosDiagnosticoMes?.toFixed(1)}%
                                </StatChange>
                                <StatPeriod>Novos registros no mês</StatPeriod>
                            </StatFooter>
                        </StatContent>
                    </Card>
                </Link>
            </StatsGrid>
        </DashboardContainer>
    );
};
