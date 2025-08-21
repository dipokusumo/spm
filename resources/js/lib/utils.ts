import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function isColorLight(hex: string) {
    // Hilangkan tanda #
    const cleanHex = hex.replace('#', '');

    // Convert ke R, G, B
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);

    // Hitung brightness
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    return brightness > 128;
}
