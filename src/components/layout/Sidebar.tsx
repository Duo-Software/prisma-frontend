import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FiHome, FiUser, FiSettings, FiMenu, FiX, FiDatabase, FiUsers, FiBookOpen } from 'react-icons/fi';
import { useSidebar } from '../../context/SidebarContext';
import type {Theme} from '../../types';

declare module "styled-components" {
    export interface DefaultTheme extends Theme {}
}

const Sidebar: React.FC = () => {
    const { isSidebarOpen, toggleSidebar } = useSidebar();
    const location = useLocation();

    const menuItems = [
        { path: '/', label: 'Home', icon: <FiHome /> },
        { path: '/instituicoes', label: 'Instituições', icon: <FiBookOpen /> },
        { path: '/turmas', label: 'Turmas', icon: <FiBookOpen /> },
        { path: '/profissionais', label: 'Profissionais', icon: <FiUsers /> },
        { path: '/alunos', label: 'Alunos', icon: <FiUsers /> },
        { path: '/formularios', label: 'Protocolos', icon: <FiDatabase /> },
        { path: '/profile', label: 'Perfil', icon: <FiUser /> },
        { path: '/settings', label: 'Configurações', icon: <FiSettings /> },
    ];

    return (
        <SidebarContainer $isOpen={isSidebarOpen}>
            <SidebarHeader $isOpen={isSidebarOpen}>
                <Logo hidden={!isSidebarOpen}>
                    {isSidebarOpen ? 'Prisma' : 'P'}
                </Logo>
                <ToggleButton onClick={toggleSidebar}>
                    {isSidebarOpen ? <FiX /> : <FiMenu />}
                </ToggleButton>
            </SidebarHeader>

            <NavMenu>
                {menuItems.map((item) => (
                    <NavItem
                        key={item.path}
                        $isActive={location.pathname === item.path}
                        $isOpen={isSidebarOpen}
                    >
                        <NavLink to={item.path}>
                            <NavIcon>{item.icon}</NavIcon>
                            {isSidebarOpen && <NavLabel>{item.label}</NavLabel>}
                            {!isSidebarOpen && (
                                <Tooltip>
                                    {item.label}
                                </Tooltip>
                            )}
                        </NavLink>
                    </NavItem>
                ))}
            </NavMenu>
        </SidebarContainer>
    );
};

interface SidebarContainerProps {
    $isOpen: boolean;
    theme?: Theme;
}

const SidebarContainer = styled.aside<SidebarContainerProps>`
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    width: ${props => props.$isOpen ? props.theme.sizes.sidebarWidth : props.theme.sizes.sidebarWidthCollapsed};
    background-color: ${props => props.theme.colors.sidebarBackground};
    color: ${props => props.theme.colors.sidebarText};
    transition: width ${props => props.theme.transition};
    z-index: 1000;
    box-shadow: ${props => props.theme.boxShadow};
    display: flex;
    flex-direction: column;
`;

const SidebarHeader = styled.div<SidebarContainerProps>`
    height: ${props => props.theme.sizes.headerHeight};
    display: flex;
    align-items: center;
    justify-content: ${props => props.$isOpen ? 'space-between' : 'center'};
    padding: 0 16px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const Logo = styled.div`
    font-size: 1.2rem;
    font-weight: 700;
    color: ${props => props.theme.colors.primaryLight};
`;

const ToggleButton = styled.button`
    background: transparent;
    border: none;
    color: ${props => props.theme.colors.sidebarText};
    font-size: 1.2rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const NavMenu = styled.ul`
    list-style: none;
    padding: 1rem 0;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
`;

interface NavItemProps {
    $isActive: boolean;
    $isOpen: boolean;
    theme?: Theme;
}

const NavItem = styled.li<NavItemProps>`
    margin: 0.25rem 0.5rem;
    border-radius: ${props => props.theme.borderRadius};
    background-color: ${props => props.$isActive ? props.theme.colors.primary : 'transparent'};
    transition: background-color 0.2s ease;
    position: relative;

    &:hover {
        background-color: ${props => props.$isActive ? props.theme.colors.primary : 'rgba(255, 255, 255, 0.1)'};
    }
`;

const NavLink = styled(Link)`
    display: flex;
    align-items: center;
    padding: 0.75rem 1rem;
    color: ${props => props.theme.colors.sidebarText};
    position: relative;
`;

const NavIcon = styled.span`
    font-size: 1.2rem;
    min-width: 1.5rem;
    display: flex;
    align-items: center;
`;

const NavLabel = styled.span`
    margin-left: 0.75rem;
    white-space: nowrap;
`;

const Tooltip = styled.div`
    position: absolute;
    left: 100%;
    top: 50%;
    transform: translateY(-50%);
    background-color: ${props => props.theme.colors.surface};
    color: ${props => props.theme.colors.text};
    padding: 0.5rem 0.75rem;
    border-radius: ${props => props.theme.borderRadius};
    white-space: nowrap;
    box-shadow: ${props => props.theme.boxShadow};
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.2s, visibility 0.2s;
    pointer-events: none;
    z-index: 1001;
    margin-left: 10px;

    &::before {
        content: '';
        position: absolute;
        left: -6px;
        top: 50%;
        transform: translateY(-50%);
        border-width: 6px 6px 6px 0;
        border-style: solid;
        border-color: transparent ${props => props.theme.colors.surface} transparent transparent;
    }

    ${NavLink}:hover & {
        opacity: 1;
        visibility: visible;
    }
`;

export default Sidebar;