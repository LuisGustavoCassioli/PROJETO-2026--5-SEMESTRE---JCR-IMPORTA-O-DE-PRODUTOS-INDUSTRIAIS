# ⚙️ JCR Produtos Industriais: Modernização e Gestão Cloud

## Projeto de Extensão - 5º Semestre ADS (UNINOVE)

## 🚀 Visão Geral

Este projeto documenta a modernização da plataforma digital da **JCR Importação de Produtos Industriais**. O sistema foi refatorado de uma estrutura legada para uma arquitetura Cloud moderna, focando em alta performance, SEO industrial e uma gestão de catálogo robusta e simplificada.

---

## 👥 Squad JCR (Grupo 6)

- **Luis Gustavo Cassioli Rodrigues**
- **Eduardo de Castro Freitas**
- **Samuel de Lucas Silva**
- **Paulo Nlandu Onde Mavuba**
- **Carlos Henrique Gomes Santos**
- **Lucas Nunes**

---

## 🏗️ Arquitetura e Stack Tecnológica

A solução utiliza tecnologias de última geração para garantir escalabilidade e segurança:

- **Frontend**: [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) + [Vite](https://vitejs.dev/)
- **Backend (BaaS)**: [Supabase](https://supabase.com/) (PostgreSQL + Auth + Storage)
- **Hospedagem**: [Vercel](https://vercel.com/) (Deploy contínuo via GitHub)
- **Estilização**: CSS Moderno (Vanilla CSS) com foco em Glassmorphism

---

## � Gestão Industrial (Área Restrita)

O sistema possui um painel administrativo protegido e obscurecido para a equipe:

- **Acesso de Login:** `/acesso-interno`
- **Painel Operacional:** `/gestao-operacional`

### Funcionalidades Principais

- **Catálogo Dinâmico**: CRUD completo de produtos (Cadastrar, Listar, Editar, Excluir).
- **Galeria Inteligente**: Upload de múltiplas imagens por produto com armazenamento em nuvem.
- **Hierarquia de Acesso**: Separação entre contas **Mestre (Patrão)** e **Staff (Equipe)**.
- **Segurança Industrial**: Login simplificado por códigos (ex: `nome+jcr`) com mapeamento seguro em background.

---

## 🚀 Como Rodar o Projeto Localmente

```bash
# 1. Instalar dependências
npm install

# 2. Configurar variáveis de ambiente
# Crie um arquivo .env na raiz com as chaves do Supabase:
# VITE_SUPABASE_URL=seu_url
# VITE_SUPABASE_ANON_KEY=sua_chave

# 3. Rodar em modo desenvolvimento
npm run dev

# 4. Gerar build de produção
npm run build
```

---

## 🔗 Links do Projeto

- **Produção (Vercel):** [jcr-importacao-de-produtos-industriais.vercel.app](https://jcr-importacao-de-produtos-industriais.vercel.app)
- **Repositório (GitHub):** [Acessar Código-Fonte](https://github.com/LuisGustavoCassioli/PROJETO-2026--5-SEMESTRE---JCR-IMPORTA-O-DE-PRODUTOS-INDUSTRIAIS)
- **Manual de Operação:** [INSTRUCOES.md](./INSTRUCOES.md) (Guia para a equipe de 7 pessoas)

---

## 📁 Estrutura de Pastas

- `/src`: Código-fonte (Componentes, Páginas, Hooks e Serviços).
- `/public`: Assets estáticos e ícones.
- `/github/workflows`: Automação de manutenção do banco de dados.

---
*Squad JCR - 2026*
