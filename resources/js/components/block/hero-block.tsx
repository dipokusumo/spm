'use client';

import { getRelativePath } from '@/lib/get-relative-path';
import { type IHeroBlock } from '@/types/blocks.type';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useCallback, useEffect, useState } from 'react';

const isVideo = (url: string | undefined): boolean => {
    if (!url) return false;
    return /\.(mp4|webm|ogg)$/i.test(url);
};

const HeroBlock: React.FC<IHeroBlock> = ({ data }) => {
    const { title, subtitle, background_url } = data ?? {};

    const background = background_url ?? '';

    const [isModalOpen, setIsModalOpen] = useState(false);

    // Lock body scroll saat modal dibuka
    useEffect(() => {
        const original = document.body.style.overflow;
        document.body.style.overflow = isModalOpen ? 'hidden' : original || '';
        return () => {
            document.body.style.overflow = original || '';
        };
    }, [isModalOpen]);

    const closeModal = useCallback(() => setIsModalOpen(false), []);

    // ESC untuk close
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeModal();
        if (isModalOpen) window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [isModalOpen, closeModal]);

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
                <img
                    src={getRelativePath(background)}
                    alt="Background"
                    className="absolute inset-0 z-0 h-full w-full object-cover"
                    draggable="false"
                />
            )}

            {/* Overlay Gradient (biar teks lebih kebaca) */}
            <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

            {/* Content */}
            <div className="relative z-10 flex h-full w-full flex-col justify-end px-4 pb-10 sm:px-6 md:px-20 md:pb-12">
                <div className="grid grid-cols-1 items-end gap-4 md:grid-cols-2 md:gap-0">
                    {/* Left: Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="md:cols-span-1 text-xl font-bold leading-snug text-white drop-shadow-lg md:text-3xl"
                    >
                        {title}
                    </motion.h1>

                    {/* Right: Paragraph + Discover */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 1 }}
                        className="flex flex-col items-start justify-center text-sm leading-relaxed text-white"
                    >
                        {subtitle && (
                            <div className="relative w-full">
                                {/* MOBILE: truncate + fade; DESKTOP: full */}
                                <div
                                    className={`line-clamp-3 overflow-hidden whitespace-pre-line pr-1 leading-relaxed md:line-clamp-none md:max-h-none md:overflow-visible`}
                                    dangerouslySetInnerHTML={{ __html: subtitle }}
                                />

                                {/* CTA Learn More (mobile only) */}
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="relative z-10 mt-3 inline-flex items-center gap-2 rounded-lg bg-white/30 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm hover:bg-white/45 md:hidden"
                                    aria-haspopup="dialog"
                                >
                                    Learn more
                                </button>
                            </div>
                        )}

                        {/* Discover + Arrow inline */}
                        <div className="mt-4 flex w-full items-center justify-between border-b-2 border-white pb-1 text-lg font-bold">
                            <a className="text-white">Discover</a>

                            {/* Scroll Indicator (arrow aligned with line) */}
                            <div className="text-white">↓</div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* MODAL: tampilkan subtitle full di mobile */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        key="overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm md:hidden"
                        onClick={closeModal}
                        aria-modal="true"
                        role="dialog"
                    >
                        <motion.div
                            key="sheet"
                            initial={{ y: 40, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 40, opacity: 0 }}
                            transition={{ duration: 0.25, ease: 'easeOut' }}
                            className="absolute inset-x-0 bottom-0 mx-auto mb-4 w-[92%] max-w-md rounded-2xl border border-white/10 bg-neutral-900/90 p-4 text-white shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-semibold">About this section</h3>
                                <button onClick={closeModal} aria-label="Close" className="rounded-xl bg-white px-4 py-2 text-xs font-semibold text-black hover:bg-white/90">
                                    Close
                                </button>
                            </div>
                            <div className="mt-3 h-px w-full bg-white/10" />
                            <div className="mt-3 max-h-[60vh] overflow-y-auto pr-1">
                                <div
                                    className="whitespace-pre-line text-[13.5px] leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: subtitle ?? '' }}
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default HeroBlock;
