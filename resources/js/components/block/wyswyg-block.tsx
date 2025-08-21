import { IWysiwygBlock } from '@/types/blocks.type';

const WysiwygBlock: React.FC<IWysiwygBlock> = ({ data }) => {
    const content = data?.content ?? '';

    return <div className="prose prose-brand max-w-none" dangerouslySetInnerHTML={{ __html: content }} />;
};

export default WysiwygBlock;
