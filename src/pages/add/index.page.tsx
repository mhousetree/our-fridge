import { Layout } from '@/components/Layout';
import { StockFormInput } from '@/components/StockFormInput';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormValues, formSchema } from './useAddForm';
import { usePostItem } from './usePostItem';

const AddPage: NextPage = () => {
  const { data: session } = useSession();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });
  const router = useRouter();
  const { trigger, isMutating } = usePostItem();

  if (session?.user.id === undefined) {
    return (
      <Layout>
        <section className="py-32">
          <h1 className="font-semibold text-xl text-center">
            アイテムの登録にはログインが必要です！
          </h1>
          <p className="text-center">
            みんなの冷蔵庫では、Twitter（現X）と連携することでログインできます。
          </p>
        </section>
      </Layout>
    );
  }

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      await trigger(data);
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <form
        id="add_form"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center h-full my-16"
      >
        <label htmlFor="name" className="font-semibold text-lg text-center">
          冷蔵庫に入っている
          <br className="hidden sp:block" />
          お気に入りのアイテムは？
        </label>
        <StockFormInput
          type="text"
          id="name"
          {...register('name')}
          className={clsx(
            'mt-4 w-3/5',
            errors.name ? 'border-2 border-red' : ''
          )}
        />
        {errors.name && (
          <p className="text-red text-sm mt-2">
            アイテム名を入力してください！
          </p>
        )}
        <label htmlFor="stock" className="font-semibold mt-12 sp:text-lg">
          それは今冷蔵庫にいくつ入ってる？
        </label>
        <StockFormInput
          type="number"
          id="stock"
          {...register('stock', { valueAsNumber: true })}
          className={clsx(
            'mt-4 w-40',
            errors.stock ? 'border-2 border-red' : ''
          )}
          min="1"
        />
        {errors.stock?.type === 'invalid_type' && (
          <p className="text-red text-sm mt-2">
            個数は整数で入力してください！
          </p>
        )}
        {errors.stock?.type === 'too_small' && (
          <p className="text-red text-sm mt-2">
            個数は1以上で入力してください！
          </p>
        )}
        <button
          form="add_form"
          type="submit"
          disabled={isMutating}
          className="mt-12 block bg-white py-2 px-4 w-fit mx-auto rounded-lg font-semibold text-light-text transition-colors hover:bg-citron disabled:bg-light-text/10 disabled:text-light-text/60 sp:text-lg"
        >
          登録する！
        </button>
      </form>
    </Layout>
  );
};

export default AddPage;
