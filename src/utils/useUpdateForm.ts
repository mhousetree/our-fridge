import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const updateSchema = z.object({
  id: z.string(),
  stock: z.number().int().nonnegative(),
  userId: z.string(),
});

export type UpdateValues = z.infer<typeof updateSchema>;

export const useUpdateItem = () => {
  const methods = useForm<UpdateValues>({
    resolver: zodResolver(updateSchema),
  });
  return methods;
};
