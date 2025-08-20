import React from 'react';
import styled from 'styled-components';

interface TableProps {
  data: Array<{
    id: number;
    formulario: string;
    aluno: string;
    data: string;
    status: string;
  }>;
  onVisualizar: (id: number) => void;
  onCadastrar: (id: number) => void;
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

const StatusBadge = styled.span<{ status: string }>`
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  background: ${({ theme, status }) => 
    status === 'Enviada' ? theme.colors.success + '20' : 
    status === 'Pendente' ? theme.colors.warning + '20' : 
    theme.colors.info + '20'};
  color: ${({ theme, status }) => 
    status === 'Enviada' ? theme.colors.success : 
    status === 'Pendente' ? theme.colors.warning : 
    theme.colors.info};
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
            <Th>ID</Th>
            <Th>Formulário</Th>
            <Th>Aluno</Th>
            <Th>Data</Th>
            <Th>Status</Th>
            <Th>Ações</Th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <Td>{item.id}</Td>
              <Td>{item.formulario}</Td>
              <Td>{item.aluno}</Td>
              <Td>{new Date(item.data).toLocaleDateString('pt-BR')}</Td>
              <Td>
                <StatusBadge status={item.status}>{item.status}</StatusBadge>
              </Td>
              <Td>
                <ActionButton onClick={() => onVisualizar(item.id)}>
                  Visualizar
                </ActionButton>
                <ActionButton onClick={() => onCadastrar(item.id)}>
                  Cadastrar
                </ActionButton>
                <ActionButton onClick={() => onEditar(item.id)}>
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
