'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [scrolled, setScrolled] = useState(false);

    // Navegação suave para seções
    const handleNavigation = (sectionId: string) => {
        setIsMenuOpen(false);

        const element = document.getElementById(sectionId);
        if (element) {
            // Adiciona classe de destaque temporário
            element.classList.add('highlight-section');

            // Scroll suave com offset para header
            const headerHeight = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Remove a classe de destaque após a animação
            setTimeout(() => {
                element.classList.remove('highlight-section');
            }, 2000);

            // Atualiza a seção ativa
            setActiveSection(sectionId);
        }
    };

    // Detecta scroll para mudar estilo do header
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            // Detecta a seção ativa baseada no scroll
            const sections = ['home', 'services', 'portfolio', 'about', 'contact'];
            const currentScroll = window.scrollY + 100; // Offset

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (currentScroll >= offsetTop && currentScroll < offsetTop + offsetHeight) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { id: 'home', label: 'Início' },
        { id: 'services', label: 'Serviços' },
        { id: 'portfolio', label: 'Portfólio' },
        { id: 'about', label: 'Sobre' },
        { id: 'contact', label: 'Contato' },
    ];

    return (
        <>
            {/* Scroll Progress Bar */}
            <div className="scroll-progress-bar" id="scrollProgress" />

            <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100' : 'bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm'}`}>
                <div className="container-main">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                                <span className="text-white font-bold text-xl">UD</span>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    Universo Design
                                </h1>
                                <p className="text-xs text-gray-500 mt-0.5">Comunicação Visual</p>
                            </div>
                        </div>

                        {/* Desktop Navigation - AGORA COM NAVEGAÇÃO SUAVE */}
                        <nav className="hidden lg:flex items-center space-x-1">
                            {navItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => handleNavigation(item.id)}
                                    className={`px-5 py-2.5 font-medium rounded-lg transition-all duration-300 ${activeSection === item.id
                                        ? 'text-blue-600 bg-blue-50'
                                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                                        }`}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </nav>

                        {/* Desktop CTA */}
                        <div className="hidden lg:flex items-center space-x-4">
                            <a
                                href="tel:+5561999999999"
                                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
                            >
                                <Phone className="w-5 h-5" />
                                <span className="font-medium">(61) 99999-9999</span>
                            </a>
                            <button
                                onClick={() => handleNavigation('contact')}
                                className="btn-primary"
                            >
                                Orçamento Grátis
                            </button>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="lg:hidden p-3 rounded-lg hover:bg-gray-100 transition-colors"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
                        >
                            {isMenuOpen ? (
                                <X className="w-6 h-6 text-gray-700" />
                            ) : (
                                <Menu className="w-6 h-6 text-gray-700" />
                            )}
                        </button>
                    </div>

                    {/* Mobile Menu - AGORA COM NAVEGAÇÃO SUAVE */}
                    {isMenuOpen && (
                        <div className="lg:hidden border-t border-gray-100 py-6">
                            <div className="flex flex-col space-y-2">
                                {navItems.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => handleNavigation(item.id)}
                                        className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 text-left ${activeSection === item.id
                                            ? 'text-blue-600 bg-blue-50'
                                            : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        {item.label}
                                    </button>
                                ))}
                                <div className="pt-4 border-t border-gray-100 space-y-4">
                                    <a
                                        href="tel:+5561999999999"
                                        className="flex items-center justify-center space-x-2 text-gray-700 hover:text-blue-600 px-4 py-3 transition-colors"
                                    >
                                        <Phone className="w-5 h-5" />
                                        <span className="font-medium">(61) 99999-9999</span>
                                    </a>
                                    <button
                                        onClick={() => handleNavigation('contact')}
                                        className="btn-primary w-full justify-center"
                                    >
                                        Solicitar Orçamento
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </header>

            {/* Indicador de seções ativas (Desktop only) */}
            <div className="hidden lg:block active-section-indicator">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => handleNavigation(item.id)}
                        className={`active-section-dot ${activeSection === item.id ? 'active' : ''}`}
                        data-section={item.label}
                        aria-label={`Ir para ${item.label}`}
                    />
                ))}
            </div>
        </>
    );
}