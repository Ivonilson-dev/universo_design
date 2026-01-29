// components/ui/SimpleNotification.tsx - CÓDIGO COMPLETO
'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react';

type NotificationType = 'success' | 'error' | 'info' | 'warning';

interface NotificationData {
    id: number;
    type: NotificationType;
    title: string;
    message: string;
}

// Variável global para gerenciar notificações
let notifications: NotificationData[] = [];
let updateCallback: ((notifs: NotificationData[]) => void) | null = null;

// Funções para mostrar notificações
export function showNotification(type: NotificationType, title: string, message: string) {
    const id = Date.now();
    const newNotification: NotificationData = { id, type, title, message };

    notifications = [...notifications, newNotification];

    // Remove automaticamente após 5 segundos
    setTimeout(() => {
        notifications = notifications.filter(n => n.id !== id);
        if (updateCallback) updateCallback([...notifications]);
    }, 5000);

    if (updateCallback) updateCallback([...notifications]);
}

export function showSuccess(title: string, message: string) {
    showNotification('success', title, message);
}

export function showError(title: string, message: string) {
    showNotification('error', title, message);
}

export function showInfo(title: string, message: string) {
    showNotification('info', title, message);
}

export function showWarning(title: string, message: string) {
    showNotification('warning', title, message);
}

// Componente de notificação
function NotificationItem({ notification, onClose }: {
    notification: NotificationData,
    onClose: () => void
}) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
        }, 5000);

        return () => clearTimeout(timer);
    }, [onClose]);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 300);
    };

    const icons = {
        success: <CheckCircle className="w-6 h-6 text-green-500" />,
        error: <XCircle className="w-6 h-6 text-red-500" />,
        info: <Info className="w-6 h-6 text-blue-500" />,
        warning: <AlertTriangle className="w-6 h-6 text-yellow-500" />
    };

    const bgColors = {
        success: 'bg-green-50 border-green-200',
        error: 'bg-red-50 border-red-200',
        info: 'bg-blue-50 border-blue-200',
        warning: 'bg-yellow-50 border-yellow-200'
    };

    const textColors = {
        success: 'text-green-800',
        error: 'text-red-800',
        info: 'text-blue-800',
        warning: 'text-yellow-800'
    };

    if (!isVisible) return null;

    return (
        <div
            className={`mb-4 max-w-md w-full animate-slide-in ${bgColors[notification.type]} border rounded-2xl shadow-2xl overflow-hidden transition-all duration-300`}
            role="alert"
        >
            <div className="p-6">
                <div className="flex items-start">
                    <div className="flex-shrink-0">
                        <div className={`p-2 rounded-xl ${notification.type === 'success' ? 'bg-green-100' : notification.type === 'error' ? 'bg-red-100' : notification.type === 'info' ? 'bg-blue-100' : 'bg-yellow-100'}`}>
                            {icons[notification.type]}
                        </div>
                    </div>

                    <div className="ml-4 flex-1">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className={`text-lg font-semibold ${textColors[notification.type]}`}>
                                    {notification.title}
                                </h3>
                                <p className={`mt-1 text-sm ${textColors[notification.type]} opacity-90`}>
                                    {notification.message}
                                </p>
                            </div>
                            <button
                                onClick={handleClose}
                                className="ml-4 p-1 rounded-lg hover:bg-white/50 transition-colors"
                                aria-label="Fechar notificação"
                            >
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        {/* Progress Bar */}
                        <div className="mt-4">
                            <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className={`h-full ${notification.type === 'success' ? 'bg-green-500' : notification.type === 'error' ? 'bg-red-500' : notification.type === 'info' ? 'bg-blue-500' : 'bg-yellow-500'} animate-progress`}
                                    style={{ animationDuration: '5000ms' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Componente para renderizar todas as notificações
export default function SimpleNotificationManager() {
    const [currentNotifications, setCurrentNotifications] = useState<NotificationData[]>([]);

    useEffect(() => {
        // Atualiza o callback quando o componente monta
        updateCallback = setCurrentNotifications;
        // Inicializa com as notificações existentes
        setCurrentNotifications([...notifications]);

        return () => {
            updateCallback = null;
        };
    }, []);

    const handleClose = (id: number) => {
        notifications = notifications.filter(n => n.id !== id);
        setCurrentNotifications([...notifications]);
    };

    return (
        <div className="fixed top-6 right-6 z-50">
            {currentNotifications.map(notification => (
                <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onClose={() => handleClose(notification.id)}
                />
            ))}
        </div>
    );
}