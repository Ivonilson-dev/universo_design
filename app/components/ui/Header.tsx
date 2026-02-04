// components/ui/Header.tsx
'use client';

import { useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = [
        { label: 'Início', href: '#home' },
        { label: 'Serviços', href: '#services' },
        { label: 'Portfólio', href: '#portfolio' },
        { label: 'Sobre', href: '#about' },
        { label: 'Contato', href: '#contact' },
    ];

    return (
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
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

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center space-x-1">
                        {navItems.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                className="px-5 py-2.5 text-gray-700 hover:text-blue-600 font-medium rounded-lg transition-colors hover:bg-gray-50"
                            >
                                {item.label}
                            </a>
                        ))}
                    </nav>

                    {/* Desktop CTA */}
                    <div className="hidden lg:flex items-center space-x-4">
                        <a
                            href="tel:+5511999999999"
                            className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
                        >
                            <Phone className="w-5 h-5" />
                            <span className="font-medium">(61) 99999-9999</span>
                        </a>
                        <a href="#contact" className="btn-primary">
                            Orçamento Grátis
                        </a>
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

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="lg:hidden border-t border-gray-100 py-6">
                        <div className="flex flex-col space-y-2">
                            {navItems.map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    className="px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg font-medium transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.label}
                                </a>
                            ))}
                            <div className="pt-4 border-t border-gray-100 space-y-4">
                                <a
                                    href="tel:+5511999999999"
                                    className="flex items-center justify-center space-x-2 text-gray-700 hover:text-blue-600 px-4 py-3"
                                >
                                    <Phone className="w-5 h-5" />
                                    <span className="font-medium">(11) 99999-9999</span>
                                </a>
                                <a
                                    href="#contact"
                                    className="btn-primary w-full justify-center"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Solicitar Orçamento
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}