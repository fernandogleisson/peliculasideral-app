import type { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://peliculasideral.com.br';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/entrar',
          '/cadastro',
          '/mapa/',
          '/termos',
          '/privacidade',
          '/cookies',
          '/sobre',
          '/glossario',
        ],
        disallow: ['/admin', '/conta', '/eu', '/api'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
