export interface Alternativa {
  id: number;
  texto: string;
  perguntaId: number;
  ordem: number;
  peso: number;
  ativo: boolean;
}

export interface Pergunta {
  id: number;
  texto: string;
  alternativas: Alternativa[];
  categoriaId: number;
  ordem: number;
  tipoResposta: 'SIM' | 'NAO' | 'EM_DESENVOLVIMENTO' | 'VERDADEIRO' | 'FALSO' | 'MULTIPLA_ESCOLHA' | 'ESCOLHA_UNICA' | 'DISSERTATIVA';
  ativo: boolean;
}

export interface Categoria {
  id: number;
  nome: string;
  ordem: number;
  perguntas: Pergunta[];
}

export interface Formulario {
  id: number;
  nomeFormulario: string;
  dataCadastro: string;
  categorias: Categoria[];
  ativo: boolean;
}

export interface Resposta {
  perguntaId: number;
  resposta: string;
  respostaTexto: string;
  alternativaIds: number[];
}