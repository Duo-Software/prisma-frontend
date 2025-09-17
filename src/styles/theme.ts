import type {Theme} from '../types';

export const lightTheme: Theme = {
  colors: {
    primary: '#046b7b', // Azul petróleo
    primaryLight: '#058a97', // Azul mais claro para hover/focus
    secondary: '#f6a417', // Laranja vibrante
    success: '#3cb371', // Verde moderno para sucesso
    danger: '#e63946', // Vermelho elegante
    warning: '#f6a417', // Usando a cor de destaque da paleta
    info: '#058a97', // Azul mais suave para infos
    background: '#faf5e6', // Bege claro da paleta
    surface: '#ffffff', // Cards e áreas em branco
    text: '#1d1d1d', // Preto suave para contraste
    textSecondary: '#4a4a4a', // Cinza moderno
    border: '#e2e2e2', // Bordas discretas
    sidebarBackground: '#046b7b', // Sidebar com azul petróleo
    sidebarText: '#faf5e6', // Texto claro na sidebar
    headerBackground: '#f6a417', // Header laranja para destaque
  },
  sizes: {
    sidebarWidth: '250px',
    sidebarWidthCollapsed: '70px',
    headerHeight: '64px',
    fixedHeaderHeight: '96px'
  },
  borderRadius: '10px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  transition: '0.3s ease',
};

export const darkTheme: Theme = {
  colors: {
    primary: '#058a97', // Azul petróleo mais claro para dark
    primaryLight: '#4cc9f0', // Azul vibrante para hover
    secondary: '#f6a417', // Laranja segue como cor de destaque
    success: '#4cc9f0', // Azul neon para sucesso
    danger: '#ff4d6d', // Vermelho neon para contraste
    warning: '#f6a417',
    info: '#4cc9f0',
    background: '#1d1d1d', // Fundo escuro da paleta
    surface: '#2a2a2a', // Superfícies (cards)
    text: '#faf5e6', // Texto claro
    textSecondary: '#a1a1aa', // Texto secundário
    border: '#333333', // Bordas discretas
    sidebarBackground: '#121212', // Sidebar mais escura
    sidebarText: '#faf5e6',
    headerBackground: '#046b7b', // Header azul para contraste
  },
  sizes: {
    sidebarWidth: '250px',
    sidebarWidthCollapsed: '70px',
    headerHeight: '64px',
    fixedHeaderHeight: '96px'
  },
  borderRadius: '10px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
  transition: '0.3s ease',
};