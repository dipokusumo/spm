'use client';

import { getRelativePath } from '@/lib/get-relative-path';
import { type IBusinessModelBlock } from '@/types/blocks.type';
import { motion } from 'framer-motion';
import React from 'react';

const BusinessModelBlock: React.FC<IBusinessModelBlock> = ({ data }) => {
    const { title, section_anchor, upper_paragraph, lower_paragraph, items = [], background_url } = data ?? {};

    const background = background_url ?? '';

    return (
        <section className="relative flex overflow-hidden" id={section_anchor}>
            <img src={getRelativePath(background)} alt="Background" className="absolute inset-0 z-0 h-full w-full object-cover" draggable="false" />

            <div className="relative z-10 flex w-full flex-col px-6 py-12 md:px-20">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    viewport={{ once: true, amount: 0.5 }}
                    className="mb-12 flex flex-col justify-between gap-4 md:mb-0 md:flex-row md:items-start md:gap-0"
                >
                    <h2 className="text-3xl font-bold leading-snug text-black md:w-2/3">{title}</h2>
                    {upper_paragraph && <p className="text-md font-medium leading-relaxed text-black md:w-2/3">{upper_paragraph}</p>}
                </motion.div>

                <div className="flex items-center justify-center md:py-24">
                    <div className="grid w-full place-items-stretch gap-6 [grid-template-columns:repeat(auto-fit,minmax(200px,1fr))]">
                        {items.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: idx * 0.1, ease: 'easeOut' }}
                                viewport={{ once: true, amount: 0.5 }}
                                className="flex w-full flex-col items-center text-center"
                            >
                                <h3 className="text-md font-bold text-[#1A5DA4]">{item.subtitle}</h3>
                                <div className="mb-1 mt-2 w-full border-b-2 border-black"></div>
                                <p className="text-md leading-relaxed text-black">{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {lower_paragraph && (
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        viewport={{ once: true, amount: 0.5 }}
                        className="mt-12 flex justify-start md:mt-0 md:justify-end"
                    >
                        <div className="text-md font-medium leading-relaxed text-black md:w-1/2">{lower_paragraph}</div>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default BusinessModelBlock;