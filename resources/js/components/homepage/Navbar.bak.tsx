import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: 'About', href: '#' },
        { name: 'Work', href: '#' },
        { name: 'Culture', href: '#' },
        { name: 'Contact', href: '#' },
    ];

    return (
        <header className="absolute left-0 right-0 top-0 z-50 bg-transparent py-4">
            <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <img src="/artee-logo.png" alt="artee" className="h-6 sm:h-7 md:h-8" />

                {/* Desktop Nav */}
                <nav className="hidden items-center space-x-6 text-white md:flex">
                    {navLinks.map((link, i) => (
                        <Link key={i} href={link.href} className="hover:text-brand transition hover:underline">
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* CTA Button - Desktop Only */}
                <div className="hidden md:block">
                    <Button
                        variant="outline"
                        className="border-brand text-brand rounded-full bg-transparent transition hover:bg-white hover:text-black"
                    >
                        Get in Touch
                    </Button>
                </div>

                {/* Hamburger Icon - Mobile */}
                <div className="md:hidden">
                    <button className="hover:text-brand text-white transition" onClick={() => setIsOpen(true)} aria-label="Open Menu">
                        <Menu className="h-6 w-6" />
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="fixed inset-0 z-50 bg-black px-6 py-8"
                    >
                        <div className="flex items-center justify-between">
                            <img src="/artee-logo.png" alt="artee" className="h-6" />
                            <button className="hover:text-brand text-white transition" onClick={() => setIsOpen(false)} aria-label="Close Menu">
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        <div className="mt-10 flex flex-col space-y-6 text-lg text-white">
                            {navLinks.map((link, i) => (
                                <Link key={i} href={link.href} className="hover:text-brand transition" onClick={() => setIsOpen(false)}>
                                    {link.name}
                                </Link>
                            ))}
                            <Button
                                variant="outline"
                                className="border-brand text-brand mt-6 w-full rounded-full bg-transparent transition hover:bg-white hover:text-black"
                                onClick={() => setIsOpen(false)}
                            >
                                Get in Touch
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
