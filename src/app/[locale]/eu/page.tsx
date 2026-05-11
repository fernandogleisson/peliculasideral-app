import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { EmailConfirmBanner } from '@/components/auth/EmailConfirmBanner';
import { loadEuView, loadShortInterpretations } from '@/features/mapa-natal/queries';
import {
  chartToPlanetGroups,
  chartToInterpretationKeys,
  findSunSummary,
} from '@/features/mapa-natal/transforms';
import type { ChartData } from '@/components/mapa/Mandala';
import type { Sign } from '@/components/astro/ElementColors';
import type { Planet } from '@/components/astro/glyphs/planet-paths';
import { EuView, type EuViewProps, type ShortInterp } from './EuView';

export const metadata = {
  title: 'Eu · Pelicula Sideral',
};

export default async function EuPage() {
  const supabase = await createSupabaseServerClient().catch(() => null);
  if (!supabase) redirect('/entrar');

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/entrar');

  const data = await loadEuView(user.id);
  if (!data) redirect('/onboarding');

  const { profile, chart } = data;
  const groups = chartToPlanetGroups(chart);
  const sunSummary = findSunSummary(chart);

  // Build chart data shape expected by Mandala
  const chartData: ChartData = {
    planets: chart.planets.map((p) => ({
      name: p.name,
      sign: p.sign as Sign,
      house: p.house,
      degree: p.degree,
      isRetrograde: p.isRetrograde,
    })),
    houses: (chart.houses ?? []).map((h) => ({
      number: h.number,
      sign: h.sign as Sign,
      cuspDegree: h.cuspDegree,
    })),
  };

  // Fetch short interpretations for this chart's keys (free tier)
  const keys = chartToInterpretationKeys(chart);
  const shorts = await loadShortInterpretations(keys);

  // Build house cards (top 3 houses with planets)
  const housesWithPlanets = new Set(chart.planets.map((p) => p.house));
  const topHouses = (chart.houses ?? []).filter((h) => housesWithPlanets.has(h.number)).slice(0, 3);
  const houseCards = topHouses.map((h) => {
    const summary = shorts.find(
      (s) => s.type === 'house_in_sign' && s.key === `house${h.number}:${h.sign}`,
    )?.shortText;
    return {
      house: h.number,
      sign: h.sign as Sign,
      degree: Math.round(h.cuspDegree),
      summary,
    };
  });

  // Build aspect cards (top 3 aspects)
  const topAspects = (chart.aspects ?? []).slice(0, 3);
  const aspectCards = topAspects
    .map((a) => {
      const fromPlanet = chart.planets.find((p) => p.name === a.from);
      const toPlanet = chart.planets.find((p) => p.name === a.to);
      if (!fromPlanet || !toPlanet) return null;
      const summary = shorts.find(
        (s) => s.type === 'planet_aspect_planet' && s.key === `${a.from}:${a.aspect}:${a.to}`,
      )?.shortText;
      return {
        from: a.from as Planet,
        fromSign: fromPlanet.sign as Sign,
        to: a.to as Planet,
        toSign: toPlanet.sign as Sign,
        aspect: a.aspect as EuViewProps['aspectCards'][number]['aspect'],
        label: `${a.from} ${a.aspect} ${a.to}`,
        summary,
      };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);

  // Pick a paywall sample: first sun_in_sign_house interpretation
  const paywallSample: ShortInterp | null = sunSummary
    ? (shorts.find(
        (s) =>
          s.type === 'planet_in_sign_house' &&
          s.key === `sun:${sunSummary.sign}:${sunSummary.house}`,
      ) ?? null)
    : null;

  const isPremium = profile.tier === 'premium';

  return (
    <>
      <EmailConfirmBanner />
      <EuView
        displayName={profile.displayName ?? profile.username}
        username={profile.username}
        birthDate={profile.birthDate}
        birthTime={profile.birthTime}
        birthCity={profile.birthCity}
        birthState={profile.birthState ?? undefined}
        isPremium={isPremium}
        sunSummary={sunSummary}
        groups={groups}
        chartData={chartData}
        houseCards={houseCards}
        aspectCards={aspectCards}
        paywallSample={paywallSample}
      />
    </>
  );
}
