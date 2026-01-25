// app/api/upload/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getDbConnection } from '@/lib/db';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('image') as File;
        const imageKey = formData.get('key') as string;
        const altText = formData.get('altText') as string;

        if (!file || !imageKey) {
            return NextResponse.json(
                { error: 'Arquivo e chave de identificação são obrigatórios' },
                { status: 400 }
            );
        }

        // Criar nome único para o arquivo
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const fileExtension = file.name.split('.').pop();
        const fileName = `${imageKey}_${Date.now()}.${fileExtension}`;

        // Definir caminho de salvamento (dentro de 'public/uploads/')
        const uploadDir = path.join(process.cwd(), 'public', 'uploads');
        const filePath = path.join(uploadDir, fileName);

        // Salvar arquivo no sistema
        await writeFile(filePath, buffer);

        // Salvar referência no banco de dados
        const dbPath = `/uploads/${fileName}`;
        const connection = await getDbConnection();

        await connection.execute(
            `INSERT INTO page_images (image_key, file_path, alt_text) 
       VALUES (?, ?, ?) 
       ON DUPLICATE KEY UPDATE file_path = ?, alt_text = ?`,
            [imageKey, dbPath, altText, dbPath, altText]
        );

        return NextResponse.json({
            success: true,
            filePath: dbPath
        });
    } catch (error) {
        console.error('Erro no upload:', error);
        return NextResponse.json(
            { error: 'Falha no upload da imagem' },
            { status: 500 }
        );
    }
}