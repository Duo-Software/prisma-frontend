import React from 'react';
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

export const Dashboard: React.FC = () => {
    return (

        <DashboardContainer>

            <StatsGrid>
                <Link to="/alunos" style={{textDecoration: "none"}}>
                    <Card style={{ minHeight: 240 }}>
                        <StatIconWrapper $bgColor="rgba(14, 165, 233, 0.15)">
                            <BiSmile color="#0ea5e9"/>
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
                </Link>
            </StatsGrid>

            <StatsGrid>
                <Link to="/Instituicoes" style={{textDecoration: "none"}}>
                    <Card style={{ minHeight: 240 }}>
                        <StatIconWrapper $bgColor="rgba(14, 165, 233, 0.15)">
                            <BsBuilding color="#0ea5e9"/>
                        </StatIconWrapper>
                        <StatContent>
                            <StatValue>2340</StatValue>
                            <StatLabel>Instituições de ensino</StatLabel>
                            <StatFooter>
                                <StatChange $isPositive={true}></StatChange>
                                <StatPeriod>dedadsa</StatPeriod>
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
                            <StatValue>2340</StatValue>
                            <StatLabel>Profissionais</StatLabel>
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
                <Card style={{ minHeight: 240 }}>
                    <StatIconWrapper $bgColor="rgba(14, 165, 233, 0.15)">
                        <FiFileMinus color="#0ea5e9"/>
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
        </DashboardContainer>
    );
};
