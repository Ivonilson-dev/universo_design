// app/api/sections/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getDbConnection } from '@/lib/db';

// GET: Buscar todas as seções ou uma específica
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const sectionKey = searchParams.get('key');

    try {
        const connection = await getDbConnection();
        let query = 'SELECT * FROM page_sections';
        let params: any[] = [];

        if (sectionKey) {
            query += ' WHERE section_key = ?';
            params.push(sectionKey);
        }

        const [rows] = await connection.execute(query, params);
        return NextResponse.json(rows);
    } catch (error) {
        console.error('Erro ao buscar seções:', error);
        return NextResponse.json(
            { error: 'Erro ao buscar dados' },
            { status: 500 }
        );
    }
}

// PUT: Atualizar uma seção (protegido por autenticação)
export async function PUT(request: NextRequest) {
    // Em produção, adicione verificação de autenticação aqui
    try {
        const body = await request.json();
        const { id, content, title } = body;

        if (!id) {
            return NextResponse.json(
                { error: 'ID da seção é obrigatório' },
                { status: 400 }
            );
        }

        const connection = await getDbConnection();
        const [result] = await connection.execute(
            'UPDATE page_sections SET content = ?, title = ? WHERE id = ?',
            [content, title, id]
        );

        return NextResponse.json({ success: true, result });
    } catch (error) {
        console.error('Erro ao atualizar seção:', error);
        return NextResponse.json(
            { error: 'Erro ao atualizar dados' },
            { status: 500 }
        );
    }
}