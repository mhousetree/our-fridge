import { zodResolver } from '@hookform/resolvers/zod';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormValues, formSchema } from './useAddForm';
import { usePostItem } from './usePostItem';

const AddPage: NextPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });
  const router = useRouter();
  const { trigger, isMutating } = usePostItem();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      await trigger(data);
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  // TODO: style validation

  return (
    <main>
      <form
        id="hoge"
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 w-80"
      >
        <label htmlFor="name" className={errors.name ? 'text-red-500' : ''}>
          name
        </label>
        <input type="text" id="name" {...register('name')} />
        <label htmlFor="stock" className={errors.stock ? 'text-red-500' : ''}>
          stock
        </label>
        <input
          type="number"
          id="stock"
          {...register('stock', { valueAsNumber: true })}
        />
        <button form="hoge" type="submit" disabled={isMutating}>
          冷蔵庫に入れる
        </button>
      </form>
    </main>
  );
};

export default AddPage;
