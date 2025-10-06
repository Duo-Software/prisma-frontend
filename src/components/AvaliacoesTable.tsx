import React from 'react';
import styled from 'styled-components';
import type {Aluno} from "../types/aluno.ts";

interface TableProps {
  data: Array<{
    id: number;
    formulario: string;
    aluno: Aluno;
    dataCadastro: string;
  }>;
  onVisualizar: (id: number) => void;
  onCadastrar: (id: number | undefined) => void;
  onEditar: (id: number) => void;
}

const TableWrapper = styled.div`
  overflow-x: auto;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.boxShadow};
  margin-top: 1.5rem;
`;

const StyledTable = styled.table`
  width: 100%;
  min-width: 600px;
  border-collapse: collapse;
`;

const Th = styled.th`
  padding: 1rem;
  text-align: left;
  background: ${({ theme }) => theme.colors.primaryLight};
  color: #fff;
  font-weight: 600;
  white-space: nowrap;
  &:first-child {
    border-top-left-radius: ${({ theme }) => theme.borderRadius};
  }
  &:last-child {
    border-top-right-radius: ${({ theme }) => theme.borderRadius};
  }
`;

const Td = styled.td`
  padding: 0.75rem 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
`;

const ActionButton = styled.button`
  padding: 0.5rem 1rem;
  margin-right: 0.5rem;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transition};

  &:hover {
    background: ${({ theme }) => theme.colors.primaryLight};
    transform: translateY(-1px);
    box-shadow: 0 2px 8px ${({ theme }) => theme.colors.primary}40;
  }

  &:last-child {
    margin-right: 0;
  }
`;

const AvaliacoesTable: React.FC<TableProps> = ({
  data,
  onVisualizar,
  onCadastrar,
  onEditar,
}) => {
  return (
    <TableWrapper>
      <StyledTable>
        <thead>
          <tr>
            <Th>Protocolo</Th>
            <Th>Aluno</Th>
            <Th>Data</Th>
            <Th>Ações</Th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <Td>{item.formulario}</Td>
              <Td>{item.aluno.pessoa.nome}</Td>
              <Td>{item.dataCadastro ? new Date(item.dataCadastro).toLocaleDateString('pt-BR'): '-'}</Td>
              <Td>
                <ActionButton hidden={item.id === null} onClick={() => onVisualizar(item.id)}>
                  Visualizar
                </ActionButton>
                <ActionButton hidden={item.id !== null} onClick={() => onCadastrar(item?.aluno?.id)}>
                  Cadastrar
                </ActionButton>
                <ActionButton hidden={true} onClick={() => onEditar(item.id)}>
                  Editar
                </ActionButton>
              </Td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </TableWrapper>
  );
};

export default AvaliacoesTable;
