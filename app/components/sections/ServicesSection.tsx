// components/sections/ServicesSection.tsx
'use client';

import { Palette, Tag, Gift, Users, Sparkles, Award } from 'lucide-react';
import ServiceCard from '../ui/ServiceCard';
import { getServicesData } from '@/lib/data-service';
import { useState, useEffect } from 'react';

export default function ServicesSection() {
    const [servicesData, setServicesData] = useState({
        title: 'Soluções Completas em Comunicação Visual',
        description: 'Oferecemos tudo que sua empresa precisa para se destacar no mercado, desde materiais promocionais até sinalização completa.'
    });

    // Carregar dados do banco
    useEffect(() => {
        async function loadServicesData() {
            try {
                const data = await getServicesData();
                setServicesData(data);
            } catch (error) {
                console.error('Erro ao carregar dados dos serviços:', error);
            }
        }
        loadServicesData();
    }, []);

    const services = [
        {
            icon: <Palette className="w-8 h-8" />,
            title: 'Banners & Faixas',
            description: 'Banners promocionais, faixas para eventos, outdoor e muito mais com impressão de alta qualidade.',
            features: ['PVC Premium', 'Lona Frontlight', 'Banner Mesh', 'Personalizado'],
            image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            color: 'from-blue-500 to-cyan-500'
        },
        {
            icon: <Tag className="w-8 h-8" />,
            title: 'Cartões de Visita',
            description: 'Cartões que impressionam e geram conexões. Design moderno e acabamento premium.',
            features: ['Papel Premium 300g', 'Verniz Localizado', 'Corte Especial', 'Plastificado Brilho/Mate'],
            image: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            color: 'from-purple-500 to-pink-500'
        },
        {
            icon: <Gift className="w-8 h-8" />,
            title: 'Brindes Personalizados',
            description: 'Copos, canetas, ecobags e muito mais com sua marca. Perfeito para eventos e campanhas.',
            features: ['Copos Térmicos', 'Canetas Premium', 'Ecobags Algodão', 'Chaveiros em Acrílico'],
            image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            color: 'from-green-500 to-emerald-500'
        },
        {
            icon: <Users className="w-8 h-8" />,
            title: 'Pulseiras para Eventos',
            description: 'Pulseiras personalizadas para festas, parques, shows e eventos corporativos.',
            features: ['Siliconizada', 'Tyvek Lavável', 'Vinil com QR Code', 'Personalização Digital'],
            image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            color: 'from-orange-500 to-red-500'
        },
        {
            icon: <Sparkles className="w-8 h-8" />,
            title: 'Sinalização',
            description: 'Sinalização interna e externa para empresas, lojas e estabelecimentos comerciais.',
            features: ['Letras Caixa LED', 'Adesivagem Completa', 'Placas ACM', 'Backlight'],
            image: 'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            color: 'from-yellow-500 to-amber-500'
        },
        {
            icon: <Award className="w-8 h-8" />,
            title: 'Design Gráfico',
            description: 'Criação de identidade visual, logos, flyers e todo material gráfico para sua marca.',
            features: ['Logotipo Profissional', 'Manual da Marca', 'Social Media Kit', 'Apresentações Corporativas'],
            image: 'https://images.unsplash.com/photo-1561070791-4c9b95a9e2a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            color: 'from-indigo-500 to-blue-500'
        }
    ];

    return (
        <section id="services" className="bg-white">
            <div className="section-inner">
                {/* Section Header - AGORA VEM DO BANCO */}
                <div className="text-center max-w-4xl mx-auto mb-16">
                    <div className="inline-flex items-center px-5 py-2.5 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-6 shadow-sm">
                        Nossos Serviços
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
                        {servicesData.title}
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
                            {/* Texto dentro do span */}
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        {servicesData.description}
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <ServiceCard key={index} service={service} index={index} />
                    ))}
                </div>

                {/* CTA Section */}
                <div className="mt-20">
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-12 shadow-lg border border-gray-100">
                        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                            <div className="text-center lg:text-left">
                                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                                    Precisa de algo personalizado?
                                </h3>
                                <p className="text-lg text-gray-600 max-w-2xl">
                                    Nossa equipe está pronta para criar a solução perfeita para suas necessidades específicas.
                                </p>
                            </div>
                            <div className="flex-shrink-0">
                                <a href="#contact" className="btn-primary text-lg px-12 py-4">
                                    Fale com um Especialista
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}