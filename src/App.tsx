import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import GlobalStyles from './styles/GlobalStyles.ts';
import {darkTheme} from './styles/theme';
import Instituicoes from "./pages/intituicao/Instituicoes.tsx";
import CadastroInstituicao from "./pages/intituicao/CadastroInstituicao.tsx";


function App() {
    return (
            <Router>
                <GlobalStyles theme={darkTheme} />
                <Layout>
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/profile" element={<div>Página de Perfil</div>} />
                        <Route path="/settings" element={<div>Página de Configurações</div>} />
                        <Route path="/instituicoes" element={<Instituicoes />} />
                        <Route path="/instituicoes/cadastro-instituicao" element={<CadastroInstituicao />} />
                    </Routes>
                </Layout>
            </Router>
    );
}

export default App
