'use client';

import { useState, useEffect, useCallback } from 'react';
import { ChevronUp } from 'lucide-react';

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);
    const [progress, setProgress] = useState(0);

    // Função para atualizar progresso com throttle
    useEffect(() => {
        let ticking = false;

        const updateProgress = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    // Mostra/esconde botão baseado no scroll
                    if (window.scrollY > 500) {
                        setIsVisible(true);
                    } else {
                        setIsVisible(false);
                    }

                    // Calcula progresso do scroll
                    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
                    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                    const scrolled = (winScroll / height) * 100;
                    setProgress(scrolled);

                    // Atualiza a barra de progresso
                    const progressBar = document.getElementById('scrollProgress');
                    if (progressBar) {
                        progressBar.style.width = scrolled + '%';
                    }

                    ticking = false;
                });

                ticking = true;
            }
        };

        window.addEventListener('scroll', updateProgress, { passive: true });
        return () => window.removeEventListener('scroll', updateProgress);
    }, []);

    // Função para voltar ao topo
    const scrollToTop = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, []);

    return (
        <button
            onClick={scrollToTop}
            className={`scroll-to-top-btn ${isVisible ? 'visible' : ''}`}
            aria-label="Voltar ao topo"
            type="button" // Importante: previne comportamento de submit
        >
            <ChevronUp className="w-6 h-6" />
        </button>
    );
}