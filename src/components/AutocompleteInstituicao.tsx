import React, { useState, useRef, useEffect } from 'react';
import { InputPadrao } from './layout/InputPadrao.tsx';
import { buscarInstituicoesPorNome, type Instituicao } from '../services/instituicaoService.ts';
import styled from 'styled-components';

const SugestoesList = styled.ul`
  position: absolute;
  width: calc(80% - 2px);
  max-height: 200px;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-top: none;
  list-style: none;
  margin: 0;
  padding: 0;
  z-index: 10;
  box-shadow: ${({ theme }) => theme.boxShadow};
  border-radius: 0 0 ${({ theme }) => theme.borderRadius} ${({ theme }) => theme.borderRadius};
`;

const SugestaoItem = styled.li`
  padding: 8px 10px;
  cursor: pointer;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  transition: ${({ theme }) => theme.transition};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryLight};
  }

  &:last-child {
    border-bottom: none;
  }
`;

interface AutocompleteInstituicaoProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelect?: (instituicao: Instituicao) => void;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
}

export const AutocompleteInstituicao: React.FC<AutocompleteInstituicaoProps> = ({
  name,
  value,
  onChange,
  onSelect,
  required,
  disabled,
  placeholder
}) => {
  const [sugestoes, setSugestoes] = useState<Instituicao[]>([]);
  const [mostrarSugestoes, setMostrarSugestoes] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null);

  // Atualiza sugestões quando o valor do input muda
  useEffect(() => {
    const buscarSugestoes = async () => {
      if (value.length >= 2) {
        try {
          const instituicoes = await buscarInstituicoesPorNome(value);
          setSugestoes(instituicoes.slice(0, 10)); // Limita a 10 sugestões
          setMostrarSugestoes(true);
        } catch (error) {
          console.error('Erro ao buscar sugestões de instituições:', error);
          setSugestoes([]);
        }
      } else {
        setSugestoes([]);
        setMostrarSugestoes(false);
      }
    };

    // Usar um debounce para evitar muitas chamadas à API
    const timeoutId = setTimeout(() => {
      buscarSugestoes();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [value]);

  // Fecha sugestões quando clica fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setMostrarSugestoes(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Seleciona uma instituição das sugestões
  const selecionarInstituicao = (instituicao: Instituicao) => {
    const syntheticEvent = {
      target: {
        name,
        value: instituicao.nome
      }
    } as React.ChangeEvent<HTMLInputElement>;

    onChange(syntheticEvent);

    if (onSelect) {
      onSelect(instituicao);
    }

    setMostrarSugestoes(false);
  };

  return (
    <div ref={inputRef} style={{ position: 'relative' }}>
      <InputPadrao
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        placeholder={placeholder || "Digite o nome da instituição"}
        onFocus={() => value.length >= 2 && setMostrarSugestoes(true)}
      />

      {mostrarSugestoes && sugestoes.length > 0 && (
        <SugestoesList>
          {sugestoes.map((instituicao, index) => (
            <SugestaoItem
              key={`${instituicao.id}-${index}`}
              onClick={() => selecionarInstituicao(instituicao)}
            >
              {instituicao.nome} - {instituicao.municipio.nome}/{instituicao.municipio.unidadeFederativa.sigla}
            </SugestaoItem>
          ))}
        </SugestoesList>
      )}
    </div>
  );
};
