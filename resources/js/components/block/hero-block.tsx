'use client';

import { getRelativePath } from '@/lib/get-relative-path';
import { type IHeroBlock } from '@/types/blocks.type';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';

const isVideo = (url: string | undefined): boolean => {
    if (!url) return false;
    return /\.(mp4|webm|ogg)$/i.test(url);
};

const HeroBlock: React.FC<IHeroBlock> = ({ data }) => {
    const { title, subtitle, background_url, section_anchor } = data ?? {};
    const background = background_url ?? '';

    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <section className="relative flex h-screen items-center justify-center overflow-hidden" id={section_anchor}>
            {/* Background */}
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
                <img
                    src={getRelativePath(background)}
                    alt="Background"
                    className="absolute inset-0 z-0 h-full w-full object-cover"
                    draggable="false"
                />
            )}

            {/* Overlay Gradient */}
            <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

            {/* Content */}
            <div className="relative z-10 flex h-full w-full flex-col justify-end px-4 pb-10 sm:px-6 md:px-20 md:pb-12">
                <div className="grid grid-cols-1 items-end gap-4 lg:grid-cols-2 lg:gap-0">
                    {/* Left: Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        viewport={{ once: true, amount: 0.5 }}
                        className="md:cols-span-1 text-3xl font-bold leading-snug text-white drop-shadow-lg"
                    >
                        {title}
                    </motion.h1>

                    {/* Right: Subtitle + Accordion + Discover */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
                        viewport={{ once: true, amount: 0.5 }}
                        className="flex flex-col items-start justify-center text-sm leading-relaxed text-white"
                    >
                        {subtitle && (
                            <div className="relative w-full">
                                <AnimatePresence initial={false}>
                                    <motion.div
                                        key={isExpanded ? 'expanded' : 'collapsed'}
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                                        className="max-h-[60vh] overflow-y-auto lg:overflow-hidden"
                                    >
                                        <div
                                            className={`${
                                                isExpanded
                                                    ? 'whitespace-pre-line leading-relaxed'
                                                    : 'line-clamp-3 overflow-hidden whitespace-pre-line pr-1 leading-relaxed lg:line-clamp-none lg:max-h-none lg:overflow-visible'
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: subtitle }}
                                        />
                                    </motion.div>
                                </AnimatePresence>

                                {/* CTA Expand/Collapse */}
                                <button
                                    onClick={() => setIsExpanded(!isExpanded)}
                                    className="relative z-10 mt-3 inline-flex items-center gap-2 rounded-lg bg-white/30 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm hover:bg-white/45 lg:hidden"
                                    aria-expanded={isExpanded}
                                >
                                    {isExpanded ? 'Show less' : 'Learn more'}
                                </button>
                            </div>
                        )}

                        {/* Discover */}
                        <div className="mt-4 flex w-full items-center justify-between border-b-2 border-white pb-1 text-lg font-bold">
                            <a className="text-white">Discover</a>
                            <div className="text-white">↓</div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default HeroBlock;
