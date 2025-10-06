import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

export interface Pessoa {
  id: string | number;
  nome: string;
  cpf?: string;
  sexo?: string;
  etnia?: string;
  dataNascimento?: string;
  paisNaturalidade?: { id: string | number; nome: string };
  ufNaturalidade?: { id: string | number; sigla: string; nome: string };
  municipioNaturalidade?: { id: string | number; nome: string; uf: string };
  nomeMae?: string;
  nomePai?: string;
  endereco?: string;
  email?: string;
  telefone?: string;
  dataCadastro?: string;
  dataAlteracao?: string;
  statusNecessidade: string;
}

export interface PessoaResult {
  pessoa: any;
  encontrado: boolean;
}

export const buscarPessoaPorCpf = async (cpf: string): Promise<PessoaResult> => {
  try {
    const cpfLimpo = cpf.replace(/[^0-9]/g, '');
    const response = await axios.get(`${BASE_URL}/pessoas/cpf/${cpfLimpo}`);

    return {
      pessoa: response.data,
      encontrado: true
    };
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      return {
        pessoa: {
          id: "",
          nome: "",
          cpf: cpf,
          statusNecessidade: "NAO_INFORMADO"
        },
        encontrado: false
      };
    }
    throw error;
  }
};

// Formata o CPF no padrão 000.000.000-00
export const formatarCpf = (cpf: string | undefined): string => {
  if (!cpf) return "";
  const cpfLimpo = cpf.replace(/[^0-9]/g, '');
  if (cpfLimpo.length !== 11) return cpf;

  return cpfLimpo.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
};
