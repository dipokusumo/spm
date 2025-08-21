import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import { FaEnvelope, FaFacebook, FaGlobe, FaInstagram, FaTiktok } from 'react-icons/fa';
import { useToast } from '@/hooks/use-toast';
import { route } from 'ziggy-js';

export default function Footer() {
    const { data, setData, post, processing, reset } = useForm({
        name: '',
        email: '',
        message: '',
        agreed: Boolean(false),
    });

    const { toast } = useToast();
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const validationErrors: Record<string, string> = {};

        if (!data.name.trim()) validationErrors.name = 'Name is required.';
        if (!/^\S+@\S+\.\S+$/.test(data.email)) validationErrors.email = 'Invalid email format.';
        if (!data.message.trim()) validationErrors.message = 'Message is required.';
        if (!data.agreed) validationErrors.agreed = 'You must agree to the privacy policy.';

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) return;

        post(route('contact.store'), {
            onSuccess: () => {
                reset();
                setErrors({});
                toast({
                    title: 'Message sent!',
                    description: 'Thanks for reaching out — we’ll get back to you soon.',
                    duration: 3000,
                });
            },
        });
    };

    return (
        <footer className="px-6 py-10 text-white sm:px-8">
            <div className="mx-auto grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-0">
                {/* LEFT SIDE */}
                <div className="flex flex-col md:justify-between">
                    <div>
                        <h2 className="mb-8 text-center text-2xl md:mb-0 md:text-start md:text-3xl">
                            Let’s start the <span className="font-bold">Magic</span> and
                            <br />
                            Let us show you the <span className="font-bold">Tricks</span>
                        </h2>
                    </div>
                    <div className="flex flex-col items-center gap-4 text-center md:flex-row md:gap-8 md:text-start">
                        <img src="/artee-logo.png" alt="artee logo" className="mb-4 h-8 md:mb-0 md:mt-0.5" />
                        <p className="text-xs leading-relaxed text-white md:text-sm">
                            a group of <span className="text-brand font-semibold">talented magicians</span> united with
                            <br />a shared goal to transform digital marketing.
                        </p>
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="flex flex-col justify-between gap-8">
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 text-xs sm:grid-cols-2">
                        <div>
                            <Input
                                placeholder="Your name"
                                className="text-white"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                            />
                            {errors.name && <p className="mt-1 text-red-400">{errors.name}</p>}
                        </div>

                        <div>
                            <Input
                                placeholder="Your email"
                                className="text-white"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            {errors.email && <p className="mt-1 text-red-400">{errors.email}</p>}
                        </div>

                        <div className="sm:col-span-2">
                            <Input
                                placeholder="A few words about project"
                                className="text-white"
                                value={data.message}
                                onChange={(e) => setData('message', e.target.value)}
                            />
                            {errors.message && <p className="mt-1 text-red-400">{errors.message}</p>}
                        </div>

                        <div className="flex items-start gap-2 text-sm sm:col-span-2">
                            <Checkbox
                                id="agree"
                                checked={data.agreed}
                                onCheckedChange={(v) => setData('agreed', Boolean(v))}
                                className="mt-1 border-white"
                            />
                            <label htmlFor="agree" className="leading-relaxed text-white">
                                I confirm that I have read and agree to the{' '}
                                <a href="/privacy-policy" className="text-brand hover:underline">
                                    privacy policy
                                </a>
                                .{errors.agreed && <p className="text-red-400">{errors.agreed}</p>}
                            </label>
                        </div>

                        <div className="sm:col-span-2" id="get-in-touch">
                            <Button
                                className="bg-brand w-full rounded-full text-white transition hover:bg-white hover:text-black"
                                disabled={processing}
                            >
                                {processing ? 'Sending...' : 'Get in touch'}
                            </Button>
                        </div>
                    </form>

                    <div className="mt-12 flex justify-center gap-4 text-white md:mt-16 md:justify-end">
                        <FaInstagram className="hover:text-brand cursor-pointer" />
                        <FaTiktok className="hover:text-brand cursor-pointer" />
                        <FaFacebook className="hover:text-brand cursor-pointer" />
                        <FaGlobe className="hover:text-brand cursor-pointer" />
                        <FaEnvelope className="hover:text-brand cursor-pointer" />
                    </div>
                </div>
            </div>
        </footer>
    );
}