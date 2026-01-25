// components/sections/PortfolioSection.tsx - VERSÃO COM MARGENS CORRIGIDAS
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ExternalLink, Heart, ZoomIn, Check, Star } from 'lucide-react';

export default function PortfolioSection() {
    const [activeFilter, setActiveFilter] = useState('all');
    const [likedItems, setLikedItems] = useState<number[]>([]);

    const categories = [
        { id: 'all', label: 'Todos' },
        { id: 'banners', label: 'Banners' },
        { id: 'cards', label: 'Cartões' },
        { id: 'bracelets', label: 'Pulseiras' },
        { id: 'cups', label: 'Copos' },
        { id: 'signage', label: 'Sinalização' },
    ];

    const portfolioItems = [
        {
            id: 1,
            title: 'Banner Corporativo Moderno',
            category: 'banners',
            client: 'Tech Solutions Inc.',
            description: 'Banner frontlight 3x6m para evento corporativo internacional',
            image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            likes: 42,
            featured: true,
            year: '2024'
        },
        {
            id: 2,
            title: 'Cartões de Visita Premium',
            category: 'cards',
            client: 'Consultoria Elite',
            description: 'Cartões com verniz localizado, corte especial e papel 400g',
            image: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            likes: 38,
            featured: true,
            year: '2023'
        },
        {
            id: 3,
            title: 'Pulseiras para Festival',
            category: 'bracelets',
            client: 'Festival Summer',
            description: 'Pulseiras siliconizadas com QR Code para controle de acesso',
            image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            likes: 56,
            featured: false,
            year: '2024'
        },
        {
            id: 4,
            title: 'Copos Promocionais Térmicos',
            category: 'cups',
            client: 'Café Artesanal',
            description: 'Copos personalizados para campanha de lançamento',
            image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            likes: 29,
            featured: false,
            year: '2023'
        },
        {
            id: 5,
            title: 'Sinalização Interna Corporativa',
            category: 'signage',
            client: 'Coworking Space',
            description: 'Letras caixa LED e sinalização completa do espaço',
            image: 'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            likes: 33,
            featured: false,
            year: '2024'
        },
        {
            id: 6,
            title: 'Banner Promocional Verão',
            category: 'banners',
            client: 'Loja de Esportes',
            description: 'Banner 4x8m para promoção sazonal',
            image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            likes: 47,
            featured: true,
            year: '2024'
        },
        {
            id: 7,
            title: 'Cartões Criativos',
            category: 'cards',
            client: 'Estúdio Criativo',
            description: 'Cartões com design inovador e corte diferenciado',
            image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            likes: 41,
            featured: false,
            year: '2023'
        },
        {
            id: 8,
            title: 'Brindes Corporativos',
            category: 'cups',
            client: 'Empresa Tech',
            description: 'Kits de brindes personalizados para funcionários',
            image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            likes: 25,
            featured: false,
            year: '2024'
        }
    ];

    const filteredItems = activeFilter === 'all'
        ? portfolioItems
        : portfolioItems.filter(item => item.category === activeFilter);

    const toggleLike = (id: number) => {
        setLikedItems(prev =>
            prev.includes(id)
                ? prev.filter(itemId => itemId !== id)
                : [...prev, id]
        );
    };

    return (
        <section id="portfolio" className="bg-white">
            <div className="section-inner">
                {/* Cabeçalho com margens */}
                <div className="text-center max-w-4xl mx-auto mb-16 px-4">
                    <span className="inline-flex items-center px-5 py-2.5 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-6 shadow-sm">
                        <Star className="w-4 h-4 mr-2" />
                        Nosso Portfólio
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
                        Projetos que <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Transformaram Marcas</span>
                    </h2>
                    <p className="text-xl text-gray-600 leading-relaxed px-4">
                        Veja alguns dos nossos trabalhos mais recentes e inspire-se para o seu próximo projeto.
                        Cada peça é criada com cuidado e atenção aos detalhes.
                    </p>
                </div>

                {/* Filtros com espaçamento */}
                <div className="flex flex-wrap justify-center gap-3 mb-16 px-4">
                    {categories.map(category => (
                        <button
                            key={category.id}
                            onClick={() => setActiveFilter(category.id)}
                            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${activeFilter === category.id
                                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                                }`}
                        >
                            {category.label}
                        </button>
                    ))}
                </div>

                {/* Grid de Portfolio com margens adequadas */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                    {filteredItems.map((item) => (
                        <div
                            key={item.id}
                            className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 mx-2"
                        >
                            {/* Imagem */}
                            <div className="relative h-64 overflow-hidden">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                />

                                {/* Overlay com gradiente */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                {/* Badges */}
                                <div className="absolute top-4 left-4 flex gap-2">
                                    {item.featured && (
                                        <span className="px-3 py-1.5 bg-yellow-500 text-white text-xs font-semibold rounded-full shadow-md">
                                            Destaque
                                        </span>
                                    )}
                                    <span className="px-3 py-1.5 bg-white/95 text-gray-800 text-xs font-semibold rounded-full shadow-md">
                                        {item.category}
                                    </span>
                                </div>

                                {/* Ano */}
                                <div className="absolute top-4 right-4">
                                    <span className="px-3 py-1.5 bg-black/70 text-white text-xs font-semibold rounded-full backdrop-blur-sm">
                                        {item.year}
                                    </span>
                                </div>

                                {/* Ícones de ação */}
                                <div className="absolute top-16 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <button
                                        onClick={() => toggleLike(item.id)}
                                        className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white shadow-lg transition-all hover:scale-110"
                                        aria-label="Curtir projeto"
                                    >
                                        <Heart
                                            className={`w-5 h-5 transition-colors ${likedItems.includes(item.id)
                                                    ? 'fill-red-500 text-red-500'
                                                    : 'text-gray-700'
                                                }`}
                                        />
                                    </button>
                                    <button
                                        className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white shadow-lg transition-all hover:scale-110"
                                        aria-label="Ampliar imagem"
                                    >
                                        <ZoomIn className="w-5 h-5 text-gray-700" />
                                    </button>
                                </div>

                                {/* Botão de ver projeto */}
                                <div className="absolute bottom-4 left-0 right-0 px-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                                    <button className="w-full px-6 py-3 bg-white text-gray-800 font-semibold rounded-full flex items-center justify-center gap-2 hover:bg-gray-50 shadow-lg transition-all hover:scale-105">
                                        Ver Detalhes
                                        <ExternalLink className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Conteúdo com padding adequado */}
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors leading-tight">
                                        {item.title}
                                    </h3>
                                    <button
                                        onClick={() => toggleLike(item.id)}
                                        className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors ml-2"
                                        aria-label="Curtir"
                                    >
                                        <Heart
                                            className={`w-4 h-4 transition-colors ${likedItems.includes(item.id)
                                                    ? 'fill-red-500 text-red-500'
                                                    : ''
                                                }`}
                                        />
                                        <span className="text-sm font-medium">
                                            {item.likes + (likedItems.includes(item.id) ? 1 : 0)}
                                        </span>
                                    </button>
                                </div>

                                <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                                    {item.description}
                                </p>

                                <div className="flex items-center justify-between pt-5 border-t border-gray-100">
                                    <div className="flex-1">
                                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Cliente</p>
                                        <p className="font-semibold text-gray-800 truncate">{item.client}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-green-500" />
                                        <span className="px-3 py-1 bg-green-50 text-green-600 text-xs font-semibold rounded-full">
                                            Concluído
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Estatísticas com margens */}
                <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-3xl p-12 mb-16 mx-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
                        {[
                            {
                                value: '500+',
                                label: 'Projetos Entregues',
                                description: 'Com qualidade garantida'
                            },
                            {
                                value: '98%',
                                label: 'Clientes Satisfeitos',
                                description: 'Taxa de satisfação'
                            },
                            {
                                value: '24h',
                                label: 'Orçamento Rápido',
                                description: 'Tempo médio de resposta'
                            },
                            {
                                value: '50+',
                                label: 'Cidades Atendidas',
                                description: 'Em todo o Brasil'
                            }
                        ].map((stat, index) => (
                            <div key={index} className="text-center px-4">
                                <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
                                    {stat.value}
                                </div>
                                <p className="text-lg font-semibold text-gray-800 mb-2">{stat.label}</p>
                                <p className="text-sm text-gray-600">{stat.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Section com margens */}
                <div className="px-4">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 shadow-2xl">
                        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
                            <div className="text-center lg:text-left text-white">
                                <h3 className="text-3xl md:text-4xl font-bold mb-6">
                                    Seu projeto aqui também!
                                </h3>
                                <p className="text-lg text-blue-100 leading-relaxed max-w-2xl">
                                    Vamos transformar suas ideias em um projeto incrível que vai destacar sua marca.
                                    Solicite um orçamento sem compromisso.
                                </p>
                            </div>
                            <div className="flex-shrink-0">
                                <a
                                    href="#contact"
                                    className="inline-flex items-center justify-center px-12 py-5 bg-white text-blue-600 hover:text-blue-700 font-semibold text-lg rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
                                >
                                    Começar Projeto
                                    <ExternalLink className="w-5 h-5 ml-3" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}