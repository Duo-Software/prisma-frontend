export type ThemeMode = 'light' | 'dark';

export interface Theme {
    colors: {
        primary: string;
        primaryLight: string;
        secondary: string;
        success: string;
        danger: string;
        warning: string;
        info: string;
        background: string;
        surface: string;
        text: string;
        textSecondary: string;
        border: string;
        sidebarBackground: string;
        sidebarText: string;
        headerBackground: string;
    };
    sizes: {
        sidebarWidth: string;
        sidebarWidthCollapsed: string;
        headerHeight: string;
        fixedHeaderHeight: string,

    };
    borderRadius: string;
    boxShadow: string;
    transition: string;
}