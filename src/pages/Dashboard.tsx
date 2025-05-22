import React from 'react';
import styled from 'styled-components';
import {FiUsers, FiFileMinus} from 'react-icons/fi';
import {BiBriefcase, BiSmile} from "react-icons/bi";
import {BsBuilding} from "react-icons/bs";


const CardTitle = styled.h2`
  font-size: 1.15rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin: 0;
`;


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
                <Card>
                    <StatIconWrapper $bgColor="rgba(14, 165, 233, 0.15)">
                        <BsBuilding color="#0ea5e9" />
                    </StatIconWrapper>
                    <StatContent>
                        <StatValue>2340</StatValue>
                        <StatLabel>Instituições de ensino</StatLabel>
                    </StatContent>
                </Card>
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

const DashboardContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    padding: 1rem 0;

`;


const StatsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    @media (max-width: 300px) {
        gap: 1rem;
        grid-template-columns: 1fr;
    }
`;

const Card = styled.div`
  background-color: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius};
  padding: 1.25rem;
  box-shadow: ${props => props.theme.boxShadow};
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.12);
  }
`;

interface StatIconWrapperProps {
    $bgColor: string;
}

const StatIconWrapper = styled.div<StatIconWrapperProps>`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background-color: ${props => props.$bgColor};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
`;

const StatContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
`;

const StatLabel = styled.div`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const StatFooter = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 0.5rem;
    font-size: 0.75rem;
`;


interface StatChangeProps {
    $isPositive: boolean;
}

const StatChange = styled.span<StatChangeProps>`
    color: ${props => props.$isPositive ? 'forestgreen': 'red'};
`;


const StatPeriod = styled.span`
  color: ${props => props.theme.colors.textSecondary};
`;


interface ContentCardProps {
    $span?: number;
}

const ContentCard = styled.div<ContentCardProps>`
  background-color: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius};
  padding: 1.25rem;
  box-shadow: ${props => props.theme.boxShadow};
  grid-column: span ${props => props.$span || 1};
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;