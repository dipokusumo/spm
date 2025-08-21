import { RenderBlock } from '@/components/block';
import SectionHeroWork from '@/components/work/section-hero';
import AppLayout from '@/layouts/app-layout';
import { IBlock } from '@/types/blocks.type';
import { Head } from '@inertiajs/react';

interface WorkProps {
    divisionId: number;
    division: {
        slug: string;
    };
    name: string;
    campaign: string;
    campaignName: string;
    campaignDescription: string;
    campaignImage: string;
    title: string;
    slug: string;
    seo: {
        title?: string;
        description?: string;
        image?: string | null;
    };
    blocks: IBlock[];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Work = ({ divisionId, division, name, campaign, campaignName, campaignDescription, campaignImage, title, slug, seo, blocks }: WorkProps) => {
    console.log(blocks);
    return (
        <>
            <Head title={seo?.title || 'Arteegroup - Work'}>
                <meta name="description" content={seo?.description || 'Welcome to Arteegroup, your partner in digital innovation.'} />
                {seo?.image && <meta property="og:image" content={seo.image} />}
            </Head>

            <main className="font-gotham">
                <SectionHeroWork name={name} campaignDescription={campaignDescription} campaignImage={campaignImage} division={division} />
                <div className="mx-auto max-w-7xl md:px-12">
                    {blocks?.map((block, index) => (
                        <RenderBlock key={index} type={block.type} data={block.data} />
                    ))}
                </div>
            </main>
        </>
    );
};

Work.layout = (page: React.ReactNode) => <AppLayout children={page} />;
export default Work;
