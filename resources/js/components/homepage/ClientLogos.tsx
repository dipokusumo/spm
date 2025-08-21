import { motion, useAnimationFrame, useMotionValue, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';

const logos = ['/mrdiy.png', '/soklin.png', '/diplomat.png', '/royal.png', '/belfoods.png'];

export default function ClientLogos() {
    const x = useMotionValue(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [isPaused, setIsPaused] = useState(false);
    const translateX = useTransform(x, (val) => `${val}px`);

    const baseSpeed = 40;

    useAnimationFrame((_, delta) => {
        if (isPaused) return;

        const moveBy = (delta / 1000) * baseSpeed;
        const prev = x.get();
        const contentWidth = contentRef.current?.scrollWidth || 1;

        const maxScroll = contentWidth / 3;

        const next = prev - moveBy;
        x.set(next <= -maxScroll ? 0 : next);
    });

    return (
        <section className="mx-auto mb-24 max-w-7xl px-8">
            <p className="mb-8 text-center text-lg text-white">Our Clients:</p>
            <div
                ref={containerRef}
                className="relative overflow-hidden"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                <motion.div ref={contentRef} style={{ x: translateX }} className="flex min-w-max gap-16">
                    {[...logos, ...logos, ...logos].map((logo, i) => (
                        <img key={i} src={logo} alt={`Client ${i}`} className="h-10 grayscale transition hover:grayscale-0" />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
