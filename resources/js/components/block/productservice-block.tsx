'use client';

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { getRelativePath } from '@/lib/get-relative-path';
import { type IProductServiceBlock } from '@/types/blocks.type';
import React from 'react';

const ProductServiceBlock: React.FC<IProductServiceBlock> = ({ data }) => {
    const { title, products_services = [] } = data ?? {};

    return (
        <section className="w-full px-6 py-12 md:px-20" id="product-service">
            {/* Judul Section */}
            {title && <h2 className="mb-8 text-3xl font-bold text-[#1A5DA4]">{title}</h2>}

            {/* Carousel Produk */}
            <Carousel
                opts={{
                    align: 'start',
                    loop: true,
                }}
                className="w-full"
            >
                <CarouselContent className="md:w-full md:space-x-6">
                    {products_services.map((ps, index) => (
                        <CarouselItem key={index} className="md:pb-2">
                            <div className="mx-auto flex h-full flex-col items-center gap-8 rounded-2xl bg-white shadow-[6px_6px_15px_rgba(0,0,0,0.15)] lg:flex-row p-4 lg:p-6">
                                {/* Gambar Utama */}
                                <div className="flex justify-center md:w-1/4">
                                    <img src={getRelativePath(ps.image)} alt={ps.name} className="h-72 object-contain lg:h-[500px]" />
                                </div>

                                {/* Konten Teks */}
                                <div className="relative md:w-3/4">
                                    {/* Logo di pojok kanan atas */}
                                    {ps.logo && (
                                        <div className="hidden md:block absolute right-0 top-0">
                                            <img src={getRelativePath(ps.logo)} alt={`${ps.name} Logo`} className="h-14 object-contain" />
                                        </div>
                                    )}

                                    {/* Judul */}
                                    <h2 className="mb-4 text-xl font-bold text-[#1A5DA4]">{ps.name}</h2>

                                    {/* List spesifikasi */}
                                    {ps.specs?.length > 0 && (
                                        <ul className="text-md mb-6 space-y-1 text-black">
                                            {ps.specs.map((spec, idx) => (
                                                <li key={idx}>
                                                    <strong>{spec.label}</strong>: {spec.value}
                                                </li>
                                            ))}
                                        </ul>
                                    )}

                                    {/* Subjudul layanan */}
                                    {ps.services?.length > 0 && (
                                        <>
                                            <h3 className="mb-4 font-medium text-[#1A5DA4]">Layanan Tambahan</h3>

                                            {/* Grid layanan tambahan */}
                                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                                {ps.services.map((srv, idx) => (
                                                    <div key={idx} className="rounded-xl p-4 text-white" style={{ backgroundColor: srv.color ?? '#1A5DA4' }}>
                                                        <h4 className="font-bold">{srv.title}</h4>
                                                        <p className="mt-1 text-sm">{srv.description}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                {/* Control */}
                <CarouselPrevious className="absolute left-2 top-1/2 -translate-x-6 -translate-y-1/2 rounded-full bg-white shadow-md hover:bg-neutral-400" />
                <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 translate-x-6 rounded-full bg-white shadow-md hover:bg-neutral-400" />
            </Carousel>
        </section>
    );
};

export default ProductServiceBlock;
