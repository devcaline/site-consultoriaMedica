import { useQuery } from '@tanstack/react-query';
import { fetchGraphQL } from '@/utils/wordpress';
import { PageData } from '@/config/wordpress';

const SOBRE_NOS_QUERY = `
  query SobreNos {
    pageBy(uri: "sobre-nos") {
      title
      slug
      conteudoSobreNos {
        estat1Numero
        estat1Rotulo
        estat2Numero
        estat2Rotulo
        estat3Numero
        estat3Rotulo
      }
    }
  }
`;

export const useSobreNos = () => {
  return useQuery<PageData>({
    queryKey: ['sobre-nos'],
    queryFn: async () => {
      const data = await fetchGraphQL<{ pageBy: PageData }>(SOBRE_NOS_QUERY);
      console.log('[useSobreNos] Dados processados:', data.pageBy);
      return data.pageBy;
    },
    staleTime: 5 * 60 * 1000, // Cache por 5 minutos
    refetchOnWindowFocus: false,
    retry: 1, // Tentar apenas 1 vez em caso de erro
    onError: (error) => {
      console.error('[useSobreNos] Erro ao buscar dados:', error);
    },
  });
};
