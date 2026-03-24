# ⚙️ JCR Produtos Industriais: Modernização e Migração para Nuvem

### Projeto de Extensão - 5º Semestre ADS (UNINOVE)

## 🚀 Visão Geral

Este projeto documenta e executa a modernização da plataforma digital da **JCR Importação de Produtos Industriais**. O sistema original, baseado em páginas estáticas de baixo desempenho, foi refatorado para uma arquitetura Cloud escalável, focando em performance (Lighthouse > 85), SEO e facilidade de gestão de catálogo.

---

## 👥 Squad JCR (Grupo 6)

* **Luis Gustavo Cassioli Rodrigues**
* **Eduardo de Castro Freitas**
* **Samuel de Lucas Silva**
* **Paulo Nlandu Onde Mavuba**
* **Carlos Henrique Gomes Santos**
* **Lucas Nunes**

---

## 🏗️ Arquitetura e Stack Tecnológica

A solução foi construída utilizando tecnologias de ponta para garantir um ambiente robusto e de fácil manutenção:

* **Frontend**: [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) + [Vite](https://vitejs.dev/) (Tipagem forte e HMR ultra-rápido) [cite: 2026-03-11]
* **Backend (BaaS)**: [Supabase](https://supabase.com/) (PostgreSQL, Row Level Security e Realtime) [cite: 2026-03-04, 2026-03-11]
* **Infraestrutura**: [Vercel](https://vercel.com/) (Hospedagem Cloud com CI/CD via GitHub)
* **Engenharia Reversa**: [HTTrack](https://www.httrack.com/) para extração do sistema legado

---

## 📊 Metas de Engenharia

Conforme definido na documentação ABNT:

1. **Performance**: Tempo de carregamento inferior a 2,5 segundos.
2. **SEO**: Estrutura semântica para indexação de produtos industriais.
3. **Gestão**: Implementação de área administrativa protegida para CRUD de produtos.

---

## 🔗 Links do Projeto

* **Site do Cliente (Legado):** [jcrprodutosindustriais.com.br](https://www.jcrprodutosindustriais.com.br/)
* **Produção (Vercel):** *[Inserir Link após Deploy]*
* **Apresentação:** *[Inserir Link do Vídeo]*

---

## 📁 Estrutura de Pastas

* `/src`: Código-fonte da aplicação React/TS.
* `/public`: Assets estáticos e imagens otimizadas.
* `/legacy`: Arquivos originais mapeados para engenharia reversa.

---

## 🚀 Como rodar o projeto localmente

```bash
# Instalar dependências
npm install

# Rodar em modo desenvolvimento
npm run dev

# Gerar build de produção
npm run build
