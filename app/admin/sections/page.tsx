// app/admin/sections/page.tsx - Atualizado com classes Tailwind corretas
'use client';

import { useState, useEffect } from 'react';
import { PageSection } from '@/types';
import { showSuccess, showError, showInfo } from '../../components/ui/SimpleNotification';

export default function EditSectionsPage() {
    const [sections, setSections] = useState<PageSection[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Buscar seções do banco de dados
    useEffect(() => {
        fetchSections();
    }, []);

    const fetchSections = async () => {
        try {
            setLoading(true);
            showInfo('Carregando...', 'Buscando seções do banco de dados');

            const response = await fetch('/api/sections');
            const result = await response.json();

            if (result.success && result.data) {
                setSections(result.data);
                showSuccess('Sucesso!', `${result.data.length} seções carregadas`);
            } else {
                showError('Erro ao carregar', result.error || 'Não foi possível carregar as seções');
            }
        } catch (error) {
            console.error('Erro ao buscar seções:', error);
            showError('Erro de conexão', 'Não foi possível conectar ao servidor');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (section: PageSection) => {
        setSaving(section.id.toString());

        try {
            showInfo('Salvando...', `Atualizando "${section.section_key}"`);

            const response = await fetch('/api/sections', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: section.id,
                    title: section.title,
                    content: section.content,
                }),
            });

            const result = await response.json();

            if (result.success) {
                // Atualizar a lista local
                setSections(sections.map(s =>
                    s.id === section.id ? { ...section, updated_at: new Date().toISOString() } : s
                ));

                // Notificação de sucesso
                showSuccess('Salvo com sucesso!', `A seção "${section.section_key}" foi atualizada`);

                // Log para debug
                console.log('✅ Seção salva:', {
                    id: section.id,
                    section_key: section.section_key,
                    newTitle: section.title,
                    newContent: section.content
                });
            } else {
                showError('Erro ao salvar', result.error || 'Ocorreu um erro desconhecido');
            }
        } catch (error) {
            console.error('Erro ao salvar:', error);
            showError('Erro de conexão', 'Não foi possível salvar as alterações');
        } finally {
            setSaving(null);
        }
    };

    const handleChange = (id: number, field: keyof PageSection, value: string) => {
        setSections(sections.map(section =>
            section.id === id ? { ...section, [field]: value } : section
        ));
    };

    // Filtrar seções baseado na busca
    const filteredSections = sections.filter(section =>
        section.section_key.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (section.title && section.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (section.content && section.content.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // Agrupar seções por categoria
    const heroSections = filteredSections.filter(s => s.section_key.startsWith('hero'));
    const serviceSections = filteredSections.filter(s => s.section_key.includes('service'));
    const otherSections = filteredSections.filter(s =>
        !s.section_key.startsWith('hero') && !s.section_key.includes('service')
    );

    const renderSectionGroup = (title: string, sections: PageSection[]) => {
        if (sections.length === 0) return null;

        return (
            <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">{title}</h2>
                <div className="space-y-6">
                    {sections.map((section) => (
                        <div key={section.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                            <div className="mb-6">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 capitalize">
                                            {section.section_key.replace(/_/g, ' ')}
                                        </h3>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                                                Key: <code className="font-mono">{section.section_key}</code>
                                            </span>
                                            {section.section_key === 'hero_title' && (
                                                <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">
                                                    🏠 Banner Principal
                                                </span>
                                            )}
                                            {section.section_key.includes('service') && (
                                                <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">
                                                    🛠️ Serviços
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <span className="text-sm text-gray-500 whitespace-nowrap">
                                        📅 {new Date(section.updated_at).toLocaleDateString('pt-BR')}
                                    </span>
                                </div>
                            </div>

                            {/* Campo Título */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Título
                                </label>
                                <input
                                    type="text"
                                    value={section.title || ''}
                                    onChange={(e) => handleChange(section.id, 'title', e.target.value)}
                                    className="admin-input"
                                    placeholder="Digite o título..."
                                />
                                <p className="text-xs text-gray-500 mt-2">
                                    Título principal desta seção
                                </p>
                            </div>

                            {/* Campo Conteúdo */}
                            <div className="mb-6">
                                <div className="flex items-center justify-between mb-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Conteúdo / Descrição
                                    </label>
                                    <span className="text-xs text-gray-500">
                                        {section.content?.length || 0} caracteres
                                    </span>
                                </div>
                                <textarea
                                    value={section.content || ''}
                                    onChange={(e) => handleChange(section.id, 'content', e.target.value)}
                                    rows={5}
                                    className="admin-textarea"
                                    placeholder="Digite o conteúdo..."
                                />
                                <div className="flex justify-between mt-2">
                                    <p className="text-xs text-gray-500">
                                        Use HTML básico: &lt;strong&gt;, &lt;em&gt;, &lt;br&gt;, &lt;a href="#"&gt;
                                    </p>
                                    <button
                                        onClick={() => {
                                            const textarea = document.createElement('textarea');
                                            textarea.value = section.content || '';
                                            document.body.appendChild(textarea);
                                            textarea.select();
                                            document.execCommand('copy');
                                            document.body.removeChild(textarea);
                                            showSuccess('Copiado!', 'Conteúdo copiado para a área de transferência');
                                        }}
                                        className="text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors"
                                    >
                                        📋 Copiar conteúdo
                                    </button>
                                </div>
                            </div>

                            {/* Botão Salvar */}
                            <div className="flex justify-end pt-4 border-t border-gray-200">
                                <button
                                    onClick={() => handleSave(section)}
                                    disabled={saving === section.id.toString()}
                                    className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center justify-center min-w-[180px] ${saving === section.id.toString()
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'admin-btn-primary'
                                        }`}
                                >
                                    {saving === section.id.toString() ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            Salvando...
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            Salvar Alterações
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    if (loading) {
        return (
            <div className="admin-loading">
                <div className="text-center">
                    <div className="admin-loading-spinner mx-auto"></div>
                    <p className="admin-loading-text">Carregando seções...</p>
                    <p className="text-sm text-gray-500 mt-2">Aguarde enquanto buscamos os dados</p>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-container">
            {/* Cabeçalho */}
            <div className="mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Editar Seções</h1>
                        <p className="text-gray-600 mt-2">
                            Modifique textos, títulos e descrições do seu site
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <p className="text-sm text-gray-600">
                                {filteredSections.length} de {sections.length} seções
                            </p>
                            <p className="text-xs text-gray-500">
                                Última atualização: {sections.length > 0 ?
                                    new Date(Math.max(...sections.map(s => new Date(s.updated_at).getTime())))
                                        .toLocaleDateString('pt-BR') : 'N/A'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Barra de busca */}
                <div className="relative mb-8">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="    Buscar seções por nome, título ou conteúdo..."
                        className="admin-input pl-10"
                    />
                    {searchTerm && (
                        <button
                            onClick={() => setSearchTerm('')}
                            className="absolute inset-y-0 right-12 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                        >
                            ✕
                        </button>
                    )}
                </div>
            </div>

            {/* Seções agrupadas */}
            {heroSections.length > 0 && renderSectionGroup('🏠 Seções principais', heroSections)}
            {serviceSections.length > 0 && renderSectionGroup('🛠️ Seções de Serviços', serviceSections)}
            {otherSections.length > 0 && renderSectionGroup('📄 Seções', otherSections)}

            {/* Mensagem se não encontrar resultados */}
            {filteredSections.length === 0 && (
                <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200">
                    <div className="text-6xl mb-4 text-gray-300">🔍</div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Nenhuma seção encontrada</h3>
                    <p className="text-gray-600 max-w-md mx-auto mb-6">
                        {searchTerm ? `Não encontramos resultados para "${searchTerm}"` : 'Não há seções cadastradas no momento'}
                    </p>
                    {searchTerm ? (
                        <button
                            onClick={() => setSearchTerm('')}
                            className="admin-btn-primary"
                        >
                            Limpar busca
                        </button>
                    ) : (
                        <button
                            onClick={fetchSections}
                            className="admin-btn-secondary"
                        >
                            Tentar novamente
                        </button>
                    )}
                </div>
            )}

            {/* Estatísticas rápidas */}
            <div className="admin-grid admin-grid-3 mt-12">
                <div className="admin-stats-card">
                    <div className="flex items-center">
                        <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-4">
                            <span className="text-white text-xl">📝</span>
                        </div>
                        <div>
                            <p className="admin-stats-value">{sections.length}</p>
                            <p className="admin-stats-label">Seções Editáveis</p>
                        </div>
                    </div>
                </div>

                <div className="admin-stats-card">
                    <div className="flex items-center">
                        <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mr-4">
                            <span className="text-white text-xl">🔄</span>
                        </div>
                        <div>
                            <p className="admin-stats-value">
                                {sections.filter(s => new Date(s.updated_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length}
                            </p>
                            <p className="admin-stats-label">Atualizadas esta semana</p>
                        </div>
                    </div>
                </div>

                <div className="admin-stats-card">
                    <div className="flex items-center">
                        <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mr-4">
                            <span className="text-white text-xl">👁️</span>
                        </div>
                        <div>
                            <p className="admin-stats-value">
                                {heroSections.length + serviceSections.length}
                            </p>
                            <p className="admin-stats-label">Seções principais</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Botão para recarregar */}
            <div className="mt-8 text-center">
                <button
                    onClick={fetchSections}
                    className="admin-btn-secondary"
                >
                    <div className="flex items-center justify-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Atualizar lista de seções
                    </div>
                </button>

                <p className="text-sm text-gray-500 mt-4">
                    Dica: As alterações são aplicadas imediatamente no site público
                </p>
            </div>
        </div>
    );
}