import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const formSchema = z.object({
  name: z.string().min(1),
  stock: z.number().int().positive(),
});

export type FormValues = z.infer<typeof formSchema>;

export const useAddForm = () => {
  const methods = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });
  return methods;
};
