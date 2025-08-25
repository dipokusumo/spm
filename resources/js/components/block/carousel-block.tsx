'use client';

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { getRelativePath } from '@/lib/get-relative-path';
import { type ICarouselBlock } from '@/types/blocks.type';
import React from 'react';

const CarouselBlock: React.FC<ICarouselBlock> = ({ data }) => {
    const { carousel_title, slides = [] } = data || {};

    return (
        <section className="w-full px-6 py-12 md:px-20">
            <h2 className="mb-8 text-xl md:text-3xl" dangerouslySetInnerHTML={{ __html: carousel_title ?? '' }} />

            <div className="relative">
                <Carousel
                    opts={{
                        align: 'start',
                        loop: true,
                    }}
                    className="w-full"
                >
                    <CarouselContent className="md:space-x-8 md:w-full">
                        {slides.map((slide, index) => (
                            <CarouselItem
                                key={index}
                                className="pb-2 md:basis-[45%]" // tampilkan next card sedikit
                            >
                                <div className="relative flex flex-col overflow-hidden rounded-2xl shadow-[6px_6px_15px_rgba(0,0,0,0.15)]">
                                    {/* Image */}
                                    <img
                                        src={getRelativePath(slide.background_url)}
                                        alt={slide.slide_title}
                                        className="h-full w-full object-contain" // ratio konsisten
                                        draggable="false"
                                    />
                                    {/* Overlay Content */}
                                    <div className="absolute bottom-0 w-full bg-gradient-to-t from-white/90 to-white/50 p-4 md:p-6">
                                        <h3 className="text-md font-bold text-[#1A5DA4]">{slide.slide_title}</h3>
                                        <p className="text-md mt-2">{slide.slide_description}</p>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    {/* Navigation: posisikan persis di sisi card */}
                    <CarouselPrevious className="absolute left-2 top-1/2 -translate-x-6 -translate-y-1/2 rounded-full bg-white shadow-md hover:bg-neutral-400" />
                    <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 translate-x-6 rounded-full bg-white shadow-md hover:bg-neutral-400" />
                </Carousel>
            </div>
        </section>
    );
};

export default CarouselBlock;