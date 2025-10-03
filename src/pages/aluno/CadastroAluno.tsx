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
    CardGrid, StatValueContent
} from "../../components/layout/DefaultComponents.tsx";
import { useSidebar } from "../../context/SidebarContext.tsx";
import { useTheme } from "styled-components";
import { InputPadrao } from "../../components/layout/InputPadrao.tsx";
import { useLocation, useNavigate } from "react-router-dom";
import { buscarInstituicoes, type Instituicao } from "../../services/instituicaoService.ts";
import { StatusAluno } from "../../mocks/status-aluno.ts";
import PessoaModal from "../../components/modal/PessoaModal.tsx";
import { buscarPessoaPorCpf, type Pessoa, formatarCpf } from "../../services/pessoaService.ts";
import styled from "styled-components";
import { CustomSelect } from "../../components/layout/CustomSelect.tsx";
import type {Aluno} from "../../types/aluno";
import {buscarAlunoPorCpf, salvarAluno} from "../../services/alunoService.ts";
import {Etnia} from "../../mocks/etnia.ts";
import {
    buscarDiagnosticoPorPessoa,
    atualizarDiagnostico,
    cadastrarDiagnostico,
    definirDiagnosticoPrincipal,
    deletarDiagnostico
} from '../../services/diagnosticoPessoaService.ts';
import AvaliacaoAlunoModal from '../../components/modal/AvaliacaoAlunoModal';
import { recuperaArquivoById } from '../../services/arquivoService';
import { buscarTurmas, type Turma } from "../../services/turmaService";
import {FiEdit, FiPlus, FiTrash2} from "react-icons/fi";
import {getCIDByCodigo, getDescricaoCompletaByCodigo} from "../../enums/CidEnum.ts";

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
  dataAlteracao: "",
  statusNecessidade: "NAO_INFORMADO"
};

interface alunoPayloadDef {
    id: number | undefined,
    pessoa: Pessoa,
    instituicaoNome: string,
    instituicaoId: string | undefined,
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
    const [avaliacaoAluno, setAvaliacaoAluno] = useState<any[]>([]);
    const [isModalAvaliacaoOpen, setIsModalAvaliacaoOpen] = useState(false);
    const [avaliacaoEdit, setAvaliacaoEdit] = useState<any>(null);
    const { isSidebarOpen } = useSidebar();
    const theme = useTheme();
    const location = useLocation();
    const navigate = useNavigate();
    const [turmas, setTurmas] = useState<Turma[]>([]);
    const [instituicoes, setInstituicoes] = useState<Instituicao[]>([]);
    const [turmasFiltradas, setTurmasFiltradas] = useState<Turma[]>([])

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
                    dataAlteracao: pessoaData.dataAlteracao || "",
                    statusNecessidade: pessoaData.statusNecessidade || "NAO_INFORMADO"
                },
                instituicaoNome: alunoData.instituicaoEnsino?.nome || "",
                instituicaoId: alunoData.instituicaoEnsino?.id?.toString() || undefined || "",
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

            if (alunoData.instituicaoEnsino?.id && turmas.length > 0) {
                setTurmasFiltradas(
                    turmas.filter(t => t?.instituicaoEnsino?.id === Number(alunoData.instituicaoEnsino.id))
                );
            }
        }
    }, [location, turmas]);

    useEffect(() => {
        buscarInstituicoes()
            .then(setInstituicoes)
            .catch(() => alert("Erro ao carregar instituições!"));
    }, []);

    useEffect(() => {
        if (form.instituicaoId && turmas.length > 0) {
            setTurmasFiltradas(
                turmas.filter(t => t?.instituicaoEnsino?.id?.toString() === form.instituicaoId)
            );
        } else {
            setTurmasFiltradas([]);
        }
    }, [form.instituicaoId, turmas]);

    // Buscar avaliações do aluno ao encontrar pessoa
    useEffect(() => {
        const fetchAvaliacoes = async () => {
            if (pessoaEncontrada && form.pessoa.id) {
                try {
                    const diagnosticos = await buscarDiagnosticoPorPessoa(form.pessoa.id);
                    // Agora diagnosticos é uma lista
                    setAvaliacaoAluno(Array.isArray(diagnosticos) ? diagnosticos : [diagnosticos].filter(Boolean));
                } catch (e) {
                    setAvaliacaoAluno([]);
                }
            } else {
                setAvaliacaoAluno([]);
            }
        };
        fetchAvaliacoes();
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
                        instituicaoId: alunoEncontrado && alunoEncontrado.instituicaoEnsino ? alunoEncontrado.instituicaoEnsino?.id?.toString() : "",
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

    function handleChangeStatusNecessidade(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { value } = e.target;
        setForm(prev => ({
            ...prev,
            pessoa: {
                ...prev.pessoa,
                statusNecessidade: value
            }
        }));
    }

    function handleChangePrincipal(diagnostico: any) {
        try {
            const response = definirDiagnosticoPrincipal(diagnostico.idDiagnosticoPessoa);
            console.log(response);
            setAvaliacaoAluno(avaliacaoAluno => (avaliacaoAluno.map(d => d.idDiagnosticoPessoa === diagnostico.idDiagnosticoPessoa ? {...d, principal: !d.principal} : d)));
            setAvaliacaoAluno(avaliacaoAluno => (avaliacaoAluno.map(d => d.idDiagnosticoPessoa !== diagnostico.idDiagnosticoPessoa ? {...d, principal: false} : d)));
        } catch (e) {
            console.error("Erro ao definir diagnóstico principal:", e);
        }
    }

    function handleInstituicaoSelect(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { value } = e.target;
        setForm(prev => ({
            ...prev,
            instituicaoId: value,
            turmaId: "" // limpa a turma se alterar a instituição
        }));
        setTurmasFiltradas(
            turmas.filter(t => t?.instituicaoEnsino?.id === Number(value))
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
    }

    // Função para download do arquivo
    const handleDownloadArquivo = async (idArquivo: number, nome: string, tipo: string) => {
        if (idArquivo) {
            try {
                const arquivo = await recuperaArquivoById(idArquivo);
                if (arquivo && arquivo.conteudo) {
                    const link = document.createElement('a');
                    link.href = `data:${tipo};base64,${arquivo.conteudo}`;
                    link.download = nome;
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

    async function preparaAndSaveAluno() {
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
                    paisNaturalidade: {id: 1, nome: "Brasil"},
                    ufNaturalidade: {id: 11, nome: "Mato Grosso", sigla: "MT"},
                    municipioNaturalidade: {id: 110122, nome: "Sorriso", uf: "MT"},
                    statusNecessidade: form.pessoa.statusNecessidade
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
            return await salvarAluno(alunoPayload);
        } catch (error) {
            console.error('Erro ao salvar aluno:', error);
            alert('Ocorreu um erro ao salvar o aluno. Por favor, tente novamente.');
        } finally {
            setSubmitted(false);
        }
    }

    function handleDeleteDiagnostico(diagnostico: any) {
        if (window.confirm('Tem certeza que deseja inativar este diagnóstico?')) {
            try {
                deletarDiagnostico(diagnostico.idDiagnosticoPessoa);
                setAvaliacaoAluno(prev =>
                    prev.filter(item =>
                        item.idDiagnosticoPessoa !== diagnostico.idDiagnosticoPessoa
                    )
                );
            } catch (err) {
                console.error('Erro ao inativar diagnóstico:', err);
                alert('Erro ao inativar diagnóstico.');
            }
        }
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
                                    {/*<StatLabel>Email: <StatValueContent>{form.pessoa.email}</StatValueContent></StatLabel>*/}
                                    {/*<StatLabel>Telefone: <StatValueContent>{form.pessoa.telefone}</StatValueContent></StatLabel>*/}
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
                                <h3
                                  style={{
                                    textAlign: 'center',
                                    color: theme.colors.primary,
                                    gridColumn: '1 / -1'
                                  }}
                                >
                                  Dados Acadêmicos
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
                                    Turma:
                                    <CustomSelect
                                        name="turmaId"
                                        value={form.turmaId || ""}
                                        onChange={handleChange}
                                        required
                                        disabled={submitted || !form.instituicaoId}
                                        options={[
                                            { value: "", label: "Selecione..." },
                                            ...turmasFiltradas.map(t => ({
                                                value: t.id?.toString() ?? "",
                                                label: `${t.codigoTurma} - ${t.descricao}`
                                            }))
                                        ]}
                                    />
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
                            <CardFixed>
                                <h3 style={{ textAlign: 'center', color: theme.colors.primary }}>Diagnóstico do Aluno</h3>
                                <h4 style={{ marginTop: 0, color: theme.colors.primaryLight }}>Possui alguma necessidade?</h4>
                                    <CustomSelect
                                        name="status_necessidade"
                                        value={form.pessoa.statusNecessidade}
                                        onChange={handleChangeStatusNecessidade}
                                        options={[
                                            {value: "NAO_INFORMADO", label: "SELECIONE"},
                                            {value: "NAO", label: "NÃO"},
                                            {value: "EM_PROCESSO_DIAGNISTICO", label: "EM PROCESSO DE DIAGNÓSTICO"},
                                            {value: "SIM", label: "SIM"}
                                        ]}
                                        required
                                        disabled={submitted}
                                        textColor={theme.colors.textSecondary}
                                        selectedTextColor={theme.colors.textSecondary}
                                    />
                                <span style={{ textAlign: 'right', marginBottom: 10 }}>
                                    {form.pessoa.statusNecessidade === 'SIM' ? (
                                        <ButtonStyled
                                            type="button"
                                            onClick={() => {
                                                setAvaliacaoEdit({
                                                    idDiagnosticoPessoa: 0,
                                                    idPessoa: form.pessoa.id,
                                                    cid: '',
                                                    status: '',
                                                    parecer: '',
                                                    idProfissionalResponsavel: 0,
                                                    arquivo: undefined
                                                });
                                                setTimeout(() => {
                                                    setIsModalAvaliacaoOpen(true);
                                                }, 100);
                                            }}
                                            title="Cadastrar"
                                            style={{ padding: '4px 16px', fontSize: 14 }}
                                        >
                                            <FiPlus size={24} />
                                        </ButtonStyled>
                                    ):''}
                                </span>
                                {avaliacaoAluno && avaliacaoAluno.length > 0 ? (
                                    <div style={{ width: '100%' }}>
                                        <table style={{ 
                                            width: '100%', 
                                            borderCollapse: 'collapse',
                                            marginTop: '10px',
                                            fontSize: '14px',
                                            color: theme.colors.text,
                                            borderRadius: theme.borderRadius,
                                            overflow: 'hidden'
                                        }}>
                                            <thead>
                                                <tr>
                                                    <th style={{ 
                                                        padding: '10px 12px', 
                                                        textAlign: 'left', 
                                                        borderBottom: `2px solid ${theme.colors.border}`,
                                                        backgroundColor: theme.colors.primary,
                                                        color: theme.colors.sidebarText
                                                    }}>CID</th>
                                                    <th style={{
                                                        padding: '10px 12px',
                                                        textAlign: 'left',
                                                        borderBottom: `2px solid ${theme.colors.border}`,
                                                        backgroundColor: theme.colors.primary,
                                                        color: theme.colors.sidebarText
                                                    }}>Principal</th>
                                                    <th style={{ 
                                                        padding: '10px 12px', 
                                                        textAlign: 'left', 
                                                        borderBottom: `2px solid ${theme.colors.border}`,
                                                        backgroundColor: theme.colors.primary,
                                                        color: theme.colors.sidebarText
                                                    }}>Parecer</th>
                                                    <th style={{ 
                                                        padding: '10px 12px', 
                                                        textAlign: 'left', 
                                                        borderBottom: `2px solid ${theme.colors.border}`,
                                                        backgroundColor: theme.colors.primary,
                                                        color: theme.colors.sidebarText
                                                    }}>Profissional Responsável</th>
                                                    <th style={{ 
                                                        padding: '10px 12px', 
                                                        textAlign: 'left', 
                                                        borderBottom: `2px solid ${theme.colors.border}`,
                                                        backgroundColor: theme.colors.primary,
                                                        color: theme.colors.sidebarText
                                                    }}>Arquivo</th>
                                                    <th style={{
                                                        padding: '10px 12px',
                                                        textAlign: 'left',
                                                        borderBottom: `2px solid ${theme.colors.border}`,
                                                        backgroundColor: theme.colors.primary,
                                                        color: theme.colors.sidebarText
                                                    }}>Ações</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {avaliacaoAluno.map((diagnostico, index) => (
                                                    <tr key={diagnostico.idDiagnosticoPessoa || index}>
                                                        <td style={{ 
                                                            padding: '8px 12px', 
                                                            borderBottom: `1px solid ${theme.colors.border}`,
                                                            backgroundColor: theme.colors.surface
                                                        }}
                                                            title={getDescricaoCompletaByCodigo(diagnostico.cid) || ""}
                                                        >{getCIDByCodigo(diagnostico.cid)?.codigo}</td>
                                                        <td style={{
                                                            padding: '8px 12px',
                                                            borderBottom: `1px solid ${theme.colors.border}`,
                                                            backgroundColor: theme.colors.surface,
                                                            textAlign: 'center' // opcional, para centralizar o checkbox
                                                        }}>
                                                            <InputPadrao
                                                                type="checkbox"
                                                                checked={diagnostico.principal}
                                                                value={diagnostico.principal}
                                                                onChange={() => handleChangePrincipal(diagnostico)}
                                                                style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                                                            />
                                                        </td>
                                                        <td style={{ 
                                                            padding: '8px 12px', 
                                                            borderBottom: `1px solid ${theme.colors.border}`,
                                                            backgroundColor: theme.colors.surface
                                                        }}>{diagnostico.parecer}</td>
                                                        <td style={{ 
                                                            padding: '8px 12px', 
                                                            borderBottom: `1px solid ${theme.colors.border}`,
                                                            backgroundColor: theme.colors.surface
                                                        }}>{diagnostico.nomeProfissionalResponsavel}</td>
                                                        <td style={{ 
                                                            padding: '8px 12px', 
                                                            borderBottom: `1px solid ${theme.colors.border}`,
                                                            backgroundColor: theme.colors.surface
                                                        }}>
                                                            {diagnostico.arquivo && diagnostico.arquivo.idArquivo ? (
                                                                <a
                                                                    href="#"
                                                                    style={{ 
                                                                        color: theme.colors.primary,
                                                                        textDecoration: 'underline',
                                                                        transition: theme.transition
                                                                    }}
                                                                    onClick={e => {
                                                                        e.preventDefault();
                                                                        handleDownloadArquivo(
                                                                            diagnostico.arquivo.idArquivo, 
                                                                            diagnostico.arquivo.nome,
                                                                            diagnostico.arquivo.tipo
                                                                        );
                                                                    }}
                                                                    onMouseOver={e => {
                                                                        e.currentTarget.style.color = theme.colors.primaryLight;
                                                                    }}
                                                                    onMouseOut={e => {
                                                                        e.currentTarget.style.color = theme.colors.primary;
                                                                    }}
                                                                >
                                                                    {diagnostico.arquivo.nome}
                                                                </a>
                                                            ) : (
                                                                <StatValueContent style={{ color: theme.colors.textSecondary }}>
                                                                    Não informado
                                                                </StatValueContent>
                                                            )}
                                                        </td>
                                                        <td style={{padding: '8px 12px',
                                                        borderBottom: `1px solid ${theme.colors.border}`,
                                                        backgroundColor: theme.colors.surface,
                                                        display: 'flex',
                                                        gap: '8px'
                                                        }}>
                                                            <ButtonStyled
                                                                type="button"
                                                                onClick={() => {
                                                                    setAvaliacaoEdit(diagnostico);
                                                                    setTimeout(() => {
                                                                        setIsModalAvaliacaoOpen(true);
                                                                    }, 100);
                                                                }}
                                                                title="Editar"
                                                                style={{ padding: '4px 16px', fontSize: 14 }}
                                                            >
                                                                <FiEdit size={16} />
                                                            </ButtonStyled>
                                                            <ButtonStyled
                                                                type="button"
                                                                onClick={async () => {
                                                                    handleDeleteDiagnostico(diagnostico);
                                                                }}
                                                                title="Inativar"
                                                                style={{
                                                                    padding: '4px 16px',
                                                                    fontSize: 14,
                                                                    backgroundColor: theme.colors.danger
                                                                }}
                                                            >
                                                                <FiTrash2 size={16} />
                                                            </ButtonStyled>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <StatValueContent style={{ color: theme.colors.textSecondary }} hidden={form.pessoa?.statusNecessidade !== 'SIM'}>
                                        Nenhuma avaliação cadastrada para este aluno.
                                    </StatValueContent>
                                )}
                            </CardFixed>
                        )}

                        {/* Modal de edição/cadastro da Avaliação do Aluno */}
                        {isModalAvaliacaoOpen && (
                            <AvaliacaoAlunoModal
                                isOpen={isModalAvaliacaoOpen}
                                onClose={() => {
                                    setIsModalAvaliacaoOpen(false);
                                }}
                                initialData={avaliacaoEdit}
                                isCadastro={!avaliacaoAluno}
                                onSave={async (dados) => {
                                    try {
                                        if (dados.idDiagnosticoPessoa === undefined || dados.idDiagnosticoPessoa === 0) {
                                            // Cadastro
                                            if (dados.idPessoa === undefined || dados.idPessoa === 0 || Number(dados.idPessoa) === 0) {
                                                try {
                                                    const alunoSalvo = await preparaAndSaveAluno();
                                                    dados.idPessoa = Number(alunoSalvo?.pessoa.id);
                                                } catch (err) {
                                                    alert('erro ao salvar dados pessoais de avaliacao')
                                                }
                                            }
                                            const novo = await cadastrarDiagnostico(dados);
                                            // Adicionar o novo diagnóstico à lista existente
                                            setAvaliacaoAluno(prev => [...prev, novo]);
                                        } else {
                                            // Edição
                                            const atualizado = await atualizarDiagnostico(dados?.idDiagnosticoPessoa, dados);
                                            // Substituir o diagnóstico editado na lista
                                            setAvaliacaoAluno(prev => 
                                                prev.map(item => 
                                                    item.idDiagnosticoPessoa === dados.idDiagnosticoPessoa ? atualizado : item
                                                )
                                            );
                                        }
                                        setIsModalAvaliacaoOpen(false);
                                    } catch (err) {
                                        console.error('Erro ao salvar avaliação:', err);
                                        alert('Erro ao salvar avaliação.');
                                    }
                                }}
                            />
                        )}

                        {/* Modal para edição/cadastro de dados pessoais */}
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
                                        await preparaAndSaveAluno();
                                        navigate('/alunos'); // Redireciona após salvar com sucesso
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

