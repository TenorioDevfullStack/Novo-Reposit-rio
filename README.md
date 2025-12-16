# Portfólio — Leandro Tenório

Portfólio pessoal construído com Next.js (App Router) para apresentar experiência, projetos, stack e contato.

## Stack

- Next.js 16 + React 19 + TypeScript
- Tailwind CSS + Radix UI
- `next-themes` (tema claro/escuro)
- Nodemailer (`/api/contact`) + Zod/React Hook Form
- Vercel Analytics

## Funcionalidades

- Seções: **Início**, **Sobre**, **Experiência**, **Projetos**, **Tecnologias**, **Contato**
- Projetos com **modal**, **carrossel** e **zoom** nas imagens (setas `←/→` e `Esc`)
- Menu de comandos `Ctrl/Cmd + K`
- Formulário de contato via SMTP

## Como rodar localmente

1) Instale as dependências:

```bash
npm install
```

2) Configure as variáveis de ambiente:

```bash
cp .env.example .env.local
```

Edite o arquivo `.env.local` com seus dados de SMTP (veja `.env.example`).

3) Rode o projeto:

```bash
npm run dev
```

Abra `http://localhost:3000`.

## Scripts

- `npm run dev` — ambiente de desenvolvimento
- `npm run build` — build de produção
- `npm run start` — inicia o build
- `npm run lint` — lint (requer `eslint` instalado; se necessário: `npm i -D eslint eslint-config-next`)

## Deploy

Recomendado: **Vercel**.

- Configure as mesmas variáveis do `.env.example` no painel da Vercel.
- Após publicar, o endpoint `POST /api/contact` envia e-mails via SMTP.

## Onde editar conteúdo

- Página/ordem das seções: `app/page.tsx`
- Texto “Sobre” e “Formação”: `components/about-section.tsx`
- Experiência: `components/experience-section.tsx`
- Projetos (cards, links e imagens): `components/projects-section.tsx`
- Ícones/manifest: `app/layout.tsx` e `public/logos/`

## Assets

- Imagens de projetos: `public/imagens/`
  - ObraGest: `public/imagens/obragest/`
  - Landing Page (Raquel): `public/imagens/raquel/`
- Ícones/favicons: `public/logos/`

