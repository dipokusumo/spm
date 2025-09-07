'use client';

import { getRelativePath } from '@/lib/get-relative-path';
import { type ITargetModelBlock } from '@/types/blocks.type';
import { motion } from 'framer-motion';
import React from 'react';

const TargetModelBlock: React.FC<ITargetModelBlock> = ({ data }) => {
    const { title, section_anchor, items = [] } = data ?? {};

    return (
        <section className="relative w-full px-6 py-12 md:px-20" id={section_anchor}>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                viewport={{ once: true, amount: 0.5 }}
                className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-start md:gap-0"
            >
                <h2 className="text-3xl font-bold leading-snug text-[#1A5DA4] md:w-2/3">{title}</h2>
            </motion.div>

            <div className="flex flex-1 items-center justify-center">
                <div className="grid w-full gap-16 [grid-template-columns:repeat(auto-fit,minmax(200px,1fr))] md:gap-6">
                    {items.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.80 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: idx * 0.1, ease: 'easeOut' }}
                            viewport={{ once: true, amount: 0.5 }}
                            className="grid h-full text-center [grid-template-rows:auto_3rem_auto_1fr]"
                        >
                            <div className="flex justify-center">
                                <img src={getRelativePath(item.icon)} alt="" className="h-18 w-16 md:py-2" />
                            </div>
                            <h3 className="text-md flex items-end justify-center font-bold text-[#55C406] md:items-start">{item.subtitle}</h3>
                            <div className="mb-2 mt-3 w-full border-b-2 border-black"></div>
                            <p className="text-md leading-relaxed text-black">{item.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TargetModelBlock;