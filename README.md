# NLW Agents

Sistema de criação e gerenciamento de salas de perguntas com transcrição de áudio via IA. Este projeto foi desenvolvido durante o evento NLW da Rocketseat.

## 🚀 Principais Funcionalidades

- ✨ **Criação de salas** para organizar perguntas por tópicos
- 🎤 **Gravação e transcrição de áudio** usando Google Gemini AI
- 📝 **Criação de perguntas** via texto ou áudio
- 🔍 **Busca semântica** de perguntas usando embeddings
- 📊 **Listagem e visualização** de salas e perguntas
- 🎨 **Interface moderna e responsiva**

## 🛠️ Stack Tecnológica

### 📦 Monorepo

- **[pnpm workspaces](https://pnpm.io/workspaces)** — gerenciamento de monorepo
- **[Ultracite](https://ultracite.dev/)** — linting e formatação de código
- **[Biome](https://biomejs.dev/)** — toolchain para JavaScript/TypeScript
- **[Husky](https://typicode.github.io/husky/)** — git hooks
- **[lint-staged](https://github.com/okonet/lint-staged)** — linting em arquivos staged

### 🔧 Backend (apps/server)

- **[Fastify](https://fastify.dev/)** — framework web rápido e eficiente
- **[Drizzle ORM](https://orm.drizzle.team/)** — ORM TypeScript-first
- **[PostgreSQL](https://www.postgresql.org/)** com **[pgvector](https://github.com/pgvector/pgvector)** — banco de dados com suporte a vetores
- **[Google Gemini AI](https://ai.google.dev/)** — IA para transcrição de áudio e embeddings
- **[Zod](https://zod.dev/)** — validação de esquemas TypeScript
- **[fastify-type-provider-zod](https://github.com/turkerdev/fastify-type-provider-zod)** — integração Zod com Fastify
- **[@fastify/cors](https://github.com/fastify/fastify-cors)** — configuração de CORS
- **[@fastify/multipart](https://github.com/fastify/fastify-multipart)** — upload de arquivos

### 🎨 Frontend (apps/web)

- **[React 19](https://react.dev/)** — biblioteca para interfaces de usuário
- **[Vite](https://vitejs.dev/)** — build tool e dev server
- **[TypeScript](https://www.typescriptlang.org/)** — tipagem estática
- **[Tailwind CSS 4](https://tailwindcss.com/)** — framework CSS utility-first
- **[TanStack Query](https://tanstack.com/query)** — gerenciamento de estado servidor
- **[React Hook Form](https://react-hook-form.com/)** — formulários performáticos
- **[React Router](https://reactrouter.com/)** — roteamento client-side
- **[Radix UI](https://www.radix-ui.com/)** — componentes acessíveis headless
- **[Lucide React](https://lucide.dev/)** — ícones
- **[Day.js](https://day.js.org/)** — manipulação de datas
- **[clsx](https://github.com/lukeed/clsx)** e **[tailwind-merge](https://github.com/dcastil/tailwind-merge)** — utilitários CSS
- **[class-variance-authority](https://cva.style/)** — variantes de componentes

### 🐳 Infraestrutura

- **[Docker](https://www.docker.com/)** e **[Docker Compose](https://docs.docker.com/compose/)** — containerização
- **[pgvector/pgvector](https://hub.docker.com/r/pgvector/pgvector)** — imagem PostgreSQL com extensão vector

## 🏗️ Arquitetura e Padrões

- **🏢 Monorepo:** estrutura organizada com workspaces
- **📝 TypeScript:** tipagem em todo o projeto
- **🔒 Validação robusta:** schemas Zod para API e formulários
- **🗄️ Database-first:** migrations e schema com Drizzle ORM
- **🧩 Componentização:** componentes reutilizáveis e acessíveis
- **⚡ Performance:** otimizações com React 19 e TanStack Query
- **🎯 Type Safety:** type providers para validação end-to-end
- **📱 Responsivo:** design adaptável para diferentes dispositivos

## ⚙️ Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **[Node.js](https://nodejs.org/)** >= 22.0.0
- **[pnpm](https://pnpm.io/)** >= 10.0.0 (gerenciador de pacotes)
- **[Docker](https://www.docker.com/)** e **[Docker Compose](https://docs.docker.com/compose/)** (para o banco de dados)
- **[Google Gemini API Key](https://ai.google.dev/)** (para transcrição e embeddings)

## 🚀 Instalação e Configuração

### 1️⃣ Clone o repositório

```bash
git clone https://github.com/gustavomorinaga/nlw-agents.git
cd nlw-agents
```

### 2️⃣ Instale as dependências

```bash
pnpm install
```

### 3️⃣ Configure as variáveis de ambiente

Crie o arquivo `.env` no diretório raiz baseado no `.env.example`:

```bash
cp .env.example .env
```

Edite o arquivo `.env` e configure as seguintes variáveis:

```bash
# HTTP
PORT=3333

# Database
DATABASE_URL=postgresql://docker:docker@localhost:5432/agents

# Gemini AI
GEMINI_API_KEY=sua-chave-da-api-do-gemini
```

> **⚠️ Importante:** Obtenha sua chave da API do Gemini em [Google AI Studio](https://aistudio.google.com/app/apikey)

### 4️⃣ Inicie o banco de dados

```bash
docker-compose up -d
```

Isso irá iniciar um container PostgreSQL com a extensão pgvector na porta 5432.

### 5️⃣ Execute as migrations

```bash
pnpm db:migrate
```

### 6️⃣ (Opcional) Popule o banco com dados de exemplo

```bash
pnpm db:seed
```

## 🏃‍♂️ Executando o Projeto

### Desenvolvimento (ambos os serviços)

```bash
pnpm dev
```

Este comando iniciará:

- **Backend:** <http://localhost:3333>
- **Frontend:** <http://localhost:5173>

### Executar apenas o servidor

```bash
pnpm dev:server
```

### Executar apenas o frontend

```bash
pnpm dev:web
```

## 📝 Scripts Disponíveis

### Gerais (raiz do projeto)

- `pnpm dev` — inicia servidor e frontend em desenvolvimento
- `pnpm dev:server` — inicia apenas o servidor
- `pnpm dev:web` — inicia apenas o frontend
- `pnpm lint` — executa linting em todos os projetos
- `pnpm format` — formata código em todos os projetos

### Backend (apps/server)

- `pnpm db:generate` — gera migrations do Drizzle
- `pnpm db:migrate` — executa migrations pendentes
- `pnpm db:seed` — popula banco com dados de exemplo
- `pnpm db:studio` — abre Drizzle Studio (GUI do banco)

### Frontend (apps/web)

- `pnpm build` — build de produção
- `pnpm preview` — preview do build de produção

## 📁 Estrutura do Projeto

```text
nlw-agents/
├── 📦 apps/                          # Aplicações do monorepo
│   ├── 🔧 server/                    # API Backend (Fastify)
│   │   ├── src/
│   │   │   ├── db/                   # Configuração do banco
│   │   │   │   ├── connection.ts     # Conexão com PostgreSQL
│   │   │   │   ├── migrations/       # Scripts de migração
│   │   │   │   ├── schema/           # Schema do banco (Drizzle)
│   │   │   │   └── seed.ts           # Dados de exemplo
│   │   │   ├── http/                 # Configuração HTTP
│   │   │   │   └── routes/           # Endpoints da API
│   │   │   │       ├── create-question.ts
│   │   │   │       ├── create-room.ts
│   │   │   │       ├── get-room-questions.ts
│   │   │   │       ├── get-rooms.ts
│   │   │   │       └── upload-audio.ts
│   │   │   ├── services/             # Serviços externos
│   │   │   │   └── gemini.ts         # Integração Google Gemini
│   │   │   ├── env.ts                # Validação de variáveis
│   │   │   └── server.ts             # Servidor principal
│   │   ├── drizzle.config.ts         # Configuração Drizzle ORM
│   │   └── package.json
│   └── 🎨 web/                       # Frontend (React + Vite)
│       ├── src/
│       │   ├── components/           # Componentes React
│       │   │   ├── ui/               # Componentes base (Radix UI)
│       │   │   │   ├── badge.tsx
│       │   │   │   ├── button.tsx
│       │   │   │   ├── card.tsx
│       │   │   │   ├── form.tsx
│       │   │   │   ├── input.tsx
│       │   │   │   ├── label.tsx
│       │   │   │   └── textarea.tsx
│       │   │   ├── create-room-form.tsx
│       │   │   ├── question-form.tsx
│       │   │   ├── question-item.tsx
│       │   │   ├── question-list.tsx
│       │   │   └── room-list.tsx
│       │   ├── http/                 # Hooks para API
│       │   │   ├── types/            # Tipos TypeScript
│       │   │   ├── use-create-question.ts
│       │   │   ├── use-create-room.ts
│       │   │   ├── use-room-questions.ts
│       │   │   └── use-rooms.ts
│       │   ├── lib/                  # Utilitários
│       │   │   ├── dayjs.ts          # Configuração Day.js
│       │   │   └── utils.ts          # Funções auxiliares
│       │   ├── pages/                # Páginas da aplicação
│       │   │   ├── create-room.tsx
│       │   │   ├── record-room-audio.tsx
│       │   │   └── room.tsx
│       │   ├── app.tsx               # Componente raiz
│       │   ├── main.tsx              # Entry point
│       │   └── index.css             # Estilos globais
│       ├── components.json           # Configuração shadcn/ui
│       ├── vite.config.ts            # Configuração Vite
│       └── package.json
├── 🐳 docker/                        # Configurações Docker
│   └── setup.sql                     # Script inicialização DB
├── 📋 .env.example                   # Template variáveis ambiente
├── 📄 docker-compose.yaml            # Orquestração containers
├── 🔧 biome.jsonc                    # Configuração Biome
├── 📦 package.json                   # Configuração monorepo
├── 🧹 pnpm-workspace.yaml            # Configuração workspaces
└── 📖 README.md                      # Esta documentação
```

## 🔧 API Endpoints

### Salas

- `GET /rooms` — Lista todas as salas
- `POST /rooms` — Cria uma nova sala

### Perguntas

- `GET /rooms/:roomId/questions` — Lista perguntas de uma sala
- `POST /rooms/:roomId/questions` — Cria pergunta via texto
- `POST /rooms/:roomId/questions/audio` — Cria pergunta via áudio

## 🎯 Funcionalidades Principais

### 🎤 Transcrição de Áudio

O sistema utiliza a API do Google Gemini para:

- **Transcrever áudio** para texto em português brasileiro
- **Gerar embeddings** para busca semântica
- **Processar diferentes formatos** de áudio (WAV, MP3, etc.)

### 🔍 Busca Semântica

- Utiliza **pgvector** para armazenar embeddings
- **Busca por similaridade** entre perguntas
- **Ranking relevância** baseado em vetores

### 🎨 Interface Moderna

- **Design system** consistente com Radix UI
- **Componentes acessíveis** seguindo padrões WCAG
- **Animações suaves** com Tailwind CSS
- **Interface responsiva** para desktop e mobile

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

⭐ Feito com ❤️ durante o NLW da [Rocketseat](https://rocketseat.com.br)!
