// lib/data-service.ts - VERSÃO COMPLETA E CORRIGIDA
import { query } from '@/lib/db';

// Buscar todas as seções de texto
export async function getPageSections() {
    try {
        const sections = await query<any[]>(
            'SELECT * FROM page_sections ORDER BY section_key'
        );

        // Converter para objeto com section_key como chave
        const sectionsMap: Record<string, any> = {};
        sections.forEach(section => {
            sectionsMap[section.section_key] = section;
        });

        return sectionsMap;
    } catch (error) {
        console.error('Erro ao buscar seções:', error);
        return {};
    }
}

// Buscar todas as imagens
export async function getPageImages() {
    try {
        const images = await query<any[]>(
            'SELECT * FROM page_images ORDER BY section, image_key'
        );

        // Organizar por seção
        const imagesMap: Record<string, Record<string, any>> = {};
        images.forEach(image => {
            const section = image.section || 'general';
            if (!imagesMap[section]) {
                imagesMap[section] = {};
            }
            imagesMap[section][image.image_key] = image;
        });

        return imagesMap;
    } catch (error) {
        console.error('Erro ao buscar imagens:', error);
        return {};
    }
}

// Buscar dados específicos para cada seção
export async function getHeroData() {
    try {
        const sections = await getPageSections();
        const images = await getPageImages();

        return {
            title: sections.hero_title?.title || 'Transformamos Ideias',
            subtitle: sections.hero_subtitle?.content || 'Criamos soluções visuais que destacam sua marca',
            backgroundImage: images.hero?.hero_background?.file_path || 'https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
        };
    } catch (error) {
        console.error('Erro ao buscar dados do hero:', error);
        return {
            title: 'Transformamos Ideias',
            subtitle: 'Criamos soluções visuais que destacam sua marca',
            backgroundImage: 'https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
        };
    }
}

export async function getServicesData() {
    try {
        const sections = await getPageSections();

        return {
            title: sections.services_title?.title || 'Soluções Completas em Comunicação Visual',
            description: sections.services_description?.content || 'Oferecemos tudo que sua empresa precisa para se destacar no mercado, desde materiais promocionais até sinalização completa.'
        };
    } catch (error) {
        console.error('Erro ao buscar dados dos serviços:', error);
        return {
            title: 'Soluções Completas em Comunicação Visual',
            description: 'Oferecemos tudo que sua empresa precisa para se destacar no mercado, desde materiais promocionais até sinalização completa.'
        };
    }
}

export async function getAboutData() {
    try {
        const sections = await getPageSections();
        const images = await getPageImages();

        return {
            title: sections.about_title?.title || 'Há mais de 10 anos transformando ideias em realidade',
            description: sections.about_description?.content || 'Somos uma empresa apaixonada por comunicação visual, unindo criatividade, tecnologia e qualidade para entregar soluções que realmente fazem a diferença.',
            mainImage: images.about?.about_main_image?.file_path || 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
        };
    } catch (error) {
        console.error('Erro ao buscar dados sobre:', error);
        return {
            title: 'Há mais de 10 anos transformando ideias em realidade',
            description: 'Somos uma empresa apaixonada por comunicação visual, unindo criatividade, tecnologia e qualidade para entregar soluções que realmente fazem a diferença.',
            mainImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
        };
    }
}