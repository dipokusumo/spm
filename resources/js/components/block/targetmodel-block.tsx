'use client';

import { type ITargetModelBlock } from '@/types/blocks.type';
import React from 'react';
import { getRelativePath } from '@/lib/get-relative-path';

const TargetModelBlock: React.FC<ITargetModelBlock> = ({ data }) => {
    const { title, items = [] } = data ?? {};

    return (
        <section className="relative w-full px-6 py-12 md:px-20">
            {/* Top Row */}
            <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-start md:gap-0">
                <h2 className="text-3xl font-bold leading-snug text-[#1A5DA4] md:w-2/3">{title}</h2>
            </div>

            {/* Items Grid */}
            <div className="flex flex-1 items-center justify-center">
                <div className="grid w-full gap-16 md:gap-6 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]">
                    {items.map((item, idx) => (
                        <div key={idx} className="grid h-full text-center [grid-template-rows:auto_3rem_auto_1fr]">
                            {/* Icon */}
                            <div className="flex justify-center">
                                {/* Kalau pakai lucide-react misalnya */}
                                <img src={getRelativePath(item.icon)} alt="" className="h-18 w-16 md:py-2" />
                            </div>

                            {/* Title */}
                            <h3 className="flex justify-center text-md items-end md:items-start font-bold text-[#55C406]">{item.subtitle}</h3>

                            {/* Border as alignment baseline */}
                            <div className="mb-2 mt-3 w-full border-b-2 border-black"></div>

                            {/* Description */}
                            <p className="text-md leading-relaxed text-black">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TargetModelBlock;
