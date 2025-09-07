import { getRelativePath } from '@/lib/get-relative-path';
import { FooterLink, FooterSocial } from '@/types/global';
import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok, FaTwitter, FaYoutube } from 'react-icons/fa';

type FooterProps = {
    logo: string;
    item: FooterLink[];
    socials: FooterSocial[];
    anchor?: string;
};

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
    facebook: FaFacebook,
    instagram: FaInstagram,
    youtube: FaYoutube,
    linkedin: FaLinkedin,
    twitter: FaTwitter,
    tiktok: FaTiktok,
};

const Footer: React.FC<FooterProps> = ({ logo, item, socials, anchor }) => {
    return (
        <footer className="flex flex-col items-center justify-center space-y-6 py-12 text-center text-sm text-gray-600" id={anchor}>
            {/* Logo */}
            <img src={getRelativePath(logo)} alt="SPM Logo" className="h-16 w-auto" />

            {/* Email */}
            <p className="text-gray-700">
                <span className="font-semibold">Email:</span> admin@spm-gas.com
            </p>

            {/* Social Icons */}
            <div className="flex space-x-4">
                {socials.map((s, idx) => {
                    const Icon = iconMap[s.icon.toLowerCase()];
                    if (!Icon) return null;
                    return (
                        <a key={idx} href={s.url} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-blue-600">
                            <Icon size={18} />
                        </a>
                    );
                })}
            </div>

            {/* Links */}
            <div className="flex flex-wrap items-center justify-center space-x-2 text-xs text-gray-500">
                {item.map((item, idx) => (
                    <a key={idx} href={item.url} className="hover:underline">
                        {item.label}
                    </a>
                ))}
            </div>
        </footer>
    );
};

export default Footer;
