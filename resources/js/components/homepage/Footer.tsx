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
            <img src={getRelativePath(logo)} alt="SPM Logo" className="w-24" />

            {/* Content */}
            <div className="grid w-full max-w-7xl grid-cols-1 gap-6 md:gap-0 text-gray-700 md:grid-cols-3">
                {/* Left */}
                <div className="space-y-2">
                    <p>
                        <span className="font-semibold">Head Office:</span>
                    </p>
                    <p className="leading-relaxed">
                        World Capital Tower 9th Floor #03 <br />
                        Jl. I Gde Anak Agung, Lot D <br />
                        Mega Kuningan, Jakarta Selatan 12950
                    </p>
                </div>

                {/* Middle */}
                <div className="space-y-1 md:space-y-2 order-first md:order-none">
                    <p>
                        <span className="font-semibold">Email:</span> admin@spm-gas.com
                    </p>
                    <p>
                        <span className="font-semibold">Commercial:</span> commercial@spm-gas.com
                    </p>
                    <p>
                        <span className="font-semibold">Phone:</span> 0811-888-8985
                    </p>
                </div>

                {/* Right */}
                <div className="space-y-2">
                    <p>
                        <span className="font-semibold">LNG Filling Station:</span>
                    </p>
                    <p className="leading-relaxed">
                        Jl Yos Sudarso No. 14 <br />
                        Tanjung Priok, Jakarta Utara 14350
                    </p>
                </div>
            </div>

            {/* Social Icons */}
            {socials.length > 0 && (
                <div className="flex space-x-4">
                    {socials.map((s, idx) => {
                        const Icon = iconMap[s.icon.toLowerCase()];
                        if (!Icon) return null;
                        return (
                            <a key={idx} href={s.url} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[#1A5DA4]">
                                <Icon size={24} />
                            </a>
                        );
                    })}
                </div>
            )}

            {/* Links */}
            {item.length > 0 && (
                <div className="flex flex-wrap items-center justify-center space-x-2 text-xs text-gray-500">
                    {item.map((item, idx) => (
                        <a key={idx} href={item.url} className="hover:underline">
                            {item.label}
                        </a>
                    ))}
                </div>
            )}
        </footer>
    );
};

export default Footer;
