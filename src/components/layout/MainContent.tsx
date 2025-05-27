import React, {type ReactNode } from 'react';
import styled from 'styled-components';
import { useSidebar } from '../../context/SidebarContext';

interface MainContentProps {
    children: ReactNode;
}

const MainContent: React.FC<MainContentProps> = ({ children }) => {
    const { isSidebarOpen } = useSidebar();

    return (
        <MainContentContainer $isSidebarOpen={isSidebarOpen}>
            {children}
        </MainContentContainer>
    );
};

interface MainContentContainerProps {
    $isSidebarOpen: boolean;
}

const MainContentContainer = styled.main<MainContentContainerProps>`
    margin-left: ${props => props.$isSidebarOpen ? props.theme.sizes.sidebarWidth : props.theme.sizes.sidebarWidthCollapsed};
    padding: ${props => props.theme.sizes.headerHeight} 1.5rem 1.5rem;
    min-height: calc(100vh - ${props => props.theme.sizes.headerHeight});
    transition: margin-left ${props => props.theme.transition};
    background-color: ${props => props.theme.colors.background};
`;

export default MainContent;