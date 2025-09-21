import React, {useState, useEffect} from 'react';
import Modal from './Modal';
import {InputPadrao} from '../layout/InputPadrao';
import {ButtonStyled} from '../layout/DefaultComponents';

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
        setIsSubmitting(true);
        try {
            // Teste visual para garantir que está entrando aqui
            console.log('handleSubmit chamado', avaliacao);
            await onSave(avaliacao);
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
            <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: 12}}>
                <label>
                    CID:
                    <InputPadrao
                        type="text"
                        name="cid"
                        value={avaliacao.cid}
                        onChange={handleChange}
                        required
                    />
                </label>


                <label>
                    Parecer:
                    <InputPadrao
                        type="text"
                        name="parecer"
                        value={avaliacao.parecer}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Profissional Responsável:
                    <span> {avaliacao.nomeProfissionalResponsavel}</span>
                </label>
                <label>
                    Arquivo:
                    <input
                        type="file"
                        accept="application/pdf"
                        onChange={handleArquivoChange}
                    />
                    {avaliacao.arquivo?.nome && (
                        <div style={{fontSize: 13, marginTop: 4}}>
                            Arquivo atual: {avaliacao.arquivo.nome}
                        </div>
                    )}
                </label>
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
