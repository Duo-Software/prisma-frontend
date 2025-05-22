import { useState } from 'react';

function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  // Estado para armazenar o valor
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    
    try {
      // Obter do localStorage por key
      const item = window.localStorage.getItem(key);
      // Retornar o valor parseado ou o initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });
  
  // Definir a função que atualiza o localStorage e o state
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Permitir que o valor seja uma função para seguir o mesmo padrão do useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      
      // Salvar no state
      setStoredValue(valueToStore);
      
      // Salvar no localStorage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  return [storedValue, setValue];
}

export default useLocalStorage;