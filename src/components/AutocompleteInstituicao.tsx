import React, { useState, useRef, useEffect } from 'react';
import { InputPadrao } from './layout/InputPadrao.tsx';
import { mockInstitutions } from '../mocks/instituicoes-mock.ts';
import styled from 'styled-components';

const SugestoesList = styled.ul`
  position: absolute;
  width: calc(80% - 2px);
  max-height: 200px;
  overflow-y: auto;
  background-color: white;
  border: 1px solid #ccc;
  border-top: none;
  list-style: none;
  margin: 0;
  padding: 0;
  z-index: 10;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const SugestaoItem = styled.li`
  padding: 8px 10px;
  cursor: pointer;
  border-bottom: 1px solid #f0f0f0;

  &:hover {
    background-color: #f5f5f5;
  }

  &:last-child {
    border-bottom: none;
  }
`;

interface Instituicao {
  id: number;
  nome: string;
  municipio: {
    nome: string;
    uf: string;
  };
}

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

  // Função para filtrar instituições
  const filtrarInstituicoes = (query: string) => {
    const lowerQuery = query.toLowerCase();
    return mockInstitutions.filter(instituicao =>
      instituicao.nome.toLowerCase().includes(lowerQuery)
    );
  };

  // Atualiza sugestões quando o valor do input muda
  useEffect(() => {
    if (value.length >= 2) {
      const sugestoesFiltradas = filtrarInstituicoes(value);
      setSugestoes(sugestoesFiltradas.slice(0, 10)); // Limita a 10 sugestões
      setMostrarSugestoes(true);
    } else {
      setSugestoes([]);
      setMostrarSugestoes(false);
    }
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
              {instituicao.nome} - {instituicao.municipio.nome}/{instituicao.municipio.uf}
            </SugestaoItem>
          ))}
        </SugestoesList>
      )}
    </div>
  );
};
