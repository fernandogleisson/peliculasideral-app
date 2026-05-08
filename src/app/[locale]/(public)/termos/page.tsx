export const metadata = {
  title: 'Termos de Uso · Pelicula Sideral',
  description:
    'Termos de uso do Pelicula Sideral. Versão placeholder, aguardando revisão jurídica.',
};

export default function TermosPage() {
  return (
    <article className="prose mx-auto max-w-3xl p-6">
      <h1>Termos de Uso</h1>
      <p>
        <em>
          Versão 0.1 — placeholder. Documento final será comissionado com advogado especialista em
          LGPD (Task A14 do plano F0).
        </em>
      </p>
      <p>
        Este conteúdo é um placeholder destinado apenas a validar a estrutura da página. Não
        constitui termos legais válidos.
      </p>
      <p>
        Versão atual: <code>0.1-placeholder</code>
      </p>
    </article>
  );
}
