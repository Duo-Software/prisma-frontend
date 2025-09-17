

export interface Turma {
  id: number;
  codigoTurma: string;
  descricao: string;
  serie: string;
  turno: string;
  anoTurma: number;
  instituicaoEnsino: {
    id: number | string | undefined;
    nome?: string;
    sigla?: string;
    tipoInstituicaoEnsino?: string;
    municipio?: {
      id: number | string;
      nome: string;
      codigoIbge: number;
      unidadeFederativa: {
        id: number | string;
        nome: string;
        sigla: string;
        pais: {
          id: number | string;
          nome: string;
          sigla: string;
        };
      };
    };
    ativo?: boolean;
  };
  profissional: any;
  ativo: boolean;
}
