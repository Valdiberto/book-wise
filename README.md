# 📚 BookWise

Uma aplicação moderna para descoberta, avaliação e gestão de livros lidos. Construída com Next.js, TypeScript, Tailwind CSS e tecnologias modernas, o BookWise oferece uma experiência intuitiva e social para os amantes da leitura.

## 🚀 Demonstração

[Confira a versão em produção](https://book-wise-theta.vercel.app/)

## ✨ Funcionalidades

✅ Autenticação via Google or GitHub (OAuth)

✅ Descoberta de livros mais bem avaliados

✅ Avaliações com nota e descrição

✅ Perfil do usuário com histórico de leituras

✅ Página de detalhes com avaliação média e resenhas

✅ Layout responsivo e acessível

## 📸 Capturas de Tela

![SignIn](public/image.png)

![Home](public/image2.png)

![BookDetails](public/image-1.png)

## 🛠️ Tecnologias Utilizadas

- **Next.js (App Router)**
- **TypeScript**
- **Tailwind CSS**
- **React Hook Form**
- **Zod**
- **Radix UI**
- **ShadCN/UI**
- **NextAuth.js (com Google OAuth)**
- **Prisma ORM**
- **PostgreSQL**
- **Vercel (para deploy)**

## 📦 Como Começar

Siga os passos abaixo para rodar o projeto localmente:

1. Clone o repositório:
   ```bash
   git clone https://github.com/Valdiberto/book-wise.git

   ```
2. Navegue até a pasta do projeto:

   ```bash
   cd book-wise

   ```

3. Instale as dependências:

   ```bash
   npm install

   ```

4. Configure as variáveis de ambiente:

- Crie um arquivo `.env.local` com base no `.env.example`
- Preencha as variáveis como `DATABASE_URL` e credenciais do Google OAuth

  Exemplo:

  ```ini
  DATABASE_URL=postgresql://docker:docker@localhost:5432/bookwise
  GOOGLE_CLIENT_ID=...
  GOOGLE_CLIENT_SECRET=...
  NEXTAUTH_URL=http://localhost:3000
  ```

5. Rode as migrações e seeds:

   ```bash
   npx prisma migrate dev
   npm run seed

   ```

6. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

Acesse no navegador: http://localhost:3000

## 🧪 Testes

Este projeto ainda não possui testes automatizados. Sinta-se à vontade para contribuir com melhorias ou cobertura de testes.

## 📁 Implantação

O projeto está pronto para deploy na Vercel. Basta conectar seu repositório e implantar — nenhuma configuração adicional necessária.

## 📄 Licença

Distribuído sob a licença MIT. Veja LICENSE para mais detalhes.

## 🙋 Autor

Feito com 📚 por Valdiberto
