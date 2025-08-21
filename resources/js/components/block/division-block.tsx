import { getRelativePath } from '@/lib/get-relative-path';
import { HeroDivisionProps } from '@/types/blocks.type';
import { Link } from '@inertiajs/react';

export interface DivisionBlockProps {
    divisions?: HeroDivisionProps[];
}

const DivisionBlock: React.FC<DivisionBlockProps> = ({ divisions }) => {
    if (!divisions || divisions.length === 0) return null;
    
    return (
        <section className="text-white">
            <div className="mx-auto max-w-7xl px-8 mb-16">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-5">
                    {divisions?.map((division, i) => (
                        <Link
                            key={i}
                            href={`/${division.slug}`}
                            className="flex h-36 items-center justify-center rounded-xl grayscale transition hover:scale-95 hover:grayscale-0 sm:aspect-square sm:h-auto"
                            style={{ backgroundColor: division.color ?? '' }}
                        >
                            <img
                                src={getRelativePath(division?.blocks?.[0]?.data?.background_url ?? '')}
                                alt={division.name}
                                className="max-h-24"
                            />
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default DivisionBlock;