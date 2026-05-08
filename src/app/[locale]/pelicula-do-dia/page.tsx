import { Sparkle } from '@/components/identity/Sparkle';
import { BottomNav } from '@/components/layout/BottomNav';

export default function PeliculaDoDiaPage() {
  return (
    <>
      <main className="min-h-dvh px-6 py-12 max-w-md mx-auto pb-24">
        <Sparkle size="lg" className="text-primary" />
        <h1 className="mt-6 font-serif text-3xl text-ink">Pelicula do Dia</h1>
        <p className="mt-4 font-serif text-base text-ink-2 leading-relaxed">
          Em breve. O trânsito do dia, em uma pílula.
        </p>
      </main>
      <BottomNav />
    </>
  );
}
