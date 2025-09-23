import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { StatLabel } from '../layout/DefaultComponents';
import { InputPadrao } from '../layout/InputPadrao';
import styled from 'styled-components';
import type {Pessoa} from "../../services/pessoaService.ts";
// import { Etnia } from '../../mocks/etnia';
// import { municipiosBrasileiros } from '../../mocks/municipios-mock';

const ButtonsContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 20px;
`;

const SubmitButton = styled.button`
    padding: 8px 16px;
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
    &:hover {
        background-color: ${({ theme }) => theme.colors.primaryLight};
    }
    &:disabled {
        background-color: ${({ theme }) => theme.colors.primaryLight};
        cursor: not-allowed;
    }
`;

const CancelButton = styled.button`
    padding: 8px 16px;
    background-color: transparent;
    color: ${({ theme }) => theme.colors.text};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
    &:hover {
        background-color: ${({ theme }) => theme.colors.secondary};
    }
`;

const ModalGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

// const UFS = [
//     // { id: 1, nome: "Acre", sigla: "AC" },ok
//     // { id: 2, nome: "Alagoas", sigla: "AL" },
//     // { id: 3, nome: "Amapá", sigla: "AP" },
//     // { id: 4, nome: "Amazonas", sigla: "AM" },
//     // { id: 5, nome: "Bahia", sigla: "BA" },
//     // { id: 6, nome: "Ceará", sigla: "CE" },
//     // { id: 7, nome: "Distrito Federal", sigla: "DF" },
//     // { id: 8, nome: "Espírito Santo", sigla: "ES" },
//     // { id: 9, nome: "Goiás", sigla: "GO" },
//     // { id: 10, nome: "Maranhão", sigla: "MA" },
//     { id: 11, nome: "Mato Grosso", sigla: "MT" },
//     // { id: 12, nome: "Mato Grosso do Sul", sigla: "MS" },
//     // { id: 13, nome: "Minas Gerais", sigla: "MG" },
//     // { id: 14, nome: "Pará", sigla: "PA" },
//     // { id: 15, nome: "Paraíba", sigla: "PB" },
//     // { id: 16, nome: "Paraná", sigla: "PR" },
//     // { id: 17, nome: "Pernambuco", sigla: "PE" },
//     // { id: 18, nome: "Piauí", sigla: "PI" },
//     // { id: 19, nome: "Rio de Janeiro", sigla: "RJ" },
//     // { id: 20, nome: "Rio Grande do Norte", sigla: "RN" },
//     // { id: 21, nome: "Rio Grande do Sul", sigla: "RS" },
//     // { id: 22, nome: "Rondônia", sigla: "RO" },
//     // { id: 23, nome: "Roraima", sigla: "RR" },
//     // { id: 24, nome: "Santa Catarina", sigla: "SC" },
//     // { id: 25, nome: "São Paulo", sigla: "SP" },
//     // { id: 26, nome: "Sergipe", sigla: "SE" },
//     // { id: 27, nome: "Tocantins", sigla: "TO" },
// ];

interface PessoaModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (pessoa: Pessoa) => void;
    initialData?: Pessoa;
}

const initialPessoaState: Pessoa = {
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
    dataAlteracao: "",
    statusNecessidade: "NAO_INFORMADO"
};

function formatarCpf(cpf: string): string {
    const cpfLimpo = cpf.replace(/\D/g, '').slice(0, 11);

    if (cpfLimpo.length <= 3) {
        return cpfLimpo;
    }
    if (cpfLimpo.length <= 6) {
        return `${cpfLimpo.slice(0, 3)}.${cpfLimpo.slice(3)}`;
    }
    if (cpfLimpo.length <= 9) {
        return `${cpfLimpo.slice(0, 3)}.${cpfLimpo.slice(3, 6)}.${cpfLimpo.slice(6)}`;
    }
    return `${cpfLimpo.slice(0, 3)}.${cpfLimpo.slice(3, 6)}.${cpfLimpo.slice(6, 9)}-${cpfLimpo.slice(9, 11)}`;
}

function formatarTelefone(valor: string): string {
    const d = valor.replace(/\D/g, '').slice(0, 11); // até 11 dígitos (DDD + 9 dígitos)
    if (d.length === 0) return '';
    if (d.length <= 2) return `(${d}`;
    if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`; // até 4 do número sem hífen
    if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`; // fixo: 4-4
    return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7, 11)}`; // móvel: 5-4
}

const PessoaModal: React.FC<PessoaModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
    const [pessoa, setPessoa] = useState<Pessoa>(initialPessoaState);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [validationError, setValidationError] = useState<string | null>(null);

    useEffect(() => {
        if (initialData) {
            setPessoa(initialData);
        } else {
            setPessoa(initialPessoaState);
        }
    }, [initialData, isOpen]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target;

        if (['nome', 'nomeMae', 'nomePai', 'endereco'].includes(name)) {
            setPessoa(prev => ({
                ...prev,
                [name]: value.toUpperCase()
            }));
            return;
        }

        if (name === 'cpf') {
            const formatado = formatarCpf(value);
            setPessoa(prev => ({
                ...prev,
                cpf: formatado
            }));
            return;
        }

        if (name === 'telefone') {
            setPessoa(prev => ({
                ...prev,
                telefone: formatarTelefone(value)
            }));
            return;
        }

        if (name.includes('.')) {
            const [parent, child] = name.split('.') as [keyof Pessoa, string];
            setPessoa(prev => {
                // Verifique se o campo pai é um objeto
                const parentValue = prev[parent];

                // Só faz o spread se for um objeto e for diferente de null
                if (parentValue && typeof parentValue === "object") {
                    return {
                        ...prev,
                        [parent]: {
                            ...parentValue,
                            [child]: value
                        }
                    };
                }
                // Caso não seja objeto, retorna o estado anterior sem alteração
                return prev;
            });
        } else {
            setPessoa(prev => ({
                ...prev,
                [name]: value
            }));
        }
    }

    // function handlePaisSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    //     const selectedValue = e.target.value;
    //     // No momento só existe a opção Brasil (id = "1")
    //     setPessoa(prev => ({
    //         ...prev,
    //         paisNaturalidade: selectedValue
    //             ? { id: "1", nome: "Brasil" }
    //             : { id: "", nome: "" }
    //     }));
    // }

    // function handleUfSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    //     const ufSigla = e.target.value;
    //     setPessoa(prev => ({
    //         ...prev,
    //         ufNaturalidade: {
    //             id: e.target.options[e.target.selectedIndex].id,
    //             sigla: ufSigla,
    //             nome: ufSigla ? e.target.options[e.target.selectedIndex].text : ""
    //         },
    //         municipioNaturalidade: {
    //             id: "",
    //             nome: "",
    //             uf: ufSigla
    //         }
    //     }));
    // }

    // function handleMunicipioSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    //     const municipioNome = e.target.value;
    //     const ufSigla = pessoa.ufNaturalidade.sigla;
    //     const municipio = municipiosBrasileiros.find(m => m.nome === municipioNome && m.uf === ufSigla);
    //
    //     if (municipio) {
    //         setPessoa(prev => ({
    //             ...prev,
    //             municipioNaturalidade: {
    //                 id: municipio.id.toString(),
    //                 nome: municipio.nome,
    //                 uf: municipio.uf
    //             }
    //         }));
    //     }
    // }

    // Função para checar se todos os campos obrigatórios estão preenchidos
    function validarCamposObrigatorios(): { val: boolean, erro?: string } {
        if (!pessoa.nome.trim())
            return { val: false, erro: 'O nome é obrigatório.' };
        if (!pessoa?.cpf?.trim() || pessoa.cpf?.replace(/\D/g, '').length < 11)
            return { val: false, erro: 'Informe um CPF válido.' };
        if (!pessoa.sexo)
            return { val: false, erro: 'Selecione o sexo.' };
        if (!pessoa.dataNascimento)
            return { val: false, erro: 'Informe a data de nascimento.' };
        // Inclua aqui outros campos obrigatórios caso desejar!
        return { val: true };
    }

    const handleSubmit = () => {
        setIsSubmitting(true);

        const validacao = validarCamposObrigatorios();
        if (!validacao.val) {
            setValidationError(validacao.erro || 'Preencha todos os campos obrigatórios.');
            setIsSubmitting(false);
            return;
        }

        setValidationError(null);

        // Criar uma cópia atualizada para enviar ao parent
        const updatedPessoa = {
            ...pessoa,
            dataCadastro: pessoa.dataCadastro || new Date().toISOString(),
            dataAlteracao: new Date().toISOString()
        };

        // Simulação de API call
        setTimeout(() => {
            onSave(updatedPessoa);
            setIsSubmitting(false);
            onClose();
        }, 500);
    };

    // const municipiosFiltrados = municipiosBrasileiros
    //     .filter(m => m.uf === pessoa.ufNaturalidade.sigla)
    //     .sort((a, b) => a.nome.localeCompare(b.nome));

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Cadastro de Dados Pessoais"
            width="800px"
        >
            <ModalGrid>
                <StatLabel>
                    Nome:
                    <InputPadrao
                        type="text"
                        name="nome"
                        value={pessoa.nome}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        style={{
                            width: "85%",
                            padding: 8,
                            marginTop: 4,
                            marginBottom: 4,
                            display: "block",
                            textTransform: "uppercase"
                        }}
                    />
                </StatLabel>
                <StatLabel>
                    CPF:
                    <InputPadrao
                        type="text"
                        name="cpf"
                        value={pessoa.cpf}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        inputMode="numeric"
                        pattern="\d*"
                        maxLength={14} // 000.000.000-00
                        placeholder="000.000.000-00"
                        style={{
                            width: "85%",
                            padding: 8,
                            marginTop: 4,
                            marginBottom: 4,
                            display: "block"
                        }}
                    />
                </StatLabel>
                <StatLabel>
                    Sexo:
                    <select
                        name="sexo"
                        value={pessoa.sexo}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        style={{
                            width: "85%",
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
                {/*<StatLabel>*/}
                {/*    Etnia:*/}
                {/*    <select*/}
                {/*        name="etnia"*/}
                {/*        value={pessoa.etnia}*/}
                {/*        onChange={handleChange}*/}
                {/*        required*/}
                {/*        disabled={isSubmitting}*/}
                {/*        style={{*/}
                {/*            width: "85%",*/}
                {/*            padding: 8,*/}
                {/*            marginTop: 4,*/}
                {/*            marginBottom: 4,*/}
                {/*            display: "block"*/}
                {/*        }}*/}
                {/*    >*/}
                {/*        <option value="">Selecione...</option>*/}
                {/*        {Object.values(Etnia).map(etnia => (*/}
                {/*            <option key={etnia} value={etnia}>{etnia}</option>*/}
                {/*        ))}*/}
                {/*    </select>*/}
                {/*</StatLabel>*/}
                <StatLabel>
                    Data de Nascimento:
                    <InputPadrao
                        type="date"
                        name="dataNascimento"
                        value={pessoa.dataNascimento}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        style={{
                            width: "85%",
                            padding: 8,
                            marginTop: 4,
                            marginBottom: 4,
                            display: "block"
                        }}
                    />
                </StatLabel>
                {/*<StatLabel>*/}
                {/*    Nome da Mãe:*/}
                {/*    <InputPadrao*/}
                {/*        type="text"*/}
                {/*        name="nomeMae"*/}
                {/*        value={pessoa.nomeMae}*/}
                {/*        onChange={handleChange}*/}
                {/*        required*/}
                {/*        disabled={isSubmitting}*/}
                {/*        style={{*/}
                {/*            width: "85%",*/}
                {/*            padding: 8,*/}
                {/*            marginTop: 4,*/}
                {/*            marginBottom: 4,*/}
                {/*            display: "block",*/}
                {/*            textTransform: "uppercase"*/}
                {/*        }}*/}
                {/*    />*/}
                {/*</StatLabel>*/}
                {/*<StatLabel>*/}
                {/*    Nome do Pai:*/}
                {/*    <InputPadrao*/}
                {/*        type="text"*/}
                {/*        name="nomePai"*/}
                {/*        value={pessoa.nomePai}*/}
                {/*        onChange={handleChange}*/}
                {/*        disabled={isSubmitting}*/}
                {/*        style={{*/}
                {/*            width: "85%",*/}
                {/*            padding: 8,*/}
                {/*            marginTop: 4,*/}
                {/*            marginBottom: 4,*/}
                {/*            display: "block",*/}
                {/*            textTransform: "uppercase"*/}
                {/*        }}*/}
                {/*    />*/}
                {/*</StatLabel>*/}
                {/*<StatLabel>*/}
                {/*    Endereço:*/}
                {/*    <InputPadrao*/}
                {/*        type="text"*/}
                {/*        name="endereco"*/}
                {/*        value={pessoa.endereco}*/}
                {/*        onChange={handleChange}*/}
                {/*        required*/}
                {/*        disabled={isSubmitting}*/}
                {/*        style={{*/}
                {/*            width: "85%",*/}
                {/*            padding: 8,*/}
                {/*            marginTop: 4,*/}
                {/*            marginBottom: 4,*/}
                {/*            display: "block",*/}
                {/*            textTransform: "uppercase"*/}
                {/*        }}*/}
                {/*    />*/}
                {/*</StatLabel>*/}
                {/*<StatLabel>*/}
                {/*    Email:*/}
                {/*    <InputPadrao*/}
                {/*        type="email"*/}
                {/*        name="email"*/}
                {/*        value={pessoa.email}*/}
                {/*        onChange={handleChange}*/}
                {/*        required*/}
                {/*        disabled={isSubmitting}*/}
                {/*        style={{*/}
                {/*            width: "85%",*/}
                {/*            padding: 8,*/}
                {/*            marginTop: 4,*/}
                {/*            marginBottom: 4,*/}
                {/*            display: "block"*/}
                {/*        }}*/}
                {/*    />*/}
                {/*</StatLabel>*/}
                {/*<StatLabel>*/}
                {/*    Telefone:*/}
                {/*    <InputPadrao*/}
                {/*        type="tel"*/}
                {/*        name="telefone"*/}
                {/*        value={pessoa.telefone}*/}
                {/*        onChange={handleChange}*/}
                {/*        required*/}
                {/*        disabled={isSubmitting}*/}
                {/*        inputMode="numeric"*/}
                {/*        pattern="\d*"*/}
                {/*        maxLength={15} // (00) 00000-0000*/}
                {/*        placeholder="(00) 00000-0000"*/}
                {/*        style={{*/}
                {/*            width: "85%",*/}
                {/*            padding: 8,*/}
                {/*            marginTop: 4,*/}
                {/*            marginBottom: 4,*/}
                {/*            display: "block"*/}
                {/*        }}*/}
                {/*    />*/}
                {/*</StatLabel>*/}
                {/*<StatLabel>*/}
                {/*    País de Naturalidade:*/}
                {/*    <select*/}
                {/*        name="paisNaturalidade.id"*/}
                {/*        value={pessoa.paisNaturalidade.id}*/}
                {/*        onChange={handlePaisSelect}*/}
                {/*        required*/}
                {/*        disabled={isSubmitting}*/}
                {/*        style={{*/}
                {/*            width: "85%",*/}
                {/*            padding: 8,*/}
                {/*            marginTop: 4,*/}
                {/*            marginBottom: 4,*/}
                {/*            display: "block"*/}
                {/*        }}*/}
                {/*    >*/}
                {/*        <option value="">Selecione...</option>*/}
                {/*        <option value="1">Brasil</option>*/}
                {/*    </select>*/}
                {/*</StatLabel>*/}
                {/*<StatLabel>*/}
                {/*    UF de Naturalidade:*/}
                {/*    <select*/}
                {/*        name="ufNaturalidade.sigla"*/}
                {/*        value={pessoa.ufNaturalidade.sigla}*/}
                {/*        onChange={handleUfSelect}*/}
                {/*        required*/}
                {/*        disabled={isSubmitting}*/}
                {/*        style={{*/}
                {/*            width: "85%",*/}
                {/*            padding: 8,*/}
                {/*            marginTop: 4,*/}
                {/*            marginBottom: 4,*/}
                {/*            display: "block"*/}
                {/*        }}*/}
                {/*    >*/}
                {/*        <option value="">Selecione...</option>*/}
                {/*        {UFS.map(uf => (*/}
                {/*            <option id={uf.id.toString()} key={uf.sigla} value={uf.sigla}>{uf.nome} - {uf.sigla}</option>*/}
                {/*        ))}*/}
                {/*    </select>*/}
                {/*</StatLabel>*/}
                {/*<StatLabel>*/}
                {/*    Município de Naturalidade:*/}
                {/*    <select*/}
                {/*        name="municipioNaturalidade.nome"*/}
                {/*        value={pessoa.municipioNaturalidade.nome}*/}
                {/*        onChange={handleMunicipioSelect}*/}
                {/*        required*/}
                {/*        disabled={isSubmitting || !pessoa.ufNaturalidade.sigla}*/}
                {/*        style={{*/}
                {/*            width: "85%",*/}
                {/*            padding: 8,*/}
                {/*            marginTop: 4,*/}
                {/*            marginBottom: 4,*/}
                {/*            display: "block"*/}
                {/*        }}*/}
                {/*    >*/}
                {/*        <option value="">Selecione...</option>*/}
                {/*        {municipiosFiltrados.map(municipio => (*/}
                {/*            <option id={municipio.id.toString()} key={municipio.nome} value={municipio.nome}>{municipio.nome}</option>*/}
                {/*        ))}*/}
                {/*    </select>*/}
                {/*</StatLabel>*/}
            </ModalGrid>
            {validationError && (
                <div style={{ color: '#e53935', marginBottom: 8, marginTop: 12, textAlign: 'center' }}>
                    {validationError}
                </div>
            )}
            <ButtonsContainer>
                <CancelButton onClick={onClose} disabled={isSubmitting}>Cancelar</CancelButton>
                <SubmitButton onClick={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting ? 'Salvando...' : 'Salvar'}
                </SubmitButton>
            </ButtonsContainer>
        </Modal>
    );
};

export default PessoaModal;