import { getRelativePath } from '@/lib/get-relative-path';
import { IImageMarqueeBlock } from '@/types/blocks.type';
import { motion, useAnimationFrame, useMotionValue, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';

const ImageMarqueeBlock: React.FC<IImageMarqueeBlock> = ({ data }) => {
    const { title, section_anchor, images = [], speed } = data ?? {};

    const x = useMotionValue(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [isPaused, setIsPaused] = useState(false);
    const translateX = useTransform(x, (val) => `${val}px`);

    const baseSpeed = speed ?? 20; // customizable speed

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
    const marqueeImages = [...images, ...images, ...images, ...images, ...images, ...images, ...images, ...images, ...images, ...images];

    return (
        <section className="relative px-6 py-12 md:px-8 lg:px-12 xl:px-20" id={section_anchor}>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                viewport={{ once: true, amount: 0.5 }}
                className="mb-12 flex flex-col justify-between md:flex-row md:items-start"
            >
                <h2 className="text-3xl font-bold leading-snug text-[#1A5DA4] md:w-2/3">{title}</h2>
            </motion.div>
            <div
                ref={containerRef}
                className="relative overflow-hidden"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                <motion.div ref={contentRef} style={{ x: translateX }} className="flex min-w-max gap-32">
                    {marqueeImages.map((img, i) => (
                        <img
                            key={i}
                            src={getRelativePath(img.image)}
                            alt={`marquee-${i}`}
                            className="w-24 py-2 grayscale transition-grayscale duration-300 hover:grayscale-0"
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default ImageMarqueeBlock;
