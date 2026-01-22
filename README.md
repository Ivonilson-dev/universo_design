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