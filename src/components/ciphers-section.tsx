import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { KeyRound, TextSelect, Sigma, Grid3x3 } from 'lucide-react';

export function CiphersSection() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-card/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center gap-4">
                    <div className="p-3 rounded-md bg-primary/10">
                        <TextSelect className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <CardTitle>Caesar Cipher</CardTitle>
                        <CardDescription>The original shift cipher</CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        One of the simplest substitution ciphers where each letter is replaced by a letter a fixed number of positions down the alphabet.
                    </p>
                </CardContent>
            </Card>
            <Card className="bg-card/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center gap-4">
                    <div className="p-3 rounded-md bg-primary/10">
                       <KeyRound className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <CardTitle>Vigenère Cipher</CardTitle>
                        <CardDescription>The "unbreakable" polyalphabetic cipher</CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        Encrypts text using a series of interwoven Caesar ciphers based on the letters of a keyword, making it much more secure.
                    </p>
                </CardContent>
            </Card>
             <Card className="bg-card/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center gap-4">
                    <div className="p-3 rounded-md bg-primary/10">
                       <Grid3x3 className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <CardTitle>Playfair Cipher</CardTitle>
                        <CardDescription>The first digraph substitution cipher</CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        Encrypts pairs of letters (digraphs) instead of single letters, making frequency analysis much more difficult for attackers.
                    </p>
                </CardContent>
            </Card>
            <Card className="bg-card/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center gap-4">
                    <div className="p-3 rounded-md bg-primary/10">
                       <Sigma className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <CardTitle>Hill Cipher</CardTitle>
                        <CardDescription>Cryptography with Linear Algebra</CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        A polygraphic substitution cipher using a matrix as its key. It was one of the first to operate on groups of letters.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
