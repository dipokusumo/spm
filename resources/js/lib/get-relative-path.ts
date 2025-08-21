// Get relative path from url to laravel storage

export function getRelativePath(url: string): string {
    if (!url.startsWith('/') && !url.startsWith('http')) {
        return `/storage/${url}`;
    }
    console.log('getRelativePath called with:', url);
    return url;
}
