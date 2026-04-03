# ⚙️ JCR Produtos Industriais: Modernização e Gestão Cloud

## Projeto de Extensão - 5º Semestre ADS (UNINOVE)

## 🚀 Visão Geral

Este projeto tem como objetivo a modernização da plataforma digital da **JCR Importação de Produtos Industriais**. O sistema foi refatorado de uma estrutura legada para uma arquitetura Cloud moderna, focando em alta performance, SEO otimizado para produtos industriais e uma gestão de catálogo robusta e simplificada.

---

## 🎯 Problema

O sistema anterior apresentava:

- Baixo desempenho
- Dificuldade de manutenção
- Ausência de painel administrativo
- Estrutura não otimizada para SEO
  
---

## 👥 Squad JCR (Grupo 6)

- **Eduardo de Castro Freitas - 3024105801**
- **Carlos Henrique Gomes Santos - 3026106005**
- **Luis Gustavo Cassioli Rodrigues - 3023204201** (Líder)
- **Lucas Nunes - 3026105890**
- **Samuel de Lucas Silva - 3024105321**
- **Paulo Nlandu Onde Mavuba - 3026106430**
  
---

## 🏗️ Arquitetura e Stack Tecnológica

A solução utiliza tecnologias modernas para garantir escalabilidade, segurança e alta performance:

- **Frontend**: [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) + [Vite](https://vitejs.dev/)
- **Backend (BaaS)**: [Supabase](https://supabase.com/) (PostgreSQL + Auth + Storage)
- **Hospedagem**: Vercel (CI/CD com integração ao GitHub)
- **Estilização**: CSS Moderno (Vanilla CSS) com foco em Glassmorphism

---

## 📊 Metas de Engenharia

- **Performance:** Carregamento inferior a 2,5 segundos  
- **SEO:** Estrutura otimizada para indexação de produtos  
- **Gestão:** Sistema administrativo completo para catálogo

---

## 🔐 Gestão Industrial (Área Restrita)

O sistema possui um painel administrativo protegido e de acesso restrito:

- **Acesso de Login:** `/acesso-interno`
- **Painel Operacional:** `/gestao-operacional`

### Funcionalidades Principais

- **Catálogo Dinâmico**: CRUD completo de produtos (Cadastrar, Listar, Editar, Excluir).
- **Galeria Inteligente**: Upload de múltiplas imagens por produto com armazenamento em nuvem.
- **Hierarquia de Acesso**: Separação entre contas **Mestre (Patrão)** e **Staff (Equipe)**.
- **Autenticação Segura**: Sistema baseado em Supabase Auth com controle de acesso por perfil.

---

## 🚀 Execução Local

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

- **💻 Site em Produção (Cloud):** [jcr-importacao-de-produtos-industriais.vercel.app](https://jcr-importacao-de-produtos-industriais.vercel.app)
- **📹 Vídeo de Apresentação (Mín. 5 min):** [COLAR LINK DO YOUTUBE AQUI] 👈
- **📂 Repositório (GitHub):** [Acessar Código-Fonte](https://github.com/LuisGustavoCassioli/PROJETO-2026--5-SEMESTRE---JCR-IMPORTA-O-DE-PRODUTOS-INDUSTRIAIS)
- **📄 Documentação Oficial:** [JCR_UNINOVE_ABNT.pdf](./public/JCR_UNINOVE_ABNT.pdf) (Trabalho Acadêmico)
- **📖 Manual de Operação:** [INSTRUCOES.md](./INSTRUCOES.md) (Guia para a equipe)

---

## 📁 Estrutura de Pastas

- `/src`: Código-fonte (Componentes, Páginas, Hooks e Serviços).
- `/public`: Assets estáticos e ícones.
- `.github/workflows`: Automação de deploy e manutenção ao banco de dados.

---

Squad JCR - 2026
