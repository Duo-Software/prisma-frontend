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
import {atualizarInstituicao, criarInstituicao, type Instituicao} from "../../services/instituicaoService.ts";

const initialFormState = {
    id: 0,
    nome: "",
    sigla: "",
    municipioId: "",
    municipioNome: "",
    municipioUF: "",
    municipioUFId: "",
    tipoInstituicaoEnsino: "",
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

    const UFS = [
        // { id: 1, nome: "Acre", sigla: "AC" },ok
        // { id: 2, nome: "Alagoas", sigla: "AL" },
        // { id: 3, nome: "Amapá", sigla: "AP" },
        // { id: 4, nome: "Amazonas", sigla: "AM" },
        // { id: 5, nome: "Bahia", sigla: "BA" },
        // { id: 6, nome: "Ceará", sigla: "CE" },
        // { id: 7, nome: "Distrito Federal", sigla: "DF" },
        // { id: 8, nome: "Espírito Santo", sigla: "ES" },
        // { id: 9, nome: "Goiás", sigla: "GO" },
        // { id: 10, nome: "Maranhão", sigla: "MA" },
        { id: 11, nome: "Mato Grosso", sigla: "MT" },
        // { id: 12, nome: "Mato Grosso do Sul", sigla: "MS" },
        // { id: 13, nome: "Minas Gerais", sigla: "MG" },
        // { id: 14, nome: "Pará", sigla: "PA" },
        // { id: 15, nome: "Paraíba", sigla: "PB" },
        // { id: 16, nome: "Paraná", sigla: "PR" },
        // { id: 17, nome: "Pernambuco", sigla: "PE" },
        // { id: 18, nome: "Piauí", sigla: "PI" },
        // { id: 19, nome: "Rio de Janeiro", sigla: "RJ" },
        // { id: 20, nome: "Rio Grande do Norte", sigla: "RN" },
        // { id: 21, nome: "Rio Grande do Sul", sigla: "RS" },
        // { id: 22, nome: "Rondônia", sigla: "RO" },
        // { id: 23, nome: "Roraima", sigla: "RR" },
        // { id: 24, nome: "Santa Catarina", sigla: "SC" },
        // { id: 25, nome: "São Paulo", sigla: "SP" },
        // { id: 26, nome: "Sergipe", sigla: "SE" },
        // { id: 27, nome: "Tocantins", sigla: "TO" },
    ];


    // Efeito para carregar dados da instituição se estiver editando
    useEffect(() => {
        // Verifica se há uma instituição sendo passada pelo state da rota
        if (location.state) {
            const institutionData: Instituicao = location.state;

            // Preencher o formulário com os dados da instituição
            setForm({
                id: institutionData.id,
                nome: institutionData.nome || "",
                sigla: institutionData.sigla || "",
                municipioId: institutionData.municipio?.id?.toString() || "",
                municipioNome: institutionData.municipio?.nome || "",
                municipioUFId: institutionData.municipio?.unidadeFederativa.id?.toString() || "",
                municipioUF: institutionData.municipio?.unidadeFederativa.sigla || "",
                tipoInstituicaoEnsino: institutionData.tipoInstituicaoEnsino || "",
                ativo: institutionData.ativo !== undefined ? institutionData.ativo : true
            });

            // Marcar que estamos em modo de edição
            setIsEditing(true);
        }
    }, [location]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const {name, value, type} = e.target;

        // Quando mudar a UF (por id), atualiza o id e a sigla, e limpa o município
        if (name === "municipioUFId") {
            const uf = UFS.find(u => u.id.toString() === value);
            setForm((prev) => ({
                ...prev,
                municipioUFId: value,
                municipioUF: uf?.sigla || "",
                municipioNome: "",
                municipioId: "" // limpa id ao trocar a UF
            }));
            return;
        }

        // Se mudar a UF por sigla (compatibilidade, caso exista em algum ponto)
        if (name === "municipioUF") {
            const uf = UFS.find(u => u.sigla === value);
            setForm((prev) => ({
                ...prev,
                municipioUF: value,
                municipioUFId: uf ? uf.id.toString() : "",
                municipioNome: "",
                municipioId: "" // limpa id ao trocar a UF
            }));
            return;
        }

        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" && 'checked' in e.target ? (e.target as HTMLInputElement).checked : value,
        }));
    }

    // Callback disparado pelo Autocomplete ao selecionar um município
    function handleMunicipioSelect(m: { id: number; nome: string; uf: string }) {
        setForm(prev => ({
            ...prev,
            municipioId: m.id.toString(),
            municipioNome: m.nome,
            municipioUF: m.uf
        }));
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSubmitted(true);

        // Preparar objeto a ser enviado para a API
        const ufObj = UFS.find(u => u.sigla === form.municipioUF);
        const instituicaoPayload = {
            nome: form.nome,
            sigla: form.sigla,
            municipio: {
                id: Number(form.municipioId),
                nome: form.municipioNome,
                unidadeFederativa: ufObj
                    ? { id: ufObj.id, nome: ufObj.nome, sigla: ufObj.sigla }
                    : { id: 0, nome: "", sigla: "" }
            },
            tipoInstituicaoEnsino: form.tipoInstituicaoEnsino,
            ativo: form.ativo
        };

        (async () => {
            try {
                if (isEditing) {
                    await atualizarInstituicao(form.id, instituicaoPayload);
                } else {
                    await criarInstituicao(instituicaoPayload);
                }
                setSubmitted(false);
                navigate('/Instituicoes');
            } catch (error) {
                console.error('Erro ao salvar instituição:', error);
                setSubmitted(false);
                alert('Erro ao salvar instituição. Tente novamente.');
            }
        })();

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
                                    style={{ textTransform: "uppercase" }}
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
                                    {/*<option value="AC">Acre (AC)</option>*/}
                                    {/*<option value="AL">Alagoas (AL)</option>*/}
                                    {/*<option value="AP">Amapá (AP)</option>*/}
                                    {/*<option value="AM">Amazonas (AM)</option>*/}
                                    {/*<option value="BA">Bahia (BA)</option>*/}
                                    {/*<option value="CE">Ceará (CE)</option>*/}
                                    {/*<option value="DF">Distrito Federal (DF)</option>*/}
                                    {/*<option value="ES">Espírito Santo (ES)</option>*/}
                                    {/*<option value="GO">Goiás (GO)</option>*/}
                                    {/*<option value="MA">Maranhão (MA)</option>*/}
                                    <option value="MT">Mato Grosso (MT)</option>
                                    {/*<option value="MS">Mato Grosso do Sul (MS)</option>*/}
                                    {/*<option value="MG">Minas Gerais (MG)</option>*/}
                                    {/*<option value="PA">Pará (PA)</option>*/}
                                    {/*<option value="PB">Paraíba (PB)</option>*/}
                                    {/*<option value="PR">Paraná (PR)</option>*/}
                                    {/*<option value="PE">Pernambuco (PE)</option>*/}
                                    {/*<option value="PI">Piauí (PI)</option>*/}
                                    {/*<option value="RJ">Rio de Janeiro (RJ)</option>*/}
                                    {/*<option value="RN">Rio Grande do Norte (RN)</option>*/}
                                    {/*<option value="RS">Rio Grande do Sul (RS)</option>*/}
                                    {/*<option value="RO">Rondônia (RO)</option>*/}
                                    {/*<option value="RR">Roraima (RR)</option>*/}
                                    {/*<option value="SC">Santa Catarina (SC)</option>*/}
                                    {/*<option value="SP">São Paulo (SP)</option>*/}
                                    {/*<option value="SE">Sergipe (SE)</option>*/}
                                    {/*<option value="TO">Tocantins (TO)</option>*/}
                                </select>
                            </StatLabel>
                            <StatLabel>
                                Município:
                                <AutocompleteMunicipio
                                    id="municipio-input"
                                    name="municipioNome"
                                    value={form.municipioNome}
                                    onChange={handleChange}
                                    onSelect={handleMunicipioSelect}
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