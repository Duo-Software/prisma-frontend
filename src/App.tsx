import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import GlobalStyles from './styles/GlobalStyles.ts';
import { darkTheme } from './styles/theme';
import Instituicoes from "./pages/intituicao/Instituicoes.tsx";
import CadastroInstituicao from "./pages/intituicao/CadastroInstituicao.tsx";
import Turmas from "./pages/turmas/Turmas";
import CadastroTurma from "./pages/turmas/CadastroTurma";
import Profissionais from "./pages/profissional/Profissionais.tsx";
import CadastroProfissional from "./pages/profissional/CadastroProfissional.tsx";
import Login from "./pages/logon/login.tsx";
import Alunos from "./pages/aluno/Alunos.tsx";
import Relatorios from "./pages/relatorios/Relatorios.tsx";
import RelatorioAlunosPdf from "./pages/relatorios/RelatorioAlunosPdf.tsx";
import ResponderFormulario from './pages/formulario/ResponderFormulario';
import GerenciamentoFormularios from "./pages/formulario/GerenciamentoFormularios.tsx";
import VisualisarFormulario from "./pages/formulario/VisualisarFormulario.tsx";
import { AuthProvider } from './hooks/useAuth';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ThemeProvider as CustomThemeProvider } from './context/ThemeContext';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import {CadastroAluno} from "./pages/aluno/CadastroAluno.tsx";


function App() {
    return (
        <CustomThemeProvider>
            <StyledThemeProvider theme={darkTheme}>
                <Router>
                    <AuthProvider>
                        <GlobalStyles theme={darkTheme} />
                        <Routes>
                            <Route path="/login" element={<Login />} />

                            {/* Rotas Protegidas */}
                            <Route element={<ProtectedRoute />}>
                                <Route element={<Layout />}>
                                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                                    <Route path="/dashboard" element={<Dashboard />} />
                                    <Route path="/profile" element={<div>Página de Perfil</div>} />
                                    <Route path="/settings" element={<div>Página de Configurações</div>} />
                                    <Route path="/instituicoes" element={<Instituicoes />} />
                                    <Route path="/instituicoes/cadastro-instituicao" element={<CadastroInstituicao />} />
                                    <Route path="/turmas" element={<Turmas />} />
                                    <Route path="/turmas/cadastro-turma" element={<CadastroTurma />} />
                                    <Route path="/profissionais" element={<Profissionais />} />
                                    <Route path="/profissionais/cadastro-profissional" element={<CadastroProfissional />} />
                                    <Route path="/alunos" element={<Alunos />} />
                                    <Route path="/alunos/cadastro-aluno" element={<CadastroAluno />} />
                                    <Route path="/relatorios" element={<Relatorios />} />
                                    <Route path="/relatorios/relatorio-alunos-pdf" element={<RelatorioAlunosPdf />} />
                                    <Route path="/formulario/responder/:idFormulario/:idAluno" element={<ResponderFormulario />} />
                                    <Route path="/formulario/visualizar/:id" element={<VisualisarFormulario />} />
                                    <Route path="/formularios" element={<GerenciamentoFormularios />} />
                                </Route>
                            </Route>
                        </Routes>
                    </AuthProvider>
                </Router>
            </StyledThemeProvider>
        </CustomThemeProvider>
    );
}

export default App;
