import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck, LockKeyhole } from 'lucide-react';

export function AlgorithmsSection() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-card/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center gap-4">
                    <div className="p-3 rounded-md bg-primary/10">
                        <LockKeyhole className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <CardTitle>RSA Algorithm</CardTitle>
                        <CardDescription>The Foundation of Public-Key Cryptography</CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        RSA is an asymmetric cryptography algorithm that uses a pair of keys: a public key for encryption and a private key for decryption. It's the backbone of secure data transmission for e-commerce, VPNs, and more.
                    </p>
                </CardContent>
            </Card>
            <Card className="bg-card/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center gap-4">
                    <div className="p-3 rounded-md bg-primary/10">
                       <ShieldCheck className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <CardTitle>DES Algorithm</CardTitle>
                        <CardDescription>The Data Encryption Standard</CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        The Data Encryption Standard is a symmetric-key algorithm for the encryption of digital data. Although its short key length makes it too insecure for most current applications, it was highly influential in the advancement of cryptography.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
