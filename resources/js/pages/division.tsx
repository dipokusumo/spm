import HeroDivisionSection from '@/components/block/hero-division-block';
import OurWorks from '@/components/division/our-works';
import Project from '@/components/division/project';
import AppLayout from '@/layouts/app-layout';
import { getCustomColor } from '@/lib/get-custom-color';
import { IBlock, IWork } from '@/types/blocks.type';
import { Head } from '@inertiajs/react';

interface DivisionProps {
    divisionId: number;
    name?: string;
    color?: string;
    slug?: string;
    custom: string;
    seo?: {
        title?: string;
        description?: string;
        image?: string | null;
    };
    blocks: IBlock[];
    works: IWork[];
}
const Division = ({ seo, blocks, divisionId, color, slug, name, works, custom }: DivisionProps) => {
    const customColor = getCustomColor(custom);

    return (
        <>
            <Head title={seo?.title || 'Arteegroup - Division'}>
                <meta name="description" content={seo?.description || 'Dummy description'} />
                {seo?.image && <meta property="og:image" content={seo.image} />}
            </Head>
            <HeroDivisionSection data={blocks.find((block) => block.type === 'hero')?.data || {}} color={color} name={name} custom={customColor} />
            <div className="mx-auto max-w-7xl md:px-12 font-gotham">
                <OurWorks color={color} slug={slug} works={works} custom={customColor} />
                <Project color={color} divisionId={divisionId} custom={customColor} />
            </div>
        </>
    );
};

Division.layout = (page: React.ReactNode) => {
    const element = page as React.ReactElement<{ custom: string }>;
    return <AppLayout custom={element.props.custom}>{page}</AppLayout>;
};

export default Division;
