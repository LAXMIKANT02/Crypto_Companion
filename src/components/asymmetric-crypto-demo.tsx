'use client';
import { useState, useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { ArrowLeftRight, KeyRound, Loader2, LockKeyhole, User, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { handleGenerateKey } from '@/app/actions';
import { rsaCipher, desCipher } from '@/lib/crypto';
import { Separator } from './ui/separator';

const AsymmetricCryptoSchema = z.object({
  algorithm: z.enum(['rsa', 'des']),
  message: z.string().min(1, 'Message cannot be empty.'),
  publicKey: z.string().optional(),
  privateKey: z.string().optional(),
  symmetricKey: z.string().optional(),
});

type AsymmetricCryptoValues = z.infer<typeof AsymmetricCryptoSchema>;

export function AsymmetricCryptoDemo() {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [encryptedText, setEncryptedText] = useState('');
  const [decryptedText, setDecryptedText] = useState('');

  const form = useForm<AsymmetricCryptoValues>({
    resolver: zodResolver(AsymmetricCryptoSchema),
    defaultValues: {
      algorithm: 'rsa',
      message: 'Hello, World!',
      publicKey: '',
      privateKey: '',
      symmetricKey: '',
    },
    mode: 'onChange',
  });

  const algorithm = form.watch('algorithm');

  const onGenerateKeys = () => {
    startTransition(async () => {
      const { publicKey, privateKey, key, error } = await handleGenerateKey({ algorithm });
      if (error) {
        toast({ variant: 'destructive', title: 'Error Generating Keys', description: error });
        return;
      }
      if (algorithm === 'rsa' && publicKey && privateKey) {
        form.setValue('publicKey', publicKey, { shouldValidate: true });
        form.setValue('privateKey', privateKey, { shouldValidate: true });
        toast({ title: 'RSA Key Pair Generated' });
      } else if (algorithm === 'des' && key) {
        form.setValue('symmetricKey', key, { shouldValidate: true });
        toast({ title: 'DES Key Generated' });
      }
    });
  };

  const runSimulation = () => {
    const values = form.getValues();
    let encrypted = '';
    let decrypted = '';

    try {
        if (values.algorithm === 'rsa') {
            if (!values.publicKey || !values.privateKey) {
                toast({ variant: 'destructive', title: 'Missing Keys', description: 'Please generate RSA keys first.' });
                return;
            }
            encrypted = rsaCipher(values.message, values.publicKey, true);
            decrypted = rsaCipher(encrypted, values.privateKey, false);
        } else if (values.algorithm === 'des') {
            if (!values.symmetricKey) {
                toast({ variant: 'destructive', title: 'Missing Key', description: 'Please generate a DES key first.' });
                return;
            }
            encrypted = desCipher(values.message, values.symmetricKey, true);
            decrypted = desCipher(encrypted, values.symmetricKey, false);
        }

        setEncryptedText(encrypted);
        setDecryptedText(decrypted);

        toast({ title: 'Simulation Complete', description: 'Encryption and decryption steps are shown below.' });
    } catch (e: any) {
        toast({ variant: 'destructive', title: 'Simulation Error', description: e.message });
        setEncryptedText('');
        setDecryptedText('');
    }
  };

  const keyField = algorithm === 'rsa' ? (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
            control={form.control}
            name="publicKey"
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="flex items-center gap-2"><LockKeyhole className="text-primary"/> Public Key (for Encryption)</FormLabel>
                    <FormControl>
                        <Textarea placeholder="RSA Public Key (n,e)" {...field} className="font-code text-xs" rows={4} readOnly/>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
        <FormField
            control={form.control}
            name="privateKey"
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="flex items-center gap-2"><KeyRound className="text-primary"/> Private Key (for Decryption)</FormLabel>
                    <FormControl>
                        <Textarea placeholder="RSA Private Key (n,d,...)" {...field} className="font-code text-xs" rows={4} readOnly/>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    </div>
  ) : (
    <FormField
        control={form.control}
        name="symmetricKey"
        render={({ field }) => (
            <FormItem>
                <FormLabel className="flex items-center gap-2"><KeyRound className="text-primary"/>Symmetric Key</FormLabel>
                <FormControl>
                    <Input placeholder="8-character DES key" {...field} className="font-code" readOnly />
                </FormControl>
                 <FormMessage />
            </FormItem>
        )}
    />
  )


  return (
    <Card className="w-full shadow-2xl border-border bg-card/80 backdrop-blur-sm">
        <CardHeader>
            <CardTitle className="text-3xl text-center">Asymmetric Encryption Demo</CardTitle>
            <CardDescription className="text-center max-w-2xl mx-auto">
                This tool demonstrates how modern asymmetric (public/private key) and symmetric algorithms work.
                Generate keys, then run the simulation to see a message get encrypted and then decrypted.
            </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <Form {...form}>
                <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormField
                            control={form.control}
                            name="algorithm"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Algorithm</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger><SelectValue /></SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="rsa">RSA (Asymmetric)</SelectItem>
                                            <SelectItem value="des">DES (Symmetric)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                         <div className="md:col-span-2 flex items-end">
                            <Button type="button" onClick={onGenerateKeys} disabled={isPending} className="w-full md:w-auto">
                                {isPending ? <Loader2 className="animate-spin" /> : <Wand2 />}
                                Generate New {algorithm.toUpperCase()} {algorithm === 'rsa' ? 'Key Pair' : 'Key'}
                            </Button>
                        </div>
                    </div>
                   
                    {keyField}

                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Original Message</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Enter the message to simulate..." {...field} className="font-code"/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    
                    <div className="text-center">
                        <Button type="button" size="lg" onClick={runSimulation}>
                            <ArrowLeftRight className="mr-2"/>
                            Run Simulation
                        </Button>
                    </div>
                </form>
            </Form>

            {encryptedText && (
                 <div className="space-y-6 pt-6">
                     <Separator />
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                        {/* Sender */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold flex items-center gap-2"><User /> Sender</h3>
                            <p className="text-muted-foreground">The sender uses the <b className="text-primary">{algorithm === 'rsa' ? 'Public Key' : 'Symmetric Key'}</b> to encrypt the message.</p>
                             <Textarea
                                readOnly
                                value={form.getValues('message')}
                                className="min-h-[100px] font-code resize-y bg-muted/20"
                            />
                            <div className="text-center text-primary font-bold text-2xl">↓</div>
                            <Textarea
                                readOnly
                                value={encryptedText}
                                placeholder="Encrypted message appears here"
                                className="min-h-[150px] font-code resize-y bg-muted/50"
                            />
                        </div>

                         {/* Receiver */}
                         <div className="space-y-4">
                            <h3 className="text-xl font-semibold flex items-center gap-2"><User /> Receiver</h3>
                             <p className="text-muted-foreground">The receiver uses the <b className="text-primary">{algorithm === 'rsa' ? 'Private Key' : 'Symmetric Key'}</b> to decrypt the message.</p>
                             <Textarea
                                readOnly
                                value={encryptedText}
                                placeholder="Encrypted message appears here"
                                className="min-h-[150px] font-code resize-y bg-muted/50"
                            />
                             <div className="text-center text-primary font-bold text-2xl">↓</div>
                              <Textarea
                                readOnly
                                value={decryptedText}
                                placeholder="Decrypted message appears here"
                                className="min-h-[100px] font-code resize-y bg-muted/20"
                            />
                        </div>
                     </div>
                 </div>
            )}
        </CardContent>
    </Card>
  );
}
