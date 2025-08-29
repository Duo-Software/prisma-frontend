import React, { useState, useRef, useEffect } from 'react';
import { InputPadrao } from './layout/InputPadrao.tsx';
import {filtrarMunicipios, type Municipio} from '../mocks/municipios-mock.ts';
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

interface AutocompleteMunicipioProps {
    id?: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSelect?: (municipio: Municipio) => void; // adiciona a prop onSelect
    uf?: string;
    required?: boolean;
    disabled?: boolean;
    placeholder?: string;
}

export const AutocompleteMunicipio: React.FC<AutocompleteMunicipioProps> = ({
        id,
        name,
        value,
        onChange,
        onSelect, // recebe a prop onSelect
        uf,
        required,
        disabled,
        placeholder
    }) => {
    const [sugestoes, setSugestoes] = useState<Municipio[]>([]);
    const [mostrarSugestoes, setMostrarSugestoes] = useState(false);
    const inputRef = useRef<HTMLDivElement>(null);

    // Atualiza sugestões quando o valor do input muda
    useEffect(() => {
        if (value.length >= 2) {
            const sugestoesFiltradas = filtrarMunicipios(value, uf);
            setSugestoes(sugestoesFiltradas.slice(0, 10)); // Limita a 10 sugestões
            setMostrarSugestoes(true);
        } else {
            setSugestoes([]);
            setMostrarSugestoes(false);
        }
    }, [value, uf]);

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

    // Seleciona um município das sugestões
    const selecionarMunicipio = (municipio: Municipio) => {
        const syntheticEvent = {
            target: {
                name,
                value: municipio.nome
            }
        } as React.ChangeEvent<HTMLInputElement>;

        onChange(syntheticEvent);
        if (onSelect) {
            onSelect(municipio); // dispara o callback com id, nome e uf
        }
        setMostrarSugestoes(false);
    };

    return (
        <div ref={inputRef} style={{ position: 'relative' }}>
            <InputPadrao
                type="text"
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                disabled={disabled}
                placeholder={placeholder || "Digite o nome do município"}
                onFocus={() => value.length >= 2 && setMostrarSugestoes(true)}
            />

            {mostrarSugestoes && sugestoes.length > 0 && (
                <SugestoesList>
                    {sugestoes.map((municipio, index) => (
                        <SugestaoItem
                            key={`${municipio.nome}-${municipio.uf}-${index}`}
                            onClick={() => selecionarMunicipio(municipio)}
                        >
                            {municipio.nome} - {municipio.uf}
                        </SugestaoItem>
                    ))}
                </SugestoesList>
            )}
        </div>
    );
};
