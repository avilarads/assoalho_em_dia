# Assoalho em Dia

App web (funciona no celular) da clínica **Simone Matos – Fisioterapia Pélvica e Obstétrica**, Guanambi-BA.
Ajuda as pacientes a fazer os exercícios do assoalho pélvico em casa, do jeito certo e com regularidade.

## O que o app faz

- **Protocolos**: a paciente escolhe o protocolo indicado pela fisioterapeuta e marca como "meu protocolo".
- **Timer guiado**: fases *Contraia → Segure → Relaxe*, com contagem de séries e repetições, descansos,
  animação visual, som, vibração e voz (opcional). A tela fica ligada durante o treino.
- **Constância**: registro automático de cada treino, calendário mensal, dias seguidos e meta diária.
  Também dá para registrar à mão um treino feito sem o app.
- **WhatsApp**: botão para falar com a clínica e opção de enviar um resumo da constância.

## Privacidade

- Sem login, sem banco de dados e sem coleta de dados pessoais.
- O histórico fica **somente no aparelho da paciente** (armazenamento local do navegador).
- O resumo só chega à clínica se a própria paciente tocar em "Enviar meu resumo" no WhatsApp.
- Se a paciente limpar os dados do navegador ou trocar de celular, o histórico é perdido.

## Como a clínica edita os protocolos

Tudo fica em **`config.js`**, comentado em português. Lá você muda:

- nome da clínica e **número do WhatsApp** (⚠️ hoje está com um número fictício: `5577999999999`);
- textos de cada fase (Contraia, Segure, Relaxe…);
- os protocolos: nome, público, orientações, etapas, tempos (em segundos), repetições, séries e meta diária.

Dicas:

- Os 3 protocolos atuais são **exemplos** e precisam ser revisados pela fisioterapeuta.
- Não altere o `id` de um protocolo já em uso: o histórico das pacientes depende dele.
- Use `0` numa fase para pulá-la (ex.: `manter: 0` nas contrações rápidas).
- Depois de editar, rode `npm run check:config` (aponta erros em português) e abra o `index.html` no navegador para conferir.

## Como testar no computador

Dê dois cliques em `index.html`. Tudo funciona, menos o modo offline e a instalação, que só funcionam
quando o app está publicado na internet (https).

## Como publicar

É um site estático, sem servidor. Envie **só os arquivos do app**: `index.html`, `config.js`, `sw.js`,
`manifest.webmanifest` e as pastas `css/`, `js/` e `img/`. Ferramentas de desenvolvimento (`node_modules/`, `docs/`,
`scripts/`, `testes/`, `.claude/` etc.) não devem ser publicadas. Serviços gratuitos, por exemplo:

- **Netlify Drop** (https://app.netlify.com/drop): arraste uma pasta contendo só esses arquivos;
- **GitHub Pages** ou **Cloudflare Pages**.

Depois, a paciente abre o link no celular e escolhe **"Adicionar à tela inicial"** (Android: menu ⋮; iPhone: botão
Compartilhar). O app passa a abrir como um aplicativo e funciona mesmo sem internet.

Ao publicar uma nova versão do `config.js`, as pacientes recebem a atualização na próxima vez que abrirem o app com internet.

## Limitações conhecidas

- **iPhone**: o Safari não permite vibração pela web, e o som não toca com o celular no modo silencioso.
  A animação, a contagem na tela e a voz continuam funcionando.
- Com a tela bloqueada, o celular pode atrasar os sinais sonoros. O ideal é deixar o app aberto durante o treino.
- O ícone (`img/`) é provisório: troque pela logo da clínica (PNG 192×192 e 512×512, mais `apple-touch-icon.png` 180×180).

## Estrutura

```
index.html            telas do app
config.js             ← protocolos e dados da clínica (editável)
css/estilo.css        identidade visual (verde, bege, dourado)
js/                   lógica do app (núcleo, armazenamento, sinais, telas, treino, navegação)
sw.js                 funcionamento offline
manifest.webmanifest  instalação no celular
img/                  ícones
```

Mapa completo em [docs/architecture.md](docs/architecture.md).

## Desenvolvimento

Requer Node.js 24 ou mais recente (só para as ferramentas; o app não usa Node).

```bash
npm ci          # instala lint e afins
npm run check   # lint, self-check das regras, testes e validação do config.js
```

## Documentação

- [Produto e escopo](PRODUCT.md)
- [Preparação local](docs/onboarding.md)
- [Estrutura e decisões técnicas](docs/architecture.md)
- [Design e acessibilidade](docs/design.md)
- [Verificações de qualidade](docs/quality.md)
- [Instruções para agentes de IA](AGENTS.md)
- [Setup e evidências](docs/setup.md)

## Próxima entrega

A fisioterapeuta revisa os protocolos e a clínica informa o WhatsApp real no `config.js`. Pronto quando
`npm run check:config` passar **sem avisos**.
