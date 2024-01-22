import { Layout } from '@/components/Layout';
import { Item } from '@/types/item';
import { fetchAsyncToJson } from '@/utils/fetch';
import { GetServerSideProps, NextPage } from 'next';
import { User } from 'next-auth';
import Link from 'next/link';
import React from 'react';

type UserById = { [key: string]: User };

type Props = { items: Item[]; userById: UserById };

const Home: NextPage<Props> = ({ items, userById }) => {
  return (
    <Layout>
      {items.length === 0 ? (
        <p>冷蔵庫はまだ空っぽです。</p>
      ) : (
        <dl className="grid grid-cols-2">
          {items.map((item) => (
            <React.Fragment key={item.id}>
              <dt>
                <Link href={`/personal/${item.userId}`}>
                  {userById[item.userId].name}
                </Link>
                さんの{item.name}
              </dt>
              <dd>{item.stock}個</dd>
            </React.Fragment>
          ))}
        </dl>
      )}

      <Link href="/add">何か入れる</Link>
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
