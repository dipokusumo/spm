// resources/js/Pages/Homepage.tsx

import { RenderBlock } from '@/components/block';
import AppLayout from '@/layouts/app-layout';
import { IBlock } from '@/types/blocks.type';
import { Head } from '@inertiajs/react';

interface HomepageProps {
    seo?: {
        title?: string;
        description?: string;
        image?: string | null;
    };
    blocks: IBlock[];
}

const Homepage = ({ seo, blocks }: HomepageProps) => {
    // For DRY rendering of blocks
    // const hasBlock = (type: string) => blocks.some((block) => block.type === type);

    return (
        <>
            <Head title={seo?.title || 'SPM'}>
                <meta name="description" content={seo?.description || ''} />
                {seo?.image && <meta property="og:image" content={seo.image} />}
            </Head>

            <main className="font-gotham">
                {/* For DRY rendering of blocks */}
                {/* {!hasBlock('section-paragraph') && <SectionParagraphBlock />} */}
                <div>
                    {blocks?.map((block, index) => (
                        <RenderBlock key={index} type={block.type} data={block.data} />
                    ))}
                </div>
            </main>
        </>
    );
};

Homepage.layout = (page: React.ReactNode) => <AppLayout children={page} />;
export default Homepage;
