import { RenderBlock } from '@/components/block';
import type { IBlock } from '@/types/blocks.type';
import { Head } from '@inertiajs/react';

interface PagePreviewProps {
    seo?: {
        title?: string;
        description?: string;
        image?: string | null;
    };
    blocks: IBlock[];
}

export default function PagePreview({ seo, blocks }: PagePreviewProps) {
    return (
        <>
            <Head>
                <title>{seo?.title || 'Untitled Page'}</title>
                {seo?.description && <meta name="description" content={seo.description} />}
                {seo?.image && <meta property="og:image" content={seo.image} />}
            </Head>

            <main className="flex flex-col gap-12">
                {blocks.map((block, i) => (
                    <div key={i}>
                        <RenderBlock type={block.type} data={block.data} />
                    </div>
                ))}
            </main>
        </>
    );
}
