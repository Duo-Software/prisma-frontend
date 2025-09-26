import React, { useState, useEffect } from "react";
import {
    StatLabel,
    DefaultContainer,
    CardTitle,
    FixedHeader,
    ButtonStyled,
    CardWrapper,
    CardFixed,
    CardGrid, StatValueContent
} from "../../components/layout/DefaultComponents.tsx";
import { useSidebar } from "../../context/SidebarContext.tsx";
import { useTheme } from "styled-components";
import { InputPadrao } from "../../components/layout/InputPadrao.tsx";
import { useLocation, useNavigate } from "react-router-dom";
import { buscarInstituicoes, type Instituicao } from "../../services/instituicaoService.ts";
import PessoaModal from "../../components/modal/PessoaModal.tsx";
import { buscarPessoaPorCpf, type Pessoa, formatarCpf } from "../../services/pessoaService.ts";
import styled from "styled-components";
import { CustomSelect } from "../../components/layout/CustomSelect.tsx";
import { Cargo } from "../../mocks/cargo.ts";
import { profissionalService } from "../../services/profissionalService";

const InfoLink = styled.span`
  color: ${({theme}) => theme.colors.primary};
  cursor: pointer;
  text-decoration: underline;
  margin-left: 10px;
  font-size: 0.9em;
  &:hover {
    color: ${({theme}) => theme.colors.primaryLight};
  }
`;

const SearchButton = styled(ButtonStyled)`
  padding: 8px 16px;
  margin-left: 10px;
  height: 36px;
`;

const initialPessoaState: Pessoa = {
  id: "",
  nome: "",
  cpf: "",
  sexo: "",
  etnia: undefined,
  dataNascimento: "",
  paisNaturalidade: undefined,
  ufNaturalidade: undefined,
  municipioNaturalidade: undefined,
  nomeMae: undefined,
  nomePai: undefined,
  endereco: undefined,
  email: undefined,
  telefone: undefined,
  dataCadastro: "",
  dataAlteracao: "",
  statusNecessidade: "NAO_INFORMADO"
};

type ProfissionalFormDef = {
    id: string | number | undefined,
    pessoa: Pessoa,
    instituicaoNome: string,
    instituicaoId: string | undefined,
    cargo: string,
    ativo: boolean
};

const initialFormState: ProfissionalFormDef = {
    id: undefined,
    pessoa: initialPessoaState,
    instituicaoNome: "",
    instituicaoId: undefined,
    cargo: "",
    ativo: true
};

const CadastroProfissional: React.FC = () => {
    const [form, setForm] = useState(initialFormState);
    const [submitted, setSubmitted] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cpfSearch, setCpfSearch] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [pessoaEncontrada, setPessoaEncontrada] = useState(false);
    const [buscaEfetuada, setBuscaEfetuada] = useState(false);
    const [instituicoes, setInstituicoes] = useState<Instituicao[]>([]);
    const { isSidebarOpen } = useSidebar();
    const theme = useTheme();
    const location = useLocation();
    const navigate = useNavigate();
    const [cpfInvalido, setCpfInvalido] = useState(false);

    // Efeito para carregar dados do profissional se estiver editando
    useEffect(() => {
        if (location.state) {
            const profissionalData = location.state;
            const pessoaData = profissionalData.pessoa || {};

            setForm({
                id: profissionalData.id || "",
                pessoa: {
                    ...initialPessoaState,
                    ...pessoaData
                },
                instituicaoNome: profissionalData.instituicaoEnsino?.nome || "",
                instituicaoId: profissionalData.instituicaoEnsino?.id?.toString() || undefined,
                cargo: profissionalData.cargo || "",
                ativo: profissionalData.ativo !== undefined ? profissionalData.ativo : true
            });

            setIsEditing(true);
            setPessoaEncontrada(true);
            setCpfSearch(pessoaData.cpf || "");
        }
    }, [location]);

    useEffect(() => {
        buscarInstituicoes()
            .then(setInstituicoes)
            .catch(() => alert("Erro ao carregar instituições!"));
    }, []);

    // Função para buscar pessoa por CPF
    const buscarPessoa = async () => {
        if (!cpfSearch || cpfSearch.length < 11) return;

        setBuscaEfetuada(true);
        setIsSearching(true);
        try {
            const resultado = await buscarPessoaPorCpf(cpfSearch);

            if (resultado.encontrado) {
                setForm(prev => ({
                    ...prev,
                    pessoa: resultado.pessoa as Pessoa
                }));
                setPessoaEncontrada(true);
            } else {
                setForm(prev => ({
                    ...prev,
                    pessoa: {
                        ...initialPessoaState,
                        cpf: formatarCpf(cpfSearch)
                    }
                }));
                setPessoaEncontrada(false);
                setIsModalOpen(true);
            }
        } catch (error) {
            console.error("Erro ao buscar pessoa por CPF:", error);
        } finally {
            setIsSearching(false);
        }
    };

    function validaCpf(strCpf: string): boolean {
        // Remove caracteres não numéricos
        const cpf = strCpf.replace(/\D/g, "");
        if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

        let sum = 0, rest;

        for (let i = 1; i <= 9; i++) sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
        rest = (sum * 10) % 11;
        if ((rest === 10) || (rest === 11)) rest = 0;
        if (rest !== parseInt(cpf.substring(9, 10))) return false;

        sum = 0;
        for (let i = 1; i <= 10; i++) sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
        rest = (sum * 10) % 11;
        if ((rest === 10) || (rest === 11)) rest = 0;
        if (rest !== parseInt(cpf.substring(10, 11))) return false;
        return true;
    }

    function onlyNumbers(str: string) {
        return (str || "").replace(/\D/g, "");
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target;

        if (name === "cpfSearch") {
            // Permite só números (ou seja, bloqueia qualquer não numérico) — faz a máscara depois
            const numeric = value.replace(/\D/g, "");
            // Máximo 11 dígitos numéricos
            const limited = numeric.slice(0, 11);

            // Aplica máscara se desejar mostrar no campo
            setCpfSearch(formatarCpf(limited));

            // Valida CPF só se completou 11 números
            setCpfInvalido(limited.length === 11 && !validaCpf(limited));
            return;
        }

        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    }

    function handleInstituicaoSelect(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { value } = e.target;
        setForm(prev => ({
            ...prev,
            instituicaoId: value
        }));
    }

    function handleSavePessoa(pessoaData: Pessoa) {
        setForm(prev => ({
            ...prev,
            pessoa: pessoaData
        }));
        setPessoaEncontrada(true);
        setIsModalOpen(false);
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!pessoaEncontrada || !form.pessoa.nome || !form.pessoa.cpf) {
            alert("É necessário selecionar ou cadastrar uma pessoa primeiro.");
            return;
        }
        if (!form.instituicaoId || !form.cargo) {
            alert("Preencha todos os campos obrigatórios.");
            return;
        }

        setSubmitted(true);

        const profissionalPayload = {
            id: form.id,
            pessoa: {
            ...form.pessoa,
            cpf: onlyNumbers(form.pessoa.cpf) // garantir CPF sem máscara
            },
            instituicaoEnsino: { id: form.instituicaoId },
            cargo: form.cargo,
            ativo: true
        };

        profissionalService.salvarProfissional
            ? profissionalService.salvarProfissional(profissionalPayload)
                .then(() => {
                setSubmitted(false);
                navigate('/profissionais');
                })
                .catch(() => {
                setSubmitted(false);
                alert('Erro ao salvar profissional');
                })
            : setTimeout(() => {
                setSubmitted(false);
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
                        <b>{isEditing ? "Edição de Profissional" : "Cadastro de Profissional"}</b>
                    </CardTitle>
                </FixedHeader>
            </DefaultContainer>

            <CardWrapper
                $isSidebarOpen={isSidebarOpen}
                $sidebarWidth={theme.sizes.sidebarWidth}
                $sidebarCollapsedWidth={theme.sizes.sidebarWidthCollapsed}
            >
                <form onSubmit={handleSubmit}>
                    {!isEditing && (
                        <CardFixed
                            style={{
                                padding: 20,
                                marginBottom: 20,
                                minWidth: 450,
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 16,
                                textAlign: "center",
                            }}
                        >
                            <StatLabel style={{ marginBottom: 0, marginRight: 8 }}>
                                Buscar por CPF:
                            </StatLabel>
                            <InputPadrao
                                type="text"
                                inputMode="numeric"
                                name="cpfSearch"
                                value={cpfSearch}
                                onChange={handleChange}
                                placeholder="Digite o CPF..."
                                disabled={submitted || isSearching}
                                style={{ marginLeft: 8 }}
                                maxLength={14}
                            />
                            <SearchButton
                                style={{ width: "90px" }}
                                type="button"
                                onClick={buscarPessoa}
                                disabled={submitted || isSearching || cpfSearch.replace(/\D/g, "").length < 11 || cpfInvalido}
                            >
                                {isSearching ? "Buscando..." : "Buscar"}
                            </SearchButton>
                            {cpfInvalido && (
                                <div style={{ color: "#dc3545", fontSize: 13, marginLeft: 10 }}>
                                    CPF inválido
                                </div>
                            )}
                        </CardFixed>
                    )}

                    {pessoaEncontrada ? (
                        <CardFixed style={{ padding: 20, minWidth: 450, marginBottom: 20, textAlign: "center" }}>
                            <h3 style={{ marginTop: 0, color: theme.colors.primary }}>Dados Pessoais</h3>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                                <StatLabel>Nome: <StatValueContent style={{ color: theme.colors.textSecondary }}>{form.pessoa.nome}</StatValueContent></StatLabel>
                                <StatLabel>CPF: <StatValueContent>{form.pessoa.cpf}</StatValueContent></StatLabel>
                                <StatLabel>
                                    Data de Nascimento:{" "}
                                    <StatValueContent>
                                        {form.pessoa.dataNascimento ? new Date(form.pessoa.dataNascimento).toLocaleDateString("pt-BR") : ""}
                                    </StatValueContent>
                                </StatLabel>
                                <StatLabel>Sexo: <StatValueContent>{form.pessoa.sexo === "M" ? "Masculino" : form.pessoa.sexo === "F" ? "Feminino" : ""}</StatValueContent></StatLabel>
                                {/* Inclua mais campos se desejar */}
                            </div>
                            <div style={{ textAlign: "right", marginTop: 10 }}>
                                <InfoLink onClick={() => setIsModalOpen(true)}>Editar dados pessoais</InfoLink>
                            </div>
                        </CardFixed>
                    ) : buscaEfetuada ? (
                        <CardFixed style={{ padding: 20, minWidth: 450, marginBottom: 20, textAlign: "center", color: theme.colors.text }}>
                            <p>Nenhuma pessoa encontrada. Busque por CPF ou cadastre uma nova pessoa.</p>
                            <ButtonStyled
                                type="button"
                                onClick={() => setIsModalOpen(true)}
                                disabled={submitted}
                            >
                                Cadastrar Nova Pessoa
                            </ButtonStyled>
                        </CardFixed>
                    ) : null}

                    {pessoaEncontrada && (
                        <CardGrid style={{ padding: 20, minWidth: 450, marginBottom: 20 }}>
                            <h3 style={{ textAlign: 'center', color: theme.colors.primary, gridColumn: '1 / -1' }}>
                                Dados Profissionais
                            </h3>
                            <StatLabel>
                                Instituição de Ensino:
                                <CustomSelect
                                    name="instituicaoId"
                                    value={form.instituicaoId || ""}
                                    onChange={handleInstituicaoSelect}
                                    required
                                    disabled={submitted}
                                    options={[
                                        { value: "", label: "Selecione..." },
                                        ...instituicoes.map(inst => ({
                                            value: inst.id?.toString() ?? "",
                                            label: inst.nome
                                        }))
                                    ]}
                                />
                            </StatLabel>
                            <StatLabel>
                                Cargo:
                                <CustomSelect
                                    name="cargo"
                                    value={form.cargo || ""}
                                    onChange={handleChange}
                                    required
                                    disabled={submitted}
                                    options={[
                                        { value: "", label: "Selecione..." },
                                        ...Object.values(Cargo).map(cargo => ({
                                            value: cargo,
                                            label: cargo
                                        }))
                                    ]}
                                />
                            </StatLabel>
                        </CardGrid>
                    )}

                    <PessoaModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onSave={handleSavePessoa}
                        initialData={form.pessoa}
                    />

                    {pessoaEncontrada && (
                        <div style={{ marginTop: 24, textAlign: "right" }}>
                            <ButtonStyled
                                type="button"
                                onClick={() => navigate('/profissionais')}
                                style={{ marginRight: 16, background: '#6c757d' }}
                                disabled={submitted}
                            >
                                Cancelar
                            </ButtonStyled>
                            <ButtonStyled type="submit" disabled={submitted}>
                                {submitted ? "Salvando..." : (isEditing ? "Atualizar" : "Cadastrar")}
                            </ButtonStyled>
                        </div>
                    )}

                    {submitted && (
                        <div style={{ marginTop: 16, color: "#228B22" }}>
                            Profissional {isEditing ? "atualizado" : "cadastrado"} com sucesso!
                        </div>
                    )}
                </form>
            </CardWrapper>
        </>
    );
};

export default CadastroProfissional;