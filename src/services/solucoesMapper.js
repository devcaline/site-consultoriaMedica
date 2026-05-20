// src/services/mappers/solucoesMapper.js

export function mapSolucoesPage(acf) {
  if (!acf) return null;

  const pick = (key) => acf?.[key] ?? null;

  const principal = pick("sessao_principal");
  const solucoes = pick("sessao_2_-_principais_solucoes");
  const servicos = pick("sessao_3_-_servicos_eespecializados");
  const comoFunciona = pick("sessao_4_-_como_funciona");

  // Topicos (topico_1..4) -> array (filtra vazios)
  const topicos = solucoes
    ? [solucoes.topico_1, solucoes.topico_2, solucoes.topico_3, solucoes.topico_4]
      .map((t) => (t ?? "").trim())
      .filter(Boolean)
    : [];

  // Cards de soluções (4 fixos -> array)
  const cardsSolucoesRaw = solucoes
    ? [solucoes.card_solucao_1, solucoes.card_solucao_2, solucoes.card_solucao_3, solucoes.card_solucao_4]
      .filter(Boolean)
    : [];

  const cardsSolucoes = cardsSolucoesRaw
    .map((c) => ({
      icone: c?.icone?.url || c?.icone || "",
      titulo: c?.titulo ?? "",
      subtitulo: c?.subtitulo ?? "",
      conteudo: c?.conteudo ?? "",
      resultadosEsperados: c?.resultados_esperados ?? "",
    }))
    .filter((c) => c.titulo || c.subtitulo || c.conteudo || c.resultadosEsperados || c.icone);

  // Cards de serviços especializados (pode ter card_3 incompleto)
  const servicosCardsRaw = servicos?.cards ?? null;
  const servicosCards = servicosCardsRaw
    ? [servicosCardsRaw.card_1, servicosCardsRaw.card_2, servicosCardsRaw.card_3]
      .filter(Boolean)
      .map((c) => ({
        icone: c?.icone?.url || c?.icone || "",
        titulo: c?.titulo ?? "",
        descricao: c?.descricao ?? c?.descriacao ?? "",
      }))
      .filter((c) => c.titulo || c.descricao || c.icone)
    : [];

  // Cards de "como funciona"
  const comoFuncionaCardsRaw = comoFunciona?.cards ?? null;
  const comoFuncionaCards = comoFuncionaCardsRaw
    ? [comoFuncionaCardsRaw.card_1, comoFuncionaCardsRaw.card_2, comoFuncionaCardsRaw.card_3, comoFuncionaCardsRaw.card_4]
      .filter(Boolean)
      .map((c) => ({
        titulo: c?.titulo ?? "",
        descricao: c?.descricao ?? c?.descriacao ?? "",
      }))
      .filter((c) => c.titulo || c.descricao)
    : [];

  return {
    hero: {
      titulo: principal?.titulo ?? "",
      subtitulo: principal?.subtitulo ?? "",
    },

    principaisSolucoes: {
      titulo: solucoes?.titulo ?? "",
      subtitulo: solucoes?.subtitulo ?? "",
      tituloDoTopico: solucoes?.titulo_do_topico ?? "",
      topicos,
      cards: cardsSolucoes,
    },

    servicosEspecializados: {
      titulo: servicos?.titulo ?? "",
      subtitulo: servicos?.subtitulo ?? "",
      cards: servicosCards,
    },

    comoFunciona: {
      titulo: comoFunciona?.titulo ?? "",
      subtitulo: comoFunciona?.subtitulo ?? "",
      cards: comoFuncionaCards,
    },
  };
}
