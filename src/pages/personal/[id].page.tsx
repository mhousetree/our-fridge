import { Layout } from '@/components/Layout';
import { User } from '@/types/user';
import { FetchError } from '@/utils/FetchError';
import { fetchAsyncToJson } from '@/utils/fetch';
import clsx from 'clsx';
import { GetServerSideProps, NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useMemo } from 'react';

type Params = {
  id: string;
};

type Props = {
  data: User;
};

const PersonalPage: NextPage<Props> = ({ data }) => {
  const { data: session } = useSession();
  const isMyPage = useMemo<boolean>(
    () => data.id === session?.user.id,
    [session, data]
  );
  return (
    <Layout>
      <h1 className="text-xl">{data.name}さんの冷蔵庫</h1>
      {data.items === undefined ? (
        <p>{data.name}の冷蔵庫はまだ空っぽです。</p>
      ) : (
        <dl className={clsx('grid', isMyPage ? 'grid-cols-3' : 'grid-cols-2')}>
          {data.items.map((item) => (
            <React.Fragment key={item.id}>
              <dt>{item.name}</dt>
              <dd>{item.stock}個</dd>
              {isMyPage && (
                <dd>
                  <Link href={`/update/${item.id}`}>たべた</Link>
                </dd>
              )}
            </React.Fragment>
          ))}
        </dl>
      )}
      <Link href="/">みんなの冷蔵庫を見る</Link>
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
    const data = await fetchAsyncToJson<User>(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/${id}`
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

export default PersonalPage;
