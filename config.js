/*
 * ============================================================================
 *  ASSOALHO EM DIA — ARQUIVO DE CONFIGURAÇÃO DA CLÍNICA
 * ============================================================================
 *
 *  Este é o ÚNICO arquivo que a clínica precisa editar.
 *  Abra-o em qualquer editor de texto (Bloco de Notas, VS Code etc.),
 *  altere os textos/números e salve. Não é preciso saber programar.
 *
 *  Regras rápidas para não quebrar o arquivo:
 *   • Textos ficam sempre entre aspas: "assim".
 *   • Números ficam sem aspas: 5
 *   • Cada item de uma lista termina com vírgula, exceto (opcionalmente) o último.
 *   • Tempos são sempre em SEGUNDOS.
 *   • Se algo parar de funcionar após uma edição, confira aspas e vírgulas.
 *
 *  ⚠️ Os 3 protocolos abaixo são EXEMPLOS para o MVP. A fisioterapeuta
 *     responsável deve revisar e ajustar tempos, séries e orientações.
 * ============================================================================
 */

window.ASSOALHO_CONFIG = {

  /* ---------------------------------------------------------------------- */
  /*  DADOS DA CLÍNICA                                                       */
  /* ---------------------------------------------------------------------- */
  clinica: {
    nome: "Simone Matos",
    especialidade: "Fisioterapia Pélvica e Obstétrica",
    cidade: "Guanambi – BA",

    // WhatsApp da clínica: código do país (55) + DDD + número, só dígitos.
    // ⚠️ SUBSTITUA pelo número real antes de publicar.
    whatsapp: "5577999999999",

    // Mensagem que já aparece escrita quando a paciente toca em "Falar com a clínica".
    mensagemWhatsapp: "Olá! Vim pelo app Assoalho em Dia e gostaria de falar com a clínica."
  },

  /* ---------------------------------------------------------------------- */
  /*  TREINO                                                                 */
  /* ---------------------------------------------------------------------- */

  // Contagem regressiva antes de começar cada treino (segundos).
  preparacaoSegundos: 5,

  // Nomes e dicas de cada fase, exibidos durante o timer.
  // "voz" é o que o celular fala em voz alta (se a paciente ativar a voz).
  fases: {
    preparar: { rotulo: "Prepare-se", voz: "Prepare-se",  dica: "Fique numa posição confortável e respire com calma." },
    contrair: { rotulo: "Contraia",   voz: "Contraia",    dica: "Feche e eleve a musculatura, como se segurasse o xixi e o pum. Não prenda a respiração." },
    manter:   { rotulo: "Segure",     voz: "Segure",      dica: "Mantenha a contração e continue respirando normalmente. Barriga e glúteos soltos." },
    relaxar:  { rotulo: "Relaxe",     voz: "Relaxe",      dica: "Solte completamente. Relaxar bem é tão importante quanto contrair." },
    descanso: { rotulo: "Descanse",   voz: "Descanse",    dica: "Respire fundo e deixe o corpo descansar." }
  },

  /* ---------------------------------------------------------------------- */
  /*  PROTOCOLOS                                                             */
  /* ---------------------------------------------------------------------- */
  /*
   *  Cada protocolo tem:
   *    id            → identificador único, sem espaços nem acentos (não mude depois
   *                    de publicado, pois o histórico das pacientes usa esse id)
   *    nome          → título exibido
   *    publico       → para quem é (aparece como etiqueta)
   *    resumo        → frase curta para a lista
   *    descricao     → texto mais completo, na tela de detalhes
   *    vezesPorDia   → meta diária de treinos (usada no calendário de constância)
   *    orientacoes   → lista de cuidados/dicas antes de começar
   *    descansoEntreEtapas → pausa (s) ao passar de uma etapa para a próxima
   *    etapas        → os exercícios, em ordem. Cada etapa tem:
   *        nome, dica (opcional),
   *        contrair, manter, relaxar  → segundos de cada fase (use 0 para pular a fase)
   *        repeticoes                 → repetições por série
   *        series                     → quantas séries
   *        descansoEntreSeries        → pausa (s) entre uma série e outra
   */
  protocolos: [

    {
      id: "gestacao",
      nome: "Gestação: consciência e preparo",
      publico: "Gestantes",
      resumo: "Fortalece com suavidade e treina o relaxamento para o parto.",
      descricao: "Durante a gestação, o assoalho pélvico sustenta o peso do bebê. Este protocolo combina contrações lentas, contrações rápidas e um momento de relaxamento profundo, que ajuda na preparação para o parto.",
      vezesPorDia: 2,
      orientacoes: [
        "Faça deitada de lado, sentada ou na posição que sua fisioterapeuta indicou.",
        "Esvazie a bexiga antes de começar.",
        "Não prenda a respiração e não contraia barriga, coxas ou glúteos.",
        "Sentiu dor, sangramento ou contrações uterinas? Pare e fale com a clínica."
      ],
      descansoEntreEtapas: 30,
      etapas: [
        { nome: "Contrações lentas",    contrair: 2, manter: 5, relaxar: 10, repeticoes: 8,  series: 3, descansoEntreSeries: 45 },
        { nome: "Contrações rápidas",   contrair: 1, manter: 0, relaxar: 3,  repeticoes: 10, series: 2, descansoEntreSeries: 30,
          dica: "Contraia rápido e solte por completo antes da próxima." },
        { nome: "Relaxamento profundo", contrair: 2, manter: 0, relaxar: 10, repeticoes: 5,  series: 1, descansoEntreSeries: 0,
          dica: "Contraia de leve e depois solte por completo, inspirando devagar e sentindo o períneo se abrir." }
      ]
    },

    {
      id: "pos-parto",
      nome: "Pós-parto: retomada gentil",
      publico: "Puérperas",
      resumo: "Reativa a musculatura aos poucos, respeitando a recuperação.",
      descricao: "Após o parto, o assoalho pélvico precisa ser reativado com calma. Este protocolo usa contrações curtas e poucas repetições, ideal para as primeiras semanas — sempre com liberação da sua fisioterapeuta.",
      vezesPorDia: 2,
      orientacoes: [
        "Comece apenas após a liberação da fisioterapeuta.",
        "Prefira fazer deitada, com os joelhos dobrados.",
        "Se tiver pontos, contraia com delicadeza: não deve doer.",
        "Pode ser feito enquanto amamenta, se estiver confortável."
      ],
      descansoEntreEtapas: 30,
      etapas: [
        { nome: "Contrações lentas",  contrair: 2, manter: 3, relaxar: 6, repeticoes: 6, series: 2, descansoEntreSeries: 45 },
        { nome: "Contrações rápidas", contrair: 1, manter: 0, relaxar: 3, repeticoes: 5, series: 2, descansoEntreSeries: 30,
          dica: "Movimento curto e leve. Solte bem entre uma e outra." }
      ]
    },

    {
      id: "incontinencia",
      nome: "Incontinência: força e controle",
      publico: "Incontinência urinária",
      resumo: "Ganha força, resistência e o reflexo de contrair antes do esforço.",
      descricao: "Para quem perde urina ao tossir, espirrar, rir ou fazer esforço. Trabalha resistência (contrações longas), força (contrações rápidas) e treina o hábito de contrair antes de um esforço.",
      vezesPorDia: 3,
      orientacoes: [
        "Faça sentada com os pés apoiados, ou na posição indicada.",
        "Não faça os exercícios enquanto urina: isso pode prejudicar o esvaziamento da bexiga.",
        "Qualidade é mais importante que quantidade: se cansar, reduza o tempo de contração.",
        "Leve suas dúvidas para a próxima sessão ou fale com a clínica."
      ],
      descansoEntreEtapas: 45,
      etapas: [
        { nome: "Contrações longas",  contrair: 2, manter: 8, relaxar: 8, repeticoes: 10, series: 3, descansoEntreSeries: 60 },
        { nome: "Contrações rápidas", contrair: 1, manter: 0, relaxar: 2, repeticoes: 10, series: 3, descansoEntreSeries: 30 },
        { nome: "Contrair antes do esforço", contrair: 1, manter: 3, relaxar: 5, repeticoes: 5, series: 1, descansoEntreSeries: 0,
          dica: "Imagine que vai tossir: contraia ANTES e segure durante a tosse." }
      ]
    }

  ]
};
