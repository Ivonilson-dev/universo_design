// app/api/upload/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { promises as fs } from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// GET - Listar todas as imagens
export async function GET() {
    try {
        console.log('🖼️ Buscando imagens...');

        const rows = await query<any[]>(
            'SELECT * FROM page_images ORDER BY image_key, updated_at DESC'
        );

        return NextResponse.json({
            success: true,
            data: rows
        });
    } catch (error: any) {
        console.error('❌ Erro ao buscar imagens:', error.message);
        return NextResponse.json(
            {
                success: false,
                error: 'Erro interno do servidor',
                details: process.env.NODE_ENV === 'development' ? error.message : undefined
            },
            { status: 500 }
        );
    }
}

// POST - Upload de nova imagem
export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();

        // Extrair dados do formulário
        const file = formData.get('image') as File;
        const imageKey = formData.get('imageKey') as string;
        const altText = formData.get('altText') as string;
        const section = formData.get('section') as string;

        // Validações
        if (!file) {
            return NextResponse.json(
                { success: false, error: 'Nenhum arquivo enviado' },
                { status: 400 }
            );
        }

        if (!imageKey) {
            return NextResponse.json(
                { success: false, error: 'Identificador da imagem (imageKey) é obrigatório' },
                { status: 400 }
            );
        }

        // Validar tipo do arquivo
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Tipo de arquivo não permitido. Use JPEG, PNG, GIF, WebP ou SVG.'
                },
                { status: 400 }
            );
        }

        // Validar tamanho (10MB máximo)
        const maxSize = 10 * 1024 * 1024; // 10MB
        if (file.size > maxSize) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Arquivo muito grande. Tamanho máximo: 10MB.'
                },
                { status: 400 }
            );
        }

        // Criar nome único para o arquivo
        const originalName = file.name;
        const fileExtension = originalName.split('.').pop()?.toLowerCase() || 'jpg';
        const fileName = `${uuidv4()}.${fileExtension}`;

        // Criar diretório baseado na seção
        const sectionFolder = section || 'general';
        const safeSectionFolder = sectionFolder.replace(/[^a-z0-9-_]/gi, '-').toLowerCase();
        const uploadDir = path.join(process.cwd(), 'public', 'uploads', safeSectionFolder);

        // Garantir que o diretório existe
        await fs.mkdir(uploadDir, { recursive: true });

        // Caminho completo e relativo
        const fullPath = path.join(uploadDir, fileName);
        const relativePath = `/uploads/${safeSectionFolder}/${fileName}`;

        // Converter File para Buffer e salvar
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        await fs.writeFile(fullPath, buffer);

        // Verificar se já existe imagem com esta key
        const existing = await query<any[]>(
            'SELECT id, file_path FROM page_images WHERE image_key = ?',
            [imageKey]
        );

        if (existing.length > 0) {
            // Atualizar imagem existente
            await query(
                `UPDATE page_images 
         SET file_path = ?, alt_text = ?, section = ? 
         WHERE image_key = ?`,
                [relativePath, altText || null, section || null, imageKey]
            );

            // Remover arquivo antigo se existir
            const oldPath = existing[0].file_path;
            if (oldPath !== relativePath) {
                try {
                    const oldFullPath = path.join(process.cwd(), 'public', oldPath);
                    await fs.unlink(oldFullPath).catch(() => { });
                } catch (error) {
                    console.warn('⚠️ Não foi possível remover o arquivo antigo:', error);
                }
            }
        } else {
            // Inserir nova imagem
            await query(
                `INSERT INTO page_images (image_key, file_path, alt_text, section) 
         VALUES (?, ?, ?, ?)`,
                [imageKey, relativePath, altText || null, section || null]
            );
        }

        // Buscar a imagem salva
        const savedImage = await query<any[]>(
            'SELECT * FROM page_images WHERE image_key = ?',
            [imageKey]
        );

        return NextResponse.json({
            success: true,
            message: existing.length > 0 ? 'Imagem atualizada com sucesso' : 'Imagem enviada com sucesso',
            data: {
                filePath: relativePath,
                image: savedImage[0] || null
            }
        });

    } catch (error: any) {
        console.error('❌ Erro no upload:', error);

        return NextResponse.json(
            {
                success: false,
                error: 'Erro interno no servidor',
                details: process.env.NODE_ENV === 'development' ? error.message : undefined
            },
            { status: 500 }
        );
    }
}

// DELETE - Remover imagem
export async function DELETE(request: NextRequest) {
    try {
        const { id } = await request.json();

        if (!id) {
            return NextResponse.json(
                { success: false, error: 'ID da imagem é obrigatório' },
                { status: 400 }
            );
        }

        // Buscar imagem antes de deletar
        const imageResult = await query<any[]>(
            'SELECT file_path FROM page_images WHERE id = ?',
            [id]
        );

        if (imageResult.length === 0) {
            return NextResponse.json(
                { success: false, error: 'Imagem não encontrada' },
                { status: 404 }
            );
        }

        const filePath = imageResult[0].file_path;

        // Remover do banco de dados
        await query(
            'DELETE FROM page_images WHERE id = ?',
            [id]
        );

        // Remover arquivo físico
        try {
            const fullPath = path.join(process.cwd(), 'public', filePath);
            await fs.unlink(fullPath);
        } catch (fileError) {
            console.warn('⚠️ Não foi possível remover o arquivo físico:', fileError);
        }

        return NextResponse.json({
            success: true,
            message: 'Imagem removida com sucesso'
        });
    } catch (error: any) {
        console.error('❌ Erro ao remover imagem:', error);
        return NextResponse.json(
            { success: false, error: 'Erro interno do servidor' },
            { status: 500 }
        );
    }
}