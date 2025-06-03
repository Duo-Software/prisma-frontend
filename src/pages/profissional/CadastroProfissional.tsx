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
import {useLocation, useNavigate} from "react-router-dom";
import {AutocompleteInstituicao} from "../../components/AutocompleteInstituicao.tsx";
import {municipiosBrasileiros} from "../../mocks/municipios-mock.ts";
import { Etnia } from "../../mocks/etnia.ts";
import { Cargo } from "../../mocks/cargo.ts";

const initialFormState = {
    id: "",
    pessoa: {
        id: "",
        nome: "",
        cpf: "",
        sexo: "",
        etnia: "",
        dataNascimento: "",
        paisNaturalidade: { id: "", nome: "" },
        ufNaturalidade: { id: "", sigla: "", nome: "" },
        municipioNaturalidade: { id: "", nome: "", uf: "" },
        nomeMae: "",
        nomePai: "",
        endereco: "",
        email: "",
        telefone: "",
        dataCadastro: "",
        dataAlteracao: ""
    },
    instituicaoNome: "",
    instituicaoId: "",
    cargo: "",
    ativo: true
};

const CadastroProfissional: React.FC = () => {
    const [form, setForm] = useState(initialFormState);
    const [submitted, setSubmitted] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const {isSidebarOpen} = useSidebar();
    const theme = useTheme();
    const location = useLocation();
    const navigate = useNavigate();

    // Efeito para carregar dados do profissional se estiver editando
    useEffect(() => {
        // Verifica se há um profissional sendo passado pelo state da rota
        if (location.state) {
            const profissionalData = location.state;
            const pessoaData = profissionalData.pessoa || {};

            // Preencher o formulário com os dados do profissional
            setForm({
                id: profissionalData.id || "",
                pessoa: {
                    id: pessoaData.id || "",
                    nome: pessoaData.nome || "",
                    cpf: pessoaData.cpf || "",
                    sexo: pessoaData.sexo || "",
                    etnia: pessoaData.etnia || "",
                    dataNascimento: pessoaData.dataNascimento || "",
                    paisNaturalidade: pessoaData.paisNaturalidade || { id: "", nome: "" },
                    ufNaturalidade: pessoaData.ufNaturalidade || { id: "", sigla: "", nome: "" },
                    municipioNaturalidade: pessoaData.municipioNaturalidade || { id: "", nome: "", uf: "" },
                    nomeMae: pessoaData.nomeMae || "",
                    nomePai: pessoaData.nomePai || "",
                    endereco: pessoaData.endereco || "",
                    email: pessoaData.email || "",
                    telefone: pessoaData.telefone || "",
                    dataCadastro: pessoaData.dataCadastro || "",
                    dataAlteracao: pessoaData.dataAlteracao || ""
                },
                instituicaoNome: profissionalData.instituicaoEnsino?.nome || "",
                instituicaoId: profissionalData.instituicaoEnsino?.id || "",
                cargo: profissionalData.cargo || "",
                ativo: profissionalData.ativo !== undefined ? profissionalData.ativo : true
            });

            // Marcar que estamos em modo de edição
            setIsEditing(true);
        }
    }, [location]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const {name, value, type} = e.target;

        if (name.startsWith('pessoa.')) {
            const pessoaField = name.split('.')[1];
            setForm((prev) => ({
                ...prev,
                pessoa: {
                    ...prev.pessoa,
                    [pessoaField]: value
                }
            }));
        } else {
            setForm((prev) => ({
                ...prev,
                [name]: type === "checkbox" && 'checked' in e.target ? (e.target as HTMLInputElement).checked : value,
            }));
        }
    }

    function handleInstituicaoSelect(instituicao: any) {
        setForm((prev) => ({
            ...prev,
            instituicaoId: instituicao.id,
            instituicaoNome: instituicao.nome
        }));
    }

    function handleUfSelect(e: React.ChangeEvent<HTMLSelectElement>) {
        const ufSigla = e.target.value;
        setForm((prev) => ({
            ...prev,
            pessoa: {
                ...prev.pessoa,
                ufNaturalidade: {
                    id: "",  // Idealmente você buscaria o ID real da UF
                    sigla: ufSigla,
                    nome: ufSigla ? e.target.options[e.target.selectedIndex].text : ""
                },
                municipioNaturalidade: {
                    id: "",
                    nome: "",
                    uf: ufSigla
                }
            }
        }));
    }

    function handleMunicipioSelect(e: React.ChangeEvent<HTMLSelectElement>) {
        const municipioNome = e.target.value;
        const ufSigla = form.pessoa.ufNaturalidade.sigla;
        const municipio = municipiosBrasileiros.find(m => m.nome === municipioNome && m.uf === ufSigla);

        if (municipio) {
            setForm((prev) => ({
                ...prev,
                pessoa: {
                    ...prev.pessoa,
                    municipioNaturalidade: {
                        id: "", // Idealmente, você buscaria o ID real do município
                        nome: municipio.nome,
                        uf: municipio.uf
                    }
                }
            }));
        }
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSubmitted(true);

        // Preparar objeto a ser enviado para a API
        const profissionalPayload = {
            id: form.id,
            pessoa: {
                id: form.pessoa.id,
                nome: form.pessoa.nome,
                cpf: form.pessoa.cpf,
                sexo: form.pessoa.sexo,
                etnia: form.pessoa.etnia,
                dataNascimento: form.pessoa.dataNascimento,
                paisNaturalidade: form.pessoa.paisNaturalidade,
                ufNaturalidade: form.pessoa.ufNaturalidade,
                municipioNaturalidade: form.pessoa.municipioNaturalidade,
                nomeMae: form.pessoa.nomeMae,
                nomePai: form.pessoa.nomePai,
                endereco: form.pessoa.endereco,
                email: form.pessoa.email,
                telefone: form.pessoa.telefone,
                dataCadastro: form.pessoa.dataCadastro || new Date().toISOString(),
                dataAlteracao: new Date().toISOString()
            },
            instituicaoEnsino: {
                id: form.instituicaoId
            },
            cargo: form.cargo,
            ativo: form.ativo
        };

        console.log(profissionalPayload);

        // Aqui você deve chamar a API correspondente (POST para criar, PUT para editar)
        // Por exemplo:
        // if (isEditing) {
        //     api.put(`/profissionais/${form.id}`, profissionalPayload);
        // } else {
        //     api.post('/profissionais', profissionalPayload);
        // }

        // Simulação de sucesso para exemplo
        setTimeout(() => {
            setSubmitted(false);
            // Redirecionar de volta para a lista após salvar
            navigate('/profissionais');
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
                        <h1>{isEditing ? "Edição de Profissional" : "Cadastro de Profissional"}</h1>
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
                                    name="pessoa.nome"
                                    value={form.pessoa.nome}
                                    onChange={handleChange}
                                    required
                                    disabled={submitted}
                                />
                            </StatLabel>
                            <StatLabel>
                                CPF:
                                <InputPadrao
                                    type="text"
                                    name="pessoa.cpf"
                                    value={form.pessoa.cpf}
                                    onChange={handleChange}
                                    required
                                    disabled={submitted}
                                />
                            </StatLabel>
                            <StatLabel>
                                Sexo:
                                <select
                                    name="pessoa.sexo"
                                    value={form.pessoa.sexo}
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
                                    <option value="M">Masculino</option>
                                    <option value="F">Feminino</option>
                                </select>
                            </StatLabel>
                            <StatLabel>
                                Etnia:
                                <select
                                    name="pessoa.etnia"
                                    value={form.pessoa.etnia}
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
                                    {Object.values(Etnia).map(etnia => (
                                        <option key={etnia} value={etnia}>{etnia}</option>
                                    ))}
                                </select>
                            </StatLabel>
                            <StatLabel>
                                Data de Nascimento:
                                <InputPadrao
                                    type="date"
                                    name="pessoa.dataNascimento"
                                    value={form.pessoa.dataNascimento}
                                    onChange={handleChange}
                                    required
                                    disabled={submitted}
                                />
                            </StatLabel>
                            <StatLabel>
                                Nome da Mãe:
                                <InputPadrao
                                    type="text"
                                    name="pessoa.nomeMae"
                                    value={form.pessoa.nomeMae}
                                    onChange={handleChange}
                                    required
                                    disabled={submitted}
                                />
                            </StatLabel>
                            <StatLabel>
                                Nome do Pai:
                                <InputPadrao
                                    type="text"
                                    name="pessoa.nomePai"
                                    value={form.pessoa.nomePai}
                                    onChange={handleChange}
                                    disabled={submitted}
                                />
                            </StatLabel>
                            <StatLabel>
                                Endereço:
                                <InputPadrao
                                    type="text"
                                    name="pessoa.endereco"
                                    value={form.pessoa.endereco}
                                    onChange={handleChange}
                                    required
                                    disabled={submitted}
                                />
                            </StatLabel>
                            <StatLabel>
                                Email:
                                <InputPadrao
                                    type="email"
                                    name="pessoa.email"
                                    value={form.pessoa.email}
                                    onChange={handleChange}
                                    required
                                    disabled={submitted}
                                />
                            </StatLabel>
                            <StatLabel>
                                Telefone:
                                <InputPadrao
                                    type="tel"
                                    name="pessoa.telefone"
                                    value={form.pessoa.telefone}
                                    onChange={handleChange}
                                    required
                                    disabled={submitted}
                                />
                            </StatLabel>
                            <StatLabel>
                                País de Naturalidade:
                                <InputPadrao
                                    type="text"
                                    name="pessoa.paisNaturalidade.nome"
                                    value={form.pessoa.paisNaturalidade.nome}
                                    onChange={handleChange}
                                    required
                                    disabled={submitted}
                                />
                                                            </StatLabel>
                                                            <StatLabel>
                                UF de Naturalidade:
                                <select
                                    name="pessoa.ufNaturalidade.sigla"
                                    value={form.pessoa.ufNaturalidade.sigla}
                                    onChange={handleUfSelect}
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
                                    <option value="AC">Acre</option>
                                    <option value="AL">Alagoas</option>
                                    <option value="AP">Amapá</option>
                                    <option value="AM">Amazonas</option>
                                    <option value="BA">Bahia</option>
                                    <option value="CE">Ceará</option>
                                    <option value="DF">Distrito Federal</option>
                                    <option value="ES">Espírito Santo</option>
                                    <option value="GO">Goiás</option>
                                    <option value="MA">Maranhão</option>
                                    <option value="MT">Mato Grosso</option>
                                    <option value="MS">Mato Grosso do Sul</option>
                                    <option value="MG">Minas Gerais</option>
                                    <option value="PA">Pará</option>
                                    <option value="PB">Paraíba</option>
                                    <option value="PR">Paraná</option>
                                    <option value="PE">Pernambuco</option>
                                    <option value="PI">Piauí</option>
                                    <option value="RJ">Rio de Janeiro</option>
                                    <option value="RN">Rio Grande do Norte</option>
                                    <option value="RS">Rio Grande do Sul</option>
                                    <option value="RO">Rondônia</option>
                                    <option value="RR">Roraima</option>
                                    <option value="SC">Santa Catarina</option>
                                    <option value="SP">São Paulo</option>
                                    <option value="SE">Sergipe</option>
                                    <option value="TO">Tocantins</option>
                                </select>
                            </StatLabel>
                            <StatLabel>
                                Município de Naturalidade:
                                <select
                                    name="pessoa.municipioNaturalidade.nome"
                                    value={form.pessoa.municipioNaturalidade.nome}
                                    onChange={handleMunicipioSelect}
                                    required
                                    disabled={submitted || !form.pessoa.ufNaturalidade.sigla}
                                    style={{
                                        width: "80%",
                                        padding: 8,
                                        marginTop: 4,
                                        marginBottom: 4,
                                        display: "block"
                                    }}
                                >
                                    <option value="">Selecione...</option>
                                    {municipiosBrasileiros
                                        .filter(m => m.uf === form.pessoa.ufNaturalidade.sigla)
                                        .map(municipio => (
                                            <option key={municipio.nome} value={municipio.nome}>{municipio.nome}</option>
                                        ))
                                    }
                                </select>
                            </StatLabel>
                            <StatLabel>
                                Instituição de Ensino:
                                <AutocompleteInstituicao
                                    name="instituicaoNome"
                                    value={form.instituicaoNome}
                                    onChange={handleChange}
                                    onSelect={handleInstituicaoSelect}
                                    required
                                    disabled={submitted}
                                />
                            </StatLabel>
                            <StatLabel>
                                Cargo:
                                <select
                                    name="cargo"
                                    value={form.cargo}
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
                                    {Object.values(Cargo).map(cargo => (
                                        <option key={cargo} value={cargo}>{cargo}</option>
                                    ))}
                                </select>
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
                                Ativo
                            </StatLabel>
                        </StatContent>
                        <div style={{marginTop: 24, textAlign: "right"}}>
                            <ButtonStyled 
                                type="button" 
                                onClick={() => navigate('/profissionais')}
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
                                Profissional {isEditing ? "atualizado" : "cadastrado"} com sucesso!
                            </div>
                        )}
                    </form>
                </CardWrapper>
            </>
        </>
    );
};

export default CadastroProfissional;
