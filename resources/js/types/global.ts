export interface NavbarChildLink {
    label: string;
    url: string;
}

export interface NavbarLink {
    label: string;
    url: string;
    has_dropdown?: boolean;
    children?: NavbarChildLink[];
}

export interface FooterLink {
    label: string;
    url: string;
}

export interface FooterSocial {
    label: string;
    url: string;
    icon: "facebook" | "instagram" | "youtube" | "linkedin" | "twitter" | "tiktok";
}

export interface ISiteSettings {
    id: number;
    footer_links: FooterLink[];
    footer_socials: FooterSocial[];
    navbar_logo: string;
    navbar_links: NavbarLink[];
    created_at: string;
    updated_at: string;
}
