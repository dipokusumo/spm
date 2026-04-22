export function getRelativePath(url?: string | null): string {
    if (!url) return '/fallback.png';

    if (!url.startsWith('/') && !url.startsWith('http')) {
        return `/storage/${url}`;
    }

    return url;
}
