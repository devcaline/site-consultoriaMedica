// src/services/mappers/sobreMapper.js

export function mapSobrePage(acf) {
  if (!acf) return null;

  const pick = (key) => acf?.[key] ?? null;

  const principal = pick("sessao_principal");
  const historia = pick("sessao_2_-_nossa_historia");
  const valores = pick("sessao_3_-_nossos_valores");
  const equipe = pick("sessao_4_-_nossa_equipe");

  // Destaques (3 fixos -> array)
  const destaquesRaw = principal?.destaques ?? null;
  const destaques = destaquesRaw
    ? [
      destaquesRaw.destaque_1,
      destaquesRaw.destaque_2,
      destaquesRaw.destaque_3,
    ]
      .filter(Boolean)
      .map((d) => ({
        valor: d?.valor ?? "",
        titulo: d?.titulo ?? "",
      }))
      .filter((d) => d.valor || d.titulo)
    : [];

  // Linha do tempo (ano_1..4 -> array)
  const anos = historia
    ? [historia.ano_1, historia.ano_2, historia.ano_3, historia.ano_4]
      .filter(Boolean)
      .map((a) => ({
        ano: a?.ano ?? "",
        titulo: a?.titulo ?? "",
        descricao: a?.descricao ?? "",
      }))
      .filter((a) => a.ano || a.titulo || a.descricao)
    : [];

  // Valores (card_1..4 -> array)
  const valoresCards = valores
    ? [valores.card_1, valores.card_2, valores.card_3, valores.card_4]
      .filter(Boolean)
      .map((c) => ({
        icone: c?.icone?.url || c?.icone || "",
        titulo: c?.titulo ?? "",
        descricao: c?.descricao ?? "",
      }))
      .filter((c) => c.titulo || c.descricao || c.icone)
    : [];

  // Equipe (membro_da_equipe_1..5 -> array)
  const membros = equipe
    ? [
      equipe.membro_da_equipe_1,
      equipe.membro_da_equipe_2,
      equipe.membro_da_equipe_3,
      equipe.membro_da_equipe_4,
      equipe.membro_da_equipe_5,
    ]
      .filter(Boolean)
      .map((m) => ({
        // ACF pode devolver false quando não tem imagem
        foto: (m?.foto && m.foto !== false) ? (m.foto.url || m.foto) : null,
        nome: m?.nome ?? "",
        descricao: m?.descricao ?? "",
      }))
      .filter((m) => m.nome || m.descricao || m.foto)
    : [];

  return {
    hero: {
      titulo: principal?.titulo ?? "",
      subtitulo: principal?.subtitulo ?? "",
      destaques,
    },

    nossaHistoria: {
      titulo: historia?.titulo ?? "",
      conteudo: historia?.conteudo ?? "",
      anos,
    },

    nossosValores: {
      titulo: valores?.titulo ?? "",
      subtitulo: valores?.subtitulo ?? "",
      cards: valoresCards,
    },

    nossaEquipe: {
      titulo: equipe?.titulo ?? "",
      subtitulo: equipe?.subtitulo ?? "",
      membros,
    },
  };
}
