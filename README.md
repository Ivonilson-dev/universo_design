# 1. Criar o projeto Next.js com TypeScript e App Router
npx create-next-app@latest universo-design --typescript --tailwind --app --no-eslint

# 2. Navegar para a pasta do projeto
cd universo-design

# 3. Instalar dependências do banco de dados e upload de arquivos
npm install mysql2
npm install --save-dev @types/node
npm install next-auth  # Para autenticação do painel admin (opcional, mas recomendado)

# 4. Instalar dependência para lidar com uploads de arquivos
npm install formidable @types/formidable

# Banco de Dados MySQL
DB_HOST=localhost
DB_PORT=3306
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=universo_design

# Para produção, use variáveis separadas (ex: DB_HOST_PROD) [citation:3]
NODE_ENV=development

# Chave secreta para sessões (gerar via: `openssl rand -base64 32`)
NEXTAUTH_SECRET=sua_chave_secreta_aqui
NEXTAUTH_URL=http://localhost:3000

universo-design/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   └── [...nextauth]/
│   │   │       └── route.ts              # Rotas de autenticação
│   │   ├── upload/
│   │   │   └── route.ts                  # Endpoint para upload de imagens
│   │   ├── sections/
│   │   │   └── route.ts                  # CRUD para seções da página
│   │   └── images/
│   │       └── route.ts                  # CRUD para imagens
│   ├── admin/
│   │   ├── page.tsx                      # Página do painel administrativo
│   │   └── layout.tsx                    # Layout do admin
│   ├── globals.css                       # Estilos globais
│   ├── layout.tsx                        # Layout principal (raiz)
│   └── page.tsx                          # Página inicial (Landing Page)
├── components/
│   ├── ui/                               # Componentes de UI reutilizáveis [citation:5]
│   │   ├── Button.tsx
│   │   └── Card.tsx
│   ├── sections/                         # Componentes de cada seção da página
│   │   ├── HeroSection.tsx
│   │   ├── ServicesSection.tsx
│   │   └── ContactSection.tsx
│   └── admin/                            # Componentes do painel admin
│       └── ImageUpload.tsx
├── lib/
│   ├── db.ts                             # Conexão com o banco de dados [citation:3]
│   └── utils.ts                          # Funções utilitárias
├── public/
│   └── uploads/                          # Imagens enviadas via painel admin
│       ├── banners/
│       ├── cards/
│       └── ...
├── types/
│   └── index.ts                          # Tipos TypeScript
└── next.config.js                        # Configuração do Next.js

-- 1. Criar o banco de dados
CREATE DATABASE IF NOT EXISTS universo_design_local;
USE universo_design_local;

-- 2. Tabela para armazenar as seções de texto da landing page
CREATE TABLE page_sections (
    id INT AUTO_INCREMENT PRIMARY KEY,
    section_key VARCHAR(100) NOT NULL UNIQUE, -- Ex: 'hero_title', 'services_description'
    title VARCHAR(255),
    content TEXT,                             -- Pode conter HTML ou texto longo
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Tabela para armazenar os caminhos das imagens
CREATE TABLE page_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    image_key VARCHAR(100) NOT NULL UNIQUE,   -- Ex: 'hero_background', 'service_banner_1'
    file_path VARCHAR(500) NOT NULL,          -- Caminho relativo, ex: '/uploads/hero-bg.jpg'
    alt_text VARCHAR(255),                    -- Texto alternativo para acessibilidade
    section VARCHAR(100),                     -- Seção relacionada (opcional)
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. (Opcional) Tabela de usuários para o painel admin
CREATE TABLE admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Inserir alguns dados iniciais para as seções de texto
INSERT INTO page_sections (section_key, title, content) VALUES
('hero_title', 'Título Principal', 'Bem-vindo à Universo Design'),
('hero_subtitle', 'Subtítulo', 'Criamos soluções visuais que destacam sua marca'),
('services_description', 'Descrição dos Serviços', 'Oferecemos desde banners até materiais personalizados para eventos.');