import { Button } from '@/components/ui/button';

export default function HeroSection() {
    return (
        <section className="relative flex h-screen items-center justify-center">
            {/* Background */}
            <img
                src="/moon.gif"
                alt="Background Animation"
                className="absolute z-0 h-full w-full object-cover"
                draggable="false"
                onContextMenu={(e) => e.preventDefault()}
            />

            {/* Content */}
            <div className="absolute bottom-10 left-0 z-10 w-full sm:bottom-24">
                <div className="mx-auto max-w-7xl px-6 sm:px-8">
                    <h1 className="mb-4 max-w-md text-base leading-relaxed text-white sm:max-w-lg sm:text-lg md:max-w-xl md:text-4xl md:leading-snug">
                        Create impact through meaningful
                        <br className="block sm:hidden" /> and loud ideas. With a solid squad.
                    </h1>
                    <Button className="bg-brand mt-4 rounded-full px-6 text-sm text-white transition hover:bg-white hover:text-black">
                        Explore Our Works
                    </Button>
                </div>
            </div>
        </section>
    );
}
