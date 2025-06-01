// Lista de municípios brasileiros organizados por UF
// Nota: Esta é uma versão simplificada com alguns municípios de cada estado
// Em um ambiente de produção, seria recomendável obter estes dados de uma API oficial

export interface Municipio {
  nome: string;
  uf: string;
}

export const municipiosBrasileiros: Municipio[] = [
  // Acre (AC)
  { nome: "Rio Branco", uf: "AC" },
  { nome: "Cruzeiro do Sul", uf: "AC" },
  { nome: "Sena Madureira", uf: "AC" },
  { nome: "Tarauacá", uf: "AC" },
  { nome: "Feijó", uf: "AC" },
  
  // Alagoas (AL)
  { nome: "Maceió", uf: "AL" },
  { nome: "Arapiraca", uf: "AL" },
  { nome: "Rio Largo", uf: "AL" },
  { nome: "Palmeira dos Índios", uf: "AL" },
  { nome: "Penedo", uf: "AL" },
  
  // Amapá (AP)
  { nome: "Macapá", uf: "AP" },
  { nome: "Santana", uf: "AP" },
  { nome: "Laranjal do Jari", uf: "AP" },
  { nome: "Oiapoque", uf: "AP" },
  { nome: "Mazagão", uf: "AP" },
  
  // Amazonas (AM)
  { nome: "Manaus", uf: "AM" },
  { nome: "Parintins", uf: "AM" },
  { nome: "Itacoatiara", uf: "AM" },
  { nome: "Manacapuru", uf: "AM" },
  { nome: "Coari", uf: "AM" },
  
  // Bahia (BA)
  { nome: "Salvador", uf: "BA" },
  { nome: "Feira de Santana", uf: "BA" },
  { nome: "Vitória da Conquista", uf: "BA" },
  { nome: "Camaçari", uf: "BA" },
  { nome: "Juazeiro", uf: "BA" },
  
  // Ceará (CE)
  { nome: "Fortaleza", uf: "CE" },
  { nome: "Caucaia", uf: "CE" },
  { nome: "Juazeiro do Norte", uf: "CE" },
  { nome: "Maracanaú", uf: "CE" },
  { nome: "Sobral", uf: "CE" },
  
  // Distrito Federal (DF)
  { nome: "Brasília", uf: "DF" },
  
  // Espírito Santo (ES)
  { nome: "Vitória", uf: "ES" },
  { nome: "Serra", uf: "ES" },
  { nome: "Vila Velha", uf: "ES" },
  { nome: "Cariacica", uf: "ES" },
  { nome: "Linhares", uf: "ES" },
  
  // Goiás (GO)
  { nome: "Goiânia", uf: "GO" },
  { nome: "Aparecida de Goiânia", uf: "GO" },
  { nome: "Anápolis", uf: "GO" },
  { nome: "Rio Verde", uf: "GO" },
  { nome: "Luziânia", uf: "GO" },
  
  // Maranhão (MA)
  { nome: "São Luís", uf: "MA" },
  { nome: "Imperatriz", uf: "MA" },
  { nome: "São José de Ribamar", uf: "MA" },
  { nome: "Timon", uf: "MA" },
  { nome: "Caxias", uf: "MA" },

  // Mato Grosso (MT)
  {nome: "Alta Floresta", uf: "MT"},
  {nome: "Alto Araguaia", uf: "MT"},
  {nome: "Alto Boa Vista", uf: "MT"},
  {nome: "Alto Garças", uf: "MT"},
  {nome: "Alto Paraguai", uf: "MT"},
  {nome: "Alto Taquari", uf: "MT"},
  {nome: "Apiacás", uf: "MT"},
  {nome: "Araguaiana", uf: "MT"},
  {nome: "Araguainha", uf: "MT"},
  {nome: "Araputanga", uf: "MT"},
  {nome: "Arenápolis", uf: "MT"},
  {nome: "Aripuanã", uf: "MT"},
  {nome: "Barão de Melgaço", uf: "MT"},
  {nome: "Barra do Bugres", uf: "MT"},
  {nome: "Barra do Garças", uf: "MT"},
  {nome: "Bom Jesus do Araguaia", uf: "MT"},
  {nome: "Brasnorte", uf: "MT"},
  {nome: "Cáceres", uf: "MT"},
  {nome: "Campinápolis", uf: "MT"},
  {nome: "Campo Novo do Parecis", uf: "MT"},
  {nome: "Campo Verde", uf: "MT"},
  {nome: "Campos de Júlio", uf: "MT"},
  {nome: "Canabrava do Norte", uf: "MT"},
  {nome: "Canarana", uf: "MT"},
  {nome: "Carlinda", uf: "MT"},
  {nome: "Castanheira", uf: "MT"},
  {nome: "Chapada dos Guimarães", uf: "MT"},
  {nome: "Cláudia", uf: "MT"},
  {nome: "Cocalinho", uf: "MT"},
  {nome: "Colíder", uf: "MT"},
  {nome: "Colniza", uf: "MT"},
  {nome: "Comodoro", uf: "MT"},
  {nome: "Confresa", uf: "MT"},
  {nome: "Conquista D'Oeste", uf: "MT"},
  {nome: "Cotriguaçu", uf: "MT"},
  {nome: "Cuiabá", uf: "MT"},
  {nome: "Curvelândia", uf: "MT"},
  {nome: "Denise", uf: "MT"},
  {nome: "Diamantino", uf: "MT"},
  {nome: "Dom Aquino", uf: "MT"},
  {nome: "Feliz Natal", uf: "MT"},
  {nome: "Figueirópolis D'Oeste", uf: "MT"},
  {nome: "Gaúcha do Norte", uf: "MT"},
  {nome: "General Carneiro", uf: "MT"},
  {nome: "Glória D'Oeste", uf: "MT"},
  {nome: "Guarantã do Norte", uf: "MT"},
  {nome: "Guiratinga", uf: "MT"},
  {nome: "Indiavaí", uf: "MT"},
  {nome: "Ipiranga do Norte", uf: "MT"},
  {nome: "Itanhangá", uf: "MT"},
  {nome: "Itaúba", uf: "MT"},
  {nome: "Itiquira", uf: "MT"},
  {nome: "Jaciara", uf: "MT"},
  {nome: "Jangada", uf: "MT"},
  {nome: "Jauru", uf: "MT"},
  {nome: "Juara", uf: "MT"},
  {nome: "Juína", uf: "MT"},
  {nome: "Juruena", uf: "MT"},
  {nome: "Juscimeira", uf: "MT"},
  {nome: "Lambari D'Oeste", uf: "MT"},
  {nome: "Lucas do Rio Verde", uf: "MT"},
  {nome: "Luciara", uf: "MT"},
  {nome: "Marcelândia", uf: "MT"},
  {nome: "Matupá", uf: "MT"},
  {nome: "Mirassol d'Oeste", uf: "MT"},
  {nome: "Nobres", uf: "MT"},
  {nome: "Nortelândia", uf: "MT"},
  {nome: "Nossa Senhora do Livramento", uf: "MT"},
  {nome: "Nova Bandeirantes", uf: "MT"},
  {nome: "Nova Brasilândia", uf: "MT"},
  {nome: "Nova Canaã do Norte", uf: "MT"},
  {nome: "Nova Guarita", uf: "MT"},
  {nome: "Nova Lacerda", uf: "MT"},
  {nome: "Nova Marilândia", uf: "MT"},
  {nome: "Nova Maringá", uf: "MT"},
  {nome: "Nova Monte Verde", uf: "MT"},
  {nome: "Nova Mutum", uf: "MT"},
  {nome: "Nova Nazaré", uf: "MT"},
  {nome: "Nova Olímpia", uf: "MT"},
  {nome: "Nova Santa Helena", uf: "MT"},
  {nome: "Nova Ubiratã", uf: "MT"},
  {nome: "Nova Xavantina", uf: "MT"},
  {nome: "Novo Horizonte do Norte", uf: "MT"},
  {nome: "Novo Mundo", uf: "MT"},
  {nome: "Novo Santo Antônio", uf: "MT"},
  {nome: "Novo São Joaquim", uf: "MT"},
  {nome: "Paranaíta", uf: "MT"},
  {nome: "Paranatinga", uf: "MT"},
  {nome: "Pedra Preta", uf: "MT"},
  {nome: "Peixoto de Azevedo", uf: "MT"},
  {nome: "Planalto da Serra", uf: "MT"},
  {nome: "Poconé", uf: "MT"},
  {nome: "Pontal do Araguaia", uf: "MT"},
  {nome: "Ponte Branca", uf: "MT"},
  {nome: "Pontes e Lacerda", uf: "MT"},
  {nome: "Porto Alegre do Norte", uf: "MT"},
  {nome: "Porto dos Gaúchos", uf: "MT"},
  {nome: "Porto Esperidião", uf: "MT"},
  {nome: "Porto Estrela", uf: "MT"},
  {nome: "Poxoréu", uf: "MT"},
  {nome: "Primavera do Leste", uf: "MT"},
  {nome: "Querência", uf: "MT"},
  {nome: "Reserva do Cabaçal", uf: "MT"},
  {nome: "Ribeirão Cascalheira", uf: "MT"},
  {nome: "Ribeirãozinho", uf: "MT"},
  {nome: "Rio Branco", uf: "MT"},
  {nome: "Rondolândia", uf: "MT"},
  {nome: "Rondonópolis", uf: "MT"},
  {nome: "Rosário Oeste", uf: "MT"},
  {nome: "Salto do Céu", uf: "MT"},
  {nome: "Santa Carmem", uf: "MT"},
  {nome: "Santa Cruz do Xingu", uf: "MT"},
  {nome: "Santa Rita do Trivelato", uf: "MT"},
  {nome: "Santa Terezinha", uf: "MT"},
  {nome: "Santo Afonso", uf: "MT"},
  {nome: "Santo Antônio do Leste", uf: "MT"},
  {nome: "Santo Antônio do Leverger", uf: "MT"},
  {nome: "São Félix do Araguaia", uf: "MT"},
  {nome: "São José do Povo", uf: "MT"},
  {nome: "São José do Rio Claro", uf: "MT"},
  {nome: "São José do Xingu", uf: "MT"},
  {nome: "São José dos Quatro Marcos", uf: "MT"},
  {nome: "São Pedro da Cipa", uf: "MT"},
  {nome: "Sapezal", uf: "MT"},
  {nome: "Serra Nova Dourada", uf: "MT"},
  {nome: "Sinop", uf: "MT"},
  {nome: "Sorriso", uf: "MT"},
  {nome: "Tabaporã", uf: "MT"},
  {nome: "Tangará da Serra", uf: "MT"},
  {nome: "Tapurah", uf: "MT"},
  {nome: "Terra Nova do Norte", uf: "MT"},
  {nome: "Tesouro", uf: "MT"},
  {nome: "Torixoréu", uf: "MT"},
  {nome: "União do Sul", uf: "MT"},
  {nome: "Vale de São Domingos", uf: "MT"},
  {nome: "Várzea Grande", uf: "MT"},
  {nome: "Vera", uf: "MT"},
  {nome: "Vila Bela da Santíssima Trindade", uf: "MT"},
  {nome: "Vila Rica", uf: "MT"},
  
  // Mato Grosso do Sul (MS)
  { nome: "Campo Grande", uf: "MS" },
  { nome: "Dourados", uf: "MS" },
  { nome: "Três Lagoas", uf: "MS" },
  { nome: "Corumbá", uf: "MS" },
  { nome: "Ponta Porã", uf: "MS" },
  
  // Minas Gerais (MG)
  { nome: "Belo Horizonte", uf: "MG" },
  { nome: "Uberlândia", uf: "MG" },
  { nome: "Contagem", uf: "MG" },
  { nome: "Juiz de Fora", uf: "MG" },
  { nome: "Betim", uf: "MG" },
  
  // Pará (PA)
  { nome: "Belém", uf: "PA" },
  { nome: "Ananindeua", uf: "PA" },
  { nome: "Santarém", uf: "PA" },
  { nome: "Marabá", uf: "PA" },
  { nome: "Castanhal", uf: "PA" },
  
  // Paraíba (PB)
  { nome: "João Pessoa", uf: "PB" },
  { nome: "Campina Grande", uf: "PB" },
  { nome: "Santa Rita", uf: "PB" },
  { nome: "Patos", uf: "PB" },
  { nome: "Bayeux", uf: "PB" },
  
  // Paraná (PR)
  { nome: "Curitiba", uf: "PR" },
  { nome: "Londrina", uf: "PR" },
  { nome: "Maringá", uf: "PR" },
  { nome: "Ponta Grossa", uf: "PR" },
  { nome: "Cascavel", uf: "PR" },
  
  // Pernambuco (PE)
  { nome: "Recife", uf: "PE" },
  { nome: "Jaboatão dos Guararapes", uf: "PE" },
  { nome: "Olinda", uf: "PE" },
  { nome: "Caruaru", uf: "PE" },
  { nome: "Petrolina", uf: "PE" },
  
  // Piauí (PI)
  { nome: "Teresina", uf: "PI" },
  { nome: "Parnaíba", uf: "PI" },
  { nome: "Picos", uf: "PI" },
  { nome: "Floriano", uf: "PI" },
  { nome: "Piripiri", uf: "PI" },
  
  // Rio de Janeiro (RJ)
  { nome: "Rio de Janeiro", uf: "RJ" },
  { nome: "São Gonçalo", uf: "RJ" },
  { nome: "Duque de Caxias", uf: "RJ" },
  { nome: "Nova Iguaçu", uf: "RJ" },
  { nome: "Niterói", uf: "RJ" },
  
  // Rio Grande do Norte (RN)
  { nome: "Natal", uf: "RN" },
  { nome: "Mossoró", uf: "RN" },
  { nome: "Parnamirim", uf: "RN" },
  { nome: "São Gonçalo do Amarante", uf: "RN" },
  { nome: "Ceará-Mirim", uf: "RN" },
  
  // Rio Grande do Sul (RS)
  { nome: "Porto Alegre", uf: "RS" },
  { nome: "Caxias do Sul", uf: "RS" },
  { nome: "Pelotas", uf: "RS" },
  { nome: "Canoas", uf: "RS" },
  { nome: "Santa Maria", uf: "RS" },
  
  // Rondônia (RO)
  { nome: "Porto Velho", uf: "RO" },
  { nome: "Ji-Paraná", uf: "RO" },
  { nome: "Ariquemes", uf: "RO" },
  { nome: "Vilhena", uf: "RO" },
  { nome: "Cacoal", uf: "RO" },
  
  // Roraima (RR)
  { nome: "Boa Vista", uf: "RR" },
  { nome: "Rorainópolis", uf: "RR" },
  { nome: "Caracaraí", uf: "RR" },
  { nome: "Mucajaí", uf: "RR" },
  { nome: "Cantá", uf: "RR" },
  
  // Santa Catarina (SC)
  { nome: "Florianópolis", uf: "SC" },
  { nome: "Joinville", uf: "SC" },
  { nome: "Blumenau", uf: "SC" },
  { nome: "São José", uf: "SC" },
  { nome: "Chapecó", uf: "SC" },
  
  // São Paulo (SP)
  { nome: "São Paulo", uf: "SP" },
  { nome: "Guarulhos", uf: "SP" },
  { nome: "Campinas", uf: "SP" },
  { nome: "São Bernardo do Campo", uf: "SP" },
  { nome: "Santo André", uf: "SP" },
  
  // Sergipe (SE)
  { nome: "Aracaju", uf: "SE" },
  { nome: "Nossa Senhora do Socorro", uf: "SE" },
  { nome: "Lagarto", uf: "SE" },
  { nome: "Itabaiana", uf: "SE" },
  { nome: "São Cristóvão", uf: "SE" },
  
  // Tocantins (TO)
  { nome: "Palmas", uf: "TO" },
  { nome: "Araguaína", uf: "TO" },
  { nome: "Gurupi", uf: "TO" },
  { nome: "Porto Nacional", uf: "TO" },
  { nome: "Paraíso do Tocantins", uf: "TO" }
];

// Função para filtrar municípios por nome e/ou UF
export function filtrarMunicipios(termo: string, uf?: string): Municipio[] {
  const termoLowerCase = termo.toLowerCase();
  
  return municipiosBrasileiros.filter(municipio => {
    // Se UF foi especificada, filtra por UF primeiro
    if (uf && municipio.uf !== uf) {
      return false;
    }
    
    // Filtra por nome do município
    return municipio.nome.toLowerCase().includes(termoLowerCase);
  });
}
