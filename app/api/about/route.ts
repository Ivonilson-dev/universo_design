// app/api/data/about/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
    try {
        // Buscar dados do banco
        const [sections] = await query<any[]>(
            'SELECT * FROM page_sections WHERE section_key IN ("about_title", "about_description")'
        );

        const [images] = await query<any[]>(
            'SELECT * FROM page_images WHERE section = "about"'
        );

        // Organizar dados
        const sectionsMap: Record<string, any> = {};
        (sections as any[]).forEach(section => {
            sectionsMap[section.section_key] = section;
        });

        const aboutImage = (images as any[]).find(img => img.image_key === 'about_main_image');

        return NextResponse.json({
            success: true,
            data: {
                title: sectionsMap.about_title?.title || 'Há mais de 10 anos transformando ideias em realidade',
                description: sectionsMap.about_description?.content || 'Somos uma empresa apaixonada por comunicação visual, unindo criatividade, tecnologia e qualidade para entregar soluções que realmente fazem a diferença.',
                mainImage: aboutImage?.file_path || 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
            }
        });

    } catch (error) {
        console.error('Erro na API about:', error);
        return NextResponse.json({
            success: true,
            data: {
                title: 'Há mais de 10 anos transformando ideias em realidade',
                description: 'Somos uma empresa apaixonada por comunicação visual, unindo criatividade, tecnologia e qualidade para entregar soluções que realmente fazem a diferença.',
                mainImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
            }
        });
    }
}