import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { History, Lightbulb, Puzzle, Target } from 'lucide-react';

export function AboutSection() {
    return (
        <Card className="bg-card/80 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="text-3xl">About This Project</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-muted-foreground">
                <div className="flex items-start gap-4">
                    <div className="p-2 rounded-md bg-primary/10">
                        <History className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-foreground">A Glimpse into History</h3>
                        <p>
                            Explore the origins of secret communication with our Classical Cipher tool. Before computers, methods like the Caesar, Vigenère, and Playfair ciphers were used to protect messages for centuries. This tool lets you experience these historical techniques firsthand.
                        </p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <div className="p-2 rounded-md bg-primary/10">
                       <Puzzle className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-foreground">The Leap to Modern Encryption</h3>
                        <p>
                           Dive into the foundational algorithms that power today's digital security. Our interactive demo for RSA and DES illustrates the shift to more complex symmetric and asymmetric cryptography, showing how public and private keys work in a sender-receiver simulation.
                        </p>
                    </div>
                </div>
                 <div className="flex items-start gap-4">
                    <div className="p-2 rounded-md bg-primary/10">
                        <Target className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-foreground">An Educational Sandbox</h3>
                        <p>
                            CryptoCompanion was built to make learning about cryptography accessible and interactive. Our goal is to provide a hands-on experience with both the historical roots and the core principles of modern encryption. Experiment, learn, and have fun!
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
