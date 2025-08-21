import { getRelativePath } from '@/lib/get-relative-path';
import { IImageMarqueeBlock } from '@/types/blocks.type';
import { motion, useAnimationFrame, useMotionValue, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';

const ImageMarqueeBlock: React.FC<IImageMarqueeBlock> = ({ data }) => {
    const { images = [], speed = 20 } = data ?? {};

    const x = useMotionValue(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [isPaused, setIsPaused] = useState(false);
    const translateX = useTransform(x, (val) => `${val}px`);

    const baseSpeed = speed; // customizable speed

    useAnimationFrame((_, delta) => {
        if (isPaused) return;

        const moveBy = (delta / 1000) * baseSpeed;
        const prev = x.get();
        const contentWidth = contentRef.current?.scrollWidth || 1;
        const maxScroll = contentWidth / 3;

        const next = prev - moveBy;
        x.set(next <= -maxScroll ? 0 : next);
    });

    if (images.length === 0) return null;

    // Duplicate images for seamless scroll
    const marqueeImages = [...images, ...images, ...images];

    return (
        <section className="mx-auto mb-16 max-w-7xl px-8 md:mb-24">
            <p className="mb-8 text-center text-lg text-white">Our Clients:</p>
            <div
                ref={containerRef}
                className="relative overflow-hidden"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                <motion.div ref={contentRef} style={{ x: translateX }} className="flex min-w-max gap-16">
                    {marqueeImages.map((img, i) => (
                        <img
                            key={i}
                            src={getRelativePath(img.image)}
                            alt={`marquee-${i}`}
                            className="h-10 grayscale transition hover:grayscale-0"
                            loading="lazy"
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default ImageMarqueeBlock;