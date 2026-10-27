# Assoalho em Dia — instruções para agentes

App web estático (PWA) da clínica Simone Matos para exercícios do assoalho pélvico. Leia antes de agir; detalhes ficam nos documentos do mapa abaixo.

## Produto e stack

- Escopo, público e critérios de aceitação: [PRODUCT.md](PRODUCT.md).
- HTML, CSS e JavaScript puro, **sem build e sem framework**. Os arquivos de `js/` são scripts clássicos no namespace `window.Assoalho` (não ES modules), para que o app abra via `file://`. Estrutura: [docs/architecture.md](docs/architecture.md).
- Node ≥ 24 e npm só para desenvolvimento (`devDependencies`: ESLint 10, `@eslint/js`, `globals`). Nada de Node roda no app publicado.
- Setup, versões e evidências: [docs/setup.md](docs/setup.md).

## Comandos canônicos

- Instalar: `npm ci`
- Desenvolver: abrir `index.html` no navegador (ou qualquer servidor estático para testar PWA/offline)
- Lint: `npm run lint`
- Self-check das regras locais (`eslint-rules/`): `npm run lint:rules`
- Testes (`node:test`): `npm test`
- Validar o `config.js` da clínica: `npm run check:config`
- Tipos e build: não existem (JavaScript sem TypeScript; site sem build)
- Verificação completa: `npm run check`

O que cada verificação prova: [docs/quality.md](docs/quality.md).

## Regras do produto (não negociáveis)

- **Privacidade:** sem login, backend, banco ou analytics. Dados da paciente só no `localStorage` do aparelho; nada sai sem ação explícita dela (link do WhatsApp). Não adicione requisições que enviem dados.
- Toda string vinda do `config.js` ou do `localStorage` passa por `Assoalho.nucleo.esc()` antes de entrar em `innerHTML`.
- Não renomeie as chaves `assoalho.historico.v1`, `assoalho.meuProtocolo`, `assoalho.preferencias` nem `id` de protocolos: o histórico das pacientes depende deles.
- Interface em português do Brasil; acessibilidade e identidade visual conforme [docs/design.md](docs/design.md).
- Ao adicionar, renomear ou remover arquivos carregados pela página, atualize `index.html` (ordem dos scripts), a lista `ARQUIVOS` e a versão de `CACHE` em `sw.js`.
- Lógica sem DOM vai para `js/nucleo.js`, com teste em `testes/`.

## Combinados de trabalho

- Leia as instruções e o código relevante antes de editar. Separe observação, suposição, decisão e evidência.
- Faça a menor mudança completa. Reutilize padrões existentes; não crie abstrações, dependências ou recursos não pedidos.
- Defina critérios e comandos de aceitação antes de implementar. Correções precisam de reprodução e teste de regressão quando viável.
- Preserve validações, tratamento de erros, acessibilidade e mudanças locais do usuário.
- Fluxos com `<dialog>` não funcionam em Chrome headless com `--virtual-time-budget`; valide-os em tempo real (ver docs/quality.md).
- Atualize o documento responsável na mesma mudança: escopo → `PRODUCT.md`; estrutura → `docs/architecture.md`; visual → `docs/design.md`; preparo → `docs/onboarding.md`; verificações → `docs/quality.md`; ferramentas/versões → `docs/setup.md`.
- Publicar, enviar mensagens, gerar custos ou ações destrutivas exigem autorização específica. Instalar ferramenta não autoriza usá-la para isso.

## Continuidade

- Responda perguntas de status e continue o trabalho autorizado. Um bloqueio para só o que depende dele.
- Não repita tentativa idêntica sem evidência nova. Respeite pausas, recusas e limites.
- Trabalho inacabado entre sessões: handoff curto no plano em `docs/planos/` (objetivo, estado verificado, checagens, pendências, bloqueios, próxima ação), no formato do toolkit. Ao retomar, verifique arquivos, `git status` e checagens antes de confiar no handoff.

## Ferramentas

- **Superpowers** (plugin, escopo projeto): use as skills de processo proporcionalmente ao tamanho do pedido; execução já autorizada dispensa aprovações repetidas.
- **Ponytail e Caveman:** não instalados (aguardam autorização). Siga o equivalente: menor solução completa; conversa concisa no idioma do usuário, com código e documentos em linguagem normal.
- **Context7** (MCP em `.mcp.json`): consulte docs atuais de bibliotecas, um conceito por vez. Nunca envie código privado ou segredos.
- **Skills locais** (`.claude/skills/`): `web-design-guidelines` para revisar interface; `writing-guidelines` para revisar documentação; `find-skills` quando faltar uma capacidade concreta, **instalando só no escopo do projeto** (nunca `-g`).
- **RTK e Graphify:** não instalados (RTK aguarda autorização; Graphify é inaplicável neste tamanho de projeto). Use comandos normais.
- **Revisão de segurança:** [docs/prompts/revisao-seguranca.md](docs/prompts/revisao-seguranca.md), relatório privado fora do repositório.
- **Melhoria do harness:** [docs/prompts/melhoria-harness.md](docs/prompts/melhoria-harness.md), após mudanças nestas instruções, skills ou orquestração.

## Delegação e revisão

- Delegue só quando isolamento de contexto, especialização ou paralelismo independente compensarem; tarefas simples, faça direto.
- Escolha o modelo mais leve que cumpra o critério: buscas e leituras → leve; implementação delimitada → intermediário; segurança, privacidade e revisão crítica → mais capaz. Preserve o modelo principal e a autenticação; não troque de provedor.
- Cada tarefa delegada recebe objetivo, contexto mínimo, arquivos permitidos, critérios e checagens. Um escritor por arquivo; revisores só leem; `package-lock.json`, configuração compartilhada e Git ficam com o coordenador, que confere o diff e reexecuta `npm run check`.
- Revise mudanças não triviais de forma independente, com escopo pelo risco e pelo diff real. Pare quando os achados estiverem resolvidos ou com decisão registrada e as checagens passarem.

## Git

Sem hooks, sem bloqueios de push e sem exigência de branch. Verificações são comandos explícitos.
