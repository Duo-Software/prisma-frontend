import React from 'react';
import {FiUsers, FiFileMinus} from 'react-icons/fi';
import {BiBriefcase, BiSmile} from "react-icons/bi";
import {BsBuilding} from "react-icons/bs";
import {Link} from "react-router-dom";
import {
    Card,
    CardTitle, ContentCard,
    DashboardContainer, StatChange,
    StatContent, StatFooter,
    StatIconWrapper, StatLabel, StatPeriod,
    StatsGrid, StatValue
} from '../components/layout/DefaultComponents';

export const Dashboard: React.FC = () => {
    return (

        <DashboardContainer>

            <StatsGrid>
                <Card>
                    <CardTitle>Total de alunos</CardTitle>
                    <StatIconWrapper $bgColor="rgba(14, 165, 233, 0.15)">
                        <BiSmile color="#0ea5e9" />
                    </StatIconWrapper>
                    <StatContent>
                        <StatValue>2340</StatValue>
                        <StatLabel>Alunos</StatLabel>
                        <StatFooter>
                            <StatChange $isPositive={true}>+8.2%</StatChange>
                            <StatPeriod>desde o mês passado</StatPeriod>
                        </StatFooter>
                    </StatContent>
                </Card>
                </StatsGrid>

                <StatsGrid>
                    <Link to="/Instituicoes" style={{textDecoration: "none"}}>
                        <Card>
                            <StatIconWrapper $bgColor="rgba(14, 165, 233, 0.15)">
                                <BsBuilding color="#0ea5e9"/>
                            </StatIconWrapper>
                            <StatContent>
                                <StatValue>2340</StatValue>
                                <StatLabel>Instituições de ensino</StatLabel>
                            </StatContent>
                        </Card>
                    </Link>
                </StatsGrid>

            <StatsGrid>
                <Card>
                    <StatIconWrapper $bgColor="rgba(14, 165, 233, 0.15)">
                        <BiBriefcase color="#0ea5e9" />
                    </StatIconWrapper>
                    <StatContent>
                        <StatValue>2340</StatValue>
                        <StatLabel>Profissionais</StatLabel>
                    </StatContent>
                </Card>
            </StatsGrid>

            <StatsGrid>
                <Card>
                    <StatIconWrapper $bgColor="rgba(245, 158, 11, 0.15)">
                        <FiUsers color="#f59e0b" />
                    </StatIconWrapper>
                    <StatContent>
                        <StatValue>854</StatValue>
                        <StatLabel>usuários</StatLabel>
                    </StatContent>

                    <StatFooter>
                        <StatChange $isPositive={true}>+8.2%</StatChange>
                        <StatPeriod>desde o mês passado</StatPeriod>
                    </StatFooter>
                </Card>
            </StatsGrid>

            <StatsGrid>
                <Card>
                    <StatIconWrapper $bgColor="rgba(34, 197, 94, 0.15)">
                        <FiFileMinus color="#22c55e" />
                    </StatIconWrapper>
                    <StatContent>
                        <StatValue>432</StatValue>
                        <StatLabel>Relatórios</StatLabel>
                    </StatContent>
                    <StatFooter>
                        <StatChange $isPositive={false}>-3.1%</StatChange>
                        <StatPeriod>desde o mês passado</StatPeriod>
                    </StatFooter>
                </Card>
            </StatsGrid>
            <StatsGrid>
                <Card>
                    <StatContent>
                        <StatValue>432</StatValue>
                        <StatLabel>Relatórios</StatLabel>
                    </StatContent>
                    <ContentCard>
                        Conteudo aqui
                    </ContentCard>

                    <StatFooter>
                        <StatChange $isPositive={false}>-3.1%</StatChange>
                        <StatPeriod>desde o mês passado</StatPeriod>
                    </StatFooter>
                </Card>
            </StatsGrid>
        </DashboardContainer>
    );
};
