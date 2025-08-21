import Footer from '@/components/homepage/Footer';
import { usePage } from '@inertiajs/react';
// import Navbar from '@/components/homepage/Navbar';

import Navigation from '@/components/homepage/Navbar';
import { NavItemsProps } from '@/components/ui/resizable-navbar';
import { Separator } from '@/components/ui/separator';
import { Toaster } from '@/components/ui/toaster';
// import { type BreadcrumbItem } from '@/types';
import { ISiteSettings, NavbarLink } from '@/types/global';
import { type ReactNode } from 'react';
import { getCustomColor } from '@/lib/get-custom-color';

interface AppLayoutProps {
    children: ReactNode;
    // breadcrumbs?: BreadcrumbItem[];
    custom?: string; // Optional custom CSS from division
}

export const transformNavbarLinks = (links: NavbarLink[]): NavItemsProps['items'] => {
    if (!links || !Array.isArray(links)) return [];

    return links.map((link) => ({
        name: link.label,
        link: link.url || '#',
        hasDropdown: !!link.children?.length,
        children: link.children || [], // pass raw children
    }));
};

export default ({ children, custom }: AppLayoutProps) => {
    const { siteSettings } = usePage().props as unknown as {
        siteSettings: ISiteSettings;
    };

    const navbarLinks = transformNavbarLinks(siteSettings?.navbar_links) || [];

    const customColor = getCustomColor(custom ?? '');

    return (
        <>
            <div>
                <Navigation logo={siteSettings?.navbar_logo} item={navbarLinks} custom={customColor} />
                {children}
                <Separator className='bg-neutral-500 mt-8' />
                <Footer />
            </div>

            <Toaster />
        </>
    );
};
