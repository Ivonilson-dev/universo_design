'use client';

import { useEffect, useRef } from 'react';
import HeroSection from './components/sections/HeroSection';
import ServicesSection from './components/sections/ServicesSection';
import PortfolioSection from './components/sections/PortfolioSection';
import AboutSection from './components/sections/AboutSection';
import ContactSection from './components/sections/ContactSection';
import Footer from './components/ui/FooterSection';
import Header from './components/ui/Header';
import ScrollToTop from './components/ui/ScrollToTop';

export default function Home() {
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  // Adiciona animação de entrada nas seções
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('section-fade-in');
        }
      });
    }, observerOptions);

    // Observa todas as seções
    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionsRef.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  return (
    <>
      <Header />
      <main>
        <section
          id="home"
          ref={(el) => { sectionsRef.current[0] = el; }}
          className="section-transition"
        >
          <HeroSection />
        </section>

        <section
          id="services"
          ref={(el) => { sectionsRef.current[1] = el; }}
          className="section-transition opacity-0"
        >
          <ServicesSection />
        </section>

        <section
          id="portfolio"
          ref={(el) => { sectionsRef.current[2] = el; }}
          className="section-transition opacity-0"
        >
          <PortfolioSection />
        </section>

        <section
          id="about"
          ref={(el) => { sectionsRef.current[3] = el; }}
          className="section-transition opacity-0"
        >
          <AboutSection />
        </section>

        <section
          id="contact"
          ref={(el) => { sectionsRef.current[4] = el; }}
          className="section-transition opacity-0"
        >
          <ContactSection />
        </section>
      </main>

      {/* Adicione o Footer se você tiver esse componente */}
      {/* <Footer /> */}

      <ScrollToTop />
    </>
  );
}