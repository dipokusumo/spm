import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useMemo, useState } from 'react';
import { Field, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';
import { Separator } from '../ui/separator';

const DEFAULT_LPG_PRICE_PER_KG = 22000;
const DEFAULT_RATIO = 1.2;

function parseLocaleNumber(value: string): number {
    if (!value) return 0;

    // replace comma with dot
    const normalized = value.replace(',', '.');

    // remove invalid chars
    const cleaned = normalized.replace(/[^0-9.]/g, '');

    // prevent multiple dots
    const parts = cleaned.split('.');
    const final = parts.length > 2 ? `${parts[0]}.${parts.slice(1).join('')}` : cleaned;

    return parseFloat(final) || 0;
}

export default function LpgToLngCalculatorSection() {
    return (
        <section className="mx-auto max-w-7xl px-6 py-16">
            <div className="grid items-center gap-10 md:grid-cols-2">
                {/* LEFT: Content */}
                <div className="space-y-4">
                    <h2 className="text-3xl font-semibold leading-tight">Kalkulator Biaya LPG vs LNG</h2>

                    <p className="text-gray-600">Bandingkan penggunaan LPG dan LNG untuk melihat perbedaan biaya secara langsung.</p>

                    <div className="space-y-1 text-sm text-gray-500">
                        <p>• 1 kg LPG ≈ 1.2 Sm³ LNG</p>
                        <p>• Cocok untuk analisis industri & komersial</p>
                        <p>• Harga LPG yang digunakan mengacu pada ketentuan yang ditetapkan oleh Pemerintah</p>
                        <p>• Hubungi layanan pelanggan untuk informasi lebih lanjut</p>
                    </div>
                </div>

                {/* RIGHT: Calculator */}

                <Calculator />
            </div>
        </section>
    );
}

function Calculator() {
    const LPG_OPTIONS = [
        { size: 12, price: 220000 },
        { size: 50, price: 900000 },
    ];

    const [selectedLpg, setSelectedLpg] = useState(LPG_OPTIONS[0]);
    const [lpgUsagePerMonth, setLpgUsagePerMonth] = useState<number>(1);
    const [lngPrice, setLngPrice] = useState<number>(6000);
    const [ratioInput, setRatioInput] = useState<string>('1.2');
    const [ratio, setRatio] = useState<number>(DEFAULT_RATIO);

    const result = useMemo(() => {
        const lngSm3PerUnit = selectedLpg.size * ratio;

        const lpgTotalPerMonth = selectedLpg.price * lpgUsagePerMonth;
        const lngTotalPerMonth = lngSm3PerUnit * lngPrice * lpgUsagePerMonth;
        const lngUsePerMonth = lngSm3PerUnit * lpgUsagePerMonth;
        const lpgPerSm3 = selectedLpg.price / (selectedLpg.size * ratio);

        const savings = lpgTotalPerMonth - lngTotalPerMonth;
        const savingsPercent = lpgTotalPerMonth > 0 ? (savings / lpgTotalPerMonth) * 100 : 0;

        return {
            lngSm3PerUnit,
            lpgTotalPerMonth,
            lngTotalPerMonth,
            lngUsePerMonth,
            lpgPerSm3,
            savings,
            savingsPercent,
        };
    }, [selectedLpg, lngPrice, ratio, lpgUsagePerMonth]);

    return (
        <div className="w-full rounded-2xl border bg-white p-6 shadow-md">
            <h3 className="mb-4 text-lg font-semibold">Kalkulator LPG vs LNG</h3>

            {/* Inputs */}
            <div className="grid grid-cols-2 gap-4">
                <Field>
                    <FieldLabel>Jenis LPG</FieldLabel>
                    <Select
                        value={selectedLpg.size.toString()}
                        onValueChange={(val) => {
                            const found = LPG_OPTIONS.find((o) => o.size === Number(val));
                            if (found) setSelectedLpg(found);
                        }}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select LPG Size" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>LPG Size</SelectLabel>
                                {LPG_OPTIONS.map((option) => (
                                    <SelectItem key={option.size} value={option.size.toString()}>
                                        {option.size} kg
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </Field>
                <Field>
                    <FieldLabel>Pemakaian LPG / Bulan</FieldLabel>
                    <Input value={lpgUsagePerMonth} onChange={(e) => setLpgUsagePerMonth(Number(e.target.value))} type="number" />
                </Field>
                <Field>
                    <FieldLabel>LPG Price</FieldLabel>
                    <Input value={selectedLpg.price} disabled />
                </Field>
                <Field>
                    <FieldLabel>Ratio (LPG → LNG)</FieldLabel>
                    <Input
                        value={ratioInput}
                        inputMode="decimal"
                        onChange={(e) => {
                            const val = e.target.value;

                            setRatioInput(val);

                            const parsed = parseLocaleNumber(val);
                            if (!isNaN(parsed)) {
                                setRatio(parsed);
                            }
                            setRatio(parsed); // update numeric value
                        }}
                    />
                </Field>
            </div>

            {/* Results */}
            <Separator className="bg-accent mt-4" />

            <h3 className="mt-4 text-lg font-semibold">Hasil Perhitungan</h3>

            <div className="mt-2 rounded-xl bg-gray-50 p-4 text-sm">
                <table className="w-full border-collapse text-left">
                    <tbody className="divide-y">
                        <tr>
                            <td className="py-2 font-medium">Total LPG / Bulan</td>
                            <td className="py-2 text-right">{lpgUsagePerMonth}</td>
                        </tr>
                        <tr>
                            <td className="py-2 font-medium">Biaya LPG / Bulan</td>
                            <td className="py-2 text-right">Rp {result.lpgTotalPerMonth.toLocaleString()}</td>
                        </tr>
                        <tr>
                            <td className="py-2 font-medium">Equivalent LNG</td>
                            <td className="py-2 text-right">{result.lngSm3PerUnit.toFixed(2)} Sm³</td>
                        </tr>
                        <tr>
                            <td className="py-2 font-medium">Total LNG / Bulan</td>
                            <td className="py-2 text-right">{result.lngUsePerMonth.toFixed(2)} Sm³</td>
                        </tr>
                        <tr>
                            <td className="py-2 font-medium">Biaya LNG / Bulan</td>
                            <td className="py-2 text-right">Rp {result.lngTotalPerMonth.toLocaleString()}</td>
                        </tr>
                        <tr>
                            <td className="py-2 font-medium">Harga LPG / Sm³</td>
                            <td className="py-2 text-right">
                                Rp{' '}
                                {result.lpgPerSm3.toLocaleString(undefined, {
                                    maximumFractionDigits: 0,
                                })}
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className="mt-3 border-t pt-3">
                    <div className="flex items-center justify-between">
                        <span className="font-semibold">Penghematan</span>
                        <span className={`font-semibold ${result.savings >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            Rp {result.savings.toLocaleString()}
                        </span>
                    </div>
                    <p className="text-right text-xs text-gray-500">Hemat {result.savingsPercent.toFixed(1)}% dibandingkan LPG</p>
                </div>
            </div>
        </div>
    );
}
