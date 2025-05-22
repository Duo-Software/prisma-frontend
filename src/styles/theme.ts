import type {Theme} from '../types';

export const lightTheme: Theme = {
  colors: {
    primary: '#4361ee',
    primaryLight: '#4895ef',
    secondary: '#3f37c9',
    success: '#4cc9f0',
    danger: '#f72585',
    warning: '#f8961e',
    info: '#4895ef',
    background: '#f5f7fb',
    surface: '#ffffff',
    text: '#1e1e2c',
    textSecondary: '#64748b',
    border: '#e2e8f0',
    sidebarBackground: '#1e1e2c',
    sidebarText: '#f8f9fa',
    headerBackground: '#ffffff',
  },
  sizes: {
    sidebarWidth: '250px',
    sidebarWidthCollapsed: '70px',
    headerHeight: '60px',
  },
  borderRadius: '8px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  transition: '0.3s ease',
};

export const darkTheme: Theme = {
  colors: {
    primary: '#4361ee',
    primaryLight: '#4895ef',
    secondary: '#3f37c9',
    success: '#4cc9f0',
    danger: '#f72585',
    warning: '#f8961e',
    info: '#4895ef',
    background: '#121212',
    surface: '#1e1e2c',
    text: '#f8f9fa',
    textSecondary: '#a1a1aa',
    border: '#2e2e3a',
    sidebarBackground: '#0f0f17',
    sidebarText: '#f8f9fa',
    headerBackground: '#1e1e2c',
  },
  sizes: {
    sidebarWidth: '250px',
    sidebarWidthCollapsed: '70px',
    headerHeight: '60px',
  },
  borderRadius: '8px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
  transition: '0.3s ease',
};