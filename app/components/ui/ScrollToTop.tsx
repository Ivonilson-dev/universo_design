'use client';

import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);
    const [progress, setProgress] = useState(0);

    // Mostra/esconde botão baseado no scroll
    useEffect(() => {
        const toggleVisibility = () => {
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
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    // Função para voltar ao topo com animação suave
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <>
            <button
                onClick={scrollToTop}
                className={`scroll-to-top-btn ${isVisible ? 'visible' : ''}`}
                aria-label="Voltar ao topo"
            >
                <ChevronUp className="w-6 h-6" />
            </button>
        </>
    );
}