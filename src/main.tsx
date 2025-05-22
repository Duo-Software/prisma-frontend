import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {ThemeProvider} from "./context/ThemeContext.tsx";

function ThemeApp() {

    return (
        <ThemeProvider>
            <App/>
        </ThemeProvider>
    );
}

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeApp />
    </StrictMode>,
)


