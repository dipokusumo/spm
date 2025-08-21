'use client';

import { cn, isColorLight } from '@/lib/utils';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';

import { Link } from '@inertiajs/react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import React, { useRef, useState } from 'react';
import { NavDropdown } from './nav-dropdown';

interface NavbarProps {
    children: React.ReactNode;
    className?: string;
}

interface NavBodyProps {
    children: React.ReactNode;
    className?: string;
    visible?: boolean;
    textColor?: string;
}

export interface NavItemsProps {
    items: {
        name: string;
        link?: string;
        hasDropdown?: boolean;
        children?: { label: string; url?: string }[];
    }[];
    className?: string;
    textColor?: string;
    onItemClick?: () => void;
}

interface MobileNavProps {
    children: React.ReactNode;
    className?: string;
    visible?: boolean;
}

interface MobileNavHeaderProps {
    children: React.ReactNode;
    className?: string;
}

interface MobileNavMenuProps {
    children: React.ReactNode;
    className?: string;
    isOpen: boolean;
    onClose: () => void;
}

export const Navbar = ({ children, className }: NavbarProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll({
        target: ref,
        offset: ['start start', 'end start'],
    });
    const [visible, setVisible] = useState<boolean>(false);

    useMotionValueEvent(scrollY, 'change', (latest) => {
        if (latest > 100) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    });

    return (
        <motion.div ref={ref} className={cn('fixed inset-x-0 top-0 z-40 w-full', className)}>
            {React.Children.map(children, (child) =>
                React.isValidElement(child) ? React.cloneElement(child as React.ReactElement<{ visible?: boolean }>, { visible }) : child,
            )}
        </motion.div>
    );
};

export const NavBody = ({ children, className, visible, textColor }: NavBodyProps) => {
    const isHomepage = '#FFFFFF';
    const effectiveTextColor = textColor || isHomepage;

    const isLightText = isColorLight(effectiveTextColor);

    return (
        <motion.div
            animate={{
                backdropFilter: visible ? 'blur(10px)' : 'none',
                boxShadow: visible
                    ? '0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset'
                    : 'none',
                width: visible ? '40%' : '100%',
                y: visible ? 20 : 0,
            }}
            transition={{
                type: 'spring',
                stiffness: 200,
                damping: 50,
            }}
            style={{
                minWidth: '800px',
            }}
            className={cn(
                'relative z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-full bg-transparent px-4 py-2 dark:bg-transparent lg:flex',
                visible && (isLightText ? 'bg-white/100 dark:bg-neutral-900/70' : 'bg-black/20 dark:bg-white/40'),
                className,
            )}
        >
            {children}
        </motion.div>
    );
};

export const NavItems = ({ items, className, textColor, onItemClick }: NavItemsProps) => {
    const [hovered, setHovered] = useState<number | null>(null);
    const [active, setActive] = useState<string | null>(null);

    const homepageColor = '#FFFFFF';

    const effectiveTextColor = textColor || homepageColor;
    const isLightText = isColorLight(effectiveTextColor);

    return (
        <motion.div
            onMouseLeave={() => {
                setHovered(null);
                setActive(null);
            }}
            className={cn(
                'absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-2 bg-transparent text-sm font-medium text-zinc-600 transition duration-200 hover:text-zinc-800 lg:flex lg:space-x-2',
                className,
            )}
        >
            {items.map((item, idx) => {
                const isAnchor = item.link?.startsWith('#') ?? false;;

                return (
                    <div
                        key={`link-${idx}`}
                        className="relative"
                        onMouseEnter={() => {
                            setHovered(idx);
                            if (item.hasDropdown && (item.children?.length ?? 0) > 0) {
                                setActive(item.name);
                            } else {
                                setActive(null);
                            }
                        }}
                    >
                        {isAnchor ? (
                            // 🔗 Jika anchor, handle scroll manual
                            <span
                                role="button"
                                tabIndex={0}
                                onClick={(e) => {
                                    e.preventDefault();
                                    const section = document.getElementById(item.link!.substring(1)); // remove #
                                    section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                }}
                                className="relative cursor-pointer px-4 py-2"
                                style={{ color: effectiveTextColor }}
                            >
                                {hovered === idx && (
                                    <motion.div
                                        layoutId="hovered"
                                        className={`absolute inset-0 h-full w-full rounded-full ${isLightText ? 'bg-neutral-800' : 'bg-neutral-100'}`}
                                    />
                                )}
                                <span className="relative z-20">{item.name}</span>
                            </span>
                        ) : item.link ? (
                            // 🌐 Jika normal link
                            <Link
                                onClick={onItemClick}
                                className="relative cursor-pointer px-4 py-2"
                                style={{ color: effectiveTextColor }}
                                href={item.link}
                            >
                                {hovered === idx && (
                                    <motion.div
                                        layoutId="hovered"
                                        className={`absolute inset-0 h-full w-full rounded-full ${isLightText ? 'bg-neutral-800' : 'bg-neutral-100'}`}
                                    />
                                )}
                                <span className="relative z-20">{item.name}</span>
                            </Link>
                        ) : (
                            <div className="relative cursor-pointer px-4 py-2" style={{ color: effectiveTextColor }}>
                                {hovered === idx && (
                                    <motion.div
                                        layoutId="hovered"
                                        className={`absolute inset-0 h-full w-full rounded-full ${isLightText ? 'bg-neutral-800' : 'bg-neutral-100'}`}
                                    />
                                )}
                                <span className="group:text relative z-20">{item.name}</span>
                            </div>
                        )}

                        {/* Dropdown */}
                        {item.hasDropdown && (item.children?.length ?? 0) > 0 && (
                            <NavDropdown active={active === item.name} items={item.children ?? []} textColor={textColor} />
                        )}
                    </div>
                );
            })}
        </motion.div>
    );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
    return (
        <motion.div
            animate={{
                backdropFilter: visible ? 'blur(10px)' : 'none',
                boxShadow: visible
                    ? '0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset'
                    : 'none',
                width: visible ? '90%' : '100%',
                paddingRight: visible ? '12px' : '0px',
                paddingLeft: visible ? '12px' : '0px',
                borderRadius: visible ? '4px' : '2rem',
                y: visible ? 20 : 0,
            }}
            transition={{
                type: 'spring',
                stiffness: 200,
                damping: 50,
            }}
            className={cn(
                'relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between bg-transparent px-0 py-2 lg:hidden',
                visible && 'bg-white/80 dark:bg-neutral-950/80',
                className,
            )}
        >
            {children}
        </motion.div>
    );
};

export const MobileNavHeader = ({ children, className }: MobileNavHeaderProps) => {
    return <div className={cn('flex w-full flex-row items-center justify-between', className)}>{children}</div>;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const MobileNavMenu = ({ children, className, isOpen, onClose }: MobileNavMenuProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={cn(
                        'absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-lg bg-white px-4 py-8 shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] dark:bg-neutral-950',
                        className,
                    )}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export const MobileNavToggle = ({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) => {
    return isOpen ? (
        <FaAngleUp className="cursor-pointer text-black dark:text-white" onClick={onClick} />
    ) : (
        <FaAngleDown className="cursor-pointer text-black dark:text-white" onClick={onClick} />
    );
};

export const NavbarLogo = ({ logo }: { logo?: string }) => {
    return (
        <Link href="/" className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-black">
            <img src={logo} alt="artee" className="h-6 sm:h-7 md:h-8" />
        </Link>
    );
};

export const NavbarButton = ({
    href,
    as: Tag = 'a',
    children,
    className,
    variant = 'primary',
    ...props
}: {
    href?: string;
    as?: React.ElementType;
    children: React.ReactNode;
    className?: string;
    variant?: 'primary' | 'secondary' | 'dark' | 'gradient';
} & (React.ComponentPropsWithoutRef<'a'> | React.ComponentPropsWithoutRef<'button'>)) => {
    const baseStyles =
        'px-4 py-2 rounded-md bg-white button bg-white text-black text-sm font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center';

    const variantStyles = {
        primary:
            'shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]',
        secondary: 'bg-transparent shadow-none dark:text-white',
        dark: 'bg-black text-white shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]',
        gradient: 'bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset]',
    };

    return (
        <Tag href={href || undefined} className={cn(baseStyles, variantStyles[variant], className)} {...props}>
            {children}
        </Tag>
    );
};

// Helper components for dropdown content
export const ProductItem = ({ title, description, href, src }: { title: string; description: string; href: string; src: string }) => {
    return (
        <a href={href} className="flex space-x-2">
            <img src={src || '/placeholder.svg'} width={140} height={70} alt={title} className="shrink-0 rounded-md shadow-2xl" />
            <div>
                <h4 className="mb-1 text-xl font-bold text-black dark:text-white">{title}</h4>
                <p className="max-w-[10rem] text-sm text-neutral-700 dark:text-neutral-300">{description}</p>
            </div>
        </a>
    );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const HoveredLink = ({ children, ...rest }: any) => {
    return (
        <Link {...rest} className="hover:text-brand text-neutral-700 dark:text-neutral-200">
            {children}
        </Link>
    );
};
