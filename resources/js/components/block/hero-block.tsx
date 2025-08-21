'use client';

import { getRelativePath } from '@/lib/get-relative-path';
import { type IHeroBlock } from '@/types/blocks.type';
import { easeInOut, motion } from 'framer-motion';
import React, { useEffect, useMemo, useState } from 'react';
import { TextGenerateEffect } from '../ui/generate-text';

const isVideo = (url: string | undefined): boolean => {
    if (!url) return false;
    return /\.(mp4|webm|ogg)$/i.test(url);
};

// Shared transition settings
const sharedTransition = {
    duration: 1,
    ease: easeInOut,
};

// Motion animation states
const animations = {
    containerInitial: {
        top: '50%',
        left: '50%',
        x: '-50%',
        y: '-50%',
        bottom: 'auto',
        opacity: 1,
        scale: 1.1,
        transformOrigin: 'center center',
    },
    containerFinal: {
        top: 'auto',
        left: '0%',
        x: '0%',
        y: '0%',
        bottom: '2.5rem',
        opacity: 1,
        scale: 1,
        transformOrigin: 'left bottom',
    },
    h1Initial: {
        textAlign: 'center' as const,
        fontSize: '3rem',
        lineHeight: '1.1',
        maxWidth: '100%',
        fontWeight: 'bold' as const,
    },
    h1Final: {
        textAlign: 'left' as const,
        fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
        lineHeight: '2.5rem',
        maxWidth: '28rem',
        fontWeight: 'normal' as const,
    },
};

const HeroBlock: React.FC<IHeroBlock> = ({ data }) => {
    const { title, subtitle, cta_text, cta_url, background_url } = data ?? {};

    const [startTransition, setStartTransition] = useState(false);

    // Memoized fallback content
    const fallback = useMemo(
        () => ({
            title: 'Create impact through meaningful and loud ideas, with a solid result',
            cta_text: 'Explore our work',
            cta_url: 'http://127.0.0.1:8000/',
            background: '/moon.gif',
        }),
        [],
    );

    useEffect(() => {
        const timeout = setTimeout(() => setStartTransition(true), 3000); // Text stays centered for 5 seconds
        return () => clearTimeout(timeout);
    }, []);

    const background = background_url ?? fallback.background;

    return (
        <section className="relative flex h-screen items-center justify-center overflow-hidden">
            {isVideo(background) ? (
                <video
                    src={getRelativePath(background)}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 z-0 h-full w-full object-cover"
                />
            ) : (
                <img src={getRelativePath(background)} alt="Background" className="absolute inset-0 z-0 h-full w-full object-cover" />
            )}

            {/* Black overlay fade */}
            <motion.div
                className="z-5 absolute inset-0 bg-black"
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ ...sharedTransition, delay: 5 }}
            />

            {/* Main text container */}
            <motion.div
                className="absolute z-10 w-full will-change-transform"
                initial={animations.containerInitial}
                animate={startTransition ? animations.containerFinal : {}}
                transition={sharedTransition}
            >
                <div className="relative mx-auto max-w-7xl px-8 md:px-20">
                    <motion.h1
                        className="mb-4 text-white drop-shadow-md"
                        initial={animations.h1Initial}
                        animate={startTransition ? animations.h1Final : {}}
                        transition={{ delay: 0, duration: 1 }}
                    >
                        <TextGenerateEffect words={title ?? fallback.title} className="text-3xl md:text-4xl lg:text-5xl" filter duration={0.8} />
                    </motion.h1>

                    {subtitle && (
                        <motion.p
                            className="mb-6 text-lg text-white drop-shadow-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 5.2, duration: 0.8 }}
                        >
                            {subtitle}
                        </motion.p>
                    )}

                    <motion.a
                        href={cta_url ?? fallback.cta_url}
                        className="bg-brand inline-block rounded-full px-6 py-3 text-white transition hover:bg-white hover:text-black"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 5, duration: 0.8 }}
                    >
                        {cta_text ?? fallback.cta_text}
                    </motion.a>
                </div>
            </motion.div>
        </section>
    );
};

export default HeroBlock;
