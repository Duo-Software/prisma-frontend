import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const SelectContainer = styled.div`
  position: relative;
  width: 80%;
`;

const SelectInput = styled.input<{ textColor?: string }>`
  width: 100%;
  padding: 8px;
  margin-top: 4px;
  margin-bottom: 4px;
  display: block;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: ${props => props.textColor || 'inherit'};
`;

const DropdownList = styled.ul`
  position: absolute;
  width: calc(100% - 2px);
  max-height: 200px;
  overflow-y: auto;
  text-color: yellow;
  background-color: white;
  border: 1px solid #ccc;
  border-top: none;
  list-style: none;
  margin: 0;
  padding: 0;
  z-index: 10;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const DropdownItem = styled.li<{ textColor?: string; selectedTextColor?: string; isSelected?: boolean }>`
  padding: 8px 10px;
  cursor: pointer;
  border-bottom: 1px solid #f0f0f0;
  color: ${props => (props.isSelected ? props.selectedTextColor : props.textColor) || 'inherit'};

  &:hover {
    background-color: #f5f5f5;
  }

  &:last-child {
    border-bottom: none;
  }
  
  &.selected {
    background-color: #e6f7ff;
  }
`;

const ArrowIcon = styled.div`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: #666;
`;

// Tipos para as props do componente
interface Option {
  value: string;
  label: string;
}

// Adicionando propriedades de cor às props
interface CustomSelectProps {
  name: string;
  value: string;
  options: Option[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelect?: (option: Option) => void;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  // ... outras props existentes
  textColor?: string;
  selectedTextColor?: string;
  hoverTextColor?: string;
}

// No componente, passar as cores para os elementos styled
export const CustomSelect: React.FC<CustomSelectProps> = ({
  name,
  value,
  options,
  onChange,
  onSelect,
  required = false,
  disabled = false,
  placeholder = "Selecione...",
  className,
  // ... outras props
  textColor,
  selectedTextColor
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState("");
  const selectRef = useRef<HTMLDivElement>(null);

  // Atualizar o label quando o valor muda
  useEffect(() => {
    const selectedOption = options.find(option => option.value === value);
    setSelectedLabel(selectedOption ? selectedOption.label : "");
  }, [value, options]);

  // Fechar dropdown quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Manipular seleção de opção
  const handleOptionSelect = (option: Option) => {
    // Criar um evento sintético para manter compatibilidade com o formato de evento esperado
    const syntheticEvent = {
      target: {
        name,
        value: option.value
      }
    } as React.ChangeEvent<HTMLInputElement>;

    onChange(syntheticEvent);
    setSelectedLabel(option.label);
    
    if (onSelect) {
      onSelect(option);
    }
    
    setIsOpen(false);
  };

  // Toggle do dropdown
  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <SelectContainer ref={selectRef} className={className}>
      <SelectInput
        type="text"
        name={name}
        value={selectedLabel}
        onClick={toggleDropdown}
        onFocus={() => setIsOpen(true)}
        onChange={() => {}} // Componente controlado
        required={required}
        disabled={disabled}
        placeholder={placeholder}
        readOnly
        // ... props existentes
        textColor={textColor}
      />
      <ArrowIcon>▼</ArrowIcon>
      
      {isOpen && options.length > 0 && (
        <DropdownList>
          {options.map((option, index) => (
            <DropdownItem
              key={`${option.value}-${index}`}
              onClick={() => handleOptionSelect(option)}
              className={option.value === value ? 'selected' : ''}
              textColor={textColor}
              selectedTextColor={selectedTextColor}
              isSelected={option.value === value}
            >
              {option.label}
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </SelectContainer>
  );
};