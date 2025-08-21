'use client';

import { isColorLight } from '@/lib/utils';
import { useState } from 'react';
import { Button } from '../ui/button';
import type { NavItemsProps } from '../ui/resizable-navbar';
import { MobileNav, MobileNavHeader, MobileNavMenu, MobileNavToggle, Navbar, NavbarLogo, NavBody, NavItems } from '../ui/resizable-navbar';

type NavbarProps = {
    logo?: string;
    item?: NavItemsProps['items'];
    backgroundColor?: string;
    custom?: { [key: string]: string }; // Custom colors or styles
};

export default function Navigation({ logo, item, custom }: NavbarProps) {
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

    const textColor = custom?.navbar || '';
    const isLightText = isColorLight(textColor);
    const isHomepage = 'border-brand text-brand';

    const defaultText = !custom?.navbar ? isHomepage : `border-[${textColor}] text-[${textColor}]`;

    const hoverBg = !custom?.navbar
        ? 'hover:border-none hover:bg-white'
        : isLightText
          ? 'hover:border-none hover:bg-white'
          : 'hover:border-none hover:bg-black';

    return (
        <Navbar className="navbar">
            {/* Desktop Navigation */}
            <NavBody textColor={textColor}>
                <NavbarLogo logo={logo} />
                <NavItems items={navItems} textColor={textColor} />
                <div className="z-20 hidden md:block">
                    <Button
                        variant="outline"
                        className={`rounded-full bg-transparent transition ${defaultText} ${hoverBg}`}
                        style={!custom?.navbar ? {} : { borderColor: textColor }}
                        onMouseEnter={(e) => {
                            const link = e.currentTarget.querySelector('a') as HTMLElement;
                            link.style.color = !custom?.navbar ? 'black' : isLightText ? 'black' : 'white';
                        }}
                        onMouseLeave={(e) => {
                            const link = e.currentTarget.querySelector('a') as HTMLElement;
                            link.style.color = textColor;
                        }}
                    >
                        <span
                            role="button"
                            tabIndex={0}
                            onClick={(e) => {
                                e.preventDefault();
                                const section = document.getElementById('get-in-touch');
                                section?.scrollIntoView({ behavior: 'smooth', block: 'end' });
                            }}
                            style={!custom?.navbar ? {} : { color: textColor }}
                        >
                            Get in Touch
                        </span>
                    </Button>
                </div>
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
                                    className="flex w-full items-center justify-between px-2 py-2 text-neutral-800 dark:text-neutral-200"
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
                                    <a href={item.link || '#'}>{item.name}</a>
                                    {hasChildren && (
                                        <button className="text-brand text-sm" type="button">
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
                                                className="px-2 py-1 text-sm text-neutral-600 dark:text-neutral-300"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                {child.label}
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
