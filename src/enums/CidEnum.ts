import { Categoria } from "./Categoria";

export const CID = {
    // Deficiências Intelectuais
    F70: {
        codigo: "F70",
        codigoEnum: "F70",
        descricao: "Leve",
        categoria: Categoria.DEFICIENCIAS_INTELECTUAIS,
    },
    F71: {
        codigo: "F71",
        codigoEnum: "F71",
        descricao: "Moderada",
        categoria: Categoria.DEFICIENCIAS_INTELECTUAIS,
    },
    F72: {
        codigo: "F72",
        codigoEnum: "F72",
        descricao: "Grave",
        categoria: Categoria.DEFICIENCIAS_INTELECTUAIS,
    },
    F73: {
        codigo: "F73",
        codigoEnum: "F73",
        descricao: "Profunda",
        categoria: Categoria.DEFICIENCIAS_INTELECTUAIS,
    },
    F88: {
        codigo: "F88",
        codigoEnum: "F88",
        descricao: "Atraso Global do Desenvolvimento",
        categoria: Categoria.DEFICIENCIAS_INTELECTUAIS,
    },
    F79: {
        codigo: "F79",
        codigoEnum: "F79",
        descricao:
            "Deficiência Intelectual (Transtorno do Desenvolvimento Intelectual) Não Especificada",
        categoria: Categoria.DEFICIENCIAS_INTELECTUAIS,
    },

    // Transtornos da Comunicação
    F80_2: {
        codigo: "F80.2",
        codigoEnum: "F80_2",
        descricao: "Transtorno da Linguagem",
        categoria: Categoria.TRANSTORNOS_DA_COMUNICACAO,
    },
    F80_0: {
        codigo: "F80.0",
        codigoEnum: "F80_0",
        descricao: "Transtorno da Fala",
        categoria: Categoria.TRANSTORNOS_DA_COMUNICACAO,
    },
    F80_81: {
        codigo: "F80.81",
        codigoEnum: "F80_81",
        descricao: "Transtorno da Fluência com Início na Infância (Gagueira)",
        categoria: Categoria.TRANSTORNOS_DA_COMUNICACAO,
    },
    F80_89: {
        codigo: "F80.89",
        codigoEnum: "F80_89",
        descricao: "Transtorno da Comunicação Social (Pragmática)",
        categoria: Categoria.TRANSTORNOS_DA_COMUNICACAO,
    },
    F80_9: {
        codigo: "F80.9",
        codigoEnum: "F80_9",
        descricao: "Transtorno da Comunicação Não Especificado",
        categoria: Categoria.TRANSTORNOS_DA_COMUNICACAO,
    },

    // Transtorno do Espectro Autista
    F84_0: {
        codigo: "F84.0",
        codigoEnum: "F84_0",
        descricao: "Transtorno do Espectro Autista",
        categoria: Categoria.TRANSTORNO_DO_ESPECTRO_AUTISTA,
    },

    // TDAH
    F90_2: {
        codigo: "F90.2",
        codigoEnum: "F90_2",
        descricao: "Apresentação combinada",
        categoria: Categoria.TRANSTORNO_DE_DEFICIT_DE_ATENCAO_HIPERATIVIDADE,
    },
    F90_0: {
        codigo: "F90.0",
        codigoEnum: "F90_0",
        descricao: "Apresentação predominantemente desatenta",
        categoria: Categoria.TRANSTORNO_DE_DEFICIT_DE_ATENCAO_HIPERATIVIDADE,
    },
    F90_1: {
        codigo: "F90.1",
        codigoEnum: "F90_1",
        descricao: "Apresentação predominantemente hiperativa/impulsiva",
        categoria: Categoria.TRANSTORNO_DE_DEFICIT_DE_ATENCAO_HIPERATIVIDADE,
    },
    F90_8: {
        codigo: "F90.8",
        codigoEnum: "F90_8",
        descricao:
            "Outro Transtorno de Déficit de Atenção/Hiperatividade Especificado",
        categoria: Categoria.TRANSTORNO_DE_DEFICIT_DE_ATENCAO_HIPERATIVIDADE,
    },
    F90_9: {
        codigo: "F90.9",
        codigoEnum: "F90_9",
        descricao:
            "Transtorno de Déficit de Atenção/Hiperatividade Não Especificado",
        categoria: Categoria.TRANSTORNO_DE_DEFICIT_DE_ATENCAO_HIPERATIVIDADE,
    },

    // Transtorno Específico da Aprendizagem
    F81_0: {
        codigo: "F81.0",
        codigoEnum: "F81_0",
        descricao: "Com prejuízo na leitura (dislexia)",
        categoria: Categoria.TRANSTORNO_ESPECIFICO_DA_APRENDIZAGEM,
    },
    F81_81: {
        codigo: "F81.81",
        codigoEnum: "F81_81",
        descricao: "Com prejuízo na expressão escrita (disgrafia/disortografia)",
        categoria: Categoria.TRANSTORNO_ESPECIFICO_DA_APRENDIZAGEM,
    },
    F81_2: {
        codigo: "F81.2",
        codigoEnum: "F81_2",
        descricao: "Com prejuízo na matemática (discalculia)",
        categoria: Categoria.TRANSTORNO_ESPECIFICO_DA_APRENDIZAGEM,
    },

    // TOD
    F91_3: {
        codigo: "F91.3",
        codigoEnum: "F91_3",
        descricao: "Transtorno Opositor Desafiador (TOD)",
        categoria: Categoria.TRANSTORNO_OPOSITOR_DESAFIADOR_TOD,
    },

    // Transtornos Motores
    F82: {
        codigo: "F82",
        codigoEnum: "F82",
        descricao: "Transtorno do Desenvolvimento da Coordenação",
        categoria: Categoria.TRANSTORNOS_MOTORES,
    },
    F98_4: {
        codigo: "F98.4",
        codigoEnum: "F98_4",
        descricao: "Transtorno do Movimento Estereotipado",
        categoria: Categoria.TRANSTORNOS_MOTORES,
    },

    // Transtornos de Tique
    F95_2: {
        codigo: "F95.2",
        codigoEnum: "F95_2",
        descricao: "Transtorno de Tourette (81)",
        categoria: Categoria.TRANSTORNOS_DE_TIQUE,
    },
    F95_1: {
        codigo: "F95.1",
        codigoEnum: "F95_1",
        descricao: "Transtorno de Tique Motor ou Vocal Persistente (Crônico)",
        categoria: Categoria.TRANSTORNOS_DE_TIQUE,
    },
    F95_0: {
        codigo: "F95.0",
        codigoEnum: "F95_0",
        descricao: "Transtorno de Tique Transitório (81)",
        categoria: Categoria.TRANSTORNOS_DE_TIQUE,
    },
    F95_8: {
        codigo: "F95.8",
        codigoEnum: "F95_8",
        descricao: "Outro Transtorno de Tique Especificado (85)",
        categoria: Categoria.TRANSTORNOS_DE_TIQUE,
    },
    F95_9: {
        codigo: "F95.9",
        codigoEnum: "F95_9",
        descricao: "Transtorno de Tique Não Especificado (85)",
        categoria: Categoria.TRANSTORNOS_DE_TIQUE,
    },

    // Transtornos de Ansiedade
    F93_0: {
        codigo: "F93.0",
        codigoEnum: "F93_0",
        descricao: "Transtorno de Ansiedade de Separação",
        categoria: Categoria.TRANSTORNOS_DE_ANSIEDADE,
    },
    F94_0: {
        codigo: "F94.0",
        codigoEnum: "F94_0",
        descricao: "Mutismo Seletivo",
        categoria: Categoria.TRANSTORNOS_DE_ANSIEDADE,
    },
    F40_218: {
        codigo: "F40.218",
        codigoEnum: "F40_218",
        descricao: "Fobia Animal",
        categoria: Categoria.TRANSTORNOS_DE_ANSIEDADE,
    },
    F40_228: {
        codigo: "F40.228",
        codigoEnum: "F40_228",
        descricao: "Fobia Ambiente natural",
        categoria: Categoria.TRANSTORNOS_DE_ANSIEDADE,
    },
    F40_230: {
        codigo: "F40.230",
        codigoEnum: "F40_230",
        descricao: "Medo de sangue",
        categoria: Categoria.TRANSTORNOS_DE_ANSIEDADE,
    },
    F40_231: {
        codigo: "F40.231",
        codigoEnum: "F40_231",
        descricao: "Medo de injeções e transfusões",
        categoria: Categoria.TRANSTORNOS_DE_ANSIEDADE,
    },
    F40_232: {
        codigo: "F40.232",
        codigoEnum: "F40_232",
        descricao: "Medo de outros cuidados médicos",
        categoria: Categoria.TRANSTORNOS_DE_ANSIEDADE,
    },
    F40_233: {
        codigo: "F40.233",
        codigoEnum: "F40_233",
        descricao: "Medo de ferimentos",
        categoria: Categoria.TRANSTORNOS_DE_ANSIEDADE,
    },
    F40_248: {
        codigo: "F40.248",
        codigoEnum: "F40_248",
        descricao: "Situacional",
        categoria: Categoria.TRANSTORNOS_DE_ANSIEDADE,
    },
    F40_298: {
        codigo: "F40.298",
        codigoEnum: "F40_298",
        descricao: "Outro",
        categoria: Categoria.TRANSTORNOS_DE_ANSIEDADE,
    },
    F40_10: {
        codigo: "F40.10",
        codigoEnum: "F40_10",
        descricao: "Transtorno de Ansiedade Social (Fobia Social)",
        categoria: Categoria.TRANSTORNOS_DE_ANSIEDADE,
    },
    F41_0: {
        codigo: "F41.0",
        codigoEnum: "F41_0",
        descricao: "Transtorno de Pânico",
        categoria: Categoria.TRANSTORNOS_DE_ANSIEDADE,
    },
    F40_00: {
        codigo: "F40.00",
        codigoEnum: "F40_00",
        descricao: "Agorafobia",
        categoria: Categoria.TRANSTORNOS_DE_ANSIEDADE,
    },
    F41_1: {
        codigo: "F41.1",
        codigoEnum: "F41_1",
        descricao: "Transtorno de Ansiedade Generalizada",
        categoria: Categoria.TRANSTORNOS_DE_ANSIEDADE,
    },
    F41_9: {
        codigo: "F41.9",
        codigoEnum: "F41_9",
        descricao: "Transtorno de Ansiedade Não Especificado (234)",
        categoria: Categoria.TRANSTORNOS_DE_ANSIEDADE,
    },

    // Transtornos depressivos
    F32: {
        codigo: "F32",
        codigoEnum: "F32",
        descricao: "Episódio depressivo",
        categoria: Categoria.TRANSTORNOS_DEPRESSIVOS,
    },
    F33: {
        codigo: "F33",
        codigoEnum: "F33",
        descricao: "Transtorno depressivo recorrente",
        categoria: Categoria.TRANSTORNOS_DEPRESSIVOS,
    },
    F98: {
        codigo: "F98",
        codigoEnum: "F98",
        descricao:
            "Outros transtornos comportamentais e emocionais com início habitualmente na infância ou adolescência",
        categoria: Categoria.TRANSTORNOS_DEPRESSIVOS,
    },
    F92_0: {
        codigo: "F92.0",
        codigoEnum: "F92_0",
        descricao: "Distúrbio depressivo de conduta",
        categoria: Categoria.TRANSTORNOS_DEPRESSIVOS,
    },
    F93_8: {
        codigo: "F93.8",
        codigoEnum: "F93_8",
        descricao: "Outros transtornos emocionais da infância",
        categoria: Categoria.TRANSTORNOS_DEPRESSIVOS,
    },

    // Deficiência Visual
    H54_0: {
        codigo: "H54.0",
        codigoEnum: "H54_0",
        descricao: "Cegueira em ambos os olhos.",
        categoria: Categoria.DEFICIENCIA_VISUAL,
    },
    H54_1: {
        codigo: "H54.1",
        codigoEnum: "H54_1",
        descricao: "Cegueira em um olho e visão subnormal no outro olho.",
        categoria: Categoria.DEFICIENCIA_VISUAL,
    },
    H54_2: {
        codigo: "H54.2",
        codigoEnum: "H54_2",
        descricao: "Visão subnormal em ambos os olhos.",
        categoria: Categoria.DEFICIENCIA_VISUAL,
    },
    H54_4: {
        codigo: "H54.4",
        codigoEnum: "H54_4",
        descricao: "Cegueira em um olho (visão monocular).",
        categoria: Categoria.DEFICIENCIA_VISUAL,
    },
    H54_5: {
        codigo: "H54.5",
        codigoEnum: "H54_5",
        descricao: "Visão subnormal em um olho.",
        categoria: Categoria.DEFICIENCIA_VISUAL,
    },
    H54_3: {
        codigo: "H54.3",
        codigoEnum: "H54_3",
        descricao:
            "Perda não qualificada da visão em ambos os olhos, quando a causa ou tipo não é especificado.",
        categoria: Categoria.DEFICIENCIA_VISUAL,
    },
    H54_6: {
        codigo: "H54.6",
        codigoEnum: "H54_6",
        descricao: "Perda não qualificada da visão em um olho.",
        categoria: Categoria.DEFICIENCIA_VISUAL,
    },
    H54_7: {
        codigo: "H54.7",
        codigoEnum: "H54_7",
        descricao: "Perda não especificada da visão.",
        categoria: Categoria.DEFICIENCIA_VISUAL,
    },

    // Deficiência Auditiva
    H90_0: {
        codigo: "H90.0",
        codigoEnum: "H90_0",
        descricao: "Bilateral neurossensorial (ambos os ouvidos).",
        categoria: Categoria.DEFICIENCIA_AUDITIVA,
    },
    H90_1: {
        codigo: "H90.1",
        codigoEnum: "H90_1",
        descricao: "Unilateral neurossensorial (um ouvido).",
        categoria: Categoria.DEFICIENCIA_AUDITIVA,
    },
    H90_3: {
        codigo: "H90.3",
        codigoEnum: "H90_3",
        descricao: "Bilateral (condução ouvido interno).",
        categoria: Categoria.DEFICIENCIA_AUDITIVA,
    },
    H90_4: {
        codigo: "H90.4",
        codigoEnum: "H90_4",
        descricao: "Unilateral (condução ouvido interno).",
        categoria: Categoria.DEFICIENCIA_AUDITIVA,
    },
    H90_6: {
        codigo: "H90.6",
        codigoEnum: "H90_6",
        descricao: "Bilateral (condução e neurossensorial).",
        categoria: Categoria.DEFICIENCIA_AUDITIVA,
    },
    H90_7: {
        codigo: "H90.7",
        codigoEnum: "H90_7",
        descricao: "Unilateral (condução e neurossensorial).",
        categoria: Categoria.DEFICIENCIA_AUDITIVA,
    },
    H91: {
        codigo: "H91",
        codigoEnum: "H91",
        descricao:
            '"Outras perdas auditivas", um código mais genérico para diferentes tipos de perdas auditivas não classificadas nos códigos anteriores.',
        categoria: Categoria.DEFICIENCIA_AUDITIVA,
    },
    H91_3: {
        codigo: "H91.3",
        codigoEnum: "H91_3",
        descricao:
            "Refere-se à surdo-mudez não classificada em outra parte, que envolve uma perda auditiva severa ou total acompanhada de incapacidade para falar.",
        categoria: Categoria.DEFICIENCIA_AUDITIVA,
    },

    // Deficiência Física
    Z99_3: {
        codigo: "Z99.3",
        codigoEnum: "Z99_3",
        descricao:
            "Refere-se à dependência de cadeira de rodas, que é uma situação de saúde que leva ao uso constante do equipamento para mobilidade.",
        categoria: Categoria.DEFICIENCIA_FISICA,
    },
    G80: {
        codigo: "G80",
        codigoEnum: "G80",
        descricao: "Paralisia Cerebral .",
        categoria: Categoria.DEFICIENCIA_FISICA,
    },
    G82: {
        codigo: "G82",
        codigoEnum: "G82",
        descricao: "Lesões Medulares .",
        categoria: Categoria.DEFICIENCIA_FISICA,
    },
    Z89: {
        codigo: "Z89",
        codigoEnum: "Z89",
        descricao: "Perda de Membro .",
        categoria: Categoria.DEFICIENCIA_FISICA,
    },
} as const;

//gere uma funcao para recuperar o CID completo de acorodo com o codigo informado

/**
 * Recupera os detalhes completos de um CID a partir do seu código
 * @param codigo O código do CID (ex: "F70", "F80.2", etc.)
 * @returns O objeto CID completo ou undefined caso não seja encontrado
 */
export const getCIDByCodigo = (codigo: string) => {
  if (!codigo) return undefined;
  
  // Normaliza o código substituindo pontos por underscore para buscar no objeto CID
  const codigoNormalizado = codigo.replace(/\./g, '_');
  
  // Verifica se o código existe diretamente no objeto CID
  if (codigoNormalizado in CID) {
    return CID[codigoNormalizado as CIDType];
  }
  
  // Caso não encontre diretamente, busca em todos os itens do objeto CID
  for (const key in CID) {
    if (CID[key as CIDType].codigo === codigo) {
      return CID[key as CIDType];
    }
  }
  
  // Retorna undefined se não encontrar
  return undefined;
};

export const getDescricaoCompletaByCodigo = (codigo: string) => {
    const cid = getCIDByCodigo(codigo);
    return cid?.categoria + " - " + cid?.descricao;
}

export type CIDType = keyof typeof CID;