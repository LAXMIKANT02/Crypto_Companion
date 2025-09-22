import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { History, Lightbulb, Target } from 'lucide-react';

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
                            Classical ciphers are the foundation of modern cryptography. Before computers, these
                            methods were used to send secret messages for centuries, from ancient Rome to World War
                            II. This tool lets you experience these historical techniques firsthand.
                        </p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <div className="p-2 rounded-md bg-primary/10">
                       <Lightbulb className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-foreground">Why Learn About Them?</h3>
                        <p>
                            Understanding simple ciphers like Caesar and Vigenère is the first step to
                            appreciating the complexity and elegance of the encryption that protects our digital
                            lives today. It's a fun way to learn the core concepts of cryptography, such as keys,
                            substitution, and cryptanalysis.
                        </p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <div className="p-2 rounded-md bg-primary/10">
                        <Target className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-foreground">The Goal</h3>
                        <p>
                            CryptoCompanion was built to be an educational sandbox. Our goal is to make learning
                            about cryptography accessible and interactive. Experiment, learn, and have fun
                            exploring the building blocks of secret communication!
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
