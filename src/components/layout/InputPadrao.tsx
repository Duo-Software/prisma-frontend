import React from 'react';
import styled from 'styled-components';

type InputPadraoProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  containerStyle?: React.CSSProperties;
};

const InputContainer = styled.div`
  margin-bottom: 4px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 4px;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.9rem;
`;

const StyledInput = styled.input`
  width: 80%;
  padding: 8px;
  margin-top: 4px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius};
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  transition: ${({ theme }) => theme.transition};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primaryLight}33;
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.background};
    cursor: not-allowed;
    opacity: 0.7;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

export const InputPadrao: React.FC<InputPadraoProps> = ({
  label,
  containerStyle,
  style,
  ...rest
}) => (
  <InputContainer style={containerStyle}>
    {label && <Label>{label}</Label>}
    <StyledInput style={style} {...rest} />
  </InputContainer>
);