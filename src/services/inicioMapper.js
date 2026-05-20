// src/services/mappers/inicioMapper.js
export function mapInicio(acf) {
  // Se a API falhar ou vier vazio, volta null (modelo híbrido)
  if (!acf) return null;

  // Helper pra acessar chaves com nome longo
  const pick = (key) => acf?.[key] ?? null;

  const hero = pick("sessao_principal");
  const beneficios = pick("sessao_2_-_beneficios");
  const sobre = pick("sessao_3_-_sobre_a_storm");
  const feedback = pick("sessao_4_-_feedback");
  const formulario = pick("sessao_5_-_formulario");
  const passos = pick("sessao_5_-_passos_do_programa");
  const faq = pick("sessao_6_-_perguntas_frequentes");

  // ✅ Normalizações úteis (pra facilitar seus componentes)
  // Ex: seus cards de benefícios têm "descriacao" (typo).
  // Aqui a gente transforma em "descricao" pra você nunca mais pensar nisso.

  console.log("🔍 DEBUG - beneficios completo:", beneficios);
  console.log("🔍 DEBUG - beneficios.cards:", beneficios?.cards);

  const cardsBeneficiosRaw = beneficios?.cards || null;
  const cardsBeneficios = cardsBeneficiosRaw
    ? [
      cardsBeneficiosRaw.card_1_esquerdo,
      cardsBeneficiosRaw.card_2_esquerdo,
      cardsBeneficiosRaw.card_1_direito,
      cardsBeneficiosRaw.card_2_direito,
    ]
      .filter((card) => {
        // Filtra apenas se o card tiver ao menos um campo preenchido
        const hasContent = card && (card.titulo || card.descricao || card.descriacao || card.icone);
        console.log("🔍 DEBUG - Card:", card, "hasContent:", hasContent);
        return hasContent;
      })
      .map((c) => {
        const mapped = {
          // IMPORTANTE: usar nomes em inglês para bater com o componente Index.tsx
          icon: c?.icone?.url || c?.icone || "",
          title: c?.titulo ?? "",
          // normaliza "descriacao" -> "description"
          description: c?.descricao ?? c?.descriacao ?? "",
        };
        console.log("🔍 DEBUG - Card mapeado:", mapped);
        return mapped;
      })
    : [];

  console.log("🔍 DEBUG - Total cards processados:", cardsBeneficios.length, cardsBeneficios);


  const depoimentosRaw = feedback?.depoimentos || null;
  const depoimentos = depoimentosRaw
    ? [
      depoimentosRaw.depoimento_1,
      depoimentosRaw.depoimento_2,
      depoimentosRaw.depoimento_3,
    ]
      .filter((d) => d && (d.nome || d.texto)) // Filtra apenas depoimentos com nome ou texto
      .map((d) => ({
        // IMPORTANTE: usar nomes em inglês para bater com o componente Index.tsx
        initials: d?.iniciais ?? "",
        name: d?.nome ?? "",
        role: d?.especialidade ?? "",
        content: d?.texto ?? "",
        stars: Number(d?.estrelas ?? 5), // Default 5 estrelas se não especificado
      }))
    : [];

  const perguntas = faq
    ? [
      faq.pergunta_1,
      faq.pergunta_2,
      faq.pergunta_3,
      faq.pergunta_4,
      faq.pergunta_5,
      faq.pergunta_6,
      faq.pergunta_7,
    ]
      .filter((p) => p?.pergunta && p?.resposta)
      .map((p) => ({ pergunta: p.pergunta, resposta: p.resposta }))
    : [];

  // ✅ Retorno final: objeto "limpo" pro seu app inteiro usar
  return {
    hero: {
      titulo: (typeof hero?.titulo === 'object' && hero?.titulo !== null)
        ? {
          fixo: hero.titulo.titulo_fixo ?? "",
          dinamicos: [
            hero.titulo.titulo_dinamico_1,
            hero.titulo.titulo_dinamico_2,
            hero.titulo.titulo_dinamico_3,
            hero.titulo.titulo_dinamico_4,
          ].filter(Boolean)
        }
        : hero?.titulo ?? "",
      subtitulo: hero?.subtitulo ?? "",
    },

    beneficios: {
      titulo: beneficios?.titulo ?? "",
      subtitulo: beneficios?.subtitulo ?? "",
      cards: cardsBeneficios,
      cta: {
        descricao: beneficios?.cta?.descricao ?? "",
        botao: {
          texto: beneficios?.cta?.botao?.texto_do_botao ?? "",
          link: beneficios?.cta?.botao?.link_do_botao ?? "",
        },
      },
    },

    sobre: {
      titulo: sobre?.titulo ?? "",
      conteudo: sobre?.conteudo ?? "",
      destaques: sobre?.destaques ?? null, // se quiser posso normalizar pra array também
    },

    feedback: {
      titulo: feedback?.titulo ?? "",
      subtitulo: feedback?.subtitulo ?? "",
      depoimentos,
    },

    formulario: {
      titulo: formulario?.titulo ?? "",
      descricao: formulario?.descricao ?? "",
    },

    passos: passos ?? null,

    faq: {
      titulo: faq?.titulo ?? "",
      subtitulo: faq?.subtitulo ?? "",
      perguntas,
      cta: {
        descricao: faq?.cta?.descricao ?? "",
        botao: {
          texto: faq?.cta?.botao?.texto_do_botao ?? "",
          link: faq?.cta?.botao?.link_do_botao ?? "",
        },
      },
    },
  };
}
