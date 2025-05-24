import styled from "styled-components";
import React from "react";

export const DefaultComponents: React.FC = () => {
    return (
        <DefaultContainer>
            <h1>Teste componente</h1>
        </DefaultContainer>
    );
};

export const DefaultContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    padding: 1rem 0;
`;

export const CardTitle = styled.h2`
  font-size: 1.15rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin: 0;
`;

export const DashboardContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    padding: 1rem 0;

`;

export const StatsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 320px));
    @media (max-width: 300px) {
        gap: 1rem;
        grid-template-columns: 1fr;
    }
`;

export const Card = styled.div`
    cursor: pointer;
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

export const StatIconWrapper = styled.div<StatIconWrapperProps>`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background-color: ${props => props.$bgColor};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
`;

export const StatContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
`;

export const StatLabel = styled.div`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.textSecondary};
`;

export const StatFooter = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 0.5rem;
    font-size: 0.75rem;
`;


interface StatChangeProps {
    $isPositive: boolean;
}

export const StatChange = styled.span<StatChangeProps>`
    color: ${props => props.$isPositive ? 'forestgreen': 'red'};
`;


export const StatPeriod = styled.span`
  color: ${props => props.theme.colors.textSecondary};
`;


export interface ContentCardProps {
    $span?: number;
}

export const ContentCard = styled.div<ContentCardProps>`
  background-color: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius};
  padding: 1.25rem;
  box-shadow: ${props => props.theme.boxShadow};
  grid-column: span ${props => props.$span || 1};
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;