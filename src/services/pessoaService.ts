import { mockProfissionais } from '../mocks/profissionais-mock';

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
}

export interface PessoaResult {
  pessoa: Pessoa;
  encontrado: boolean;
}

// Simula uma busca por CPF no backend
export const buscarPessoaPorCpf = (cpf: string): Promise<PessoaResult> => {
  return new Promise((resolve) => {
    // Simula delay de API
    setTimeout(() => {
      // Remove caracteres especiais do CPF para comparação
      const cpfLimpo = cpf.replace(/[^0-9]/g, '');

      // Busca nos profissionais mockados
      const profissionalEncontrado = mockProfissionais.find(
        prof => prof.pessoa.cpf && prof.pessoa.cpf.replace(/[^0-9]/g, '') === cpfLimpo
      );

      if (profissionalEncontrado) {
        resolve({
          pessoa: profissionalEncontrado.pessoa,
          encontrado: true
        });
      } else {
        // Pessoa não encontrada
        resolve({
          pessoa: {
            id: "",
            nome: "",
            cpf: formatarCpf(cpf)
          },
          encontrado: false
        });
      }
    }, 500); // Delay simulado de 500ms
  });
};

// Formata o CPF no padrão 000.000.000-00
export const formatarCpf = (cpf: string): string => {
  const cpfLimpo = cpf.replace(/[^0-9]/g, '');
  if (cpfLimpo.length !== 11) return cpf;

  return cpfLimpo.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
};
