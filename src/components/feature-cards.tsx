import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollText, ShieldCheck, ArrowRight } from 'lucide-react';

export function FeatureCards() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all group">
                <Link href="/ciphers" className="block h-full">
                    <CardHeader className="flex flex-row items-center gap-4">
                        <div className="p-3 rounded-md bg-primary/10">
                            <ScrollText className="h-8 w-8 text-primary" />
                        </div>
                        <div>
                            <CardTitle className="text-2xl">Classical Ciphers</CardTitle>
                            <CardDescription>From Caesar to Vigenère</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            Step back in time and explore the manual encryption techniques that laid the foundation for modern cryptography. Use our interactive tool to encrypt and decrypt messages.
                        </p>
                        <div className="flex items-center gap-2 mt-4 font-semibold text-primary">
                            Explore Ciphers <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </div>
                    </CardContent>
                </Link>
            </Card>
            <Card className="bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all group">
                <Link href="/algorithms" className="block h-full">
                    <CardHeader className="flex flex-row items-center gap-4">
                        <div className="p-3 rounded-md bg-primary/10">
                            <ShieldCheck className="h-8 w-8 text-primary" />
                        </div>
                        <div>
                            <CardTitle className="text-2xl">Modern Algorithms</CardTitle>
                            <CardDescription>RSA & DES Simulation</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            Dive into the world of symmetric and asymmetric encryption. Our sender-receiver simulation makes it easy to understand how public and private keys secure digital communication.
                        </p>
                         <div className="flex items-center gap-2 mt-4 font-semibold text-primary">
                            Run Simulation <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </div>
                    </CardContent>
                </Link>
            </Card>
        </div>
    );
}
