# Doce Essência - Admin Panel

Bem-vindo ao repositório do **Painel Administrativo da Doce Essência**, um projeto desenvolvido para oferecer funcionalidades avançadas para gerenciar os produtos da loja. Além das funcionalidades disponíveis para os clientes, o painel administrativo inclui ferramentas exclusivas para administração e controle.

## 🚀 Tecnologias Utilizadas

Este projeto foi construído com as seguintes tecnologias:

- **Next.js** (v15.1.5): Framework para criação de aplicações web modernas.
- **React** (v19.0.0): Biblioteca para construção de interfaces de usuário.
- **Tailwind CSS** (v3.4.1): Framework de utilitários CSS para estilização rápida e eficiente.
- **Prisma** (v6.2.1): ORM para interagir com o banco de dados de forma simplificada.
- **Axios** (v1.7.9): Biblioteca para requisições HTTP.

## 📋 Funcionalidades 

- **Listagem de Produtos**: Visualize todos os produtos disponíveis na loja.
- **Detalhes do Produto**: Acesse informações detalhadas sobre um produto específico.
- **Pesquisa Avançada**: Encontre produtos usando filtros como nome, categoria ou faixa de preço.
- **Listagem de Produtos em Promoção**: Visualize todos os produtos que estão com descontos.
- **Gerenciamento de Produtos**:
  - **Criar Produto**: Adicione novos produtos ao catálogo.
  - **Editar Produto**: Atualize informações de produtos existentes.
  - **Excluir Produto**: Remova produtos do catálogo.

## 📦 Instalação e Execução

Siga as etapas abaixo para rodar o projeto localmente:

### Pré-requisitos

- Node.js (v16 ou superior)
- NPM ou Yarn

### Passos

1. Clone o repositório:
   ```bash
   git clone <URL_PRIVADA>
   ```

2. Acesse o diretório do projeto:
   ```bash
   cd doce-essencia-admin
   ```

3. Instale as dependências:
   ```bash
   npm install
   # ou
   yarn install
   ```

4. Configure o banco de dados com Prisma:
   ```bash
   npx prisma generate
   ```

5. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

6. Acesse a aplicação no navegador:
   ```
   http://localhost:3000
   ```

## 📂 Estrutura de Pastas

```
.
├── api/            # Rotas para consultar os produtos
├── components/     # Componentes reutilizáveis
├── lib/            # Configurações do Prisma
├── prisma/         # Esquema do banco de dados
└── public/         # Arquivos públicos (imagens, ícones, etc.)
```

## 🛠️ Scripts Disponíveis

- **`npm run dev`**: Inicia o servidor de desenvolvimento.
- **`npm run build`**: Cria uma versão de produção.
- **`npm run start`**: Inicia a aplicação em modo de produção.
- **`npm run lint`**: Executa o linting para manter a qualidade do código.
