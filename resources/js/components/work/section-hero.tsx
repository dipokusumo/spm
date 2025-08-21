import React from 'react';
import { getRelativePath } from '@/lib/get-relative-path';
import { Link } from '@inertiajs/react';


interface SectionHeroProps {
    name: string;
    campaignDescription: string;
    campaignImage: string;
    division?: {
        slug: string;
    };
}

const SectionHeroWork: React.FC<SectionHeroProps> = ({ name, campaignDescription, campaignImage, division }) => {
    return (
        <section className="py-16 text-white md:mt-24 md:py-8">
            <div className="mx-auto max-w-7xl md:px-12">
                <div className="mx-auto mb-10 max-w-7xl gap-4 px-8 md:grid md:grid-cols-5">
                    {/* Title di kiri (1 kolom penuh) */}
                    <div className="flex items-start md:col-span-1">
                        <Link
                            href={`/${division?.slug}`}
                            className="text-brand whitespace-nowrap text-sm font-medium hover:underline"
                        >
                            ← View all other projects
                        </Link>
                    </div>

                    {/* Deskripsi sejajar mulai dari kolom ke-2 */}
                    <div className="mt-4 md:col-span-4 md:mt-0 md:text-justify">
                        <h1 className="prose prose-invert max-w-none text-xl font-bold leading-relaxed tracking-tight md:text-3xl">{name}</h1>
                        <p className="prose prose-invert mt-4 max-w-none text-xs leading-snug tracking-tight md:text-base">{campaignDescription}</p>
                    </div>
                </div>
            </div>
            <div className="relative flex h-64 md:h-screen items-center justify-center">
                <img
                    src={getRelativePath(campaignImage)}
                    alt="Background Animation"
                    className="absolute z-0 h-full w-full object-cover"
                    draggable="false"
                    onContextMenu={(e) => e.preventDefault()}
                />
            </div>
        </section>
    );
};

export default SectionHeroWork;
