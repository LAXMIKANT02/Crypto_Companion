import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookType, KeyRound, TextSelect } from 'lucide-react';

export function FeatureCards() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        One of the simplest and most widely known encryption techniques. It is a type of
                        substitution cipher in which each letter in the plaintext is replaced by a letter some
                        fixed number of positions down the alphabet.
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
                        A more robust method of encrypting alphabetic text by using a series of interwoven
                        Caesar ciphers based on the letters of a keyword. For a long time, it was considered
                        invincible.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
