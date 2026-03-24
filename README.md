# ⚙️ JCR Produtos Industriais: Modernização e Migração para Nuvem

## Projeto de Extensão - 5º Semestre ADS (UNINOVE)

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

* **Frontend**: [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) + [Vite](https://vitejs.dev/) (Tipagem forte e HMR ultra-rápido)
* **Backend (BaaS)**: [Supabase](https://supabase.com/) (PostgreSQL, Row Level Security e Realtime)
* **Infraestrutura**: [Vercel](https://vercel.com/) (Hospedagem Cloud com CI/CD via GitHub)
* **Engenharia Reversa**: [HTTrack](https://www.httrack.com/) para extração do sistema legado

---

## 📊 Metas de Engenharia

Conforme definido na documentação ABNT:

1. **Performance**: Tempo de carregamento inferior a 2,5 segundos.
2. **SEO**: Estrutura semântica para indexação de produtos industriais.
3. **Gestão**: Implementação de área administrativa protegida para CRUD de produtos.

---

## � Área Administrativa

O sistema possui uma área restrita para gestão de produtos:

* **URL:** `/login` -> `/admin`
* **Funcionalidades:** CRUD completo (Criar, Listar, Editar, Excluir) de produtos industriais.
* **Segurança:** Proteção via Supabase Auth e Componente de Rota Protegida.

---

## 🛠️ Configuração do Banco de Dados (Supabase)

Para inicializar o banco de dados, execute o script SQL contido na pasta `brain` do projeto (ou no Supabase Dashboard) que cria a tabela `products` e configura as políticas de RLS (Row Level Security).

---

## 🚀 Como rodar o projeto localmente

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
# Crie um arquivo .env na raiz com:
# VITE_SUPABASE_URL=seu_url
# VITE_SUPABASE_ANON_KEY=sua_chave

# Rodar em modo desenvolvimento
npm run dev

# Gerar build de produção
npm run build
```

---

## �🔗 Links do Projeto

* **Site do Cliente (Legado):** [jcrprodutosindustriais.com.br](https://www.jcrprodutosindustriais.com.br/)
* **Produção (Vercel):** *[Inserir Link após Deploy]*
* **Documentação PDF:** *[Inserir Link]*
* **Apresentação:** *[Inserir Link do Vídeo]*

---

## 📁 Estrutura de Pastas

* `/src`: Código-fonte da aplicação React/TS.
* `/public`: Assets estáticos e imagens otimizadas.
* `/legacy`: Arquivos originais mapeados para engenharia reversa.
