'use client';

import { isColorLight } from '@/lib/utils';
import { motion } from 'framer-motion'; // Changed from "motion/react"

const transition = {
    type: 'spring' as const,
    mass: 0.5,
    damping: 11.5,
    stiffness: 100,
    restDelta: 0.001,
    restSpeed: 0.001,
};

export type NavDropdownProps = {
    active: boolean;
    items: { label: string; url?: string }[];
    textColor?: string; // Optional prop for text color
};

export const NavDropdown = ({ active, items, textColor }: NavDropdownProps) => {
    if (!active || items.length === 0) return null;

    const isHomepage = '#FFFFFF'

    const effectiveTextColor = textColor || isHomepage;
    const isLightText = isColorLight(effectiveTextColor);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={transition}
            className="absolute left-1/2 top-[calc(100%_+_0.1rem)] z-50 -translate-x-1/2 transform pt-4"
        >
            <motion.div
                transition={transition}
                layoutId="active" // This layoutId is crucial for the bubble effect if used with a parent component
                className={`overflow-hidden rounded-2xl border shadow-xl backdrop-blur-sm ${isLightText ? 'border-white/[0.2] bg-black' : 'border-black/[0.2] bg-white'} `}
            >
                <motion.div layout className="flex h-full w-max flex-col space-y-4 p-4 text-sm">
                    {items.map((item, idx) => (
                        <a // Changed from <Link>
                            key={idx}
                            href={item.url || '#'}
                            className={`whitespace-nowrap hover:underline ${isLightText ? 'text-white' : 'text-black'} `}
                        >
                            {item.label}
                        </a>
                    ))}
                </motion.div>
            </motion.div>
        </motion.div>
    );
};
