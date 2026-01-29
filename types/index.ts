// types/index.ts - COMPLETO
export interface PageSection {
    id: number;
    section_key: string;
    title: string | null;
    content: string | null;
    updated_at: string;
}

export interface PageImage {
    id: number;
    image_key: string;
    file_path: string;
    alt_text: string | null;
    section: string | null;
    updated_at: string;
}

export interface AdminUser {
    id: number;
    email: string;
    password_hash: string;
    created_at: string;
}

export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
}