// src/services/mappers/casesMapper.js

export function mapCasesPage(acf) {
  if (!acf) return null;

  const pick = (key) => acf?.[key] ?? null;

  const principal = pick("sessao_principal");
  const resultados = pick("sessao_2_-_resultados");
  const destaque = pick("sessao_3_-_cases_em_destaque");
  const formulario = pick("sessao_4_-_formulario");

  // Cards de Resultados (6 fixos -> array)
  const resultadosCardsRaw = resultados?.cards ?? null;
  const resultadosCards = resultadosCardsRaw
    ? [
      resultadosCardsRaw.card_1,
      resultadosCardsRaw.card_2,
      resultadosCardsRaw.card_3,
      resultadosCardsRaw.card_4,
      resultadosCardsRaw.card_5,
      resultadosCardsRaw.card_6,
    ]
      .filter((c) => c && (c.titulo || c.case_numero || c.foco_texto)) // Filtra apenas cards com conteúdo
      .map((c) => ({
        icone: c?.icone?.url || c?.icone || "",
        titulo: c?.titulo ?? "",
        caseNumero: c?.case_numero ?? "",
        focoTexto: c?.foco_texto ?? "",
      }))
    : [];

  // Cards de Cases em Destaque (até 8 -> array)
  const destaqueRaw = destaque?.cards_de_destaque ?? null;
  const destaqueCards = destaqueRaw
    ? [
      destaqueRaw.card_1,
      destaqueRaw.card_2,
      destaqueRaw.card_3,
      destaqueRaw.card_4,
      destaqueRaw.card_5,
      destaqueRaw.card_6,
      destaqueRaw.card_7,
      destaqueRaw.card_8,
    ]
      .filter(Boolean)
      .map((card) => {
        const cab = card?.cabecalho ?? {};
        const ind = card?.indicadores_do_projeto ?? {};
        const cont = card?.conteudo ?? {};

        // No seu JSON, o campo "nome" do cabeçalho parece ter vindo com key vazia ("")
        // então a gente tenta pegar de algumas formas.
        const nome =
          cab?.nome ??
          cab?.titulo ??
          cab?.[""] ??
          "";

        return {
          cabecalho: {
            nome,
            especialidade: cab?.especialidade ?? "",
            localizacao: cab?.localizacao ?? "",
            tempoDeProjeto: cab?.tempo_de_projeto ?? "",
            instagram: cab?.instagram ?? "",
          },
          indicadores: {
            tipoDeAtendimento: ind?.tipo_de_atendimento ?? "",
            canaisPrincipais: ind?.canais_principais ?? "",
            focoDoProjeto: ind?.foco_do_projeto ?? "",
            proximosPassos: ind?.proximos_passos ?? "",
          },
          conteudo: {
            desafio: cont?.desafio ?? "",
            solucoes: cont?.solucoes ?? cont?.solucao ?? "",
          },
        };
      })
      // remove cards vazios (sem nome e sem especialidade e sem conteúdo)
      .filter((c) => {
        const hasHeader =
          c.cabecalho.nome ||
          c.cabecalho.especialidade ||
          c.cabecalho.localizacao;
        const hasContent =
          c.conteudo.desafio || c.conteudo.solucoes;
        const hasIndicators =
          c.indicadores.tipoDeAtendimento ||
          c.indicadores.canaisPrincipais ||
          c.indicadores.focoDoProjeto;

        return hasHeader || hasContent || hasIndicators;
      })
    : [];

  return {
    hero: {
      titulo: principal?.titulo ?? "",
      subtitulo: principal?.subtitulo ?? "",
    },

    resultados: {
      titulo: resultados?.titulo ?? "",
      subtitulo: resultados?.subtitulo ?? "",
      cards: resultadosCards,
    },

    casesEmDestaque: {
      titulo: destaque?.titulo ?? "",
      subtitulo: destaque?.subtitulo ?? "",
      cards: destaqueCards,
    },

    formulario: {
      titulo: formulario?.titulo ?? "",
      subtitulo: formulario?.subtitulo ?? "",
    },
  };
}
