// app/api/data/hero/route.ts - VERSÃO CORRIGIDA
import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
    console.log('🔍 API /api/data/hero chamada');

    try {
        // Buscar dados do banco - BUSCA TODAS AS SEÇÕES
        const sections = await query<any[]>(
            'SELECT * FROM page_sections'
        );

        console.log('📊 Seções encontradas:', sections);

        // Buscar imagens
        const images = await query<any[]>(
            'SELECT * FROM page_images'
        );

        console.log('🖼️ Imagens encontradas:', images);

        // Organizar dados
        const sectionsMap: Record<string, any> = {};
        sections.forEach(section => {
            sectionsMap[section.section_key] = section;
        });

        console.log('🗺️ Mapa de seções:', sectionsMap);

        // Encontrar imagem do hero
        const heroImage = images.find(img =>
            img.image_key === 'hero_background' ||
            img.section === 'hero'
        );

        console.log('🎯 Imagem do hero encontrada:', heroImage);

        const responseData = {
            title: sectionsMap.hero_title?.title || 'Transformamos Ideias',
            subtitle: sectionsMap.hero_subtitle?.content || 'Criamos soluções visuais que destacam sua marca',
            service: sectionsMap.services.description?.content || 'Oferecemos tudo que sua empresa precisa para se destacar no mercado, desde materiais promocionais até sinalização completa.',
            backgroundImage: heroImage?.file_path || 'https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            // Dados adicionais para debug
            debug: {
                sectionsFound: sections.length,
                imagesFound: images.length,
                sectionKeys: Object.keys(sectionsMap),
                heroTitleExists: !!sectionsMap.hero_title,
                heroSubtitleExists: !!sectionsMap.hero_subtitle
            }
        };

        console.log('📦 Dados que serão retornados:', responseData);

        return NextResponse.json({
            success: true,
            data: responseData
        });

    } catch (error: any) {
        console.error('❌ ERRO na API hero:', {
            message: error.message,
            code: error.code,
            stack: error.stack
        });

        return NextResponse.json({
            success: false,
            error: 'Erro ao buscar dados',
            message: error.message,
            debug: process.env.NODE_ENV === 'development' ? error.stack : undefined
        }, { status: 500 });
    }
}