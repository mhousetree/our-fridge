import { IconUser } from '@/components/IconUser';
import { Layout } from '@/components/Layout';
import { Item } from '@/types/item';
import { User } from '@/types/user';
import { fetchAsyncToJson } from '@/utils/fetch';
import clsx from 'clsx';
import { GetServerSideProps, NextPage } from 'next';
import { Kaisei_HarunoUmi } from 'next/font/google';
import Link from 'next/link';

const logo = Kaisei_HarunoUmi({ weight: '700', subsets: ['latin'] });

type UserById = { [key: string]: User };

type Props = { items: Item[]; userById: UserById };

const Home: NextPage<Props> = ({ items, userById }) => {
  return (
    <Layout>
      <h1
        className={clsx(
          'text-5xl text-center leading-none text-red py-6',
          logo.className
        )}
      >
        みんなの冷蔵庫
        <br />
        <span className="text-4xl">オンライン</span>
      </h1>
      <section className="mt-8 text-center">
        <p>
          みんなの冷蔵庫では「常備しておくとうれしいアイテム」のストック情報を登録したり、
          <br />
          他のユーザーが登録したアイテムの情報を見たりすることができます。
        </p>
        <p>レッツ、れいぞうコミュニケーション！</p>
      </section>
      <Link
        href="/add"
        className="mt-8 block bg-white py-3 px-5 w-fit mx-auto rounded-full font-semibold text-light-text transition-colors hover:bg-citron"
      >
        何か入れてみる
      </Link>
      <section className="mt-8">
        {items.length === 0 ? (
          <p className="text-center">冷蔵庫はまだ空っぽです。</p>
        ) : (
          <dl className="grid grid-cols-items-2 gap-x-6 w-4/5 mx-auto bg-white/50 px-4 py-2 box-content rounded-lg divide-y divide-emerald/20 divide-dashed">
            {items.map((item) => (
              <div
                className="grid grid-cols-subgrid col-span-2 p-2"
                key={item.id}
              >
                <dt className="flex items-center">
                  <Link href={`/personal/${item.userId}`}>
                    <IconUser iconSize="small" user={userById[item.userId]} />
                  </Link>
                  <span className="ml-0.5">さんの</span>
                  <span className="font-semibold ml-0.5">{item.name}</span>
                </dt>
                <dd className="text-right">{item.stock} 個</dd>
              </div>
            ))}
          </dl>
        )}
      </section>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  try {
    const items = await fetchAsyncToJson<Item[]>(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/items`
    );
    const users = await fetchAsyncToJson<User[]>(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users`
    );
    const userById = users.reduce((acc: UserById, obj) => {
      acc[obj.id] = obj;
      return acc;
    }, {});
    return {
      props: {
        items,
        userById,
      },
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default Home;
