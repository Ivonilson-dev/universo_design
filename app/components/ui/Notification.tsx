// components/ui/Notification.tsx
'use client';

import { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react';

type NotificationType = 'success' | 'error' | 'info' | 'warning';

interface NotificationProps {
    type: NotificationType;
    title: string;
    message: string;
    duration?: number;
    onClose?: () => void;
}

export default function Notification({
    type,
    title,
    message,
    duration = 5000,
    onClose
}: NotificationProps) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(() => onClose?.(), 300); // Aguarda animação
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(() => onClose?.(), 300);
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
            className={`fixed top-6 right-6 z-50 max-w-md w-full animate-slide-in ${bgColors[type]} border rounded-2xl shadow-2xl overflow-hidden transition-all duration-300`}
            role="alert"
        >
            <div className="p-6">
                <div className="flex items-start">
                    <div className="flex-shrink-0">
                        <div className={`p-2 rounded-xl ${type === 'success' ? 'bg-green-100' : type === 'error' ? 'bg-red-100' : type === 'info' ? 'bg-blue-100' : 'bg-yellow-100'}`}>
                            {icons[type]}
                        </div>
                    </div>

                    <div className="ml-4 flex-1">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className={`text-lg font-semibold ${textColors[type]}`}>
                                    {title}
                                </h3>
                                <p className={`mt-1 text-sm ${textColors[type]} opacity-90`}>
                                    {message}
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
                                    className={`h-full ${type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : type === 'info' ? 'bg-blue-500' : 'bg-yellow-500'} animate-progress`}
                                    style={{ animationDuration: `${duration}ms` }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}