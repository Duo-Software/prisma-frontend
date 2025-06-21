import styled from "styled-components";
import React from "react";

interface FixedHeaderProps {
    $sidebarWidth: string;
    $sidebarCollapsedWidth: string;
    $isSidebarOpen: boolean;
}


export const DefaultComponents: React.FC = () => {
    return (
        <DefaultContainer>
            <h1>Teste componente</h1>
        </DefaultContainer>
    );
};

export const DefaultContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: calc(${props => props.theme.sizes.headerHeight} + ${props => props.theme.sizes.fixedHeaderHeight});
    gap: 1.5rem;
    padding: 1rem 0;
`;

export const LoginContainer = styled.div<{ $isSidebarOpen?: boolean }>`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    top: ${props => props.theme.sizes.headerHeight};
    left: ${props => props.$isSidebarOpen ? props.theme.sizes.sidebarWidth : props.theme.sizes.sidebarWidthCollapsed};
    right: 0;
    bottom: 0;
    width: calc(100vw - ${props => props.$isSidebarOpen ? props.theme.sizes.sidebarWidth : props.theme.sizes.sidebarWidthCollapsed});
    height: calc(100vh - ${props => props.theme.sizes.headerHeight});
    margin: 0;
    padding: 0;
    overflow: hidden;
    z-index: 100;
    transition: left ${props => props.theme.transition}, width ${props => props.theme.transition};
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

export const CardFixed = styled.div`
    cursor: pointer;
    background-color: ${props => props.theme.colors.surface};
    border-radius: ${props => props.theme.borderRadius};
    padding: 1.25rem;
    box-shadow: ${props => props.theme.boxShadow};
    display: flex;
    flex-direction: column;
    gap: 1rem;
    transition: transform 0.2s, box-shadow 0.2s;
    min-width: 40%;
    max-width: 800px;
    margin: 0 auto;

    @media (max-width: 768px) {
        max-width: 100%;
    }

    @media (max-width: 480px) {
        max-width: 100%;
    }


    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 24px rgba(0, 0, 0, 0.12);
    }
`;

export const CardGrid = styled.div`
    cursor: pointer;
    background-color: ${props => props.theme.colors.surface};
    border-radius: ${props => props.theme.borderRadius};
    padding: 1.25rem;
    box-shadow: ${props => props.theme.boxShadow};
    transition: transform 0.2s, box-shadow 0.2s;
    min-width: 40%;
    max-width: 800px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    
    @media (max-width: 768px) {
    grid-template-columns: 1fr;
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

export const StatContentFixed = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  align-items: center;
  justify-content: center;
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

export const FixedHeader = styled.div<FixedHeaderProps>`
    position: fixed;
    z-index: 110; // deve ser maior que o header, menor que o sidebar
    background: ${props => props.theme.colors.background};
    padding-bottom: 1rem;
    padding-left: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    box-shadow: 0 2px 10px 0 rgba(0,0,0,0.05);
    left: ${props => props.$isSidebarOpen ? props.$sidebarWidth : props.$sidebarCollapsedWidth};
    width: calc(100vw - ${props => props.$isSidebarOpen ? props.$sidebarWidth : props.$sidebarCollapsedWidth});
    top: ${props => props.theme.sizes.headerHeight};
    transition: left ${props => props.theme.transition}, width ${props => props.theme.transition};
`;

export const ButtonStyled = styled.button`
  background-color: ${props => props.theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: ${props => props.theme.borderRadius};
  padding: 0.65em 1.5em;
  font-size: 1rem;
  font-weight: 600;
  box-shadow: 0 2px 10px 0 rgba(67, 97, 238, 0.08);
  cursor: pointer;
  transition: 
    background-color ${props => props.theme.transition},
    box-shadow ${props => props.theme.transition},
    transform 0.2s;
  &:hover,
  &:focus {
    background-color: ${props => props.theme.colors.primaryLight};
    box-shadow: 0 6px 18px rgba(67, 97, 238, 0.15);
    outline: none;
    transform: translateY(-2px) scale(1.01);
  }
  &:disabled {
    background-color: ${props => props.theme.colors.border};
    color: ${props => props.theme.colors.textSecondary};
    cursor: not-allowed;
    opacity: 0.7;
    box-shadow: none;
    transform: none;
  }
`;

export const ButtonCardStyled = styled.button`
    background-color: ${props => props.theme.colors.primary};
    color: #fff;
    border: none;
    border-radius: ${props => props.theme.borderRadius};
    padding: 0.65em 1.5em;
    font-size: 1rem;
    font-weight: 600;
    box-shadow: 0 2px 10px 0 rgba(67, 97, 238, 0.08);
    cursor: pointer;
    display: flex;
    width: 24px;
    height: 24px;
    position: absolute;
    bottom: 16px;
    right: 16px;
    transition: background-color ${props => props.theme.transition},
    box-shadow ${props => props.theme.transition},
    transform 0.2s;

    &:hover,
    &:focus {
        background-color: ${props => props.theme.colors.primaryLight};
        box-shadow: 0 6px 18px rgba(67, 97, 238, 0.15);
        outline: none;
        transform: translateY(-2px) scale(1.01);
    }

    &:disabled {
        background-color: ${props => props.theme.colors.border};
        color: ${props => props.theme.colors.textSecondary};
        cursor: not-allowed;
        opacity: 0.7;
        box-shadow: none;
        transform: none;
    }
`;

export const FormContainer = styled.div<FixedHeaderProps>`
    min-height: calc(100vh - ${({ theme }) => theme.sizes.headerHeight});
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    background: ${({ theme }) => theme.colors.background || "#f5f6fa"};
    padding: 2rem 1rem;
    box-sizing: border-box;
`;

export const CardWrapper = styled.div<FixedHeaderProps>`
    z-index: 110;
    box-sizing: border-box;
    position: page;
    width: calc(
            97.5vw - ${props =>
                    props.$isSidebarOpen
                            ? props.theme.sizes.sidebarWidth
                            : props.theme.sizes.sidebarWidthCollapsed}
    );

    margin: 32px;
    background-color: ${({ theme }) => theme.colors.background};
    box-shadow: 0 2px 16px rgba(0,0,0,0.1);
    border-radius: ${props => props.theme.borderRadius};
    padding: 2rem 1rem;
    display: flex;
    flex-direction: column;
    max-width: 800px;
    left: 50%;
    transition: max-width ${props => props.theme.transition};
`;




export const alignRightStyle = { alignItems: 'center', justifyContent: 'flex-end', marginLeft: 'auto' };






