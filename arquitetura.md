# 🏗️ Arquitetura do Sistema - JCR Industrial

Esta é a representação visual da arquitetura Cloud Native desenvolvida para o projeto.

```mermaid
graph TD
    %% Cores e Estilos
    classDef frontend fill:#0d2240,stroke:#fff,stroke-width:2px,color:#fff;
    classDef backend fill:#1da851,stroke:#fff,stroke-width:2px,color:#fff;
    classDef hosting fill:#000,stroke:#fff,stroke-width:2px,color:#fff;
    classDef secure fill:#c41520,stroke:#fff,stroke-width:2px,color:#fff;

    %% Atores
    UserP[Cliente B2B]
    UserA[Mestre / Staff JCR]

    %% Frontend
    subgraph Frontend [Frontend (React + Vite + TypeScript)]
        UI[Interface UI/UX]
        Router[React Router]
        State[Gerenciamento de Estado]
    end

    %% Backend (Supabase)
    subgraph Backend [BaaS - Supabase]
        Auth[Supabase Auth]
        DB[(PostgreSQL)]
        RLS{Row Level Security}
        Storage[Cloud Storage]
        RPC[Funções SQL Seguras]
    end

    %% Hospedagem e CI/CD
    subgraph DevOps [Deploy & CI/CD]
        GitHub[Repositório GitHub]
        Vercel[Vercel Serverless Edge]
    end

    %% Fluxo de Acesso
    UserP -->|Acessa Catálogo| Vercel
    UserP -->|Envia Lead| UI
    UserA -->|Painel Operacional| UI

    %% Fluxo no App
    Vercel --> UI
    UI --> Router
    Router --> State
    State -->|API REST| Backend

    %% Fluxo de Segurança no Backend
    Backend -.-> Auth
    Auth --> RLS
    RLS --> DB
    RLS --> Storage
    State -->|Upload de Imagens| Storage

    %% Defesas
    DB --> RPC
    RPC -.->|search_path seguro| DB

    %% Fluxo de Code
    GitHub -->|Push/Webhook automatizado| Vercel

    %% Aplicando Estilos
    class UI,Router,State frontend;
    class Auth,DB,Storage,RPC backend;
    class Vercel,GitHub hosting;
    class RLS secure;
```

---

### 🛡️ Camadas da Arquitetura

1. **Camada de Apresentação (Frontend)**: Construída em React e hospedada globalmente pela infraestrutura Edge da **Vercel** para carregamento quase instantâneo.
2. **Pipelines de CI/CD (DevOps)**: Integração contínua entre o **GitHub** e a Vercel. Qualquer alteração no código atualiza imediatamente a produção em nuvem.
3. **Serviços de Backend (BaaS)**: O **Supabase** atua como provedor, oferecendo o banco **PostgreSQL**, controle de sessões (**Auth**) e hospedagem de imagens (**Storage**).
4. **Camada de Segurança (Row Level Security)**: Todas as solicitações passam por uma blindagem no banco de dados. Um usuário tentar manipular dados sem autorização falhará não por bloqueio no frontend, mas porque o servidor recusa a transação criptograficamente.
