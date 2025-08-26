'use client';

import { useState } from 'react';
import type { NavItemsProps } from '../ui/resizable-navbar';
import { MobileNav, MobileNavHeader, MobileNavMenu, MobileNavToggle, Navbar, NavbarLogo, NavBody, NavItems } from '../ui/resizable-navbar';

type NavbarProps = {
    logo?: string;
    item?: NavItemsProps['items'];
    backgroundColor?: string;
};

export default function Navigation({ logo, item }: NavbarProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Define the navigation items
    // If `item` is provided, use it; otherwise, use the default items
    const navItems = item || [
        {
            name: 'About',
            link: '#about',
        },
        {
            name: 'Works',
            link: '#works',
        },
        {
            name: 'Products',
            children: [
                { label: 'Algochurn', url: 'https://algochurn.com' },
                { label: 'Tailwind Master Kit', url: 'https://tailwindmasterkit.com' },
                { label: 'Moonbeam', url: 'https://gomoonbeam.com' },
                { label: 'Rogue', url: 'https://userogue.com' },
            ],
        },
        {
            name: 'Services',
            children: [
                { label: 'Web Development', url: '/web-dev' },
                { label: 'Interface Design', url: '/interface-design' },
                { label: 'Search Engine Optimization', url: '/seo' },
                { label: 'Branding', url: '/branding' },
            ],
        },
        {
            name: 'Contact',
            link: '#contact',
        },
    ];

    // State to track which mobile dropdowns are open
    const [openDropdowns, setOpenDropdowns] = useState<{ [key: number]: boolean }>({});

    const textColor = '#1A5DA4';

    return (
        <Navbar className="navbar">
            {/* Desktop Navigation */}
            <NavBody textColor={textColor}>
                <NavbarLogo logo={logo} />
                <NavItems items={navItems} textColor={textColor} />
            </NavBody>
            {/* Mobile Navigation */}
            <MobileNav>
                <MobileNavHeader>
                    <NavbarLogo logo={logo} />
                    <MobileNavToggle isOpen={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
                </MobileNavHeader>
                <MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
                    {navItems.map((item, idx) => {
                        const hasChildren = item.children && item.children.length > 0;
                        const isOpen = !!openDropdowns[idx];

                        return (
                            <div key={idx} className="w-full">
                                <div
                                    className="flex w-full items-center justify-between px-2 py-2 text-base font-semibold text-[#1A5DA4]"
                                    onClick={() => {
                                        if (hasChildren) {
                                            setOpenDropdowns((prev) => ({
                                                ...prev,
                                                [idx]: !prev[idx],
                                            }));
                                        } else {
                                            setIsMobileMenuOpen(false);
                                        }
                                    }}
                                >
                                    <a href={item.link || '#'}>{item.name.toUpperCase()}</a>
                                    {hasChildren && (
                                        <button className="text-[#1A5DA4] text-sm" type="button">
                                            {isOpen ? '-' : '+'}
                                        </button>
                                    )}
                                </div>

                                {/* Dropdown */}
                                {hasChildren && isOpen && (
                                    <div className="ml-4 mt-2 flex flex-col space-y-1">
                                        {item.children?.map((child, childIdx) => (
                                            <a
                                                key={childIdx}
                                                href={child.url || '#'}
                                                className="px-2 py-1 text-sm text-neutral-300"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                {child.label.toUpperCase()}
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </MobileNavMenu>
            </MobileNav>
        </Navbar>
    );
}
