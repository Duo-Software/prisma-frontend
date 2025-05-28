import React, {useState} from "react";
import {
    StatContent,
    StatLabel,
    DefaultContainer,
    CardTitle,
    FixedHeader,
    ButtonStyled,
    CardWrapper
} from "../../components/layout/DefaultComponents.tsx";
import {useSidebar} from "../../context/SidebarContext.tsx";
import {useTheme} from "styled-components";
import {InputPadrao} from "../../components/layout/InputPadrao.tsx";

const initialFormState = {
    nome: "",
    municipioNome: "",
    municipioUF: "",
    tipoInstituicaoEnsino: "",
    totalAlunos: "",
    ativo: true
};

const CadastroInstituicao: React.FC = () => {
    const [form, setForm] = useState(initialFormState);
    const [submitted, setSubmitted] = useState(false);
    const {isSidebarOpen} = useSidebar();
    const theme = useTheme();

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const {name, value, type} = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" && 'checked' in e.target ? (e.target as HTMLInputElement).checked : value,
        }));
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSubmitted(true);
        // Aqui você pode chamar uma API ou atualizar o estado global.
        // Resetar formulário para exemplo
        setTimeout(() => {
            setForm(initialFormState);
            setSubmitted(false);
        }, 1500);
    }

    return (
        <>
            <DefaultContainer>
                <FixedHeader
                    $isSidebarOpen={isSidebarOpen}
                    $sidebarWidth={theme.sizes.sidebarWidth}
                    $sidebarCollapsedWidth={theme.sizes.sidebarWidthCollapsed}
                >
                    <CardTitle>
                        <h1>Cadastro de Instituição de Ensino</h1>
                    </CardTitle>
                </FixedHeader>
            </DefaultContainer>

            <>
                <CardWrapper
                    $isSidebarOpen={isSidebarOpen}
                    $sidebarWidth={theme.sizes.sidebarWidth}
                    $sidebarCollapsedWidth={theme.sizes.sidebarWidthCollapsed}
                >
                    <form onSubmit={handleSubmit}>
                        <StatContent>
                            <StatLabel>
                                Nome:
                                <InputPadrao
                                    type="text"
                                    name="nome"
                                    value={form.nome}
                                    onChange={handleChange}
                                    required
                                    disabled={submitted}
                                />
                            </StatLabel>
                            <StatLabel>
                                Município:
                                <InputPadrao
                                    type="text"
                                    name="municipioNome"
                                    value={form.municipioNome}
                                    onChange={handleChange}
                                    required
                                    disabled={submitted}
                                />
                            </StatLabel>
                            <StatLabel>
                                UF:
                                <InputPadrao
                                    type="text"
                                    name="municipioUF"
                                    value={form.municipioUF}
                                    onChange={handleChange}
                                    required
                                    maxLength={2}
                                    disabled={submitted}
                                />
                            </StatLabel>
                            <StatLabel>
                                Tipo de Instituição:
                                <select
                                    name="tipoInstituicaoEnsino"
                                    value={form.tipoInstituicaoEnsino}
                                    onChange={handleChange}
                                    required
                                    disabled={submitted}
                                    style={{  width: "80%",
                                        padding: 8,
                                        marginTop: 4,
                                        marginBottom: 4, display: "block"}}
                                >
                                    <option value="">Selecione...</option>
                                    <option>Universidade</option>
                                    <option>Faculdade</option>
                                    <option>Instituto</option>
                                    <option>Centro Universitário</option>
                                    <option>Outro</option>
                                </select>
                            </StatLabel>
                            <StatLabel>
                                Total de Alunos:
                                <InputPadrao
                                    type="number"
                                    name="totalAlunos"
                                    value={form.totalAlunos}
                                    onChange={handleChange}
                                    min={0}
                                    required
                                    disabled={submitted}
                                />
                            </StatLabel>
                            <StatLabel style={{display: "flex", alignItems: "center"}}>
                                <input
                                    type="checkbox"
                                    name="ativo"
                                    checked={form.ativo}
                                    onChange={handleChange}
                                    disabled={submitted}
                                    style={{marginRight: 8}}
                                />
                                Ativa
                            </StatLabel>
                        </StatContent>
                        <div style={{marginTop: 24, textAlign: "right"}}>
                            <ButtonStyled type="submit" disabled={submitted}>
                                {submitted ? "Salvando..." : "Cadastrar"}
                            </ButtonStyled>
                        </div>
                        {submitted && (
                            <div style={{marginTop: 16, color: "#228B22"}}>
                                Instituição cadastrada com sucesso!
                            </div>
                        )}
                    </form>
                </CardWrapper>
            </>
        </>
    );
};

export default CadastroInstituicao;