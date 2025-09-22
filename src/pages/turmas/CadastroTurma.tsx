import React, { useState, useEffect } from "react";
import {
    StatContent,
    StatLabel,
    DefaultContainer,
    CardTitle,
    FixedHeader,
    ButtonStyled,
    CardWrapper
} from "../../components/layout/DefaultComponents.tsx";
import { useSidebar } from "../../context/SidebarContext.tsx";
import { useTheme } from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { buscarInstituicoes } from "../../services/instituicaoService";
import type { Instituicao } from "../../services/instituicaoService";
import { criarTurma, atualizarTurma, type Turma } from "../../services/turmaService";
import { profissionalService, type Profissional } from "../../services/profissionalService";
import { InputPadrao } from "../../components/layout/InputPadrao.tsx";

interface TurmaFormState {
    id: number | undefined;
    codigoTurma: string;
    descricao: string;
    serie: string;
    turno: string;
    anoTurma: string;
    instituicaoEnsinoId: string;
    profissionalId: string;
    ativo: boolean;
}

const initialFormState: TurmaFormState = {
    id: undefined,
    codigoTurma: "",
    descricao: "",
    serie: "",
    turno: "",
    anoTurma: "",
    instituicaoEnsinoId: "",
    profissionalId: "",
    ativo: true
};

const anoTurmaOptions = [
    { value: "PRE_ESCOLA_I", label: "Pré-escola I" },
    { value: "PRE_ESCOLA_II", label: "Pré-escola II" },
    { value: "PRIMEIRO_ANO_FUNDAMENTAL", label: "1º Ano - Fundamental" },
    { value: "SEGUNDO_ANO_FUNDAMENTAL", label: "2º Ano - Fundamental" },
    { value: "TERCEIRO_ANO_FUNDAMENTAL", label: "3º Ano - Fundamental" },
    { value: "QUARTO_ANO_FUNDAMENTAL", label: "4º Ano - Fundamental" },
    { value: "QUINTO_ANO_FUNDAMENTAL", label: "5º Ano - Fundamental" },
    { value: "SEXTO_ANO_FUNDAMENTAL", label: "6º Ano - Fundamental" },
    { value: "SETIMO_ANO_FUNDAMENTAL", label: "7º Ano - Fundamental" },
    { value: "OITAVO_ANO_FUNDAMENTAL", label: "8º Ano - Fundamental" },
    { value: "NONO_ANO_FUNDAMENTAL", label: "9º Ano - Fundamental" },
];

const turnos = [
    { value: "MATUTINO", label: "Matutino" },
    { value: "VESPERTINO", label: "Vespertino" },
    { value: "NOTURNO", label: "Noturno" }
];

const CadastroTurma: React.FC = () => {
    const [form, setForm] = useState(initialFormState);
    const [isEditing, setIsEditing] = useState(false);
    const [instituicoes, setInstituicoes] = useState<Instituicao[]>([]);
    const [profissionais, setProfissionais] = useState<Profissional[]>([]);
    const [submitted, setSubmitted] = useState(false);
    const { isSidebarOpen } = useSidebar();
    const theme = useTheme();
    const location = useLocation();
    const navigate = useNavigate();

    // Carregar lista de instituições
    useEffect(() => {
        buscarInstituicoes()
            .then(setInstituicoes)
            .catch(() => alert("Erro ao carregar instituições!"));
    }, []);

    useEffect(() => {
        profissionalService
            .listarProfissionais()
            .then(setProfissionais)
            .catch(() => alert("Erro ao carregar profissionais!"));
    }, []);

    // Efeito para carregar dados de turma caso seja edição
        useEffect(() => {
            if (location.state) {
                const turmaState: Turma = location.state;
                setForm({
                    id: turmaState?.id ?? undefined,
                    codigoTurma: turmaState.codigoTurma || "",
                    descricao: turmaState.descricao || "",
                    serie: turmaState.serie ? String(turmaState.serie) : "",
                    turno: turmaState.turno ? String(turmaState.turno) : "",
                    anoTurma: turmaState.anoTurma ? turmaState.anoTurma.toString() : "",
                    instituicaoEnsinoId: turmaState.instituicaoEnsino?.id?.toString() || "",
                    profissionalId: turmaState.profissional?.id?.toString() || "",
                    ativo: turmaState.ativo ?? true
                });
                setIsEditing(true);
            } else {
                setForm(initialFormState); // RESET para cadastro, mas NÃO redireciona
                setIsEditing(false);
            }
        }, [location.state]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target;

        if (name === "descricao") {
            setForm(prev => ({ ...prev, descricao: value.toUpperCase() }));
        } else if (name === "codigoTurma") {
            setForm(prev => ({ ...prev, codigoTurma: value.toUpperCase() }));
        } else if (name === "anoTurma") {
            // Aceita só números, máximo 4 dígitos
            let numericValue = value.replace(/\D/g, "").slice(0, 4);
            setForm(prev => ({ ...prev, anoTurma: numericValue }));
        } else {
            setForm(prev => ({
                ...prev,
                [name]: value
            }));
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSubmitted(true);

        // Validação manual dos campos obrigatórios (exceto código e professor)
        if (!form.descricao ||
            !form.serie ||
            !form.turno ||
            !form.anoTurma ||
            !form.instituicaoEnsinoId) {
            alert('Preencha todos os campos obrigatórios.');
            setSubmitted(false);
            return;
        }

        const payload: Turma = {
            id: undefined,
            codigoTurma: form.codigoTurma,
            descricao: form.descricao,
            serie: form.serie,
            turno: form.turno,
            anoTurma: Number(form.anoTurma),
            instituicaoEnsino: instituicoes.find(inst => inst.id.toString() === form.instituicaoEnsinoId),
            profissional: form.profissionalId ? profissionais.find(p => p.id.toString() === form.profissionalId) : undefined,
            ativo: true // sempre true
        };

        try {
            if (isEditing) {
                await atualizarTurma(form.id, payload);
            } else {
                await criarTurma(payload as any);
            }
            navigate('/Turmas');
        } catch (error) {
            alert("Erro ao salvar turma!");
        } finally {
            setSubmitted(false);
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
                                <h1>{isEditing ? "Edição de Turma" : "Cadastro de Turma"}</h1>
                            </CardTitle>
                        </FixedHeader>
                    </DefaultContainer>

                    <CardWrapper
                        $isSidebarOpen={isSidebarOpen}
                        $sidebarWidth={theme.sizes.sidebarWidth}
                        $sidebarCollapsedWidth={theme.sizes.sidebarWidthCollapsed}
                    >
                        <form onSubmit={handleSubmit}>
                            <StatContent>
                                <StatLabel>
                                    Descrição:
                                    <InputPadrao
                                        name="descricao"
                                        type="text"
                                        value={form.descricao}
                                        onChange={handleChange}
                                        style={{ textTransform: "uppercase" }}
                                        required
                                        disabled={submitted}
                                    />
                                </StatLabel>
                                <StatLabel>
                                    Série:
                                    <select
                                        name="serie"
                                        value={form.serie}
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
                                        {anoTurmaOptions.map(opt => (
                                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                                        ))}
                                    </select>
                                </StatLabel>
                                <StatLabel>
                                    Turno:
                                    <select
                                        name="turno"
                                        value={form.turno}
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
                                        {turnos.map(t => (
                                            <option key={t.value} value={t.value}>
                                                {t.label}
                                            </option>
                                        ))}
                                    </select>
                                </StatLabel>
                                <div style={{ display: "flex", gap: 16, alignItems: "flex-start", maxWidth: 450 }}>
                                    <StatLabel style={{ flex: 2 }}>
                                        Código:
                                        <InputPadrao
                                            name="codigoTurma"
                                            type="text"
                                            value={form.codigoTurma}
                                            onChange={handleChange}
                                            style={{ textTransform: "uppercase" }}
                                            // REMOVIDO required daqui
                                            disabled={submitted}
                                        />
                                    </StatLabel>
                                    <StatLabel style={{ flex: 1, maxWidth: 120 }}>
                                        Ano:
                                        <InputPadrao
                                            name="anoTurma"
                                            type="text"
                                            inputMode="numeric"
                                            pattern="[0-9]*"
                                            maxLength={4}
                                            value={form.anoTurma}
                                            onChange={handleChange}
                                            required
                                            disabled={submitted}
                                            style={{ width: "100%", maxWidth: 90, textAlign: "center" }}
                                        />
                                    </StatLabel>
                                </div>
                                <StatLabel>
                                    Instituição de Ensino:
                                    <select
                                        name="instituicaoEnsinoId"
                                        value={form.instituicaoEnsinoId}
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
                                        {instituicoes.map(inst => (
                                            <option key={inst.id} value={inst.id}>
                                                {inst.nome}
                                            </option>
                                        ))}
                                    </select>
                                </StatLabel>
                                <StatLabel>
                                    Professor:
                                    <select
                                        name="profissionalId"
                                        value={form.profissionalId}
                                        onChange={handleChange}
                                        // REMOVIDO required
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
                                        {profissionais.map((p) => (
                                            <option key={p.id} value={p.id}>{p.pessoa.nome}</option>
                                        ))}
                                    </select>
                                </StatLabel>
                            </StatContent>
                            <div style={{ marginTop: 24, display: "flex", justifyContent: "center", gap: 16 }}>
                                <ButtonStyled
                                    type="button"
                                    onClick={() => navigate('/Turmas')}
                                    style={{ background: '#6c757d' }}
                                    disabled={submitted}
                                >
                                    Cancelar
                                </ButtonStyled>
                                <ButtonStyled type="submit" disabled={submitted}>
                                    {submitted ? "Salvando..." : (isEditing ? "Atualizar" : "Cadastrar")}
                                </ButtonStyled>
                            </div>
                        </form>
                    </CardWrapper>
                </>
            );
};

export default CadastroTurma;
