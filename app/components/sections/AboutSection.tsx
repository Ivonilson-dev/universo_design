// components/sections/AboutSection.tsx
'use client';

import { Target, Users, Award, Globe, Heart, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

// Interface para os dados
interface AboutData {
    title: string;
    description: string;
    mainImage: string;
}

export default function AboutSection() {
    const [aboutData, setAboutData] = useState<AboutData>({
        title: 'Há mais de 10 anos transformando ideias em realidade',
        description: 'Somos uma empresa apaixonada por comunicação visual, unindo criatividade, tecnologia e qualidade para entregar soluções que realmente fazem a diferença.',
        mainImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    });
    const [loading, setLoading] = useState(true);

    // Carregar dados do servidor
    useEffect(() => {
        async function loadAboutData() {
            try {
                // Chama a API do servidor
                const response = await fetch('/api/data/about');
                const data = await response.json();

                if (data.success) {
                    setAboutData(data.data);
                }
            } catch (error) {
                console.error('Erro ao carregar dados sobre:', error);
            } finally {
                setLoading(false);
            }
        }

        loadAboutData();
    }, []);

    const values = [
        {
            icon: <Heart className="w-8 h-8" />,
            title: 'Paixão por Design',
            description: 'Cada projeto é tratado com dedicação e atenção aos detalhes.'
        },
        {
            icon: <Target className="w-8 h-8" />,
            title: 'Foco no Cliente',
            description: 'Sua satisfação é nossa maior conquista.'
        },
        {
            icon: <Award className="w-8 h-8" />,
            title: 'Qualidade Garantida',
            description: 'Materiais premium e acabamento impecável.'
        },
        {
            icon: <TrendingUp className="w-8 h-8" />,
            title: 'Inovação Constante',
            description: 'Sempre atualizados com as últimas tendências.'
        }
    ];

    const team = [
        {
            name: 'Carlos Silva',
            role: 'Diretor Criativo',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            description: '15+ anos em design gráfico'
        },
        {
            name: 'Ana Santos',
            role: 'Gerente de Produção',
            image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            description: 'Especialista em comunicação visual'
        },
        {
            name: 'Roberto Lima',
            role: 'Especialista em Impressão',
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            description: 'Tecnologia de ponta'
        }
    ];

    if (loading) {
        return (
            <section id="about" className="bg-gradient-to-b from-white to-gray-50 py-20">
                <div className="section-inner">
                    <div className="text-center">
                        <div className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-semibold mb-6">
                            <Users className="w-4 h-4 mr-2" />
                            Sobre Nós
                        </div>
                        <div className="animate-pulse">
                            <div className="h-12 bg-gray-200 rounded-lg mb-8 max-w-3xl mx-auto"></div>
                            <div className="h-6 bg-gray-200 rounded mb-4 max-w-2xl mx-auto"></div>
                            <div className="h-6 bg-gray-200 rounded max-w-2xl mx-auto"></div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="about" className="bg-gradient-to-b from-white to-gray-50">
            <div className="section-inner">
                {/* Cabeçalho */}
                <div className="text-center max-w-4xl mx-auto mb-16">
                    <div className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-semibold mb-6">
                        <Users className="w-4 h-4 mr-2" />
                        Sobre Nós
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
                        {aboutData.title}
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
                            {/* Texto dentro do span se necessário */}
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        {aboutData.description}
                    </p>
                </div>

                {/* Resto do código permanece igual */}
                <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
                    {/* Coluna esquerda - História */}
                    <div>
                        <h3 className="text-3xl font-bold mb-8">Nossa História</h3>
                        <div className="space-y-6">
                            <p className="text-lg text-gray-700 leading-relaxed">
                                A <span className="font-semibold text-blue-600">Universo Design</span> nasceu em 2013 com um propósito simples:
                                transformar ideias em comunicação visual impactante. Começamos com uma pequena
                                gráfica e hoje somos referência em soluções completas de comunicação.
                            </p>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                Ao longo dos anos, investimos em tecnologia de ponta, capacitação da equipe e
                                processos que garantem a máxima qualidade em cada projeto entregue.
                            </p>
                            <div className="grid grid-cols-3 gap-6 pt-6">
                                <div className="text-center">
                                    <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
                                    <div className="text-gray-600">Projetos</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-4xl font-bold text-purple-600 mb-2">200+</div>
                                    <div className="text-gray-600">Clientes</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-4xl font-bold text-green-600 mb-2">98%</div>
                                    <div className="text-gray-600">Satisfação</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Coluna direita - Imagem */}
                    <div className="relative">
                        <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                            <Image
                                src={aboutData.mainImage}
                                alt="Nosso estúdio de criação"
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                            {/* Card flutuante */}
                            <div className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-2xl">
                                <div className="flex items-center space-x-4">
                                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                                        <Globe className="w-8 h-8 text-white" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900 text-lg">Atendimento Nacional</p>
                                        <p className="text-gray-600">Entregamos em todo o Brasil</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Nossos Valores */}
                <div className="mb-20">
                    <h3 className="text-3xl font-bold text-center mb-12">Nossos Valores</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <div
                                key={index}
                                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
                            >
                                <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl flex items-center justify-center mb-6">
                                    {value.icon}
                                </div>
                                <h4 className="text-xl font-bold mb-4">{value.title}</h4>
                                <p className="text-gray-600">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Nossa Equipe */}
                <div>
                    <h3 className="text-3xl font-bold text-center mb-12">Conheça Nossa Equipe</h3>
                    <div className="grid md:grid-cols-3 gap-8">
                        {team.map((member, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
                            >
                                <div className="relative h-64 overflow-hidden">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>
                                <div className="p-8">
                                    <h4 className="text-2xl font-bold mb-2">{member.name}</h4>
                                    <p className="text-blue-600 font-semibold mb-3">{member.role}</p>
                                    <p className="text-gray-600">{member.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}