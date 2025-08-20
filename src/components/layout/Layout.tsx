import React from 'react';
import styled from 'styled-components';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import MainContent from './MainContent';
import { SidebarProvider } from '../../context/SidebarContext';
import { useTheme } from '../../context/ThemeContext';

const Layout: React.FC = () => {
    const { theme } = useTheme();

    return (
        <StyledThemeProvider theme={theme}>
            <SidebarProvider>
                <LayoutContainer>
                    <Sidebar />
                    <ContentWrapper>
                        <Header />
                        <MainContent>
                            <Outlet />
                        </MainContent>
                    </ContentWrapper>
                </LayoutContainer>
            </SidebarProvider>
        </StyledThemeProvider>
    );
};

const LayoutContainer = styled.div`
    display: flex;
    min-height: 100vh;
`;

const ContentWrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`;

export default Layout;