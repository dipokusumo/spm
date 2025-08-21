export interface IBlock {
    type: string;
    data?: Record<string, unknown>;
}

export interface IHeroBlock {
    data?: {
        title?: string;
        subtitle?: string;
        cta_text?: string;
        cta_url?: string;
        background_url?: string;
    };
}

export interface IDivision {
    data?: {
        title?: string;
        slug?: string;
        name?: string;
        color?: string;
    };
}

export interface HeroDivisionProps {
    data?: IHeroBlock['data'] & IDivision['data'];
    color?: string;
    name?: string;
    slug?: string;
    blocks?: {
        type?: string;
        data?: {
            background_url?: string;
        };
    }[];
    custom?: { [key: string]: string };
}

export interface ISectionParagraphBlock {
    data?: {
        content_type?: 'title' | 'image';
        title?: string;
        title_color?: string;
        custom_css?: string;
        custom_padding?: string;
        url?: string;
        image?: string;
        content?: string;
        direction: 'ltr' | 'rtl'; // Text direction, default is 'ltr'
    };
}

export interface IWysiwygBlock {
    data?: {
        content?: string; // HTML string
    };
}

export interface IImageMarqueeBlock {
    data?: {
        images?: { image: string }[];
        speed?: number;
    };
}

export interface ICollageImageBlock {
    data?: {
        images: { image: string; }[];
    };
}

export interface IWork {
    id: number;
    division_id?: number;
    division?: {
        slug?: string;
    };
    name?: string;
    campaign?: string;
    campaign_name?: string;
    campaign_description?: string;
    is_highlighted?: boolean;
    campaign_image?: string;
    title?: string;
    slug?: string;
    seo_title?: string;
    seo_description?: string;
    seo_image?: string;
}
