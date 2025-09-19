'use client';

import { Carousel, CarouselContent, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useIsDesktop } from '@/hooks/use-desktop';
import { type ICarouselBlock } from '@/types/blocks.type';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import CarouselSlide from '../component-block/carousel-slide';

const MAX_HEIGHTS: Record<string, string> = {
    base: '20vh',
    md: '18vh',
    lg: '28vh',
    xl: '60vh',
};

function useBreakpointValue(values: Record<string, string>) {
    const [value, setValue] = useState(values.base);

    React.useEffect(() => {
        function update() {
            const width = window.innerWidth;
            if (width >= 1280) setValue(values.xl ?? values.lg ?? values.md ?? values.base);
            else if (width >= 1024) setValue(values.lg ?? values.md ?? values.base);
            else if (width >= 768) setValue(values.md ?? values.base);
            else setValue(values.base);
        }
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, [values]);

    return value;
}

const CarouselBlock: React.FC<ICarouselBlock> = ({ data }) => {
    const { carousel_title, section_anchor, slides = [] } = data || {};
    const isDesktop = useIsDesktop();
    const maxHeight = useBreakpointValue(MAX_HEIGHTS);

    return (
        <section className="w-full px-6 py-12 md:px-8 lg:px-12 xl:px-20" id={section_anchor}>
            <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                viewport={{ once: true, amount: 0.5 }}
                className="mb-8 text-xl md:text-3xl"
                dangerouslySetInnerHTML={{ __html: carousel_title ?? '' }}
            />

            <div className="relative">
                <Carousel
                    opts={{
                        align: 'start',
                        loop: true,
                    }}
                    className="w-full"
                >
                    <CarouselContent className="md:w-full md:space-x-8">
                        {slides.map((slides, index) => (
                            <CarouselSlide key={index} slides={slides} isDesktop={isDesktop} maxHeight={maxHeight} />
                        ))}
                    </CarouselContent>

                    {/* Navigation: posisikan persis di sisi card */}
                    <CarouselPrevious className="absolute left-2 top-1/2 -translate-x-6 -translate-y-1/2 rounded-full bg-white shadow-md hover:bg-neutral-400" />
                    <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 translate-x-6 rounded-full bg-white shadow-md hover:bg-neutral-400" />
                </Carousel>
            </div>
        </section>
    );
};

export default CarouselBlock;
