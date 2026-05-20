// src/services/mappers/metodologiaMapper.js

export function mapMetodologiaPage(acf) {
  if (!acf) return null;

  const pick = (key) => acf?.[key] ?? null;

  const principal = pick("sessao_principal");
  const metodologia = pick("metodologia");
  const principais = pick("sessao_3_-_pirncipais_metodologias");

  // Cards da seção "metodologia" (4 fixos -> array)
  const cardsMetodologiaRaw = metodologia
    ? [
      metodologia.card_metodologia_1,
      metodologia.card_metodologia_2,
      metodologia.card_metodologia_3,
      metodologia.card_metodologia_4,
    ].filter(Boolean)
    : [];

  const cardsMetodologia = cardsMetodologiaRaw
    .map((c) => ({
      titulo: c?.titulo ?? "",
      subtitulo: c?.subtitulo ?? "",
      descricao: c?.descricao ?? c?.descriacao ?? "",
      conteudoEntregaveis: c?.conteudo_entregaveis ?? "",
      conteudoFerramentas: c?.conteudo_ferramentas ?? "",
    }))
    // remove cards realmente vazios
    .filter((c) => c.titulo || c.subtitulo || c.descricao || c.conteudoEntregaveis || c.conteudoFerramentas);

  // Cards das "principais metodologias" (4 fixos -> array)
  const principaisCardsRaw = principais?.cards ?? null;

  const principaisCards = principaisCardsRaw
    ? [
      principaisCardsRaw.card_1,
      principaisCardsRaw.card_2,
      principaisCardsRaw.card_3,
      principaisCardsRaw.card_4,
    ]
      .filter(Boolean)
      .map((c) => ({
        icone: c?.icone?.url || c?.icone || "",
        titulo: c?.titulo ?? "",
        descricao: c?.descricao ?? c?.descriacao ?? "",
      }))
      .filter((c) => c.titulo || c.descricao || c.icone)
    : [];

  return {
    hero: {
      titulo: principal?.titulo ?? "",
      descricao: principal?.descricao ?? "",
    },

    metodologia: {
      titulo: metodologia?.titulo ?? "",
      descricao: metodologia?.descricao ?? "",
      cards: cardsMetodologia,
    },

    principaisMetodologias: {
      titulo: principais?.titulo ?? "",
      subtitulo: principais?.subtitulo ?? "",
      cards: principaisCards,
    },
  };
}
