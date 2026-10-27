# Assoalho em Dia

App web (funciona no celular) da clínica **Simone Matos – Fisioterapia Pélvica e Obstétrica**, Guanambi-BA.

## Problema e objetivo

As pacientes esquecem ou fazem errado, em casa, os exercícios do assoalho pélvico prescritos pela fisioterapeuta. O app guia cada treino com tempo, ritmo e sinais, e mostra a constância ao longo dos dias, para que o exercício seja feito do jeito certo e com regularidade.

## Público

- Gestantes, puérperas e mulheres com incontinência, **atendidas pela clínica**.
- Uso principal no celular, em casa, muitas vezes deitada ou sentada, sem olhar a tela o tempo todo (por isso som, vibração e voz).
- Não há papéis nem contas: todas as usuárias têm o mesmo acesso. A clínica atua editando o arquivo de configuração.

## Fluxos da primeira versão

| Fluxo | Entrada | Ação | Resultado esperado |
|---|---|---|---|
| 1. Escolher protocolo | Lista de protocolos do `config.js` | Paciente abre o protocolo indicado e marca "Este é o meu protocolo" | O protocolo passa a aparecer como "Seu protocolo" no início, com a meta diária |
| 2. Treino guiado | Protocolo escolhido | Timer com fases contrair → manter → relaxar, séries, repetições e descansos; pausar, pular descanso e encerrar | Sinais de fase por animação, som, vibração e voz (opcional); treino completo é registrado |
| 3. Constância | Histórico local | Calendário do mês, dias seguidos, últimos 7 dias, registro manual, remoção de registro | Paciente vê a própria regularidade; meta do dia destacada |
| 4. Falar com a clínica | Número do WhatsApp do `config.js` | Botão abre o WhatsApp com mensagem pronta; opção de enviar resumo da constância | Conversa aberta no WhatsApp; nada é enviado sem a ação da paciente |

## MVP

1. Timer guiado (fases, séries, sinais, tela ligada, pausa/encerrar com registro parcial).
2. Três protocolos de exemplo: gestação, pós-parto e incontinência.
3. Histórico local com calendário de constância.
4. Botão de WhatsApp e resumo opcional.
5. PWA instalável e funcionamento offline quando publicado em https.

## Fora do escopo

- Login, contas, sincronização entre aparelhos, backend ou banco de dados.
- Painel da clínica para acompanhar pacientes.
- Notificações/lembretes agendados.
- Publicação (hospedagem ainda não escolhida).

## Requisitos

- Interface 100% em português do Brasil.
- Visual elegante com a identidade da clínica: verde escuro, bege e dourado (ver [docs/design.md](docs/design.md)).
- **Privacidade:** sem login, sem banco de dados e sem coleta de dados pessoais. Tudo fica só no aparelho da paciente (`localStorage`). Nenhum dado sai do aparelho sem ação explícita dela (ex.: enviar resumo pelo WhatsApp).
- Protocolos e textos editáveis pela própria clínica num único arquivo de configuração (`config.js`), sem programar.
- Acessível: navegação por teclado, foco visível, contraste, movimento reduzido.

## Restrições e decisões técnicas

- Site estático em HTML, CSS e JavaScript puro, sem framework e sem etapa de build. Abre com dois cliques no `index.html` (file://) e funciona como PWA quando publicado.
- **Sem persistência remota, por decisão de produto** (privacidade e ausência de login). Por isso o padrão do toolkit (Drizzle + PostgreSQL) não se aplica.
- Ferramentas de desenvolvimento (lint, testes) são apenas `devDependencies` e não entram no que é publicado.
- Detalhes técnicos: [docs/architecture.md](docs/architecture.md).

## Suposições e decisões pendentes

| Item | Tipo | Impacto | Próximo passo |
|---|---|---|---|
| Os 3 protocolos são exemplos sem validação clínica | Pendente (essencial) | Tempos e orientações podem não servir às pacientes | Fisioterapeuta revisa o `config.js` antes de distribuir |
| Número do WhatsApp é fictício (`5577999999999`) | Pendente (essencial) | Botões abrem conversa com número inexistente | Clínica informa o número real |
| Ícone provisório | Pendente (reversível) | Marca da clínica ausente no celular | Substituir pela logo oficial |
| Hospedagem não escolhida | Pendente | Sem PWA/offline até publicar | Escolher serviço (Netlify, GitHub Pages, Cloudflare Pages) |
| Treino com menos de 10% não é registrado | Suposição reversível | Evita registros vazios | Ajustar se a clínica preferir outro critério |

## Critérios de aceitação

Produto:

- A paciente escolhe um protocolo e o vê como "Seu protocolo" com a meta do dia.
- O treino percorre todas as fases na ordem configurada, com contagem correta de séries e repetições, e termina com a tela de conclusão.
- Treino completo aparece no calendário do dia; encerrado no meio (≥ 10%) aparece como parcial.
- Fechar e reabrir o navegador mantém o histórico e o protocolo escolhido.
- Os botões de WhatsApp abrem `wa.me` com o número e a mensagem do `config.js`.
- Nenhuma requisição de rede envia dados da paciente.

Técnicos (ver [docs/quality.md](docs/quality.md)): `npm run check` passa; o validador acusa erros comuns de edição do `config.js`.

## Próxima entrega

Revisão clínica dos protocolos e troca do número do WhatsApp no `config.js`, validadas com `npm run check:config`.

## Manutenção

Atualize este documento quando o objetivo, o escopo, as restrições ou os critérios de aceitação mudarem. Decisões técnicas e evidências ficam em `docs/architecture.md` e `docs/setup.md`.
