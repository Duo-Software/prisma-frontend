import React, {useState, useEffect} from 'react';
import Modal from './Modal';
import {InputPadrao} from '../layout/InputPadrao';
import {ButtonStyled, StatLabel, StatValue} from '../layout/DefaultComponents';
import {CustomSelect} from "../layout/CustomSelect.tsx";
import {allCategories} from "../../enums/Categoria.ts";
import {CID} from "../../enums/CidEnum.ts";

interface Arquivo {
    idArquivo?: number;
    nome: string;
    tipo: string;
    tamanho: number;
    conteudo: string | null;
    dtCadastro: string;
    ativo: boolean;
}

export interface AvaliacaoAluno {
    idDiagnosticoPessoa?: number;
    idPessoa: number;
    nomePessoa?: string;
    cid: string;
    parecer: string;
    idProfissionalResponsavel: number;
    nomeProfissionalResponsavel?: string;
    arquivo?: Arquivo;
}

interface AvaliacaoAlunoModalProps {
    isOpen: boolean,
    onClose: () => void,
    onSave: (avaliacao: AvaliacaoAluno) => void,
    initialData?: AvaliacaoAluno,
    isCadastro?: boolean
}

const initialAvaliacaoState: AvaliacaoAluno = {
    idDiagnosticoPessoa: undefined,
    idPessoa: 0,
    cid: '',
    parecer: '',
    idProfissionalResponsavel: 0,
    arquivo: undefined
};

const AvaliacaoAlunoModal: React.FC<AvaliacaoAlunoModalProps> = ({
                                                                     isOpen,
                                                                     onClose,
                                                                     onSave,
                                                                     initialData,
                                                                     isCadastro
                                                                 }) => {
    const [avaliacao, setAvaliacao] = useState<AvaliacaoAluno>(initialAvaliacaoState);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [categoria, setCategoria] = useState('');
    const [cids, setCids] = useState<{
        readonly codigo: string;
        readonly codigoEnum: string;
        readonly descricao: string;
        readonly categoria: string;
    }[]>([]);


    useEffect(() => {
        if (initialData) {
            setAvaliacao(initialData);
        } else {
            setAvaliacao(initialAvaliacaoState);
        }
    }, [initialData, isOpen, isCadastro]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const {name, value} = e.target;
        setAvaliacao(prev => ({...prev, [name]: value}));
    }

    function handleChangeCategoria(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const {value} = e.target;
        setCategoria(value);
        setCids(Object.values(CID).filter(cid => cid.categoria === value).map(cid => ({
            codigo: cid.codigo,
            codigoEnum: cid.codigoEnum,
            descricao: cid.descricao,
            categoria: cid.categoria
        })));
    }

    function handleCid(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const {value} = e.target;
        const cidSelecionado = Object.values(CID).find(cid => cid.codigo === value);
        avaliacao.cid = cidSelecionado?.codigoEnum || "";
    }

    function handleArquivoChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files && e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                const base64 = (ev.target?.result as string)?.split(',')[1];
                setAvaliacao(prev => ({
                    ...prev,
                    arquivo: {
                        idArquivo: prev.arquivo?.idArquivo || undefined,
                        nome: file.name,
                        tipo: file.type,
                        tamanho: file.size,
                        conteudo: base64,
                        dtCadastro: prev.arquivo?.dtCadastro || new Date().toISOString(),
                        ativo: true
                    }
                }));
            };
            reader.readAsDataURL(file);
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (isSubmitting) return; // Evita chamadas duplicadas

        setIsSubmitting(true);
        try {
            // Teste visual para garantir que está entrando aqui
            await onSave(avaliacao);
            // Ao salvar com sucesso, fechamos o modal
            onClose();
        } catch (err) {
            // Mostra erro no console
            console.error('Erro no handleSubmit do modal:', err);
            alert('Erro ao salvar avaliação.');
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Editar Diagnóstico do Aluno">
            <form onSubmit={handleSubmit}>
                <StatLabel>
                    Categoria CID:
                    <CustomSelect
                        name="categoriaCID"
                        value={categoria}
                        onChange={handleChangeCategoria}
                        required
                        disabled={isSubmitting}
                        options={[
                            { value: "", label: "Selecione..." },
                            ...allCategories. map(cat => ({
                                value: cat ?? "",
                                label: cat
                            }))
                        ]}
                        backgroundColor="white"
                    />
                </StatLabel>



                <StatLabel>
                    CID:
                    <CustomSelect
                        name="cid"
                        value={avaliacao.cid || ""}
                        onChange={handleCid}
                        required
                        disabled={isSubmitting}
                        options={[
                            { value: "", label: "Selecione..." },
                            ...cids.map(cid => ({
                                value: cid.codigoEnum,
                                label: cid.codigo + " - " + cid.descricao
                            }))
                        ]}
                        backgroundColor="white"
                    />
                </StatLabel>


                <StatLabel>
                    Parecer:
                    <InputPadrao
                        isTextarea
                        rows={4}
                        type="text"
                        name="parecer"
                        value={avaliacao.parecer}
                        onChange={handleChange}
                        required
                    />
                </StatLabel>
                <StatLabel hidden={avaliacao.idDiagnosticoPessoa === undefined || avaliacao.idDiagnosticoPessoa === null || avaliacao.idDiagnosticoPessoa === 0}>
                    Profissional Responsável:
                    <StatValue> {avaliacao.nomeProfissionalResponsavel}</StatValue>
                </StatLabel>
                <StatLabel>
                    Arquivo:
                    <InputPadrao
                        type="file"
                        accept="application/pdf"
                        onChange={handleArquivoChange}
                    />
                    {(avaliacao.idDiagnosticoPessoa !== undefined && avaliacao.idDiagnosticoPessoa !== null && avaliacao.idDiagnosticoPessoa !== 0 && avaliacao.arquivo?.nome) && (
                        <div style={{fontSize: 13, marginTop: 4}}>
                            Arquivo atual: {avaliacao.arquivo.nome}
                        </div>
                    )}
                </StatLabel>
                <div style={{display: 'flex', justifyContent: 'flex-end', gap: 8}}>
                    <ButtonStyled type="button" onClick={onClose} style={{background: '#6c757d'}}>
                        Cancelar
                    </ButtonStyled>
                    <ButtonStyled
                        type="submit"
                        disabled={isSubmitting}
                        onClick={handleSubmit}
                    >
                        {isSubmitting ? 'Salvando...' : 'Salvar'}
                    </ButtonStyled>
                </div>
            </form>
        </Modal>
    );
};

export default AvaliacaoAlunoModal;
