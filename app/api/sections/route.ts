// app/api/sections/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
    console.log('🔍 API /api/sections chamada');

    try {
        console.log('📊 Executando query de seções...');

        const rows = await query<any[]>(
            'SELECT * FROM page_sections ORDER BY section_key'
        );

        console.log(`✅ Query executada. ${rows.length} seções encontradas.`);

        return NextResponse.json({
            success: true,
            data: rows,
            count: rows.length
        });

    } catch (error: any) {
        console.error('❌ ERRO na API /api/sections:', error.message);

        return NextResponse.json(
            {
                success: false,
                error: 'Erro ao buscar seções',
                message: process.env.NODE_ENV === 'development' ? error.message : undefined
            },
            { status: 500 }
        );
    }
}

export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const { id, title, content } = body;

        console.log(`📝 Atualizando seção ID: ${id}`);

        if (!id) {
            return NextResponse.json(
                { success: false, error: 'ID da seção é obrigatório' },
                { status: 400 }
            );
        }

        await query(
            'UPDATE page_sections SET title = ?, content = ? WHERE id = ?',
            [title || null, content || null, id]
        );

        const updatedRows = await query<any[]>(
            'SELECT * FROM page_sections WHERE id = ?',
            [id]
        );

        return NextResponse.json({
            success: true,
            message: 'Seção atualizada com sucesso',
            data: updatedRows[0] || null
        });

    } catch (error: any) {
        console.error('❌ ERRO ao atualizar seção:', error.message);

        return NextResponse.json(
            {
                success: false,
                error: 'Erro ao atualizar seção',
                message: process.env.NODE_ENV === 'development' ? error.message : undefined
            },
            { status: 500 }
        );
    }
}