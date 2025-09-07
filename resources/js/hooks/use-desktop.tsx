import { useEffect, useState } from 'react';

export function useIsDesktop() {
    const [isDesktop, setIsDesktop] = useState<boolean>();

    useEffect(() => {
        const check = () => setIsDesktop(window.innerWidth >= 1024); // sesuai Tailwind md/lg breakpoint
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    return isDesktop;
}