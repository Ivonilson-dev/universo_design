// app/admin/images/page.tsx - COMPLETO
'use client';

import { useState, useEffect, useRef } from 'react';
import { PageImage } from '@/types';

export default function ManageImagesPage() {
    const [images, setImages] = useState<PageImage[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Formulário
    const [formData, setFormData] = useState({
        imageKey: '',
        altText: '',
        section: 'hero',
    });

    // Buscar imagens
    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/upload');
            const result = await response.json();

            if (result.success && result.data) {
                setImages(result.data);
            } else {
                setErrorMessage(result.error || 'Erro ao carregar imagens');
            }
        } catch (error) {
            console.error('Erro ao buscar imagens:', error);
            setErrorMessage('Erro de conexão com o servidor');
        } finally {
            setLoading(false);
        }
    };

    // Lidar com seleção de arquivo
    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Criar preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    // Enviar imagem
    const handleUpload = async () => {
        const file = fileInputRef.current?.files?.[0];
        if (!file) {
            setErrorMessage('Por favor, selecione um arquivo');
            return;
        }

        if (!formData.imageKey.trim()) {
            setErrorMessage('Por favor, insira um identificador (Image Key)');
            return;
        }

        setUploading(true);
        setErrorMessage('');
        setSuccessMessage('');

        const uploadData = new FormData();
        uploadData.append('image', file);
        uploadData.append('imageKey', formData.imageKey.trim());
        uploadData.append('altText', formData.altText.trim());
        uploadData.append('section', formData.section);

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: uploadData,
            });

            const result = await response.json();

            if (result.success) {
                setSuccessMessage(result.message || '✅ Imagem enviada com sucesso!');

                // Resetar formulário
                setFormData({
                    imageKey: '',
                    altText: '',
                    section: 'hero',
                });
                setPreview(null);
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }

                // Atualizar lista
                fetchImages();

                // Remover mensagem após 3 segundos
                setTimeout(() => setSuccessMessage(''), 3000);
            } else {
                setErrorMessage(`❌ Erro: ${result.error}`);
            }
        } catch (error) {
            console.error('Erro no upload:', error);
            setErrorMessage('❌ Erro ao enviar imagem');
        } finally {
            setUploading(false);
        }
    };

    // Excluir imagem
    const handleDelete = async (id: number, imageKey: string) => {
        if (!confirm(`Tem certeza que deseja excluir a imagem "${imageKey}"?`)) {
            return;
        }

        try {
            const response = await fetch('/api/upload', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });

            const result = await response.json();

            if (result.success) {
                setSuccessMessage('✅ Imagem excluída com sucesso!');
                setDeleteConfirm(null);

                // Atualizar lista
                fetchImages();

                // Remover mensagem após 3 segundos
                setTimeout(() => setSuccessMessage(''), 3000);
            } else {
                setErrorMessage(`❌ Erro ao excluir: ${result.error}`);
            }
        } catch (error) {
            console.error('Erro ao excluir imagem:', error);
            setErrorMessage('❌ Erro ao excluir imagem');
        }
    };

    // Opções de seção
    const sectionOptions = [
        { value: 'hero', label: '🏠 Hero/Banner Principal' },
        { value: 'services', label: '🛠️ Serviços' },
        { value: 'about', label: '👥 Sobre Nós' },
        { value: 'portfolio', label: '🎨 Portfólio' },
        { value: 'testimonials', label: '⭐ Depoimentos' },
        { value: 'team', label: '👨‍👩‍👧‍👦 Equipe' },
        { value: 'contact', label: '📞 Contato' },
        { value: 'general', label: '📦 Geral' },
    ];

    // Sugestões de keys
    const keySuggestions = [
        'hero_background',
        'hero_banner',
        'service_1_image',
        'service_2_image',
        'service_3_image',
        'about_us_image',
        'portfolio_1',
        'portfolio_2',
        'team_member_1',
        'logo',
        'favicon',
        'social_facebook',
        'social_instagram',
    ];

    // Agrupar imagens por seção
    const imagesBySection = images.reduce((acc, image) => {
        const section = image.section || 'general';
        if (!acc[section]) {
            acc[section] = [];
        }
        acc[section].push(image);
        return acc;
    }, {} as Record<string, PageImage[]>);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-96">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Carregando imagens...</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            {/* Cabeçalho */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Gerenciar Imagens</h1>
                <p className="text-gray-600 mt-2">
                    Faça upload e gerencie todas as imagens do seu site
                </p>
            </div>

            {/* Mensagens */}
            {(successMessage || errorMessage) && (
                <div className={`mb-6 p-4 rounded-lg animate-fade-in ${successMessage
                        ? 'bg-green-100 border border-green-200 text-green-800'
                        : 'bg-red-100 border border-red-200 text-red-800'
                    }`}>
                    <div className="flex items-center">
                        {successMessage ? (
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                        )}
                        {successMessage || errorMessage}
                    </div>
                </div>
            )}

            {/* Área de Upload */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                    <span className="mr-2">📤</span>
                    Enviar Nova Imagem
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Formulário */}
                    <div className="space-y-6">
                        {/* Selecione arquivo */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Selecione a imagem *
                            </label>
                            <div className="flex items-center">
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileSelect}
                                    accept="image/*"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 transition-colors"
                                />
                            </div>
                            <p className="text-xs text-gray-500 mt-2">
                                Formatos: JPG, PNG, GIF, WebP, SVG. Tamanho máximo: 10MB
                            </p>
                        </div>

                        {/* Image Key */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Identificador da Imagem (Image Key) *
                            </label>
                            <input
                                type="text"
                                value={formData.imageKey}
                                onChange={(e) => setFormData({ ...formData, imageKey: e.target.value })}
                                placeholder="Ex: hero_background, service_1_image"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            />
                            <div className="mt-3">
                                <p className="text-xs text-gray-600 mb-2">Sugestões rápidas:</p>
                                <div className="flex flex-wrap gap-2">
                                    {keySuggestions.map(key => (
                                        <button
                                            key={key}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, imageKey: key })}
                                            className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                                        >
                                            {key}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Seção */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Seção do Site
                            </label>
                            <select
                                value={formData.section}
                                onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            >
                                {sectionOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Texto Alternativo */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Texto Alternativo (SEO/Acessibilidade)
                            </label>
                            <input
                                type="text"
                                value={formData.altText}
                                onChange={(e) => setFormData({ ...formData, altText: e.target.value })}
                                placeholder="Descreva brevemente a imagem para acessibilidade"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            />
                            <p className="text-xs text-gray-500 mt-2">
                                Importante para SEO e leitores de tela
                            </p>
                        </div>

                        {/* Botão Upload */}
                        <button
                            onClick={handleUpload}
                            disabled={uploading}
                            className={`w-full py-4 rounded-lg font-medium text-lg transition-all flex items-center justify-center ${uploading
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-sm hover:shadow'
                                }`}
                        >
                            {uploading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Enviando...
                                </>
                            ) : (
                                <>
                                    <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                    Enviar Imagem
                                </>
                            )}
                        </button>
                    </div>

                    {/* Preview */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Pré-visualização
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg h-full min-h-[300px] flex items-center justify-center bg-gray-50">
                            {preview ? (
                                <div className="text-center p-4 w-full">
                                    <div className="relative inline-block">
                                        <img
                                            src={preview}
                                            alt="Preview"
                                            className="max-h-64 max-w-full mx-auto rounded-lg shadow-sm"
                                        />
                                        <div className="mt-4 p-3 bg-white rounded-lg border border-gray-200">
                                            <p className="text-sm font-medium text-gray-800 truncate">
                                                {fileInputRef.current?.files?.[0]?.name}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                Tamanho: {(fileInputRef.current?.files?.[0]?.size || 0 / 1024 / 1024).toFixed(2)} MB
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center text-gray-400 p-8">
                                    <div className="text-6xl mb-4 opacity-50">🖼️</div>
                                    <p className="text-lg font-medium mb-2">Nenhuma imagem selecionada</p>
                                    <p className="text-sm">Selecione um arquivo para visualizar aqui</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Lista de Imagens Existentes */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center">
                        <span className="mr-2">📋</span>
                        Imagens Cadastradas ({images.length})
                    </h2>
                    <button
                        onClick={fetchImages}
                        className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
                    >
                        🔄 Atualizar
                    </button>
                </div>

                {images.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4 text-gray-300">🖼️</div>
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">Nenhuma imagem cadastrada</h3>
                        <p className="text-gray-500">
                            Use o formulário acima para enviar sua primeira imagem.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {Object.entries(imagesBySection).map(([section, sectionImages]) => (
                            <div key={section} className="border border-gray-200 rounded-lg overflow-hidden">
                                <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
                                    <h3 className="font-semibold text-gray-800 capitalize flex items-center">
                                        <span className="mr-2">
                                            {section === 'hero' && '🏠'}
                                            {section === 'services' && '🛠️'}
                                            {section === 'about' && '👥'}
                                            {section === 'portfolio' && '🎨'}
                                            {section === 'general' && '📦'}
                                            {!['hero', 'services', 'about', 'portfolio', 'general'].includes(section) && '📁'}
                                        </span>
                                        {section === 'general' ? 'Geral' : section.replace('_', ' ')} ({sectionImages.length})
                                    </h3>
                                </div>
                                <div className="p-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {sectionImages.map((image) => (
                                            <div key={image.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow bg-white">
                                                <div className="h-48 bg-gray-100 flex items-center justify-center p-4">
                                                    <img
                                                        src={image.file_path}
                                                        alt={image.alt_text || image.image_key}
                                                        className="max-h-full max-w-full object-contain"
                                                        onError={(e) => {
                                                            (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23e5e7eb"/><text x="50" y="50" text-anchor="middle" dy=".3em" fill="%239ca3af" font-family="Arial">Imagem não encontrada</text></svg>';
                                                        }}
                                                    />
                                                </div>
                                                <div className="p-4">
                                                    <div className="flex justify-between items-start mb-3">
                                                        <div className="flex-1 min-w-0">
                                                            <h4 className="font-medium text-gray-800 truncate">
                                                                {image.image_key}
                                                            </h4>
                                                            <p className="text-xs text-gray-500 mt-1">
                                                                ID: {image.id}
                                                            </p>
                                                        </div>
                                                        <button
                                                            onClick={() => handleDelete(image.id, image.image_key)}
                                                            className="ml-2 p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                                                            title="Excluir imagem"
                                                        >
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                        </button>
                                                    </div>

                                                    {image.alt_text && (
                                                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                                            {image.alt_text}
                                                        </p>
                                                    )}

                                                    <div className="space-y-2">
                                                        <div className="flex items-center text-xs text-gray-500">
                                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                            </svg>
                                                            <span>
                                                                {new Date(image.updated_at).toLocaleDateString('pt-BR')}
                                                            </span>
                                                        </div>

                                                        <div className="text-xs">
                                                            <span className="text-gray-700 font-medium">Caminho:</span>
                                                            <div className="flex items-center mt-1">
                                                                <code className="flex-1 bg-gray-50 p-2 rounded text-gray-600 text-xs truncate">
                                                                    {image.file_path}
                                                                </code>
                                                                <button
                                                                    onClick={() => {
                                                                        navigator.clipboard.writeText(image.file_path);
                                                                        alert('Caminho copiado!');
                                                                    }}
                                                                    className="ml-2 p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
                                                                    title="Copiar caminho"
                                                                >
                                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                                    </svg>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Instruções */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-blue-800 mb-4">📚 Como usar o gerenciador de imagens</h3>
                    <ul className="space-y-3 text-blue-700">
                        <li className="flex items-start">
                            <span className="text-blue-500 mr-2">•</span>
                            <span><strong>Image Key:</strong> Identificador único usado no código para referenciar cada imagem</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-blue-500 mr-2">•</span>
                            <span><strong>Mesma Key:</strong> Ao enviar imagem com Key existente, a anterior será substituída</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-blue-500 mr-2">•</span>
                            <span><strong>Organização:</strong> Use seções para organizar suas imagens</span>
                        </li>
                    </ul>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-green-800 mb-4">💡 Melhores práticas</h3>
                    <ul className="space-y-3 text-green-700">
                        <li className="flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            <span>Use nomes descritivos: <code>hero_background</code>, <code>service_icon_1</code></span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            <span>Otimize imagens antes do upload (compressão)</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            <span>Sempre preencha o texto alternativo para acessibilidade</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Estatísticas */}
            <div className="mt-8 bg-gray-50 border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">📊 Estatísticas</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="text-2xl font-bold text-blue-600">{images.length}</div>
                        <div className="text-sm text-gray-600">Total de Imagens</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="text-2xl font-bold text-green-600">
                            {Object.keys(imagesBySection).length}
                        </div>
                        <div className="text-sm text-gray-600">Seções</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="text-2xl font-bold text-purple-600">
                            {images.filter(img => img.alt_text).length}
                        </div>
                        <div className="text-sm text-gray-600">Com texto alternativo</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="text-2xl font-bold text-orange-600">
                            {images.length > 0
                                ? new Date(Math.max(...images.map(img => new Date(img.updated_at).getTime())))
                                    .toLocaleDateString('pt-BR')
                                : '-'
                            }
                        </div>
                        <div className="text-sm text-gray-600">Última atualização</div>
                    </div>
                </div>
            </div>
        </div>
    );
}