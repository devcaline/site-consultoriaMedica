import { WORDPRESS_GRAPHQL_URL } from '@/config/wordpress';

export async function fetchGraphQL<T = any>(
  query: string,
  variables?: Record<string, any>
): Promise<T> {
  try {
    console.log('[WordPress] Fazendo requisição para:', WORDPRESS_GRAPHQL_URL);
    
    const response = await fetch(WORDPRESS_GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    console.log('[WordPress] Status da resposta:', response.status, response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[WordPress] Erro na resposta:', errorText);
      throw new Error(`GraphQL error: ${response.statusText} - ${errorText}`);
    }

    const result = await response.json();
    console.log('[WordPress] Dados recebidos:', result);

    if (result.errors) {
      console.error('[WordPress] Erros GraphQL:', result.errors);
      throw new Error(`GraphQL errors: ${JSON.stringify(result.errors)}`);
    }

    return result.data;
  } catch (error: any) {
    console.error('[WordPress] Erro na requisição:', error);
    
    // Se for erro de CORS
    if (error.message?.includes('CORS') || error.message?.includes('Failed to fetch')) {
      throw new Error('Erro de CORS: O WordPress precisa permitir requisições do seu domínio. Verifique as configurações de CORS no WordPress.');
    }
    
    throw error;
  }
}
