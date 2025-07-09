# NLW Agents

Este projeto foi desenvolvido durante o evento NLW da Rocketseat.

## Tecnologias e Bibliotecas Utilizadas

- **Monorepo:** Gerenciado com [pnpm workspaces](https://pnpm.io/workspaces)
- **Backend:**
  - [Fastify](https://fastify.dev/) — framework web rápido e eficiente
  - [Drizzle ORM](https://orm.drizzle.team/) — ORM para TypeScript
  - [PostgreSQL](https://www.postgresql.org/) com [pgvector](https://github.com/pgvector/pgvector) — banco de dados relacional com suporte a vetores
  - [Zod](https://zod.dev/) — validação de esquemas
- **Frontend:**
  - [React 19](https://react.dev/) — biblioteca para construção de interfaces
  - [Vite](https://vitejs.dev/) — bundler e dev server
  - [Tailwind CSS](https://tailwindcss.com/) — utilitários de CSS
  - [TanStack Query](https://tanstack.com/query) — gerenciamento de dados assíncronos
  - [Radix UI](https://www.radix-ui.com/) — componentes acessíveis
  - [React Router](https://reactrouter.com/) — roteamento

## Padrões de Projeto

- **TypeScript** em todo o projeto
- **Arquitetura monorepo** (apps/server e apps/web)
- **Validação de ambiente** com Zod
- **Migrations** e **seed** com Drizzle ORM
- **Componentização** e uso de hooks no frontend
- **Type Provider** para validação de schemas no Fastify

## Setup e Configuração

### Pré-requisitos

- Node.js >= 22
- pnpm >= 10
- Docker e Docker Compose

### Instalação

1. Clone o repositório:

```bash
git clone <repository-url>
cd nlw-agents
```

1. Instale as dependências:

```bash
pnpm install
```

1. Inicie o banco de dados:

```bash
docker-compose up -d
```

1. Configure as variáveis de ambiente:

```bash
# No diretório apps/server, crie um arquivo .env
cp apps/server/.env.example apps/server/.env
```

1. Execute as migrations do banco:

```bash
pnpm db:migrate
```

1. Execute o seed (opcional):

```bash
pnpm db:seed
```

### Executando o projeto

#### Desenvolvimento (ambos os serviços)

```bash
pnpm dev
```

#### Apenas o servidor

```bash
pnpm dev:server
```

#### Apenas o frontend

```bash
pnpm dev:web
```

### Scripts disponíveis

- `pnpm dev` — inicia servidor e frontend em modo desenvolvimento
- `pnpm dev:server` — inicia apenas o servidor
- `pnpm dev:web` — inicia apenas o frontend
- `pnpm db:migrate` — executa migrations do banco
- `pnpm db:seed` — popula o banco com dados de exemplo
- `pnpm lint` — executa o linter
- `pnpm format` — formata o código

## Estrutura do Projeto

```text
├── apps/
│   ├── server/          # API backend (Fastify)
│   └── web/             # Frontend (React + Vite)
├── docker/              # Configurações do Docker
└── docker-compose.yaml  # Orquestração dos serviços
```
