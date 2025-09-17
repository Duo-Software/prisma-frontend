/**
 * Componente de Cadastro de Aluno
 * 
 * Este componente permite o cadastro e edição de alunos,
 * usando um modal para gerenciar os dados pessoais.
 */

import React, { useState, useEffect } from "react";
import {
    StatLabel,
    DefaultContainer,
    CardTitle,
    FixedHeader,
    ButtonStyled,
    CardWrapper,
    CardFixed, 
    CardGrid
} from "../../components/layout/DefaultComponents.tsx";
import { useSidebar } from "../../context/SidebarContext.tsx";
import { useTheme } from "styled-components";
import { InputPadrao } from "../../components/layout/InputPadrao.tsx";
import { useLocation, useNavigate } from "react-router-dom";
import { AutocompleteInstituicao } from "../../components/AutocompleteInstituicao.tsx";
import { StatusAluno } from "../../mocks/status-aluno.ts";
import PessoaModal from "../../components/modal/PessoaModal.tsx";
import { buscarPessoaPorCpf, type Pessoa, formatarCpf } from "../../services/pessoaService.ts";
import styled from "styled-components";
import { CustomSelect } from "../../components/layout/CustomSelect.tsx";
import type {Aluno} from "../../types/aluno";
import {buscarAlunoPorCpf, salvarAluno} from "../../services/alunoService.ts";
import {Etnia} from "../../mocks/etnia.ts";
import { buscarDiagnosticoPorPessoa, atualizarDiagnostico, cadastrarDiagnostico } from '../../services/diagnosticoPessoaService.ts';
import AvaliacaoAlunoModal from '../../components/modal/AvaliacaoAlunoModal';
import { recuperaArquivoById } from '../../services/arquivoService';
import { buscarTurmas, type Turma } from "../../services/turmaService";

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
  dataNascimento: "",
  paisNaturalidade: { id: 1, nome: "Brasil" },
  ufNaturalidade: { id: 11, nome: "Mato Grosso", sigla: "MT" },
  municipioNaturalidade: { id: 110122, nome: "Sorriso", uf: "MT" },
  dataCadastro: "",
  dataAlteracao: ""
};

interface alunoPayloadDef {
    id: number | undefined,
    pessoa: Pessoa,
    instituicaoNome: string,
    instituicaoId: number | undefined | string,
    turmaId: string | undefined,
    status: string,
    dataIngresso: string,
    dataEgresso: string
}

const initialFormState: alunoPayloadDef = {
    id: undefined,
    pessoa: initialPessoaState,
    instituicaoNome: "",
    instituicaoId: undefined,
    turmaId: undefined,
    status: StatusAluno.MATRICULADO,
    dataIngresso: "",
    dataEgresso: ""
};

export const CadastroAluno: React.FC = () => {
    const [form, setForm] = useState(initialFormState);
    const [submitted, setSubmitted] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cpfSearch, setCpfSearch] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [pessoaEncontrada, setPessoaEncontrada] = useState(false);
    const [buscaEfetuada, setBuscaEfetuada] = useState(false);
    const [alunoExistente, setAlunoExistente] = useState(false);
    const [avaliacaoAluno, setAvaliacaoAluno] = useState<any>(null);
    const [isModalAvaliacaoOpen, setIsModalAvaliacaoOpen] = useState(false);
    const [avaliacaoEdit, setAvaliacaoEdit] = useState<any>(null);
    const { isSidebarOpen } = useSidebar();
    const theme = useTheme();
    const location = useLocation();
    const navigate = useNavigate();
    const [turmas, setTurmas] = useState<Turma[]>([]);
    const [turmasFiltradas, setTurmasFiltradas] = useState<Turma[]>([]);

    // Efeito para carregar dados do aluno se estiver editando
    useEffect(() => {
        // Verifica se há um aluno sendo passado pelo state da rota
        if (location.state) {
            const alunoData = location.state as Aluno;
            const pessoaData = alunoData.pessoa || {};

            // Preencher o formulário com os dados do aluno
            // @ts-ignore
            // @ts-ignore
            setForm({
                id: alunoData.id || 0,
                pessoa: {
                    id: pessoaData.id || "",
                    nome: pessoaData.nome || "",
                    cpf: pessoaData.cpf || "",
                    sexo: pessoaData.sexo || "",
                    dataNascimento: pessoaData.dataNascimento || "",
                    dataCadastro: pessoaData.dataCadastro || "",
                    dataAlteracao: pessoaData.dataAlteracao || ""
                },
                instituicaoNome: alunoData.instituicaoEnsino?.nome || "",
                instituicaoId: alunoData.instituicaoEnsino?.id || undefined || "",
                turmaId: alunoData.turma?.id?.toString() || "", 
                status: alunoData.status || "",
                dataIngresso: alunoData.dataIngresso ? alunoData.dataIngresso.split('T')[0] : "",
                dataEgresso: alunoData.dataEgresso ? alunoData.dataEgresso.split('T')[0] : ""
            });

            // Marcar que estamos em modo de edição
            setIsEditing(true);
            // Definir que já encontramos a pessoa
            setPessoaEncontrada(true);
            // Preencher o campo de busca de CPF
            setCpfSearch(pessoaData.cpf || "");
        }
    }, [location]);

    // Buscar avaliação do aluno ao encontrar pessoa
    useEffect(() => {
        const fetchAvaliacao = async () => {
            if (pessoaEncontrada && form.pessoa.id) {
                try {
                    const diagnostico = await buscarDiagnosticoPorPessoa(form.pessoa.id);
                    setAvaliacaoAluno(diagnostico);
                } catch (e) {
                    setAvaliacaoAluno(null);
                }
            } else {
                setAvaliacaoAluno(null);
            }
        };
        fetchAvaliacao();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pessoaEncontrada, form.pessoa.id]);

    useEffect(() => {
        buscarTurmas()
            .then(setTurmas)
            .catch(() => alert("Erro ao carregar turmas!"));
    }, []);

    // Função para buscar pessoa e aluno por CPF
    const buscarPessoa = async () => {
        if (!cpfSearch || cpfSearch.length < 11) return;

        setBuscaEfetuada(true);
        setIsSearching(true);

        try {
            // Primeiro verificamos se já existe um aluno com este CPF
            const resultadoAluno = await buscarAlunoPorCpf(cpfSearch);

            if (resultadoAluno.encontrado && resultadoAluno.aluno) {
                const alunoEncontrado = resultadoAluno.aluno;
                if (!isEditing) {
                    setAlunoExistente(true);
                    setForm({
                        id: alunoEncontrado.id,
                        pessoa: alunoEncontrado.pessoa,
                        instituicaoNome: alunoEncontrado.instituicaoEnsino?.nome || "",
                        instituicaoId: alunoEncontrado && alunoEncontrado.instituicaoEnsino ? alunoEncontrado.instituicaoEnsino.id : "",
                        turmaId: alunoEncontrado.turma?.id?.toString() || "",
                        status: alunoEncontrado.status,
                        dataIngresso: alunoEncontrado.dataIngresso.split('T')[0],
                        dataEgresso: alunoEncontrado.dataEgresso ? alunoEncontrado.dataEgresso.split('T')[0] : ""
                    });
                    setPessoaEncontrada(true);
                    setIsEditing(true);
                }
            } else {
                // Aluno não existe, buscar só a pessoa
                const resultadoPessoa = await buscarPessoaPorCpf(cpfSearch);

                if (resultadoPessoa.encontrado) {
                    // Pessoa encontrada, atualizar o formulário
                    setForm(prev => ({
                        ...prev,
                        pessoa: resultadoPessoa.pessoa as Pessoa
                    }));
                    setPessoaEncontrada(true);
                } else {
                    // Pessoa não encontrada, limpar os dados da pessoa (exceto CPF)
                    setForm(prev => ({
                        ...prev,
                        pessoa: {
                            ...initialPessoaState,
                            cpf: formatarCpf(cpfSearch)
                        }
                    }));
                    setPessoaEncontrada(false);
                    // Abrir o modal para cadastro de nova pessoa
                    setIsModalOpen(true);
                }
            }
        } catch (error) {
            console.error("Erro ao buscar por CPF:", error);
        } finally {
            setIsSearching(false);
        }
    };

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target;

        // Para o campo de CPF na busca
        if (name === "cpfSearch") {
            // Limitar a 14 caracteres (formato 000.000.000-00)
            if (value.length <= 14) {
                setCpfSearch(formatarCpf(value));
            }
            return;
        }

        // Para os outros campos do formulário
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    }

    function handleInstituicaoSelect(instituicao: any) {
        setForm(prev => ({
            ...prev,
            instituicaoId: instituicao.id,
            instituicaoNome: instituicao.nome,
            turmaId: "" // limpa a turma se alterar a instituição
        }));
    
        // Filtrar turmas para esta instituição
        setTurmasFiltradas(
            turmas.filter(t => t?.instituicaoEnsino?.id === instituicao?.id)
        );
    }


    // Função para salvar os dados da pessoa do modal
    function handleSavePessoa(pessoaData: Pessoa) {
        setForm(prev => ({
            ...prev,
            pessoa: pessoaData
        }));
        setPessoaEncontrada(true);
    }


    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        // Verificar se temos pessoa selecionada/cadastrada
        if (!pessoaEncontrada || !form.pessoa.id) {
            alert("É necessário selecionar ou cadastrar uma pessoa primeiro.");
            return;
        }

        // Verificar campos obrigatórios específicos do aluno
        if (!form.instituicaoId || !form.status || !form.dataIngresso) {
            alert("Preencha todos os campos obrigatórios.");
            return;
        }

        setSubmitted(true);

        const turmaCad: Turma | undefined = turmas.find(t => t.id === Number(form.turmaId));

        // Preparar objeto a ser enviado para a API
        const alunoPayload: Aluno = {
            id: form.id,
            pessoa: {
                id: form.pessoa.id,
                nome: form.pessoa.nome,
                cpf: form.pessoa.cpf,
                sexo: form.pessoa.sexo,
                dataNascimento: form.pessoa.dataNascimento,
                dataCadastro: "",
                dataAlteracao: "",
                paisNaturalidade: { id: 1, nome: "Brasil" },
                ufNaturalidade: { id: 11, nome: "Mato Grosso", sigla: "MT" },
                municipioNaturalidade: { id: 110122, nome: "Sorriso", uf: "MT" }
            },
            instituicaoEnsino: {
                id: form.instituicaoId,
                nome: form.instituicaoNome,
                sigla: "", // Preenchido pelo backend
                tipoInstituicaoEnsino: "",
                municipio: {
                    id: 0,
                    nome: "",
                    codigoIbge: 0,
                    unidadeFederativa: {
                        id: 0,
                        nome: "",
                        sigla: "",
                        pais: {
                            id: 0,
                            nome: "",
                            sigla: ""
                        }
                    }
                },
                ativo: true
            },
            turma: turmaCad,
            status: form.status as StatusAluno,
            dataIngresso: new Date(form.dataIngresso).toISOString(),
            dataEgresso: form.dataEgresso ? new Date(form.dataEgresso).toISOString() : undefined,
            dataCadastro: "", // Será preenchido pelo backend
            dataAlteracao: "" // Será preenchido pelo backend
        };


        console.log(alunoPayload);

        // Aqui você deve chamar a API correspondente (POST para criar, PUT para editar)
        // Por exemplo:
        // if (isEditing) {
        //     api.put(`/alunos/${form.id}`, alunoPayload);
        // } else {
        //     api.post('/alunos', alunoPayload);
        // }

        // Simulação de sucesso para exemplo
        setTimeout(() => {
            setSubmitted(false);
            // Redirecionar de volta para a lista após salvar
            navigate('/alunos');
        }, 1500);
    }

    // Função para download do arquivo
    const handleDownloadArquivo = async () => {
        if (avaliacaoAluno?.arquivo?.idArquivo) {
            try {
                const arquivo = await recuperaArquivoById(avaliacaoAluno.arquivo.idArquivo);
                if (arquivo && arquivo.conteudo) {
                    const link = document.createElement('a');
                    link.href = `data:${arquivo.tipo};base64,${arquivo.conteudo}`;
                    link.download = arquivo.nome;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                } else {
                    alert('Arquivo não encontrado ou sem conteúdo.');
                }
            } catch (e) {
                alert('Erro ao baixar arquivo.');
            }
        }
    };

    return (
        <>
            <DefaultContainer>
                <FixedHeader
                    $isSidebarOpen={isSidebarOpen}
                    $sidebarWidth={theme.sizes.sidebarWidth}
                    $sidebarCollapsedWidth={theme.sizes.sidebarWidthCollapsed}
                >
                    <CardTitle>
                        <b>{isEditing ? "Edição de Aluno" : "Cadastro de Aluno"}</b>
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
                                    name="cpfSearch"
                                    value={cpfSearch}
                                    onChange={handleChange}
                                    placeholder="Digite o CPF..."
                                    disabled={submitted || isSearching}
                                    style={{ marginLeft: 8 }}
                                />
                                <SearchButton
                                    style={{ width: "90px" }}
                                    type="button"
                                    onClick={buscarPessoa}
                                    disabled={submitted || isSearching || cpfSearch.length < 11}
                                >
                                    {isSearching ? "Buscando..." : "Buscar"}
                                </SearchButton>
                            </CardFixed>
                        )}

                        {pessoaEncontrada ? (
                            <CardFixed style={{ padding: 20, minWidth: 450, marginBottom: 20, textAlign: "center" }}>
                                <h3 style={{ marginTop: 0 }}>Dados Pessoais</h3>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                                    <StatLabel>Nome: <span>{form.pessoa.nome}</span></StatLabel>
                                    <StatLabel>CPF: <span>{form.pessoa.cpf}</span></StatLabel>
                                    <StatLabel>
                                        Data de Nascimento:{" "}
                                        <span>
                                            {form.pessoa.dataNascimento ? new Date(form.pessoa.dataNascimento).toLocaleDateString("pt-BR") : ""}
                                        </span>
                                    </StatLabel>
                                    <StatLabel>Sexo: <span>{form.pessoa.sexo === "M" ? "Masculino" : form.pessoa.sexo === "F" ? "Feminino" : ""}</span></StatLabel>
                                    {/*<StatLabel>Email: <span>{form.pessoa.email}</span></StatLabel>*/}
                                    {/*<StatLabel>Telefone: <span>{form.pessoa.telefone}</span></StatLabel>*/}
                                </div>
                                <div style={{ textAlign: "right", marginTop: 10 }}>
                                    <InfoLink onClick={() => setIsModalOpen(true)}>Editar dados pessoais</InfoLink>
                                </div>
                            </CardFixed>
                        ) : buscaEfetuada ? (
                            <CardFixed style={{ padding: 20, minWidth: 450, marginBottom: 20, textAlign: "center" }}>
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
                                <h3>Dados Acadêmicos</h3>
                                <h3></h3>

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
                                    Turma:
                                    <select
                                        name="turmaId"
                                        value={form.turmaId}
                                        onChange={handleChange}
                                        required
                                        disabled={submitted || !form.instituicaoId}
                                        style={{
                                            width: "80%",
                                            padding: 8,
                                            marginTop: 4,
                                            marginBottom: 4,
                                            display: "block"
                                        }}
                                    >
                                        <option value="">Selecione...</option>
                                        {turmasFiltradas.map(t => (
                                            <option key={t.id} value={t.id}>
                                                {t.codigoTurma} - {t.descricao}
                                            </option>
                                        ))}
                                    </select>
                                </StatLabel>

                                <StatLabel>
                                    Status:
                                    <CustomSelect
                                        name="status"
                                        value={form.status}
                                        onChange={handleChange}
                                        options={Object.values(StatusAluno).map(status => ({
                                            value: status,
                                            label: status
                                        }))}
                                        required
                                        disabled={submitted}
                                        textColor={theme.colors.textSecondary}
                                        selectedTextColor={theme.colors.primaryLight}
                                    />
                                </StatLabel>

                                <StatLabel>
                                    Data de Ingresso:
                                    <InputPadrao
                                        type="date"
                                        name="dataIngresso"
                                        value={form.dataIngresso}
                                        onChange={handleChange}
                                        required
                                        disabled={submitted}
                                    />
                                </StatLabel>

                                <StatLabel>
                                    Data de Egresso:
                                    <InputPadrao
                                        type="date"
                                        name="dataEgresso"
                                        value={form.dataEgresso}
                                        onChange={handleChange}
                                        disabled={submitted || form.status !== StatusAluno.FORMADO}
                                    />
                                </StatLabel>
                            </CardGrid>
                        )}

                        {/* Seção Avaliação do Aluno */}
                        {pessoaEncontrada && (
                            <CardGrid style={{ padding: 20, minWidth: 450, marginBottom: 20  }}>
                                <h3 style={{ marginTop: 0 }}>Avaliação do Aluno</h3>
                                <div style={{ textAlign: 'right', marginBottom: 10 }}>
                                    {avaliacaoAluno ? (
                                        <ButtonStyled type="button" onClick={() => {
                                            setAvaliacaoEdit(avaliacaoAluno);
                                            setIsModalAvaliacaoOpen(true);
                                        }} style={{ padding: '4px 16px', fontSize: 14 }}>
                                            Editar
                                        </ButtonStyled>
                                    ) : (
                                        <ButtonStyled type="button" onClick={() => {
                                            setAvaliacaoEdit({
                                                idDiagnosticoPessoa: 0,
                                                idPessoa: form.pessoa.id,
                                                cid: '',
                                                status: '',
                                                parecer: '',
                                                idProfissionalResponsavel: 0,
                                                arquivo: undefined
                                            });
                                            setIsModalAvaliacaoOpen(true);
                                        }} style={{ padding: '4px 16px', fontSize: 14 }}>
                                            Cadastrar
                                        </ButtonStyled>
                                    )}
                                </div>
                                {avaliacaoAluno ? (
                                    <>
                                        <StatLabel>
                                            CID: <span>{avaliacaoAluno.cid}</span>
                                        </StatLabel>
                                        <StatLabel>
                                            Status: <span>{avaliacaoAluno.status}</span>
                                        </StatLabel>
                                        <StatLabel>
                                            Parecer: <span>{avaliacaoAluno.parecer}</span>
                                        </StatLabel>
                                        <StatLabel>
                                            Profissional Responsável: <span>{avaliacaoAluno.nomeProfissionalResponsavel}</span>
                                        </StatLabel>
                                        <StatLabel>
                                            Arquivo: {avaliacaoAluno.arquivo && avaliacaoAluno.arquivo.idArquivo ? (
                                                <a
                                                    href="#"
                                                    style={{ color: theme.colors.primary }}
                                                    onClick={e => {
                                                        e.preventDefault();
                                                        handleDownloadArquivo();
                                                    }}
                                                >
                                                    {avaliacaoAluno.arquivo.nome}
                                                </a>
                                            ) : (
                                                <span>Não informado</span>
                                            )}
                                        </StatLabel>
                                    </>
                                ) : (
                                    <span>Nenhuma avaliação cadastrada para este aluno.</span>
                                )}
                            </CardGrid>
                        )}

                        {/* Modal de edição/cadastro da Avaliação do Aluno */}
                        <AvaliacaoAlunoModal
                            isOpen={isModalAvaliacaoOpen}
                            onClose={() => setIsModalAvaliacaoOpen(false)}
                            initialData={avaliacaoEdit}
                            isCadastro={!avaliacaoAluno}
                            onSave={async (dados) => {
                                try {
                                    if (!avaliacaoAluno) {
                                        // Cadastro
                                        const novo = await cadastrarDiagnostico(dados);
                                        setAvaliacaoAluno(novo);
                                    } else {
                                        // Edição
                                        await atualizarDiagnostico(dados?.idDiagnosticoPessoa, dados);
                                        setAvaliacaoAluno(dados);
                                    }
                                    setIsModalAvaliacaoOpen(false);
                                } catch (err) {
                                    alert('Erro ao salvar avaliação.');
                                }
                            }}
                        />

                        {/* Modal para edição/cadastro de dados pessoais */}
                        <PessoaModal
                            isOpen={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                            onSave={handleSavePessoa}
                        />

                        {pessoaEncontrada && (
                            <div style={{ marginTop: 24, textAlign: "right" }}>
                                <ButtonStyled
                                    type="button"
                                    onClick={() => navigate('/alunos')}
                                    style={{ marginRight: 16, background: '#6c757d' }}
                                    disabled={submitted}
                                >
                                    Cancelar
                                </ButtonStyled>
                                <ButtonStyled
                                    type="button"
                                    disabled={submitted}
                                    onClick={async () => {
                                        setSubmitted(true);
                                        try {
                                            const etniaEnumValue = Object.entries(Etnia).find(([enumValue]) =>
                                                enumValue === form.pessoa.etnia
                                            )?.[1] || "";

                                            const turmaCad: Turma | undefined = turmas.find(t => t.id === Number(form.turmaId));

                                            form.pessoa.etnia = etniaEnumValue;
                                            // Preparar objeto aluno
                                            const alunoPayload: Aluno = {
                                                id: form.id,
                                                pessoa: {
                                                    id: form.pessoa.id,
                                                    nome: form.pessoa.nome,
                                                    cpf: form.pessoa.cpf,
                                                    sexo: form.pessoa.sexo,
                                                    dataNascimento: form.pessoa.dataNascimento,
                                                    dataCadastro: "",
                                                    dataAlteracao: "",
                                                    paisNaturalidade: { id: 1, nome: "Brasil" },
                                                    ufNaturalidade: { id: 11, nome: "Mato Grosso", sigla: "MT" },
                                                    municipioNaturalidade: { id: 110122, nome: "Sorriso", uf: "MT" }
                                                },
                                                instituicaoEnsino: {
                                                    id: form.instituicaoId
                                                },
                                                turma: turmaCad,
                                                status: form.status as StatusAluno,
                                                dataIngresso: new Date(form.dataIngresso).toISOString(),
                                                dataEgresso: form.dataEgresso ? new Date(form.dataEgresso).toISOString() : undefined,
                                                dataCadastro: "", // Será preenchido pelo backend
                                                dataAlteracao: "" // Será preenchido pelo backend
                                            };
                                            await salvarAluno(alunoPayload);
                                            navigate('/alunos'); // Redireciona após salvar com sucesso
                                        } catch (error) {
                                            console.error('Erro ao salvar aluno:', error);
                                            alert('Ocorreu um erro ao salvar o aluno. Por favor, tente novamente.');
                                        } finally {
                                            setSubmitted(false);
                                        }
                                    }}
                                >
                                    {submitted ? "Salvando..." : (isEditing ? "Atualizar" : "Cadastrar")}
                                </ButtonStyled>
                            </div>
                        )}

                        {submitted && (
                            <div style={{ marginTop: 16, color: "#228B22" }}>
                                Aluno {isEditing ? "atualizado" : "cadastrado"} com sucesso!
                            </div>
                        )}

                        {alunoExistente && !isEditing && (
                            <div style={{ marginTop: 16, color: "#FF6347" }}>
                                Já existe um aluno cadastrado com este CPF. Os dados foram carregados para edição.
                            </div>
                        )}
                    </form>
                </CardWrapper>
            </>
        </>
    );
};
