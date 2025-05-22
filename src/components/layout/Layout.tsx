import React, {type ReactNode } from 'react';
import styled from 'styled-components';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import Sidebar from './Sidebar';
import Header from './Header';
import MainContent from './MainContent';
import { SidebarProvider } from '../../context/SidebarContext';
import { useTheme } from '../../context/ThemeContext';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const { theme } = useTheme();

    return (
        <StyledThemeProvider theme={theme}>
            <SidebarProvider>
                <LayoutContainer>
                    <Sidebar />
                    <ContentWrapper>
                        <Header />
                        <MainContent>
                            {children}
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
  position: relative;
`;

const ContentWrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`;

export default Layout;