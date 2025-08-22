'use client';

import { getRelativePath } from '@/lib/get-relative-path';
import { type IBusinessModelBlock } from '@/types/blocks.type';
import React from 'react';

const BusinessModelBlock: React.FC<IBusinessModelBlock> = ({ data }) => {
    const { title, upper_paragraph, lower_paragraph, items = [], background_url } = data ?? {};

    const background = background_url ?? '';

    return (
        <section className="relative flex min-h-screen overflow-hidden" id="about-us">
            {/* Background */}
            <img src={getRelativePath(background)} alt="Background" className="absolute inset-0 z-0 h-full w-full object-cover" draggable="false" />

            {/* Content */}
            <div className="relative z-10 flex w-full flex-col px-6 py-12 md:px-20">
                {/* Top Row */}
                <div className="mb-12 md:mb-0 flex flex-col justify-between gap-4 md:flex-row md:items-start md:gap-0">
                    <h2 className="text-3xl font-bold leading-snug text-black md:w-2/3">{title}</h2>
                    {upper_paragraph && <p className="text-md font-medium leading-relaxed text-black md:w-2/3">{upper_paragraph}</p>}
                </div>

                {/* Items Grid */}
                <div className="flex flex-1 items-center justify-center">
                    <div className="grid w-full place-items-stretch gap-6 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]">
                        {items.map((item, idx) => (
                            <div key={idx} className="flex w-full flex-col items-center text-center">
                                {/* Title */}
                                <h3 className="text-md font-bold text-[#1A5DA4]">{item.subtitle}</h3>

                                {/* Border as alignment baseline */}
                                <div className="mb-1 mt-2 w-full border-b-2 border-black"></div>

                                {/* Description */}
                                <p className="text-md leading-relaxed text-black">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Lower Paragraph */}
                <div className="mt-12 md:mt-0 flex justify-start md:justify-end">
                {lower_paragraph && (
                    <div className="text-md font-medium leading-relaxed text-black md:w-1/2">
                        {lower_paragraph}
                    </div>
                )}
                </div>
            </div>
        </section>
    );
};

export default BusinessModelBlock;
