import { getRelativePath } from '@/lib/get-relative-path';
import { AnimatePresence, motion } from 'motion/react';
import React, { useState } from 'react';
import { CarouselItem } from '../ui/carousel';

interface CarouselSlideProps {
    slides: {
        slide_title?: string;
        slide_description?: string;
        background_url: string;
    };
    isDesktop?: boolean;
    maxHeight: string;
}

const CarouselSlide: React.FC<CarouselSlideProps> = ({ slides, isDesktop, maxHeight }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isOverflowing, setIsOverflowing] = useState(false);

    const contentRef = React.useRef<HTMLParagraphElement>(null);

    const active = isDesktop ? isHovered : isExpanded;

    React.useEffect(() => {
        if (contentRef.current) {
            const el = contentRef.current;
            const lineHeight = parseFloat(getComputedStyle(el).lineHeight || '20');
            const maxClamp = lineHeight * 3;
            setIsOverflowing(el.scrollHeight > maxClamp + 2);
        }
    }, [slides.slide_description]);

    return (
        <CarouselItem className="pb-2 md:basis-[41%] lg:basis-[43%] xl:basis-[45%]">
            <div
                className="group relative flex flex-col overflow-hidden rounded-2xl shadow-[6px_6px_15px_rgba(0,0,0,0.15)]"
                {...(isDesktop && isOverflowing
                    ? {
                          onMouseEnter: () => setIsHovered(true),
                          onMouseLeave: () => setIsHovered(false),
                      }
                    : {})}
            >
                {/* Image */}
                <img
                    src={getRelativePath(slides.background_url)}
                    alt={slides.slide_title}
                    className="h-full w-full object-cover lg:h-[500px] lg:w-auto"
                    draggable="false"
                />

                {/* Overlay */}
                <motion.div
                    animate={{
                        backgroundColor: active ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.65)',
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-0 w-full p-4 md:p-6"
                >
                    <h3 className="text-md font-bold text-[#1A5DA4]">{slides.slide_title}</h3>
                    
                    <div className="relative mt-2 w-full">
                        <AnimatePresence initial={false}>
                            <motion.div
                                key={active ? 'expanded' : 'collapsed'}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{
                                    opacity: 1,
                                    height: 'auto',
                                    maxHeight: active && isOverflowing ? maxHeight : '4.5rem',
                                }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.4, ease: 'easeInOut' }}
                                className="overflow-y-auto xl:overflow-hidden"
                            >
                                <p
                                    ref={contentRef}
                                    className={`${
                                        active
                                            ? 'whitespace-pre-line leading-relaxed'
                                            : 'line-clamp-3 overflow-hidden whitespace-pre-line leading-relaxed'
                                    }`}
                                    dangerouslySetInnerHTML={{
                                        __html: slides.slide_description ?? '',
                                    }}
                                />
                            </motion.div>
                        </AnimatePresence>

                        {/* Mobile CTA */}
                        {isOverflowing && (
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="relative z-10 mt-3 inline-flex items-center gap-2 rounded-lg bg-black/30 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm hover:bg-black/45 lg:hidden"
                                aria-expanded={isExpanded}
                            >
                                {isExpanded ? 'Show less' : 'Learn more'}
                            </button>
                        )}
                    </div>
                </motion.div>
            </div>
        </CarouselItem>
    );
};

export default CarouselSlide;
