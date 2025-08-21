import type { IBlock } from '@/types/blocks.type';

// Static imports for all blocks

import HeroBlock from './hero-block';
import HeroDivisionBlock from './hero-division-block';
import SectionWithTitleBlock from './sectionparagraph-block';
import ImageMarqueeBlock from './imagemarquee-block';
import SeparatorBlock from './separator-block';
import WysiwygBlock from './wyswyg-block';
import CollageImageBlock from './imagecollage-block';

// Add all other blocks here...

// Map types to components
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const components: Record<string, React.ComponentType<any>> = {
    hero: HeroBlock,
    heroDivision: HeroDivisionBlock,
    'section-paragraph': SectionWithTitleBlock,
    'collage-image': CollageImageBlock,
    'image-marquee': ImageMarqueeBlock,
    separator: SeparatorBlock,
    wysiwyg: WysiwygBlock,

    // Add more as needed...
};

export const RenderBlock = ({ type, data }: { type: string; data?: IBlock['data'] }) => {
    const Component = components[type];
    if (!Component) return null;

    const safeData = data && typeof data === 'object' ? data : {};
    return <Component data={safeData} />;
};
