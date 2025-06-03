import React, {useState, useEffect} from "react";
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
import {AutocompleteMunicipio} from "../../components/AutocompleteMunicipio.tsx";
import {useLocation, useNavigate} from "react-router-dom";

const initialFormState = {
    id: "",
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
    const [isEditing, setIsEditing] = useState(false);
    const {isSidebarOpen} = useSidebar();
    const theme = useTheme();
    const location = useLocation();
    const navigate = useNavigate();

    // Efeito para carregar dados da instituição se estiver editando
    useEffect(() => {
        // Verifica se há uma instituição sendo passada pelo state da rota
        if (location.state) {
            const institutionData = location.state;

            // Preencher o formulário com os dados da instituição
            setForm({
                id: institutionData.id || "",
                nome: institutionData.nome || "",
                municipioNome: institutionData.municipio?.nome || "",
                municipioUF: institutionData.municipio?.uf || "",
                tipoInstituicaoEnsino: institutionData.tipoInstituicaoEnsino || "",
                totalAlunos: institutionData.totalAlunos?.toString() || "",
                ativo: institutionData.ativo !== undefined ? institutionData.ativo : true
            });

            // Marcar que estamos em modo de edição
            setIsEditing(true);
        }
    }, [location]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const {name, value, type} = e.target;
        
        // Limpa o município quando o UF mudar
        if (name === "municipioUF") {
            setForm((prev) => ({
                ...prev,
                municipioUF: value,
                municipioNome: ""
            }));
        } else {
            setForm((prev) => ({
                ...prev,
                [name]: type === "checkbox" && 'checked' in e.target ? (e.target as HTMLInputElement).checked : value,
            }));
        }
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSubmitted(true);

        // Preparar objeto a ser enviado para a API
        const instituicaoPayload = {
            id: form.id,
            nome: form.nome,
            municipio: {
                nome: form.municipioNome,
                uf: form.municipioUF
            },
            tipoInstituicaoEnsino: form.tipoInstituicaoEnsino,
            totalAlunos: Number(form.totalAlunos),
            ativo: form.ativo
        };
        console.log(instituicaoPayload);

        // Aqui você deve chamar a API correspondente (POST para criar, PUT para editar)
        // Por exemplo:
        // if (isEditing) {
        //     api.put(`/instituicoes/${form.id}`, instituicaoPayload);
        // } else {
        //     api.post('/instituicoes', instituicaoPayload);
        // }

        // Simulação de sucesso para exemplo
        setTimeout(() => {
            setSubmitted(false);
            // Redirecionar de volta para a lista após salvar
            navigate('/Instituicoes');
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
                        <h1>{isEditing ? "Edição de Instituição de Ensino" : "Cadastro de Instituição de Ensino"}</h1>
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
                                UF:
                                <select
                                    name="municipioUF"
                                    value={form.municipioUF}
                                    onChange={handleChange}
                                    required
                                    disabled={submitted}
                                    style={{
                                        width: "80%",
                                        padding: 8,
                                        marginTop: 4,
                                        marginBottom: 4,
                                        display: "block"
                                    }}
                                >
                                    <option value="">Selecione...</option>
                                    <option value="AC">Acre (AC)</option>
                                    <option value="AL">Alagoas (AL)</option>
                                    <option value="AP">Amapá (AP)</option>
                                    <option value="AM">Amazonas (AM)</option>
                                    <option value="BA">Bahia (BA)</option>
                                    <option value="CE">Ceará (CE)</option>
                                    <option value="DF">Distrito Federal (DF)</option>
                                    <option value="ES">Espírito Santo (ES)</option>
                                    <option value="GO">Goiás (GO)</option>
                                    <option value="MA">Maranhão (MA)</option>
                                    <option value="MT">Mato Grosso (MT)</option>
                                    <option value="MS">Mato Grosso do Sul (MS)</option>
                                    <option value="MG">Minas Gerais (MG)</option>
                                    <option value="PA">Pará (PA)</option>
                                    <option value="PB">Paraíba (PB)</option>
                                    <option value="PR">Paraná (PR)</option>
                                    <option value="PE">Pernambuco (PE)</option>
                                    <option value="PI">Piauí (PI)</option>
                                    <option value="RJ">Rio de Janeiro (RJ)</option>
                                    <option value="RN">Rio Grande do Norte (RN)</option>
                                    <option value="RS">Rio Grande do Sul (RS)</option>
                                    <option value="RO">Rondônia (RO)</option>
                                    <option value="RR">Roraima (RR)</option>
                                    <option value="SC">Santa Catarina (SC)</option>
                                    <option value="SP">São Paulo (SP)</option>
                                    <option value="SE">Sergipe (SE)</option>
                                    <option value="TO">Tocantins (TO)</option>
                                </select>
                            </StatLabel>
                            <StatLabel>
                                Município:
                                <AutocompleteMunicipio
                                    name="municipioNome"
                                    value={form.municipioNome}
                                    onChange={handleChange}
                                    uf={form.municipioUF || undefined}
                                    required
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
                                    <option>Municipal</option>
                                    <option>Estadual</option>
                                    <option>Federal</option>
                                    <option>Militar</option>
                                    <option>Privada</option>
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
                            <ButtonStyled 
                                type="button" 
                                onClick={() => navigate('/Instituicoes')}
                                style={{marginRight: 16, background: '#6c757d'}}
                                disabled={submitted}
                            >
                                Cancelar
                            </ButtonStyled>
                            <ButtonStyled type="submit" disabled={submitted}>
                                {submitted ? "Salvando..." : (isEditing ? "Atualizar" : "Cadastrar")}
                            </ButtonStyled>
                        </div>
                        {submitted && (
                            <div style={{marginTop: 16, color: "#228B22"}}>
                                Instituição {isEditing ? "atualizada" : "cadastrada"} com sucesso!
                            </div>
                        )}
                    </form>
                </CardWrapper>
            </>
        </>
    );
};

export default CadastroInstituicao;