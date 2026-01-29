// app/admin/layout.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SimpleNotificationManager from '../components/ui/SimpleNotification';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const navItems = [
        { href: '/admin', label: 'Dashboard', icon: '📊' },
        { href: '/admin/sections', label: 'Editar Seções', icon: '📝' },
        { href: '/admin/images', label: 'Gerenciar Imagens', icon: '🖼️' },
    ];

    return (
        <>
            {/* Sidebar */}
            <div className="admin-sidebar">
                <div className="p-6 border-b border-gray-800 hidden lg:block">
                    <h1 className="text-2xl font-bold">Universo Design</h1>
                    <p className="text-gray-400 text-sm mt-1">Painel Administrativo</p>
                </div>

                <nav className="p-4">
                    <ul className="space-y-1">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className={`admin-sidebar-item ${isActive ? 'admin-sidebar-item-active' : ''
                                            }`}
                                    >
                                        <span className="mr-3">{item.icon}</span>
                                        <span className="hidden lg:inline">{item.label}</span>
                                        <span className="lg:hidden text-xs">{item.label.split(' ')[0]}</span>
                                    </Link>
                                </li>
                            );
                        })}

                        <li className="pt-4 mt-4 border-t border-gray-800 hidden lg:block">
                            <Link
                                href="/"
                                target="_blank"
                                className="admin-sidebar-item"
                            >
                                <span className="mr-3">👁️</span>
                                <span>Ver Site Público</span>
                            </Link>
                        </li>
                    </ul>
                </nav>

                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800 hidden lg:block">
                    <div className="text-center text-gray-400 text-sm">
                        <p>Painel Administrativo</p>
                        <p className="text-xs mt-1">Universo Design © {new Date().getFullYear()}</p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="admin-main-content">
                <div className="admin-container">
                    {children}
                </div>
            </div>

            {/* Sistema de Notificações */}
            <SimpleNotificationManager />
        </>
    );
}