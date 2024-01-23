import { Layout } from '@/components/Layout';
import { usePatchItem } from '@/pages/update/usePatchItem';
import { Item } from '@/types/item';
import { FetchError } from '@/utils/FetchError';
import { fetchAsyncToJson } from '@/utils/fetch';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { GetServerSideProps, NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { UpdateItemValues, useUpdateItemForm } from './useUpdateItemForm';

// TODO: 切り分け・リファクタリング

type Params = {
  id: string;
};
type Props = { data: Item };
type RadioItem = Record<'value' | 'label', string>;

const stock: RadioItem[] = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
];

const operations: RadioItem[] = [
  { value: 'decrement', label: 'たべた' },
  { value: 'increment', label: '買った' },
];

export const UpdatePage: NextPage<Props> = ({ data }) => {
  const router = useRouter();
  const { trigger, isMutating } = usePatchItem();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated: async () => {
      await router.replace('/');
    },
  });
  const [selectedStock, setSelectedStock] = useState<string>('1');
  const [selectedOperation, setSelectedOperation] = useState<RadioItem>(
    operations[0]
  );
  const [moreStockChange, setMoreStockChange] = useState<number>(4);
  const [isMoreStockEmpty, setIsMoreStockEmpty] = useState<boolean>(false);

  const newStock = useMemo<number>(() => {
    if (selectedStock === 'more') {
      return selectedOperation.value === 'decrement'
        ? data.stock - moreStockChange
        : data.stock + moreStockChange;
    } else {
      return selectedOperation.value === 'decrement'
        ? data.stock - Number(selectedStock)
        : data.stock + Number(selectedStock);
    }
  }, [selectedStock, selectedOperation, moreStockChange, data]);

  const handleStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedStock(e.target.value);
  };

  const handleMoreStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      setIsMoreStockEmpty(true);
    } else {
      setIsMoreStockEmpty(false);
    }

    setMoreStockChange(Number(e.target.value));
  };

  const handleOperationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOperation(
      operations.find((operation) => operation.value === e.target.value) ||
        operations[0]
    );
  };

  const methods = useUpdateItemForm(
    useMemo(() => {
      return {
        id: data.id,
        stock: newStock,
        userId: data.userId,
      };
    }, [data, newStock])
  );

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<UpdateItemValues> = async (updateValue) => {
    try {
      await trigger(updateValue);
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
      <section className="text-center flex flex-col">
        <p className="font-semibold">{data.name}を</p>
        <div className="flex w-fit items-center mx-auto mt-4">
          <div className="grid grid-rows-2 grid-cols-3 bg-white rounded-md items-center w-fit overflow-hidden">
            {stock.map((item) => (
              <div
                key={item.value}
                className="flex items-center justify-center w-full h-full border-l first-of-type:border-l-0"
              >
                <input
                  type="radio"
                  name="stock"
                  id={item.value}
                  value={item.value}
                  defaultChecked={item.value === '1'}
                  disabled={
                    selectedOperation.value === 'decrement'
                      ? data.stock < Number(item.value)
                      : false
                  }
                  className="w-0 h-0 opacity-0 peer"
                  onChange={handleStockChange}
                />
                <label
                  htmlFor={item.value}
                  className="text-xl w-full h-full flex items-center justify-center peer-focus-visible:font-semibold peer-checked:font-semibold peer-checked:bg-citron peer-disabled:bg-light-text/10 peer-disabled:text-light-text/60"
                >
                  {item.label}
                </label>
              </div>
            ))}
            <div className="flex col-span-full border-t">
              <input
                type="radio"
                name="stock"
                id="more"
                value="more"
                disabled={
                  selectedOperation.value === 'decrement' && data.stock < 4
                }
                className="w-0 h-0 opacity-0 peer"
                onChange={handleStockChange}
              />
              <label
                htmlFor="more"
                className="text-xl px-6 py-2.5 peer-checked:bg-citron peer-focus-visible:font-semibold peer-checked:font-semibold peer-disabled:bg-light-text/10 peer-disabled:text-light-text/60"
              >
                もっと（
                <input
                  type="number"
                  step={1}
                  min={4}
                  max={
                    selectedOperation.value === 'decrement'
                      ? data.stock
                      : undefined
                  }
                  defaultValue={4}
                  disabled={selectedStock !== 'more'}
                  className="disabled:bg-white/50 text-right border rounded h-7 w-14"
                  onChange={handleMoreStockChange}
                />
                ）
              </label>
            </div>
          </div>
          <p className="ml-4 text-lg">個</p>
        </div>
        {!Number.isInteger(newStock) && (
          <p className="text-red text-sm mt-3">
            個数は整数で入力してください！
          </p>
        )}
        {isMoreStockEmpty && (
          <p className="text-red text-sm mt-3">個数を入力してください！</p>
        )}
        <div className="flex divide-x bg-white rounded-md items-center max-w-4/5 w-80 overflow-hidden mt-8 mx-auto">
          {operations.map((operation) => (
            <div
              key={operation.value}
              className="flex items-center justify-center w-full h-full"
            >
              <input
                type="radio"
                name="operation"
                id={operation.value}
                value={operation.value}
                defaultChecked={operation.value === 'decrement'}
                onChange={handleOperationChange}
                className="w-0 h-0 opacity-0 peer"
              />
              <label
                htmlFor={operation.value}
                className={clsx(
                  'text-xl w-full h-full flex items-center justify-center border-white peer-focus-visible:font-semibold peer-checked:font-semibold py-4 peer-checked:text-white',
                  operation.value === 'increment'
                    ? 'peer-checked:bg-emerald'
                    : 'peer-checked:bg-red'
                )}
              >
                {operation.label}
              </label>
            </div>
          ))}
        </div>
        <ChevronDownIcon className="w-12 mx-auto mt-8" />
        <p className="mt-8">
          今ある{data.name}は<br />
          <span className={clsx('text-4xl', newStock < 0 ? 'text-red' : '')}>
            {Math.floor(newStock)}
          </span>
          <span className="ml-2">個</span>
        </p>
        {errors.stock?.type === 'too_small' && (
          <p className="text-red text-sm mt-3">
            個数が0以上になるように入力してください！
          </p>
        )}
        <form id={`form_${data.id}`} onSubmit={handleSubmit(onSubmit)}>
          <button
            form={`form_${data.id}`}
            type="submit"
            disabled={
              isMutating ||
              newStock < 0 ||
              !Number.isInteger(newStock) ||
              isMoreStockEmpty
            }
            className="mt-12 block bg-white py-2 px-4 w-fit mx-auto rounded-lg font-semibold text-light-text transition-colors hover:bg-citron disabled:bg-light-text/10 disabled:text-light-text/60"
          >
            更新する！
          </button>
        </form>
      </section>
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
