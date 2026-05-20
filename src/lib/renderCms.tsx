import React from 'react';

/**
 * Helper seguro para renderizar conteúdo multimídia vindo do CMS.
 * Evita o erro "Objects are not valid as a React child" (#31).
 * 
 * Regras:
 * 1. null/undefined/false -> return null
 * 2. string -> renderiza <span>texto</span> (ou emoji)
 *    * OPCIONAL: Se quiser que string URL vire <img> automaticamente, 
 *      precisamos de um regex. Por enquanto, assumimos que ícones 
 *      podem ser emojis ou classes SVG passadas como string se não forem URL.
 *      MAS, para este projeto, a regra solicitada foi:
 *      - Se value for string -> renderiza texto/emoji
 *      - (Se quisermos imagem via string, o componente pai geralmente passa para <img src>. 
 *        Porém, para robustez, se detectar http/https E parecer imagem, podemos renderizar img).
 * 3. object {url: ...} -> renderiza <img src={url} />
 * 4. object sem url -> return null (log error em dev)
 * 5. React Element -> return value
 */
export const renderMediaOrText = (
    value: any,
    altText: string = "",
    className: string = "",
    imgClassName: string = ""
) => {
    if (!value) return null;

    // 0. Se for uma função (componente React não instanciado), renderiza como JSX
    if (typeof value === 'function') {
        const Component = value;
        return <Component className={className} />;
    }

    // 1. Se for Elemento React válido (ex: <Icone />), retorna direto
    if (React.isValidElement(value)) {
        return <div className={className}>{value}</div>;
    }

    // 2. Se for string
    if (typeof value === 'string') {
        // Verificação simples se parece URL de imagem
        const isUrl = value.match(/^(https?:\/\/|\/)/i);
        const isImageFile = value.match(/\.(jpeg|jpg|gif|png|webp|svg)$/i);

        // Se parece muito com uma URL de imagem ou arquivo, renderizamos IMG
        // (Isso cobre o caso em que o mapper já normalizou para string URL)
        if (isUrl && isImageFile) {
            return (
                <img
                    src={value}
                    alt={altText}
                    className={`${imgClassName} ${className}`}
                    loading="lazy"
                />
            );
        }

        // Caso contrário, renderiza como texto (pode ser emoji, "R$", etc)
        return <span className={className}>{value}</span>;
    }

    // 3. Se for objeto
    if (typeof value === 'object') {
        // Se tiver propriedade URL (padrão ACF/WP)
        if (value.url) {
            return (
                <img
                    src={value.url}
                    alt={value.alt || altText}
                    className={`${imgClassName} ${className}`}
                    loading="lazy"
                />
            );
        }

        // Objeto desconhecido/inválido para renderização direta
        if (import.meta.env.DEV) {
            console.warn("renderMediaOrText: Objeto inválido recebido (sem url)", value);
        }
        return null;
    }

    return null;
};
