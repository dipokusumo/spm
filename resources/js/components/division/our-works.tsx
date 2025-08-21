import { getRelativePath } from '@/lib/get-relative-path';
import { IWork } from '@/types/blocks.type';
import { Link } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface OurWorksProps {
    works: IWork[];
    color?: string;
    slug?: string;
    custom?: { [key: string]: string };
}

const OurWorks: React.FC<OurWorksProps> = ({ color, works, custom, slug }) => {
    const { ourworks_title, ourworks_backgroundviewmore, ourworks_textviewmore } = custom || {};
    const [bgCta, setBgCta] = useState(ourworks_backgroundviewmore || color);
    const [textCta, setTextCta] = useState(ourworks_textviewmore || color);
    const [isMobile, setIsMobile] = useState(false);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile(); // initial check
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const sortedWorks = [...works];
    const highlightIndex = sortedWorks.findIndex((work) => work.is_highlighted);

    if (highlightIndex !== -1) {
        const [highlighted] = sortedWorks.splice(highlightIndex, 1);
        const insertIndex = sortedWorks.length < 2 ? 0 : 2;
        sortedWorks.splice(insertIndex, 0, highlighted);
    }

    const hasHighlight = sortedWorks.some((w) => w.is_highlighted);
    const maxVisible = isMobile ? (showAll ? 5 : 2) : showAll ? (hasHighlight ? 9 : 10) : hasHighlight ? 5 : 4;
    const displayedWorks = sortedWorks.slice(0, Math.min(maxVisible, sortedWorks.length));

    const shouldShowButton = isMobile ? sortedWorks.length > 2 : sortedWorks.length > (hasHighlight ? 5 : 4);

    if (displayedWorks.length === 0) {
        return (
            <section className="mx-auto mb-20 mt-20 max-w-7xl px-8">
                <div className="mb-6 text-sm font-medium" style={{ color: ourworks_title }}>
                    Our works
                </div>
                <div className="flex flex-col items-center justify-center rounded-xl border border-zinc-700 bg-zinc-900 py-16 text-center">
                    <p className="mb-2 text-xl font-semibold text-white">No works available</p>
                    <p className="text-sm text-zinc-400">Stay tuned! We'll showcase our campaigns here soon.</p>
                </div>
            </section>
        );
    }

    return (
        <section className="mx-auto mb-20 mt-20 max-w-7xl px-8" id="#work">
            <div className="mb-6">
                <Link href="/our-works" className="text-sm font-medium hover:underline" style={{ color: ourworks_title }}>
                    Our works
                </Link>
            </div>

            <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                <AnimatePresence>
                    {displayedWorks.map((work, idx) => {
                        const isHighlight = !isMobile && Boolean(Number(work.is_highlighted));

                        const workUrl = `/${slug ?? ''}/${work.slug ?? ''}`;
                        return (
                            <motion.div
                                key={work.campaign_name ?? '' + idx}
                                layout
                                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 30, scale: 0.95 }}
                                transition={{
                                    duration: 0.6,
                                    ease: [0.25, 1, 0.5, 1],
                                    delay: idx * 0.05,
                                }}
                                className={`${isHighlight ? 'md:col-span-2' : ''}`}
                            >
                                <Link href={workUrl} className="group block">
                                    <div className="relative overflow-hidden rounded-xl">
                                        <motion.img
                                            src={getRelativePath(work.campaign_image ?? '')}
                                            alt={work.name}
                                            className={`mb-3 w-full rounded-xl transition-transform duration-500 group-hover:scale-105 ${isHighlight ? 'h-[600px]' : 'h-[165px] md:h-[300px]'}`}
                                            initial={{ opacity: 0, scale: 1.05 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                                    </div>
                                    <div className="mb-1 text-xs font-light text-white">
                                        {work.name} <span className="ml-2 text-zinc-400">{work.campaign}</span>
                                    </div>
                                    <h3 className="group-hover:text-brand mb-1 font-bold text-white transition-colors duration-300">
                                        {work.campaign_name}
                                    </h3>
                                    <motion.p
                                        className="text-sm text-zinc-400"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.2, duration: 0.6 }}
                                    >
                                        {work.campaign_description}
                                    </motion.p>
                                </Link>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

            <div className="grid justify-center">
                {shouldShowButton && (
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="mt-12 rounded-full px-6 py-2 text-sm font-medium text-white transition"
                        style={{ backgroundColor: bgCta, color: textCta }}
                        onMouseEnter={() => {
                            setBgCta('#FFFFFF');
                            setTextCta('#000000');
                        }}
                        onMouseLeave={() => {
                            setBgCta(ourworks_backgroundviewmore || color);
                            setTextCta(ourworks_textviewmore || color);
                        }}
                    >
                        {showAll ? 'Show less' : 'View more'}
                    </button>
                )}
            </div>
        </section>
    );
};

export default OurWorks;
