// Tipos para o payload de avaliação
export interface AvaliacaoPayload {
    alunoId: number;
    profissionalAvaliadorId: number;
    dataCadastro: string;
    respostas: RespostaPayload[];
    ativo: boolean;
}

export interface RespostaPayload {
    perguntaId: number;
    resposta: string;
    respostaTexto: string;
    alternativaIds: number[];
}

// Tipos para o retorno do GET /avaliacoes/{id}
export interface Avaliacao {
    id: number;
    aluno: any;
    profissionalAvaliador: any;
    dataCadastro: string;
    respostas: RespostaAvaliacao[];
    ativo: boolean;
}

export interface RespostaAvaliacao {
    id: number;
    perguntaId: number;
    avaliacaoId: number | null;
    resposta: string;
    respostaTexto: string;
    alternativas: any[];
}