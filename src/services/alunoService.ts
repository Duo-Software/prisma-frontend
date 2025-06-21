import type {Aluno} from "../types/aluno";
import { mockAlunos } from "../mocks/alunos-mock";

// Função para buscar aluno pelo CPF da pessoa
export const buscarAlunoPorCpf = async (cpf: string): Promise<{ encontrado: boolean; aluno?: Aluno }> => {
  // Remove caracteres não numéricos do CPF para comparação
  const cpfLimpo = cpf.replace(/\D/g, '');

  // Simulação de busca no backend
  return new Promise((resolve) => {
    setTimeout(() => {
      const alunoEncontrado = mockAlunos.find(aluno => 
        aluno?.pessoa?.cpf?.replace(/\D/g, '') === cpfLimpo
      );

      if (alunoEncontrado) {
        resolve({
          encontrado: true,
          aluno: alunoEncontrado
        });
      } else {
        resolve({
          encontrado: false
        });
      }
    }, 500); // Simulação de delay de rede
  });
};

// Função para formatar CPF com máscara
export const formatarCpf = (cpf: string): string => {
  const cpfLimpo = cpf.replace(/\D/g, '');

  if (cpfLimpo.length <= 3) {
    return cpfLimpo;
  }

  if (cpfLimpo.length <= 6) {
    return `${cpfLimpo.slice(0, 3)}.${cpfLimpo.slice(3)}`;
  }

  if (cpfLimpo.length <= 9) {
    return `${cpfLimpo.slice(0, 3)}.${cpfLimpo.slice(3, 6)}.${cpfLimpo.slice(6)}`;
  }

  return `${cpfLimpo.slice(0, 3)}.${cpfLimpo.slice(3, 6)}.${cpfLimpo.slice(6, 9)}-${cpfLimpo.slice(9, 11)}`;
};

// Função para criar ou atualizar aluno
export const salvarAluno = async (aluno: Aluno): Promise<Aluno> => {
  // Simulação de salvamento no backend
  return new Promise((resolve) => {
    setTimeout(() => {
      // Se já existe ID, seria um update
      if (aluno.id) {
        const index = mockAlunos.findIndex(a => a.id === aluno.id);
        if (index >= 0) {
          mockAlunos[index] = {
            ...aluno,
            dataAlteracao: new Date().toISOString()
          };
          resolve(mockAlunos[index]);
        }
      }

      // Caso contrário, seria uma inserção
      const novoAluno: Aluno = {
        ...aluno,
        id: Math.max(...mockAlunos.map(a => Number(a.id))) + 1,
        dataCadastro: aluno.dataCadastro || new Date().toISOString(),
        dataAlteracao: new Date().toISOString()
      };

      mockAlunos.push(novoAluno);
      resolve(novoAluno);
    }, 800); // Simulação de delay de rede
  });
};
