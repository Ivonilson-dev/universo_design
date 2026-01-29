// lib/db.ts
import mysql from 'mysql2/promise';

export interface DBConfig {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
}

function getDbConfig(): DBConfig {
    const config = {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '3306'),
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'universo_design_local',
    };

    return config;
}

// Cria uma nova conexão para cada requisição
export async function getDbConnection(): Promise<mysql.Connection> {
    const config = getDbConfig();

    const connection = await mysql.createConnection(config);
    return connection;
}

// Função helper para executar queries e fechar conexão automaticamente
export async function query<T = any>(sql: string, params?: any[]): Promise<T> {
    let connection: mysql.Connection | null = null;

    try {
        connection = await getDbConnection();
        const [rows] = await connection.execute(sql, params);
        return rows as T;
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}