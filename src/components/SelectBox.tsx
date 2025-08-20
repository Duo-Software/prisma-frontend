import React from 'react';
import styled from 'styled-components';

interface Option {
  id: number;
  nome: string;
}

interface SelectBoxProps {
  label: string;
  options: Option[] | undefined;
  value: string | number;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const SelectWrapper = styled.div`
  margin-bottom: 1rem;
  min-width: 220px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  transition: all ${({ theme }) => theme.transition};

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background: ${({ theme }) => theme.colors.background};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primaryLight}40;
  }

  option {
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text};
  }
`;

const SelectBox: React.FC<SelectBoxProps> = ({ label, options = [], value, onChange, disabled }) => {
  return (
    <SelectWrapper>
      <Label>{label}</Label>
      <Select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      >
        <option value="">Selecione...</option>
        {Array.isArray(options) && options.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.nome}
          </option>
        ))}
      </Select>
    </SelectWrapper>
  );
};

export default SelectBox;
