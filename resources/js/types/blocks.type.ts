export interface IBlock {
    type: string;
    data?: Record<string, unknown>;
}

export interface IHeroBlock {
    data?: {
        title?: string;
        section_anchor?: string;
        subtitle?: string;
        cta_text?: string;
        cta_url?: string;
        background_url?: string;
    };
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
        images: { image: string }[];
    };
}

export interface IBusinessModelBlock {
    data?: {
        title?: string;
        section_anchor?: string;
        upper_paragraph?: string;
        lower_paragraph?: string;
        items?: { subtitle?: string; description?: string }[];
        background_url?: string;
    };
}

export interface ITargetModelBlock {
    data?: {
        title?: string;
        section_anchor?: string;
        items?: { subtitle?: string; icon: string; description?: string }[];
    };
}

export interface ICarouselBlock {
    data: {
        carousel_title: string;
        section_anchor?: string;
        slides?: {
            background_url: string;
            slide_title?: string;
            slide_description?: string;
        }[];
    };
}

export interface IProductServiceBlock {
    data: {
        title: string;
        section_anchor?: string;
        products_services: {
            image: string;
            name: string;
            logo: string;
            specs: { label: string; value: string }[];
            services: { title: string; description: string; color: string }[];
        }[];
    };
}