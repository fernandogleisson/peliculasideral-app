/**
 * Geoapify city autocomplete (real impl).
 *
 * Used by onboarding to map a typed city → lat/lng/timezone for the chart.
 */
import { env } from './env';

export interface GeoapifyCity {
  formatted: string;
  city?: string;
  state?: string;
  country?: string;
  countryCode?: string;
  lat: number;
  lng: number;
  timezone?: string; // IANA, when present
  placeId: string;
}

interface GeoapifyFeature {
  properties: {
    formatted: string;
    city?: string;
    state?: string;
    country?: string;
    country_code?: string;
    lat: number;
    lon: number;
    timezone?: { name?: string };
    place_id: string;
  };
}

interface GeoapifyResponse {
  features: GeoapifyFeature[];
}

export async function autocompleteCity(
  query: string,
  opts?: { lang?: string; limit?: number },
): Promise<GeoapifyCity[]> {
  if (!query || query.length < 2) return [];
  if (!env.GEOAPIFY_API_KEY) throw new Error('GEOAPIFY_API_KEY not configured');

  const url = new URL('https://api.geoapify.com/v1/geocode/autocomplete');
  url.searchParams.set('text', query);
  url.searchParams.set('type', 'city');
  url.searchParams.set('limit', String(opts?.limit ?? 5));
  if (opts?.lang) url.searchParams.set('lang', opts.lang);
  url.searchParams.set('apiKey', env.GEOAPIFY_API_KEY);

  const res = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error(`geoapify ${res.status}`);

  const data = (await res.json()) as GeoapifyResponse;
  return data.features.map((f) => ({
    formatted: f.properties.formatted,
    city: f.properties.city,
    state: f.properties.state,
    country: f.properties.country,
    countryCode: f.properties.country_code,
    lat: f.properties.lat,
    lng: f.properties.lon,
    timezone: f.properties.timezone?.name,
    placeId: f.properties.place_id,
  }));
}
