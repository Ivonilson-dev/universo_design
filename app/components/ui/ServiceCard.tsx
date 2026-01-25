// components/ui/ServiceCard.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronRight, ExternalLink } from 'lucide-react';

interface ServiceCardProps {
    service: {
        icon: React.ReactNode;
        title: string;
        description: string;
        features: string[];
        image: string;
        color: string;
    };
    index: number;
}

export default function ServiceCard({ service, index }: ServiceCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="group relative h-full bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Background Image with Gradient */}
            <div className="absolute inset-0 overflow-hidden">
                <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className={`absolute inset-0 bg-gradient-to-b ${service.color} opacity-90`} />
            </div>

            {/* Content */}
            <div className="relative p-8 h-full flex flex-col text-white">
                {/* Icon */}
                <div className={`w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-8 transition-all duration-300 ${isHovered ? 'scale-110 rotate-3' : ''}`}>
                    <div className="w-12 h-12 bg-white/30 rounded-xl flex items-center justify-center">
                        {service.icon}
                    </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>

                {/* Description */}
                <p className="text-white/90 mb-8 leading-relaxed flex-grow">{service.description}</p>

                {/* Features */}
                <ul className="space-y-3 mb-10">
                    {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-white/90">
                            <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                            <span className="font-medium">{feature}</span>
                        </li>
                    ))}
                </ul>

                {/* Button */}
                <div className="mt-auto">
                    <button className="w-full py-4 bg-white/20 backdrop-blur-sm rounded-xl font-semibold hover:bg-white/30 transition-all duration-300 flex items-center justify-center group/btn border border-white/30">
                        <span className="mr-3">Ver Detalhes</span>
                        <ExternalLink className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </button>
                </div>

                {/* Card Number */}
                <div className="absolute top-8 right-8 text-7xl font-bold text-white/10">
                    {String(index + 1).padStart(2, '0')}
                </div>
            </div>
        </div>
    );
}