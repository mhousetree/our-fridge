import { Layout } from '@/components/Layout';
import { Item } from '@/types/item';
import { FetchError } from '@/utils/FetchError';
import { fetchAsyncToJson } from '@/utils/fetch';
import { usePatchItem } from '@/utils/usePatchItem';
import { UpdateValues, updateSchema } from '@/utils/useUpdateForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { GetServerSideProps, NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';

type Params = {
  id: string;
};
type Props = { data: Item };

export const UpdatePage: NextPage<Props> = ({ data }) => {
  const router = useRouter();
  const { trigger, isMutating } = usePatchItem();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UpdateValues>({
    resolver: zodResolver(updateSchema),
  });
  const { data: session } = useSession({
    required: true,
    onUnauthenticated: async () => {
      await router.replace('/');
    },
  });
  const onSubmit: SubmitHandler<UpdateValues> = async (data) => {
    try {
      await trigger(data);
      router.push(`/personal/${data.userId}`);
    } catch (error) {
      console.log(error);
    }
  };

  if (data.userId !== session?.user.id) {
    return (
      <Layout>
        <h1>エラー</h1>
        <p>これはあなたの食べ物ではありません。</p>
      </Layout>
    );
  }
  return (
    <Layout>
      <h1>{data.name}の在庫をアップデート</h1>
      <form id={`form_${data.id}`} onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" value={data.id} {...register('id')} />
        <input type="hidden" value={data.userId} {...register('userId')} />
        <input
          type="number"
          defaultValue={data.stock}
          className={
            errors.stock && errors.stock.type === 'too_small' ? 'text-red' : ''
          }
          {...register('stock', { valueAsNumber: true })}
        />
        <button form={`form_${data.id}`} type="submit" disabled={isMutating}>
          Update
        </button>
      </form>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<Props, Params> = async (
  context
) => {
  if (context.params === undefined) {
    return {
      notFound: true,
    };
  }
  const { id } = context.params;

  try {
    const data = await fetchAsyncToJson<Item>(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/items/${id}`
    );

    return {
      props: {
        data,
      },
    };
  } catch (error) {
    console.log(error);

    if (error instanceof FetchError && error.status === 404) {
      return { notFound: true };
    }

    throw error;
  }
};

export default UpdatePage;
