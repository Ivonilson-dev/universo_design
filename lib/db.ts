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
    // Pode-se expandir para diferentes ambientes (dev/prod) [citation:3]
    return {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '3306'),
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'universo_design',
    };
}

let connection: mysql.Connection | null = null;

export async function getDbConnection(): Promise<mysql.Connection> {
    if (connection) {
        return connection;
    }

    const config = getDbConfig();
    connection = await mysql.createConnection(config);
    return connection;
}