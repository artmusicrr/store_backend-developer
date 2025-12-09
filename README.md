# store-backend

[![Linguagem principal](https://img.shields.io/github/languages/top/artmusicrr/store_backend-developer)](https://github.com/artmusicrr/store_backend-developer)
[![Tamanho do repositório](https://img.shields.io/github/repo-size/artmusicrr/store_backend-developer)](https://github.com/artmusicrr/store_backend-developer)
[![Branch master](https://img.shields.io/badge/branch-master-blue)](https://github.com/artmusicrr/store_backend-developer/tree/master)
[![License](https://img.shields.io/badge/license-UNLICENSED-lightgrey)](https://github.com/artmusicrr/store_backend-developer)

Descrição
---------
Backend em Node.js + NestJS escrito em TypeScript para uma aplicação de loja (store). Fornece APIs REST (e possivelmente endpoints protegidos por JWT) para autenticação, gerenciamento de usuários, produtos, pedidos, etc. Projetado para rodar localmente com Node.js e também com Docker/Docker Compose.

Principais tecnologias
----------------------
- Node.js / TypeScript
- NestJS
- PostgreSQL (pg)
- Autenticação: JWT + Passport
- Testes: Jest + Supertest
- Docker / Docker Compose
- ESLint / Prettier

Requisitos
----------
- Node.js 18+ (recomendado)
- npm 8+
- Docker e Docker Compose (opcional, para execução em contêiner)
- PostgreSQL (se rodar sem Docker)

Instalação (modo desenvolvimento)
--------------------------------
1. Clone o repositório:
   ```bash
   git clone https://github.com/artmusicrr/store_backend-developer.git
   cd store_backend_developer
   ```

2. Instale dependências:
   ```bash
   npm install
   ```

3. Copie e ajuste o arquivo de ambiente (.env):
   ```bash
   cp .env.example .env
   # editar .env conforme necessário
   ```

Exemplo de arquivo .env
-----------------------
Abaixo um exemplo genérico. Ajuste de acordo com a implementação real (nomes de variáveis podem variar no código):

```env
# Ambiente
NODE_ENV=development
PORT=3000

# Banco de dados Postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=store_db

# JWT
JWT_SECRET=troque_esta_chave_por_uma_segura
JWT_EXPIRES_IN=3600s

# Outros (ex.: configuração do TypeORM/ORM que estiver usando)
# TYPEORM_SYNCHRONIZE=true
# TYPEORM_LOGGING=false
```

Observação: se houver um arquivo `.env` já no repositório, verifique-o e não versionar credenciais sensíveis. Crie um `.env.local` ou utilize variáveis de ambiente no ambiente de deploy.

Scripts úteis (npm)
-------------------
- npm run start:dev — iniciar em modo desenvolvimento (watch)
- npm run start — iniciar normalmente (NestJS)
- npm run start:prod — iniciar build em produção (executa dist/main)
- npm run build — compilar TypeScript (nest build)
- npm run lint — rodar e corrigir ESLint
- npm run format — formatar com Prettier
- npm test — executar testes unitários
- npm run test:e2e — executar testes end-to-end
- npm run test:cov — cobertura de testes

Executando com Docker (exemplo)
------------------------------
Se o projeto já inclui `Dockerfile` e `docker-compose.yml`, pode iniciar com:

```bash
docker-compose up --build
```

Isso deve subir o serviço do backend e possivelmente um container do PostgreSQL (depende do docker-compose.yml presente). Ajuste variáveis de ambiente no `docker-compose.yml` ou em um arquivo `.env` referenciado.

Estrutura típica do projeto
---------------------------
- src/                - código fonte em TypeScript (controllers, modules, services, entities, etc.)
- test/               - testes e2e (Jest)
- Dockerfile
- docker-compose.yml
- package.json
- tsconfig.json
- .eslintrc.js, .prettierrc
- assets/             - imagens/ativos estáticos (se aplicável)

Autenticação
------------
Dependências indicam uso de Passport com JWT e estratégia local:
- login/registro com `passport-local` e proteção de rotas com `passport-jwt`.
- JWT é gerado com `@nestjs/jwt` / jsonwebtoken.
- Senhas protegidas com `bcrypt`.

Observação: verifique a configuração em `src` (módulo de auth) para confirmar nomes exatos das variáveis de ambiente exigidas e rotas expostas.

Testes
------
- Unitários e integração via Jest.
- End-to-end via `npm run test:e2e`.
- Cobertura: `npm run test:cov`.

Boas práticas e recomendações
----------------------------
- Não versionar arquivos `.env` com segredos.
- Trocar `JWT_SECRET` para um valor forte em produção.
- Se quiser tornar o repositório público/open-source, defina uma licença (ex.: MIT).
- Adicionar workflow CI (GitHub Actions) para rodar lint, tests e build automaticamente.
- Documentar os endpoints principais (ex.: via OpenAPI/Swagger). O NestJS tem suporte a Swagger — recomendo adicionar se ainda não há.

Como contribuir
---------------
1. Fork do repositório.
2. Crie uma branch com um nome descritivo: `feature/minha-melhora` ou `fix/bug-x`.
3. Faça commits pequenos e atômicos.
4. Execute testes localmente antes de abrir PR.
5. Abra um Pull Request descrevendo as mudanças e testes realizados.

Licença
-------
O package.json indica `UNLICENSED`. Isso significa que o projeto está marcado como privado/não licenciado. Se desejar permitir contribuições externas, escolha e aplique uma licença (ex.: MIT).

Contato
-------
Para dúvidas ou se precisar que eu gere o README.md no repositório (PR/commit), me diga como prefere: substituir o README atual ou criar uma versão aprimorada em outra branch.

---
Observação final: este README foi gerado com base nas informações encontradas no repositório (package.json e arquivos de configuração). Para documentar endpoints, variáveis de ambiente exatas e exemplos de uso de API, analisei os arquivos em src/ e posso complementar o README com rotas e exemplos específicos se desejar.
