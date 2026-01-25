// components/sections/HeroSection.tsx - VERSÃO COM IMAGEM ALINHADA
'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Play, CheckCircle, Star, ArrowRight, Sparkles } from 'lucide-react';

export default function HeroSection() {
    const [typedText, setTypedText] = useState('');
    const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    const textContainerRef = useRef<HTMLDivElement>(null);

    const phrases = [
        'Banners Impactantes',
        'Cartões Criativos',
        'Faixas Promocionais',
        'Pulseiras Personalizadas',
        'Copos Promocionais',
        'Sinalização Completa'
    ];

    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseTime = 2000;

    useEffect(() => {
        const currentPhrase = phrases[currentPhraseIndex];

        const timer = setTimeout(() => {
            if (!isDeleting) {
                if (currentCharIndex < currentPhrase.length) {
                    setTypedText(currentPhrase.substring(0, currentCharIndex + 1));
                    setCurrentCharIndex(currentCharIndex + 1);
                } else {
                    setTimeout(() => setIsDeleting(true), pauseTime);
                }
            } else {
                if (currentCharIndex > 0) {
                    setTypedText(currentPhrase.substring(0, currentCharIndex - 1));
                    setCurrentCharIndex(currentCharIndex - 1);
                } else {
                    setIsDeleting(false);
                    setCurrentPhraseIndex((currentPhraseIndex + 1) % phrases.length);
                }
            }
        }, isDeleting ? deletingSpeed : typingSpeed);

        return () => clearTimeout(timer);
    }, [currentCharIndex, currentPhraseIndex, isDeleting]);

    const features = [
        'Orçamento em 24h',
        'Entrega Expressa',
        'Design Personalizado',
        'Alta Qualidade Garantida'
    ];

    return (
        <section id="home" className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-10 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute top-40 right-10 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-20 left-1/3 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
            </div>

            <div className="section-inner">
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Left Content - ALINHADO COM TOPO */}
                    <div className="relative z-10 pt-8 lg:pt-12">
                        {/* Badge */}
                        <div className="inline-flex items-center px-5 py-2.5 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-8 shadow-sm">
                            <Sparkles className="w-4 h-4 mr-2" />
                            Mais de 500 projetos entregues com excelência
                        </div>

                        {/* Main Title - CONTÊINER COM ALTURA FIXA */}
                        <div
                            ref={textContainerRef}
                            className="mb-10"
                        >
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                                <span className="block text-gray-900 mb-4">Transformamos</span>

                                {/* Texto animado - altura fixa */}
                                <div className="relative inline-block min-h-[1.2em] leading-tight">
                                    {/* Texto visível */}
                                    <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                        {typedText}
                                        <span className="ml-1 inline-block w-[3px] h-[1.2em] bg-purple-500 animate-pulse align-middle"></span>
                                    </span>

                                    {/* Texto invisível para manter espaço */}
                                    <span
                                        className="absolute top-0 left-0 block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent opacity-0 pointer-events-none whitespace-nowrap"
                                        aria-hidden="true"
                                    >
                                        {phrases.reduce((longest, phrase) =>
                                            phrase.length > longest.length ? phrase : longest, ''
                                        )}
                                    </span>
                                </div>

                                <span className="block text-gray-900 mt-4">em Realidade</span>
                            </h1>

                            {/* Indicador de frase atual */}
                            <div className="flex items-center space-x-2 mt-6">
                                {phrases.map((_, index) => (
                                    <div
                                        key={index}
                                        className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentPhraseIndex
                                                ? 'bg-blue-600 w-6'
                                                : 'bg-gray-300'
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Description */}
                        <p className="text-xl text-gray-600 mb-10 max-w-2xl leading-relaxed">
                            Somos especialistas em comunicação visual criativa. Do conceito à produção,
                            entregamos soluções que destacam sua marca e encantam seu público.
                        </p>

                        {/* Features Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100"
                                >
                                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <CheckCircle className="w-5 h-5 text-green-600" />
                                    </div>
                                    <span className="font-medium text-gray-800">{feature}</span>
                                </div>
                            ))}
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-16">
                            <a href="#contact" className="btn-primary text-lg">
                                Solicitar Orçamento Grátis
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </a>
                            <button className="btn-secondary text-lg">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                    <Play className="w-5 h-5 text-blue-600" />
                                </div>
                                Ver Demonstração
                            </button>
                        </div>

                        {/* Testimonials */}
                        <div className="pt-8 border-t border-gray-200">
                            <div className="flex flex-col sm:flex-row items-center gap-6">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <div
                                            key={i}
                                            className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 border-3 border-white shadow-md"
                                        />
                                    ))}
                                </div>
                                <div className="text-center sm:text-left">
                                    <p className="font-semibold text-gray-900">+200 clientes satisfeitos</p>
                                    <div className="flex items-center justify-center sm:justify-start space-x-1 mt-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                        ))}
                                        <span className="ml-2 text-sm text-gray-600">5.0 (247 avaliações)</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Image - ALINHADA NO TOPO */}
                    <div className="relative lg:pt-12">
                        <div className="relative h-[580px] rounded-3xl overflow-hidden shadow-2xl">
                            <Image
                                src="https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                                alt="Design criativo moderno"
                                fill
                                className="object-cover"
                                priority
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                            {/* Floating Card 1 */}
                            <div className="absolute top-8 left-8 bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-2xl max-w-xs transform hover:scale-105 transition-transform duration-300">
                                <div className="flex items-center space-x-4">
                                    <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                                        <span className="text-white font-bold">UD</span>
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900 text-lg">Design Exclusivo</p>
                                        <p className="text-sm text-gray-600 mt-1">Criado especialmente para você</p>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Card 2 */}
                            <div className="absolute bottom-8 right-8 bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-2xl max-w-xs transform hover:scale-105 transition-transform duration-300">
                                <div className="text-center">
                                    <div className="text-4xl font-bold text-blue-600 mb-1">24h</div>
                                    <p className="text-sm text-gray-600">Orçamento rápido</p>
                                    <div className="mt-3 text-xs text-gray-500">Garantido</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}