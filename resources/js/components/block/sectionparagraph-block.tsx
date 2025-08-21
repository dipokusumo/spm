import { getRelativePath } from '@/lib/get-relative-path';
import { ISectionParagraphBlock } from '@/types/blocks.type';
import { Link } from '@inertiajs/react';
import React from 'react';

const SectionParagraphBlock: React.FC<ISectionParagraphBlock> = ({ data }) => {
    const fallbackTitle = 'About us';
    const fallbackContent = `
        <h2>
            In the mystical city of Jakarta,<br class="md:hidden" /> a group of talented magicians united with a shared goal: to transform digital marketing.
        </h2>
        <p>
            In 2017, Artee Group was born, inspired by the Indonesian word <i>“arti”</i>. Our collective of digital enthusiast,
            creative thinkers, and strategic planners set out on a mission to
            <i class="text-brand font-semibold"> bring meaningful and loud ideas with solid results</i>, transforming the ordinary
            into the extraordinary and crafting stories that resonate and endure.
        </p>
    `;
    const fallbackDirection = 'ltr';

    const contentType = data?.content_type || 'title';
    const title = data?.title?.trim() || fallbackTitle;
    const titleColor = data?.title_color || '#ffffff';
    const customCss = data?.custom_css || 'text-sm';
    const url = data?.url || '';
    const image = data?.image || '';
    const content = data?.content?.trim() || fallbackContent;
    const direction = data?.direction || fallbackDirection;
    const customPadding = data?.custom_padding ?? 'py-4 md:py-8';

    const isRTL = direction === 'rtl';

    const safeId = title.toLowerCase().replace(/\s+/g, '-');
    return (
        <section id={safeId} className={`text-white ${isRTL ? 'text-right' : 'text-left'}`}>
            <div className={`mx-auto max-w-7xl px-8 ${customPadding}`}>
                <div dir={direction} className="gap-4 md:grid md:grid-cols-5">
                    {/* Title or Image */}
                    <div className={`md:col-span-1 ${isRTL ? 'justify-end md:order-2' : 'justify-start md:order-1'}`}>
                        {contentType === 'title' ? (
                            url ? (
                                <Link
                                    href={url}
                                    className={`whitespace-nowrap ${customCss} font-medium hover:underline`}
                                    style={{ color: titleColor }}
                                >
                                    {title}
                                </Link>
                            ) : (
                                <span className={`whitespace-nowrap ${customCss} font-medium`} style={{ color: titleColor }}>
                                    {title}
                                </span>
                            )
                        ) : image ? (
                            <img
                                src={getRelativePath(image)}
                                alt={title || 'Section Image'}
                                className="max-h-8 w-auto mb-4 md:mb-0 justify-self-center object-contain md:justify-self-start"
                            />
                        ) : null}
                    </div>

                    {/* Content */}
                    <div className={`py-4 md:py-0 md:col-span-4 ${isRTL ? 'md:order-1 md:text-right' : 'md:order-2 md:text-justify'}`}>
                        <div
                            className="prose prose-invert max-w-none leading-snug tracking-tight text-white"
                            dangerouslySetInnerHTML={{ __html: content }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SectionParagraphBlock;