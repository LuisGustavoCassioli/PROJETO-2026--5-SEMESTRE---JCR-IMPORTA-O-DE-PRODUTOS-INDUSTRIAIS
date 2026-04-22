# ⚙️ JCR Produtos Industriais — Modernização e Gestão Cloud

> **Projeto de Extensão — 5º Semestre ADS — UNINOVE 2026**

---

## � Links de Avaliação

| Recurso | Link |
| --- | --- |
| 🌐 **Sistema em Produção** | [jcr-importacao-de-produtos-industriais.vercel.app](https://jcr-importacao-de-produtos-industriais.vercel.app) |
| 📹 **Vídeo de Apresentação** | [Assistir no YouTube](https://youtu.be/_B5MDMZN5bc) |
| 📂 **Repositório GitHub** | [LuisGustavoCassioli/PROJETO-2026...](https://github.com/LuisGustavoCassioli/PROJETO-2026--5-SEMESTRE---JCR-IMPORTA-O-DE-PRODUTOS-INDUSTRIAIS) |
| 📄 **Documentação Acadêmica** | [DOCUMENTAÇÃO PROJETO JCR.pdf](./public/DOCUMENTA%C3%87%C3%83O%20PROJETO%20JCR.pdf) |

---

## 🎯 O Problema e a Solução

A **JCR Importação de Produtos Industriais** operava com um site estático legado, sem painel de gestão, difícil de atualizar e sem suporte mobile. O projeto de extensão entregou uma plataforma cloud moderna e completa.

---

## 👥 Squad JCR (Grupo 6)

| Nome | RA |
| --- | --- |
| Eduardo de Castro Freitas | 3024105801 |
| Carlos Henrique Gomes Santos | 3026106005 |
| **Luis Gustavo Cassioli Rodrigues** *(Líder)* | 3023204201 |
| Lucas Nunes | 3026105890 |
| Samuel de Lucas Silva | 3024105321 |
| Paulo Nlandu Onde Mavuba | 3026106430 |

---

## 🏗️ Stack Tecnológica

| Camada | Tecnologia |
| --- | --- |
| **Frontend** | React 18 + TypeScript + Vite |
| **Backend (BaaS)** | Supabase (PostgreSQL + Auth + Storage) |
| **Hospedagem** | Vercel (CI/CD automático via GitHub) |
| **Estilização** | CSS Moderno + Design System próprio |

---

## ✅ MVP — Funcionalidades Entregues

### 🌐 Sistema Público (Cliente)

- Catálogo de produtos com busca em tempo real e filtros por categoria
- Cards de produto premium com galeria de imagens
- Formulário de lead integrado ao banco de dados (Supabase)
- Botão "Solicitar Orçamento" via WhatsApp (conversão B2B)
- Design 100% responsivo (desktop, tablet e mobile)

### 🔐 Sistema Administrativo (Restrito à Equipe JCR)

- **Acesso:** `/acesso-interno` (Login Industrial: formato `nomejcr`)
- **CRUD completo** de produtos (Cadastrar, Visualizar, Editar, Excluir)
- **Upload multi-imagem** com armazenamento em Supabase Storage
- **Gestão de Leads**: Visualização e status de contatos recebidos
- **Hierarquia de Acesso**: Perfis **Mestre (admin)** e **Staff (equipe)**
- **Whitelist de usuários**: Apenas e-mails autorizados podem se cadastrar

### 🛡️ Segurança (Pente Fino)

- Políticas RLS (Row Level Security) por perfil, validadas no servidor
- Funções SQL nativas `is_admin()` e `is_staff()` — sem dependência de metadados editáveis pelo usuário
- `search_path` fixo em funções críticas (prevenção de ataques de injeção de contexto)
- Zero segredos hardcoded — 100% via variáveis de ambiente

---

## 🚀 Como Executar Localmente

```bash
# 1. Clonar o repositório
git clone https://github.com/LuisGustavoCassioli/PROJETO-2026--5-SEMESTRE---JCR-IMPORTA-O-DE-PRODUTOS-INDUSTRIAIS.git

# 2. Instalar dependências
npm install

# 3. Configurar variáveis de ambiente
# Crie um arquivo .env na raiz:
# VITE_SUPABASE_URL=sua_url_aqui
# VITE_SUPABASE_ANON_KEY=sua_chave_aqui

# 4. Rodar em modo desenvolvimento
npm run dev

# 5. Gerar build de produção
npm run build
```

---

## � Estrutura do Repositório

```bash
/src
  /components   → Navbar, Footer, TopBar, ContactForm
  /pages        → HomePage, ProdutosPage, SobreNosPage, AdminDashboard, LoginPage
  /lib          → Cliente Supabase
  /styles       → Design System e estilos compartilhados
/public         → Assets estáticos, logo, imagens
```

---

## Squad JCR — UNINOVE 2026
