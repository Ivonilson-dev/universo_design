// app/admin/page.tsx - COMPLETO
'use client';

import React from 'react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        sections: 0,
        images: 0,
        lastUpdated: '',
    });

    useEffect(() => {
        // Simular carregamento de estatísticas
        setStats({
            sections: 10,
            images: 5,
            lastUpdated: new Date().toLocaleDateString('pt-BR'),
        });
    }, []);

    return (
        <div>
            {/* Cabeçalho */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
                <p className="text-gray-600 mt-2">
                    Bem-vindo ao painel de controle do Universo Design
                </p>
            </div>

            {/* Cards de Estatísticas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Card Seções */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start">
                        <div className="p-3 bg-blue-50 rounded-lg">
                            <span className="text-2xl text-blue-600">📝</span>
                        </div>
                        <div className="ml-4 flex-1">
                            <h3 className="text-lg font-semibold text-gray-800">Seções Editáveis</h3>
                            <p className="text-3xl font-bold text-gray-900 mt-2">{stats.sections}</p>
                            <p className="text-sm text-gray-500 mt-1">Texto e conteúdo</p>
                        </div>
                    </div>
                    <Link
                        href="/admin/sections"
                        className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm"
                    >
                        Gerenciar seções
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>

                {/* Card Imagens */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start">
                        <div className="p-3 bg-green-50 rounded-lg">
                            <span className="text-2xl text-green-600">🖼️</span>
                        </div>
                        <div className="ml-4 flex-1">
                            <h3 className="text-lg font-semibold text-gray-800">Imagens</h3>
                            <p className="text-3xl font-bold text-gray-900 mt-2">{stats.images}</p>
                            <p className="text-sm text-gray-500 mt-1">Arquivos enviados</p>
                        </div>
                    </div>
                    <Link
                        href="/admin/images"
                        className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm"
                    >
                        Gerenciar imagens
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>

                {/* Card Status */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start">
                        <div className="p-3 bg-purple-50 rounded-lg">
                            <span className="text-2xl text-purple-600">⚡</span>
                        </div>
                        <div className="ml-4 flex-1">
                            <h3 className="text-lg font-semibold text-gray-800">Status do Site</h3>
                            <p className="text-2xl font-bold text-green-600 mt-2">Online</p>
                            <p className="text-sm text-gray-500 mt-1">Atualizado hoje</p>
                        </div>
                    </div>
                    <Link
                        href="/"
                        target="_blank"
                        className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm"
                    >
                        Visitar site
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </Link>
                </div>
            </div>

            {/* Ações Rápidas */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Ações Rápidas</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Link
                        href="/admin/sections?section=hero_title"
                        className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all group"
                    >
                        <div className="flex items-center">
                            <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                                <span className="text-blue-600">✏️</span>
                            </div>
                            <div className="ml-3">
                                <h3 className="font-medium text-gray-800">Editar Título Principal</h3>
                                <p className="text-sm text-gray-600 mt-1">Banner do site</p>
                            </div>
                        </div>
                    </Link>

                    <Link
                        href="/admin/images?key=hero_background"
                        className="p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-all group"
                    >
                        <div className="flex items-center">
                            <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                                <span className="text-green-600">🖼️</span>
                            </div>
                            <div className="ml-3">
                                <h3 className="font-medium text-gray-800">Trocar Imagem do Hero</h3>
                                <p className="text-sm text-gray-600 mt-1">Background principal</p>
                            </div>
                        </div>
                    </Link>

                    <Link
                        href="/admin/sections?section=services_description"
                        className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all group"
                    >
                        <div className="flex items-center">
                            <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                                <span className="text-purple-600">🛠️</span>
                            </div>
                            <div className="ml-3">
                                <h3 className="font-medium text-gray-800">Atualizar Serviços</h3>
                                <p className="text-sm text-gray-600 mt-1">Descrição dos serviços</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>

            {/* Instruções */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
                <div className="flex items-start">
                    <div className="p-2 bg-blue-100 rounded-lg mr-4">
                        <span className="text-blue-600 text-xl">💡</span>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-blue-800 mb-3">Como usar o painel</h3>
                        <ul className="space-y-3 text-blue-700">
                            <li className="flex items-start">
                                <span className="text-blue-500 mr-2">•</span>
                                <span><strong>Editar Seções:</strong> Modifique textos, títulos e descrições de cada parte do site</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-blue-500 mr-2">•</span>
                                <span><strong>Gerenciar Imagens:</strong> Faça upload de novas imagens para banners, serviços, etc.</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-blue-500 mr-2">•</span>
                                <span><strong>Salvar sempre:</strong> Após editar, clique em "Salvar" para aplicar as mudanças</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-blue-500 mr-2">•</span>
                                <span><strong>Verifique:</strong> Use "Ver Site" para conferir as alterações em tempo real</span>
                            </li>
                        </ul>
                        <div className="mt-4 pt-4 border-t border-blue-200">
                            <p className="text-sm text-blue-600">
                                <strong>Dica:</strong> Para alterações urgentes, edite primeiro as seções mais visíveis (Hero e Serviços)
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}