import React, { createContext, useContext, type ReactNode } from 'react';
import { lightTheme, darkTheme } from '../styles/theme';
import type { Theme, ThemeMode } from '../types';
import useLocalStorage from '../hooks/useLocalStorage';

interface ThemeContextType {
  themeMode: ThemeMode;
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [themeMode, setThemeMode] = useLocalStorage<ThemeMode>('theme', 'light');
  const theme = themeMode === 'light' ? lightTheme : darkTheme;
  
  const toggleTheme = () => {
    setThemeMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
  };
  
  return (
    <ThemeContext.Provider value={{ themeMode, theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const returnTheme = (): any => {
  const temausado = localStorage.getItem('theme');
  return temausado === 'light' ? lightTheme : darkTheme;
}