/**
 * Capitais e cidades grandes BR para seleção em onboarding closed beta.
 *
 * Substituir por integração Geoapify quando GEOAPIFY_API_KEY estiver disponível
 * (PL-156). Lat/lng com 5 casas decimais (~1.1m). TZ é IANA.
 */
export interface CityEntry {
  city: string;
  state: string;
  lat: number;
  lng: number;
  tz: string;
}

export const BR_CITIES: CityEntry[] = [
  { city: 'São Paulo', state: 'SP', lat: -23.5505, lng: -46.6333, tz: 'America/Sao_Paulo' },
  { city: 'Rio de Janeiro', state: 'RJ', lat: -22.9068, lng: -43.1729, tz: 'America/Sao_Paulo' },
  { city: 'Belo Horizonte', state: 'MG', lat: -19.9167, lng: -43.9345, tz: 'America/Sao_Paulo' },
  { city: 'Brasília', state: 'DF', lat: -15.7942, lng: -47.8825, tz: 'America/Sao_Paulo' },
  { city: 'Salvador', state: 'BA', lat: -12.9714, lng: -38.5014, tz: 'America/Bahia' },
  { city: 'Fortaleza', state: 'CE', lat: -3.7172, lng: -38.5433, tz: 'America/Fortaleza' },
  { city: 'Recife', state: 'PE', lat: -8.0476, lng: -34.877, tz: 'America/Recife' },
  { city: 'Porto Alegre', state: 'RS', lat: -30.0346, lng: -51.2177, tz: 'America/Sao_Paulo' },
  { city: 'Curitiba', state: 'PR', lat: -25.4284, lng: -49.2733, tz: 'America/Sao_Paulo' },
  { city: 'Manaus', state: 'AM', lat: -3.119, lng: -60.0212, tz: 'America/Manaus' },
  { city: 'Belém', state: 'PA', lat: -1.4554, lng: -48.4898, tz: 'America/Belem' },
  { city: 'Goiânia', state: 'GO', lat: -16.6864, lng: -49.2643, tz: 'America/Sao_Paulo' },
  { city: 'Vitória', state: 'ES', lat: -20.3155, lng: -40.3128, tz: 'America/Sao_Paulo' },
  { city: 'Florianópolis', state: 'SC', lat: -27.5954, lng: -48.548, tz: 'America/Sao_Paulo' },
  { city: 'São Luís', state: 'MA', lat: -2.5307, lng: -44.3068, tz: 'America/Fortaleza' },
  { city: 'Maceió', state: 'AL', lat: -9.6498, lng: -35.7089, tz: 'America/Maceio' },
  { city: 'Natal', state: 'RN', lat: -5.7945, lng: -35.211, tz: 'America/Fortaleza' },
  { city: 'João Pessoa', state: 'PB', lat: -7.1195, lng: -34.845, tz: 'America/Fortaleza' },
  { city: 'Teresina', state: 'PI', lat: -5.0892, lng: -42.8019, tz: 'America/Fortaleza' },
  { city: 'Campo Grande', state: 'MS', lat: -20.4697, lng: -54.6201, tz: 'America/Campo_Grande' },
  { city: 'Cuiabá', state: 'MT', lat: -15.6014, lng: -56.0979, tz: 'America/Cuiaba' },
  { city: 'Aracaju', state: 'SE', lat: -10.9472, lng: -37.0731, tz: 'America/Maceio' },
  { city: 'Palmas', state: 'TO', lat: -10.249, lng: -48.3245, tz: 'America/Araguaina' },
  { city: 'Rio Branco', state: 'AC', lat: -9.9747, lng: -67.8243, tz: 'America/Rio_Branco' },
  { city: 'Porto Velho', state: 'RO', lat: -8.7619, lng: -63.9039, tz: 'America/Porto_Velho' },
  { city: 'Boa Vista', state: 'RR', lat: 2.8235, lng: -60.6758, tz: 'America/Boa_Vista' },
  { city: 'Macapá', state: 'AP', lat: 0.0349, lng: -51.0694, tz: 'America/Belem' },
  { city: 'Campinas', state: 'SP', lat: -22.9099, lng: -47.0626, tz: 'America/Sao_Paulo' },
  { city: 'Santos', state: 'SP', lat: -23.9618, lng: -46.3322, tz: 'America/Sao_Paulo' },
  {
    city: 'São José do Rio Preto',
    state: 'SP',
    lat: -20.812,
    lng: -49.3795,
    tz: 'America/Sao_Paulo',
  },
];
