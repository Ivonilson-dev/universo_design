// next.config.js - VERSÃO CORRIGIDA
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'images.unsplash.com'],
    unoptimized: true, // Para desenvolvimento
  },
  // Configuração correta para bodyParser
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  // Para servir arquivos da pasta uploads
  async headers() {
    return [
      {
        source: '/uploads/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;