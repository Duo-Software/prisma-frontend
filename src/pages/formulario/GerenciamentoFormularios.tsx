import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SelectBox from '../../components/SelectBox';
import AvaliacoesTable from '../../components/AvaliacoesTable';
import {buscarTodosFormularios} from '../../services/formularioService';
import {buscarInstituicoes} from '../../services/instituicaoService';
import type { Formulario } from '../../types/formulario';
import {listarByFilter} from "../../services/alunoService.ts";
import {buscarAvaliacoesPorFiltros} from '../../services/avaliacaoService';

const PageContainer = styled.div`
  padding: 2rem;
  background: ${({ theme }) => theme.colors.background};
  min-height: 100vh;
  color: ${({ theme }) => theme.colors.text};
`;

const Title = styled.h1`
  font-size: 1.75rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 2rem;
`;

const SelectsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    gap: 1rem;
    > div {
      flex: 1 1 100%;
    }
  }
`;

const Message = styled.div`
  padding: 1rem;
  border-radius: ${({ theme }) => theme.borderRadius};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  margin-top: 2rem;
  box-shadow: ${({ theme }) => theme.boxShadow};
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  cursor: pointer;
  font-size: 1rem;
  margin-bottom: 1rem;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    opacity: 0.9;
  }
`;

const GerenciamentoFormularios: React.FC = () => {
  const navigate = useNavigate();
  const [formularioId, setFormularioId] = useState('');
  const [instituicaoId, setInstituicaoId] = useState('');
  const [alunoId, setAlunoId] = useState('');

  const [formularios, setFormularios] = useState<Formulario[]>([]);
  const [instituicoes, setInstituicoes] = useState<any[]>([]);
  const [alunos, setAlunos] = useState<any[]>([]);
  const [avaliacoes, setAvaliacoes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarFormularios = async () => {
      try {
        const response = await buscarTodosFormularios();
        setFormularios(response);
      } catch (error) {
        console.error('Erro ao carregar formulários:', error);
      } finally {
        setLoading(false);
      }
    };
    carregarFormularios();
  }, []);

  // Simulação de dados para instituições
  useEffect(() => {
    const buscarInstituicoesCombo = async () => {
      try {
        const response = await buscarInstituicoes();
        setInstituicoes(response);
      } catch (error) {
        console.error('Erro ao carregar instituições:', error);
      }
    };
    buscarInstituicoesCombo();
  }, [formularioId]);

  // Simulação de dados para alunos
  useEffect(() => {
    const buscarAlunos = async () => {
      if (instituicaoId) {
        try {
          const response = await listarByFilter(Number(instituicaoId));
          setAlunos(response);
        } catch (error) {
          console.error('Erro ao carregar alunos:', error);
          setAlunos([]);
        }
      }
    };
    buscarAlunos();
  }, [instituicaoId]);

  const buscarAvaliacoes = async () => {
    if (formularioId || instituicaoId || alunoId) {
      try {
        const response = await buscarAvaliacoesPorFiltros(
          Number(formularioId),
          Number(instituicaoId),
          Number(alunoId)
        );
        setAvaliacoes(response);
      } catch (error) {
        console.error('Erro ao carregar avaliações:', error);
        setAvaliacoes([]);
      }
    }
  };

  const handleVisualizar = (id: number) => {
    navigate(`/formulario/visualizar/${id}`);
  };

  const handleCadastrar = () => {
    if (formularioId && alunoId) {
      navigate(`/formulario/responder/${formularioId}/${alunoId}`);
    }
  };

  const handleEditar = (id: number) => {
    navigate(`/formulario/${id}`);
  };

  if (loading) {
    return (
      <PageContainer>
        <Message>Carregando formulários...</Message>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Title>Gerenciamento de Formulários de Avaliação</Title>

      <SelectsContainer>
        <SelectBox
          label="Formulário"
          options={formularios.map(form => ({
            id: form.id,
            nome: form.nomeFormulario
          }))}
          value={formularioId}
          onChange={setFormularioId}
        />

        <SelectBox
          label="Instituição de Ensino"
          options={instituicoes}
          value={instituicaoId}
          onChange={setInstituicaoId}
          disabled={!formularioId}
        />

        <SelectBox
          label="Aluno"
          options={alunos.map(aluno => ({
            id: aluno.id,
            nome: aluno.pessoa.nome
          }))}
          value={alunoId}
          onChange={setAlunoId}
          disabled={!instituicaoId}
        />
      </SelectsContainer>

      <Button
        onClick={buscarAvaliacoes}
        disabled={!formularioId && !instituicaoId && !alunoId}
      >
        Buscar Avaliações
      </Button>

      {avaliacoes && avaliacoes.length > 0 ? (
        <AvaliacoesTable
          data={avaliacoes}
          onVisualizar={handleVisualizar}
          onCadastrar={handleCadastrar}
          onEditar={handleEditar}
        />
      ) : (
        <Message>
          Selecione o formulário, instituição e aluno para visualizar as avaliações
        </Message>
      )}
    </PageContainer>
  );
};

export default GerenciamentoFormularios;
