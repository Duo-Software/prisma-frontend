import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { StatLabel } from '../layout/DefaultComponents';
import { InputPadrao } from '../layout/InputPadrao';
import styled from 'styled-components';
import { Etnia } from '../../mocks/etnia';
import { municipiosBrasileiros } from '../../mocks/municipios-mock';

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

interface Pessoa {
  id: string;
  nome: string;
  cpf: string;
  sexo: string;
  etnia: string;
  dataNascimento: string;
  paisNaturalidade: { id: string; nome: string };
  ufNaturalidade: { id: string; sigla: string; nome: string };
  municipioNaturalidade: { id: string; nome: string; uf: string };
  nomeMae: string;
  nomePai: string;
  endereco: string;
  email: string;
  telefone: string;
  dataCadastro: string;
  dataAlteracao: string;
}

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
  dataAlteracao: ""
};

const PessoaModal: React.FC<PessoaModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const [pessoa, setPessoa] = useState<Pessoa>(initialPessoaState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setPessoa(initialData);
    } else {
      setPessoa(initialPessoaState);
    }
  }, [initialData, isOpen]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;

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

  function handleUfSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    const ufSigla = e.target.value;
    setPessoa(prev => ({
      ...prev,
      ufNaturalidade: {
        id: "",
        sigla: ufSigla,
        nome: ufSigla ? e.target.options[e.target.selectedIndex].text : ""
      },
      municipioNaturalidade: {
        id: "",
        nome: "",
        uf: ufSigla
      }
    }));
  }

  function handleMunicipioSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    const municipioNome = e.target.value;
    const ufSigla = pessoa.ufNaturalidade.sigla;
    const municipio = municipiosBrasileiros.find(m => m.nome === municipioNome && m.uf === ufSigla);

    if (municipio) {
      setPessoa(prev => ({
        ...prev,
        municipioNaturalidade: {
          id: "",
          nome: municipio.nome,
          uf: municipio.uf
        }
      }));
    }
  }

  const handleSubmit = () => {
    setIsSubmitting(true);

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

  const ufsFiltered = municipiosBrasileiros
    .map(m => ({ sigla: m.uf, nome: m.uf }))
    .filter((v, i, a) => a.findIndex(t => t.sigla === v.sigla) === i)
    .sort((a, b) => a.sigla.localeCompare(b.sigla));

  const municipiosFiltrados = municipiosBrasileiros
    .filter(m => m.uf === pessoa.ufNaturalidade.sigla)
    .sort((a, b) => a.nome.localeCompare(b.nome));

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
              width: "100%",
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
            name="etnia"
            value={pessoa.etnia}
            onChange={handleChange}
            required
            disabled={isSubmitting}
            style={{
              width: "100%",
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
            name="dataNascimento"
            value={pessoa.dataNascimento}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
        </StatLabel>
        <StatLabel>
          Nome da Mãe:
          <InputPadrao
            type="text"
            name="nomeMae"
            value={pessoa.nomeMae}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
        </StatLabel>
        <StatLabel>
          Nome do Pai:
          <InputPadrao
            type="text"
            name="nomePai"
            value={pessoa.nomePai}
            onChange={handleChange}
            disabled={isSubmitting}
          />
        </StatLabel>
        <StatLabel>
          Endereço:
          <InputPadrao
            type="text"
            name="endereco"
            value={pessoa.endereco}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
        </StatLabel>
        <StatLabel>
          Email:
          <InputPadrao
            type="email"
            name="email"
            value={pessoa.email}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
        </StatLabel>
        <StatLabel>
          Telefone:
          <InputPadrao
            type="tel"
            name="telefone"
            value={pessoa.telefone}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
        </StatLabel>
        <StatLabel>
          País de Naturalidade:
          <InputPadrao
            type="text"
            name="paisNaturalidade.nome"
            value={pessoa.paisNaturalidade.nome}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
        </StatLabel>
        <StatLabel>
          UF de Naturalidade:
          <select
            name="ufNaturalidade.sigla"
            value={pessoa.ufNaturalidade.sigla}
            onChange={handleUfSelect}
            required
            disabled={isSubmitting}
            style={{
              width: "100%",
              padding: 8,
              marginTop: 4,
              marginBottom: 4,
              display: "block"
            }}
          >
            <option value="">Selecione...</option>
            {ufsFiltered.map(uf => (
              <option key={uf.sigla} value={uf.sigla}>{uf.sigla}</option>
            ))}
          </select>
        </StatLabel>
        <StatLabel>
          Município de Naturalidade:
          <select
            name="municipioNaturalidade.nome"
            value={pessoa.municipioNaturalidade.nome}
            onChange={handleMunicipioSelect}
            required
            disabled={isSubmitting || !pessoa.ufNaturalidade.sigla}
            style={{
              width: "100%",
              padding: 8,
              marginTop: 4,
              marginBottom: 4,
              display: "block"
            }}
          >
            <option value="">Selecione...</option>
            {municipiosFiltrados.map(municipio => (
              <option key={municipio.nome} value={municipio.nome}>{municipio.nome}</option>
            ))}
          </select>
        </StatLabel>
      </ModalGrid>

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