import { getRelativePath } from '@/lib/get-relative-path';
import { ICollageImageBlock } from '@/types/blocks.type';
import React from 'react';

const CollageImageBlock: React.FC<ICollageImageBlock> = ({ data }) => {
    if (!data || !data.images || data.images.length === 0) return null;

    const totalImages = data.images.length;

    return (
        <section className="py-8">
            <div className="mx-auto max-w-7xl px-8">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                    {data.images.map((item, idx) => {
                        // default class
                        let imgClass = 'h-full w-full object-cover';
                        let layoutClass = '';

                        // rule: kalau 1 gambar → semua h-600
                        if (totalImages === 1) {
                            imgClass = 'md:h-[600px] h-full w-full object-cover';
                            layoutClass = 'md:col-span-2';
                        }

                        // rule: kalau 3 gambar → hanya gambar ketiga (idx=2) yang h-600
                        if (totalImages === 3 && idx === 2) {
                            imgClass = 'md:h-[600px] h-full w-full object-cover';
                            layoutClass = 'md:col-span-2';
                        }

                        return (
                            <figure key={idx} className={`overflow-hidden rounded-lg ${layoutClass}`}>
                                <img src={getRelativePath(item.image)} alt={`Collage image ${idx + 1}`} className={imgClass} />
                            </figure>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default CollageImageBlock;
