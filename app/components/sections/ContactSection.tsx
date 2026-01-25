// components/sections/ContactSection.tsx - Versão ajustada com espaçamentos
'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, CheckCircle, Send } from 'lucide-react';

export default function ContactSection() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
    });

    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 3000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const contactInfo = [
        {
            icon: <Phone className="w-6 h-6" />,
            title: 'Telefone',
            content: '(11) 99999-9999',
            subtitle: 'Seg a Sex, 8h às 18h'
        },
        {
            icon: <Mail className="w-6 h-6" />,
            title: 'E-mail',
            content: 'contato@universodesign.com',
            subtitle: 'Respondemos em até 2h'
        },
        {
            icon: <MapPin className="w-6 h-6" />,
            title: 'Endereço',
            content: 'Av. Paulista, 1000',
            subtitle: 'São Paulo - SP'
        },
        {
            icon: <Clock className="w-6 h-6" />,
            title: 'Horário',
            content: 'Segunda a Sexta',
            subtitle: '8:00 às 18:00'
        }
    ];

    const services = [
        'Banners e Faixas',
        'Cartões de Visita',
        'Brindes Personalizados',
        'Pulseiras para Eventos',
        'Sinalização',
        'Design Gráfico',
        'Outro'
    ];

    return (
        <section id="contact" className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
            <div className="section-inner">
                <div className="grid lg:grid-cols-2 gap-16">
                    {/* Left Column - Contact Info */}
                    <div>
                        <div className="inline-flex items-center px-5 py-2.5 bg-blue-500/20 text-blue-300 rounded-full text-sm font-semibold mb-8">
                            Contato Rápido
                        </div>

                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
                            Vamos criar algo <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">incrível juntos</span>
                        </h2>

                        <p className="text-xl text-gray-300 mb-12 leading-relaxed">
                            Entre em contato para um orçamento personalizado.
                            Nossa equipe está pronta para transformar suas ideias em realidade.
                        </p>

                        {/* Contact Info Cards */}
                        <div className="grid sm:grid-cols-2 gap-6 mb-12">
                            {contactInfo.map((info, index) => (
                                <div
                                    key={index}
                                    className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-blue-500/30 transition-all duration-300 hover:scale-[1.02]"
                                >
                                    <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                                        {info.icon}
                                    </div>
                                    <h3 className="font-bold text-xl mb-3">{info.title}</h3>
                                    <p className="text-gray-300 text-lg mb-2">{info.content}</p>
                                    <p className="text-sm text-gray-400">{info.subtitle}</p>
                                </div>
                            ))}
                        </div>

                        {/* WhatsApp Quick Action */}
                        <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 p-8 rounded-2xl border border-green-500/20">
                            <div className="flex items-center gap-6 mb-6">
                                <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center shadow-lg">
                                    <MessageCircle className="w-8 h-8" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-2xl mb-2">WhatsApp Rápido</h3>
                                    <p className="text-gray-300">Resposta imediata em horário comercial</p>
                                </div>
                            </div>
                            <a
                                href="https://wa.me/5511999999999"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full py-4 bg-green-600 hover:bg-green-700 rounded-xl font-semibold text-lg flex items-center justify-center transition-colors"
                            >
                                Iniciar Conversa Agora
                            </a>
                        </div>
                    </div>

                    {/* Right Column - Contact Form */}
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-10">
                        {isSubmitted ? (
                            <div className="text-center py-16">
                                <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
                                    <CheckCircle className="w-12 h-12" />
                                </div>
                                <h3 className="text-3xl font-bold mb-6">Mensagem Enviada!</h3>
                                <p className="text-gray-300 mb-10 text-lg">
                                    Entraremos em contato em até 2 horas úteis com sua proposta.
                                </p>
                                <button
                                    onClick={() => setIsSubmitted(false)}
                                    className="btn-primary px-12 py-4"
                                >
                                    Enviar Nova Mensagem
                                </button>
                            </div>
                        ) : (
                            <>
                                <h3 className="text-3xl font-bold mb-4">Solicite seu Orçamento</h3>
                                <p className="text-gray-400 mb-10 text-lg">Preencha o formulário abaixo</p>

                                <form onSubmit={handleSubmit} className="space-y-8">
                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-3">
                                                Seu Nome *
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                                                placeholder="Como gostaria de ser chamado?"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-3">
                                                E-mail *
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                                                placeholder="seu@email.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-3">
                                                Telefone/WhatsApp *
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                                                placeholder="(11) 99999-9999"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-3">
                                                Serviço de Interesse *
                                            </label>
                                            <select
                                                name="service"
                                                value={formData.service}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                                            >
                                                <option value="">Selecione um serviço</option>
                                                {services.map((service, index) => (
                                                    <option key={index} value={service}>
                                                        {service}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-3">
                                            Mensagem *
                                        </label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows={6}
                                            className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                                            placeholder="Conte-nos mais sobre seu projeto..."
                                        />
                                    </div>

                                    {/* Info Box */}
                                    <div className="flex items-center gap-6 p-6 bg-blue-500/10 rounded-2xl border border-blue-500/20">
                                        <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Clock className="w-6 h-6 text-blue-400" />
                                        </div>
                                        <div>
                                            <p className="text-lg">
                                                <span className="font-semibold">Resposta rápida:</span>{' '}
                                                Entraremos em contato em até 24 horas úteis com seu orçamento.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        className="w-full py-5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl font-semibold text-xl transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-3"
                                    >
                                        <Send className="w-6 h-6" />
                                        Solicitar Orçamento Gratuito
                                    </button>

                                    {/* Privacy Policy */}
                                    <p className="text-center text-gray-400 text-sm pt-6 border-t border-white/10">
                                        Não compartilhamos seus dados. Leia nossa{' '}
                                        <a href="#" className="text-blue-400 hover:underline font-medium">
                                            Política de Privacidade
                                        </a>
                                    </p>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}