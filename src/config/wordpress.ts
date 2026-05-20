export const WORDPRESS_GRAPHQL_URL = import.meta.env.VITE_WORDPRESS_GRAPHQL_URL || 'https://seu-wordpress.com/graphql';

export interface SobreNosData {
  estat1Numero: string | null;
  estat1Rotulo: string | null;
  estat2Numero: string | null;
  estat2Rotulo: string | null;
  estat3Numero: string | null;
  estat3Rotulo: string | null;
}

export interface PageData {
  title: string;
  slug: string;
  conteudoSobreNos: SobreNosData;
}
