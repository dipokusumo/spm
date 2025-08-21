// resources/js/Pages/Homepage.tsx

import { RenderBlock } from '@/components/block';
import DivisionBlock from '@/components/block/division-block';
import OurWorks from '@/components/homepage/OurWorks';
import AppLayout from '@/layouts/app-layout';
import { IBlock, IWork } from '@/types/blocks.type';
import { Head } from '@inertiajs/react';

interface HomepageProps {
    seo?: {
        title?: string;
        description?: string;
        image?: string | null;
    };
    blocks: IBlock[];
    works: IWork[];
    divisions?: {
        name?: string;
        slug?: string;
        color?: string;
        background_url?: string;
    }[];
}

const Homepage = ({ seo, blocks, works, divisions }: HomepageProps) => {
    // For DRY rendering of blocks
    // const hasBlock = (type: string) => blocks.some((block) => block.type === type);

    return (
        <>
            <Head title={seo?.title || 'Arteegroup - Homepage'}>
                <meta name="description" content={seo?.description || 'Welcome to Arteegroup, your partner in digital innovation.'} />
                {seo?.image && <meta property="og:image" content={seo.image} />}
            </Head>

            <main className="font-gotham">
                {/* For DRY rendering of blocks */}
                {/* {!hasBlock('section-paragraph') && <SectionParagraphBlock />} */}

                <RenderBlock type="hero" data={blocks.find((block) => block.type === 'hero')?.data || {}} />
                <div className="mx-auto max-w-7xl md:px-12">
                    <RenderBlock
                        type="section-paragraph"
                        data={{
                            ...(blocks.find((block) => block.type === 'section-paragraph')?.data || {}),
                            custom_padding: 'py-16',
                        }}
                    />
                    <DivisionBlock divisions={divisions} />
                    <RenderBlock type="image-marquee" data={blocks.find((block) => block.type === 'image-marquee')?.data || {}} />
                    <OurWorks works={works} />
                </div>
            </main>
        </>
    );
};

Homepage.layout = (page: React.ReactNode) => <AppLayout children={page} />;
export default Homepage;
