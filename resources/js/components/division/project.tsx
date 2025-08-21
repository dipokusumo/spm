import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useForm } from '@inertiajs/react';
import clsx from 'clsx';
import React, { useState } from 'react';
import { route } from 'ziggy-js';

const services = [
    'Brand strategy',
    'Brand identity',
    'Art direction',
    'ATL & BTL concept',
    'Collateral design',
    'Packaging design',
    'Annual report design',
];

interface ProjectProps {
    color?: string;
    divisionId: number;
    custom?: { [key: string]: string };
}

const budgets = ['10K - 20K', '20K - 50K', 'more than 50K'];

const Project: React.FC<ProjectProps> = ({ color, divisionId, custom }) => {
    const {
        project_backgroundservice,
        project_textservice,
        project_backgroundbudget,
        project_textbudget,
        project_privacypolicy,
        project_backgroundcta,
        project_textcta,
    } = custom || {};
    const [hovered, setHovered] = useState<string | null>(null);
    const [bgCta, setBgCta] = useState(project_backgroundcta || color);
    const [textCta, setTextCta] = useState(project_textcta || color);
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const [selectedBudget, setSelectedBudget] = useState<string | null>(null);

    const toggleService = (service: string) => {
        setSelectedServices((prev) => (prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]));
    };

    const { data, setData, post, processing, reset } = useForm({
        division_id: divisionId,
        service: selectedServices,
        budget: '',
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

        if (selectedServices.length === 0) validationErrors.service = 'At least one service is required.';
        if (!selectedBudget) validationErrors.budget = 'Budget is required.';
        if (!data.name.trim()) validationErrors.name = 'Name is required.';
        if (!/^\S+@\S+\.\S+$/.test(data.email)) validationErrors.email = 'Invalid email format.';
        if (!data.message.trim()) validationErrors.message = 'Message is required.';
        if (!data.agreed) validationErrors.agreed = 'You must agree to the privacy policy.';

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) return;

        post(route('division.contact.store'), {
            onSuccess: () => {
                reset();
                setSelectedServices([]); // reset service selection
                setSelectedBudget(null);
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
        <section className="text-white">
            <div className="mx-auto px-8 md:max-w-2xl">
                <form onSubmit={handleSubmit} className="mb-20 flex flex-col justify-between gap-6">
                    <h1 className="mb-5 text-center text-xl md:text-3xl">Please tell us about your project</h1>
                    <div className="text-sm">Service</div>
                    <div className="flex flex-wrap gap-2">
                        {services.map((service) => {
                            const isSelected = selectedServices.includes(service);
                            const isHovered = hovered === service;

                            return (
                                <button
                                    key={service}
                                    type="button"
                                    onClick={() => {
                                        toggleService(service);
                                        setData(
                                            'service',
                                            isSelected ? selectedServices.filter((s) => s !== service) : [...selectedServices, service],
                                        );
                                    }}
                                    onMouseEnter={() => setHovered(service)}
                                    onMouseLeave={() => setHovered(null)}
                                    className={clsx('rounded-full border px-4 py-2 text-sm transition', isSelected ? '' : 'border-white')}
                                    style={{
                                        backgroundColor: isSelected ? project_backgroundservice || color : isHovered ? '#FFFFFF' : 'transparent',
                                        color: isSelected ? project_textservice || color : isHovered ? '#000000' : '#FFFFFF',
                                    }}
                                >
                                    {service}
                                </button>
                            );
                        })}

                        {errors.service && <p className="mt-2.5 text-xs text-red-400">{errors.service}</p>}
                    </div>
                    <div className="text-sm">Budget in Rupiah</div>
                    <div className="flex flex-wrap gap-2">
                        {budgets.map((budget) => {
                            const isSelected = selectedBudget === budget;
                            const isHovered = hovered === budget;

                            return (
                                <button
                                    key={budget}
                                    type="button"
                                    onClick={() => {
                                        setSelectedBudget(budget);
                                        setData('budget', budget);
                                    }}
                                    onMouseEnter={() => setHovered(budget)}
                                    onMouseLeave={() => setHovered(null)}
                                    className={clsx('rounded-full border px-4 py-2 text-sm transition', isSelected ? '' : 'border-white')}
                                    style={{
                                        backgroundColor: isSelected ? project_backgroundbudget || color : isHovered ? '#FFFFFF' : 'transparent',
                                        color: isSelected ? project_textbudget || color : isHovered ? '#000000' : '#FFFFFF',
                                    }}
                                >
                                    {budget}
                                </button>
                            );
                        })}

                        {errors.budget && <p className="mt-2.5 text-xs text-red-400">{errors.budget}</p>}
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <Input
                                placeholder="Your name"
                                className="text-white"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                            />
                            {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
                        </div>
                        <div>
                            <Input
                                placeholder="Your email"
                                className="text-white"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
                        </div>
                        <div className="sm:col-span-2">
                            <Input
                                placeholder="A few word about project"
                                className="text-white"
                                value={data.message}
                                onChange={(e) => setData('message', e.target.value)}
                            />
                            {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message}</p>}
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
                                <a href="/privacy-policy" className="hover:underline" style={{ color: project_privacypolicy || color }}>
                                    privacy policy
                                </a>
                                {errors.agreed && <p className="mt-1 text-xs text-red-400">{errors.agreed}</p>}
                            </label>
                        </div>
                        <div className="sm:col-span-2">
                            <Button
                                className="bg-brand w-full rounded-full text-white transition hover:bg-white hover:text-black"
                                disabled={processing}
                                style={{ backgroundColor: bgCta, color: textCta }}
                                onMouseEnter={() => {
                                    setBgCta('#FFFFFF');
                                    setTextCta('#000000');
                                }}
                                onMouseLeave={() => {
                                    setBgCta(project_backgroundcta || color);
                                    setTextCta(project_textcta || color);
                                }}
                            >
                                {processing ? 'Sending...' : "Let's discuss"}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Project;
