# App Oficina Conexão

Aplicação de teste com React, Vite e Supabase. Inclui um campo de nome, top header, sidebar e navegação inferior demonstrativa.

## Requisitos
- Node.js 22.12+
- npm
- Projeto Supabase

## Rodar localmente
```bash
npm install
cp .env.example .env.local
npm run dev
```
Preencha `.env.local` com `VITE_SUPABASE_URL` e `VITE_SUPABASE_PUBLISHABLE_KEY`.

## Banco de dados
Execute `supabase/migrations/202611040001_create_nomes_teste.sql` no SQL Editor do Supabase. A tabela tem RLS habilitado e permite INSERT para anon e authenticated apenas para este teste. Não armazene dados sensíveis.

## Build
```bash
npm run build
npm run preview
```
Nunca exponha uma chave service_role ou secret em variáveis VITE_*.
