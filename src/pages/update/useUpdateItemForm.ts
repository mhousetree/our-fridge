import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const updateItemSchema = z.object({
  id: z.string(),
  stock: z.number().int().nonnegative(),
  userId: z.string(),
});

export type UpdateItemValues = z.infer<typeof updateItemSchema>;

export const useUpdateItemForm = (values: UpdateItemValues) => {
  const methods = useForm<UpdateItemValues>({
    resolver: zodResolver(updateItemSchema),
    values,
  });
  const {
    watch,
    trigger,
    formState: { isSubmitted },
  } = methods;
  useEffect(() => {
    const subscription = watch(async () => {
      await trigger('stock');
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [isSubmitted, watch, trigger]);
  return methods;
};
