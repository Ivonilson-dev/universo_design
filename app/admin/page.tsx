// app/admin/page.tsx
'use client';

import { useState, useEffect } from 'react';
//import AdminSectionEditor from '@/components/admin/AdminSectionEditor';
//import AdminImageManager from '@/components/admin/AdminImageManager';

export default function AdminPage() {
    const [sections, setSections] = useState<any[]>([]);
    const [activeTab, setActiveTab] = useState<'text' | 'images'>('text');

    useEffect(() => {
        fetchSections();
    }, []);

    const fetchSections = async () => {
        const res = await fetch('/api/sections');
        const data = await res.json();
        setSections(data);
    };

    const handleSave = async (id: number, content: string, title: string) => {
        await fetch('/api/sections', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, content, title }),
        });
        fetchSections(); // Atualizar lista
    };

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Painel Administrativo - Universo Design</h1>

            {/* Tabs */}
            <div className="border-b mb-6">
                <button
                    className={`px-4 py-2 font-medium ${activeTab === 'text' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('text')}
                >
                    Editar Textos
                </button>
                <button
                    className={`px-4 py-2 font-medium ${activeTab === 'images' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('images')}
                >
                    Gerenciar Imagens
                </button>
            </div>

            {/* Conteúdo das Tabs */}
            {activeTab === 'text' ? (
                <div className="space-y-6">
                    {sections.map((section) => (
                        <AdminSectionEditor
                            key={section.id}
                            section={section}
                            onSave={handleSave}
                        />
                    ))}
                </div>
            ) : (
                <AdminImageManager />
            )}
        </div>
    );
}