# APP

Este projeto é uma API REST construída com Node.js, Fastify e Prisma.

# Tecnologias utilizadas

- **🟢 Node.js**: Ambiente de execução para JavaScript.
- **⚡ Fastify**: Framework web para Node.js focado em performance.
- **📦 PostgreSQL**: Banco de dados relacional robusto e eficiente.

# Instalação

- Para configurar e executar o projeto localmente, siga os passos abaixo:

1. É necessário estar utilizando a versão mais atual do nodeJS para funcionar o dotenv nativo, caso esteja utilizando nvm:

   ```bash
   nvm install lts
   ```

2. Clone este repositório:
   ```bash
   git clone https://github.com/lezisilva163/decision-backend.git
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Rode o comando com o docker aberto para subir o banco de dados:
   ```bash
   docker compose up
   ```
5. Rode o comando do prisma para criar a tabela de usuários:
   ```bash
   npm run migrate:dev
   ```
6. Rode o projeto:
   ```bash
   npm run dev
   ```
