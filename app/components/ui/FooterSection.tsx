// components/sections/Footer.tsx - VERSÃO COM MARGENS CORRIGIDAS
'use client';

import {
    Facebook,
    Instagram,
    Linkedin,
    Youtube,
    Mail,
    Phone,
    MapPin,
    Send,
    Clock,
    Shield,
    Award,
    Heart
} from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { label: 'Início', href: '#home' },
        { label: 'Serviços', href: '#services' },
        { label: 'Portfólio', href: '#portfolio' },
        { label: 'Sobre Nós', href: '#about' },
        { label: 'Contato', href: '#contact' },
    ];

    const services = [
        'Banners e Faixas',
        'Cartões de Visita',
        'Pulseiras para Eventos',
        'Copos Personalizados',
        'Sinalização',
        'Design Gráfico',
        'Brindes Corporativos',
        'Adesivos Personalizados'
    ];

    const socialMedia = [
        { icon: <Instagram className="w-5 h-5" />, label: 'Instagram', href: '#' },
        { icon: <Facebook className="w-5 h-5" />, label: 'Facebook', href: '#' },
        { icon: <Linkedin className="w-5 h-5" />, label: 'LinkedIn', href: '#' },
        { icon: <Youtube className="w-5 h-5" />, label: 'YouTube', href: '#' },
    ];

    return (
        <footer className="bg-gray-900 text-white">
            {/* Main Footer Content */}
            <div className="container-main py-16">
                <div className="grid lg:grid-cols-4 gap-12">

                    {/* Coluna 1 - Logo e sobre */}
                    <div className="px-2">
                        <div className="flex items-center space-x-4 mb-8">
                            <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                                <span className="text-white font-bold text-2xl">UD</span>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold">Universo Design</h2>
                                <p className="text-gray-400 text-sm mt-1">Comunicação Visual</p>
                            </div>
                        </div>

                        <p className="text-gray-400 mb-8 leading-relaxed">
                            Transformamos ideias em realidade visual há mais de 10 anos.
                            Qualidade, criatividade e pontualidade em cada projeto.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <Award className="w-5 h-5 text-blue-400" />
                                <span className="text-sm">Certificado de Qualidade</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Shield className="w-5 h-5 text-green-400" />
                                <span className="text-sm">Garantia de Satisfação</span>
                            </div>
                        </div>
                    </div>

                    {/* Coluna 2 - Links rápidos */}
                    <div className="px-2">
                        <h3 className="text-xl font-bold mb-8">Links Rápidos</h3>
                        <ul className="space-y-4">
                            {quickLinks.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.href}
                                        className="text-gray-400 hover:text-white transition-colors flex items-center group py-2"
                                    >
                                        <span className="w-2 h-2 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 mr-3 transition-opacity"></span>
                                        <span className="group-hover:translate-x-1 transition-transform">
                                            {link.label}
                                        </span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Coluna 3 - Serviços */}
                    <div className="px-2">
                        <h3 className="text-xl font-bold mb-8">Nossos Serviços</h3>
                        <ul className="space-y-4">
                            {services.map((service, index) => (
                                <li key={index}>
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-white transition-colors flex items-center group py-2"
                                    >
                                        <span className="w-2 h-2 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100 mr-3 transition-opacity"></span>
                                        <span className="group-hover:translate-x-1 transition-transform">
                                            {service}
                                        </span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Coluna 4 - Contato e newsletter */}
                    <div className="px-2">
                        <h3 className="text-xl font-bold mb-8">Fique por Dentro</h3>

                        {/* Newsletter */}
                        <div className="mb-10">
                            <p className="text-gray-400 mb-5 leading-relaxed">
                                Receba dicas e novidades sobre comunicação visual
                            </p>
                            <form className="flex rounded-xl overflow-hidden">
                                <input
                                    type="email"
                                    placeholder="Seu melhor e-mail"
                                    className="flex-grow px-5 py-4 bg-gray-800 border-0 focus:outline-none text-white placeholder-gray-500"
                                />
                                <button
                                    type="submit"
                                    className="px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-colors"
                                >
                                    <Send className="w-5 h-5" />
                                </button>
                            </form>
                        </div>

                        {/* Informações de contato */}
                        <div className="space-y-5">
                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                    <Phone className="w-5 h-5 text-blue-400" />
                                </div>
                                <div>
                                    <p className="font-semibold text-lg mb-1">Telefone</p>
                                    <p className="text-gray-400">(61) 99999-9999</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                    <Mail className="w-5 h-5 text-purple-400" />
                                </div>
                                <div>
                                    <p className="font-semibold text-lg mb-1">E-mail</p>
                                    <p className="text-gray-400">contato@universodesign.com</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                    <Clock className="w-5 h-5 text-green-400" />
                                </div>
                                <div>
                                    <p className="font-semibold text-lg mb-1">Horário</p>
                                    <p className="text-gray-400">Seg - Sex: 8h às 18h</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Divisor */}
                <div className="border-t border-gray-800 my-16"></div>

                {/* Bottom Footer */}
                <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
                    {/* Direitos autorais */}
                    <div className="text-center lg:text-left">
                        <p className="text-gray-400">
                            © {currentYear} Universo Design. Todos os direitos reservados.
                        </p>
                        <p className="text-gray-500 text-sm mt-3">
                            Desenvolvido com <Heart className="w-4 h-4 inline fill-red-500 text-red-500" /> para a comunicação visual
                        </p>
                    </div>

                    {/* Redes sociais */}
                    <div className="flex items-center space-x-3">
                        {socialMedia.map((social, index) => (
                            <a
                                key={index}
                                href={social.href}
                                className="w-12 h-12 bg-gray-800 hover:bg-gray-700 rounded-xl flex items-center justify-center transition-colors group"
                                aria-label={social.label}
                            >
                                <span className="group-hover:scale-110 transition-transform">
                                    {social.icon}
                                </span>
                            </a>
                        ))}
                    </div>

                    {/* Links legais */}
                    <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
                        <a href="#" className="hover:text-white transition-colors hover:underline">
                            Política de Privacidade
                        </a>
                        <a href="#" className="hover:text-white transition-colors hover:underline">
                            Termos de Uso
                        </a>
                        <a href="#" className="hover:text-white transition-colors hover:underline">
                            Cookies
                        </a>
                    </div>
                </div>

                {/* Selos de confiança */}
                <div className="flex flex-wrap justify-center gap-10 mt-16 pt-12 border-t border-gray-800">
                    <div className="text-center">
                        <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <Shield className="w-10 h-10" />
                        </div>
                        <p className="text-sm text-gray-300 font-medium">Site Seguro</p>
                    </div>

                    <div className="text-center">
                        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <Clock className="w-10 h-10" />
                        </div>
                        <p className="text-sm text-gray-300 font-medium">Entrega Garantida</p>
                    </div>

                    <div className="text-center">
                        <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <Award className="w-10 h-10" />
                        </div>
                        <p className="text-sm text-gray-300 font-medium">Qualidade Certificada</p>
                    </div>
                </div>
            </div>

            {/* WhatsApp fixo */}
            <a
                href="https://wa.me/5561999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-8 right-8 w-20 h-20 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-2xl z-50 transition-all hover:scale-110 group"
                aria-label="WhatsApp"
            >
                <div className="relative">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform">
                        <svg className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.226 1.36.194 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.76.982.998-3.675-.236-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.9 6.994c-.004 5.45-4.438 9.88-9.888 9.88m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.333.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.333 11.893-11.893 0-3.18-1.24-6.162-3.495-8.411" />
                        </svg>
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center animate-ping">
                        <span className="text-xs font-bold text-white">1</span>
                    </div>
                </div>
            </a>
        </footer>
    );
}