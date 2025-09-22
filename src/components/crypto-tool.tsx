'use client';

import { useState, useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { ArrowRight, Loader2, Wand2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { caesarCipher, vigenereCipher } from '@/lib/crypto';
import { handleGenerateKey } from '@/app/actions';

const CryptoFormSchema = z
  .object({
    algorithm: z.enum(['caesar', 'vigenere'], {
      required_error: 'Please select an algorithm.',
    }),
    inputText: z.string().min(1, {
      message: 'Input text cannot be empty.',
    }),
    key: z.string().min(1, {
      message: 'Key cannot be empty.',
    }),
    mode: z.enum(['encrypt', 'decrypt']),
  })
  .refine(
    data => {
      if (data.algorithm === 'caesar' && isNaN(Number(data.key))) {
        return false;
      }
      return true;
    },
    {
      message: 'Key must be a number for Caesar cipher.',
      path: ['key'],
    }
  )
  .refine(
    data => {
      if (data.algorithm === 'vigenere' && !/^[a-zA-Z]+$/.test(data.key)) {
        return false;
      }
      return true;
    },
    {
      message: 'Key must only contain letters for Vigenere cipher.',
      path: ['key'],
    }
  );

type CryptoFormValues = z.infer<typeof CryptoFormSchema>;

export function CryptoTool() {
  const [outputText, setOutputText] = useState('');
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<CryptoFormValues>({
    resolver: zodResolver(CryptoFormSchema),
    defaultValues: {
      algorithm: 'caesar',
      inputText: '',
      key: '',
      mode: 'encrypt',
    },
    mode: 'onChange',
  });

  const algorithm = form.watch('algorithm');
  const mode = form.watch('mode');

  function onSubmit(data: CryptoFormValues) {
    let result = '';
    const isEncrypt = data.mode === 'encrypt';

    if (data.algorithm === 'caesar') {
      result = caesarCipher(data.inputText, parseInt(data.key, 10), isEncrypt);
    } else if (data.algorithm === 'vigenere') {
      result = vigenereCipher(data.inputText, data.key, isEncrypt);
    }
    setOutputText(result);
  }

  const onGenerateKey = () => {
    startTransition(async () => {
      const { key, error } = await handleGenerateKey({
        algorithm,
        keyLength: algorithm === 'vigenere' ? 10 : undefined,
      });
      if (error) {
        toast({
          variant: 'destructive',
          title: 'Error Generating Key',
          description: error,
        });
      }
      if (key) {
        form.setValue('key', key, { shouldValidate: true });
        toast({
          title: 'Key Generated',
          description: 'A new key has been successfully generated.',
        });
      }
    });
  };

  const getKeyLabel = () => {
    if (algorithm === 'caesar') {
      return 'Shift (e.g., 3)';
    }
    return "Keyword (e.g., 'SECRET')";
  };

  return (
    <Card className="w-full shadow-2xl border-border bg-card/80 backdrop-blur-sm">
        <CardHeader>
            <CardTitle className="text-3xl">Crypto Tool</CardTitle>
            <CardDescription>
                Select a cipher, enter your text, and see the magic happen.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="algorithm"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Algorithm</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select an algorithm" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="caesar">Caesar Cipher</SelectItem>
                                            <SelectItem value="vigenere">Vigenere Cipher</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="key"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Key</FormLabel>
                                    <div className="flex gap-2">
                                        <FormControl>
                                            <Input placeholder={getKeyLabel()} {...field} className="font-code" />
                                        </FormControl>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="icon"
                                            onClick={onGenerateKey}
                                            disabled={isPending}
                                            aria-label="Generate Key"
                                        >
                                            {isPending ? (
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                            ) : (
                                                <Wand2 className="h-4 w-4" />
                                            )}
                                        </Button>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="mode"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormControl>
                                    <div className="grid w-full grid-cols-2">
                                        <Button
                                            type="button"
                                            variant={field.value === 'encrypt' ? 'secondary' : 'ghost'}
                                            onClick={() => field.onChange('encrypt')}
                                            className="rounded-r-none"
                                        >
                                            Encrypt
                                        </Button>
                                        <Button
                                            type="button"
                                            variant={field.value === 'decrypt' ? 'secondary' : 'ghost'}
                                            onClick={() => field.onChange('decrypt')}
                                            className="rounded-l-none"
                                        >
                                            Decrypt
                                        </Button>
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
                        <FormField
                            control={form.control}
                            name="inputText"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{mode === 'encrypt' ? 'Plaintext' : 'Ciphertext'}</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Your text here..."
                                            className="min-h-[150px] font-code resize-y"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-center">
                            <Button type="submit" size="icon" className="h-12 w-12 rounded-full">
                                <ArrowRight className="h-6 w-6" />
                            </Button>
                        </div>


                        <FormItem>
                            <FormLabel>Output</FormLabel>
                            <Textarea
                                readOnly
                                value={outputText}
                                placeholder="Result appears here..."
                                className="min-h-[150px] font-code resize-y bg-muted/50"
                            />
                        </FormItem>
                    </div>
                </form>
            </Form>
        </CardContent>
    </Card>
  );
}
