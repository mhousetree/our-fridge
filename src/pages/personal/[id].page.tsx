/* eslint-disable @next/next/no-img-element */
import { Layout } from '@/components/Layout';
import { User } from '@/types/user';
import { FetchError } from '@/utils/FetchError';
import { fetchAsyncToJson } from '@/utils/fetch';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { GetServerSideProps, NextPage } from 'next';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';

type Params = {
  id: string;
};

type Props = {
  data: User;
};

const PersonalPage: NextPage<Props> = ({ data }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const isMyPage = useMemo<boolean>(
    () => data.id === session?.user.id,
    [session, data]
  );
  const handleClick = useCallback(() => {
    signOut();
    router.push('/');
  }, [router]);
  return (
    <Layout>
      <h1 className="text-center py-8 flex items-center flex-col">
        <img
          src={data.image}
          alt={`${data.name}さんのアイコン`}
          width="48"
          height="48"
          className="rounded-full mx-auto"
        />
        <span className="mt-2 block text-xl">{data.name}さんの冷蔵庫</span>
        {isMyPage && (
          <div className="flex space-x-4 items-center mt-2">
            <Link
              href="/add"
              className="block bg-white py-2 px-4 w-fit rounded-lg text-sm font-semibold text-light-text transition-colors hover:bg-citron"
            >
              新しく入れる
            </Link>
            <button
              className="bg-red py-2 px-4 w-fit rounded-lg text-sm font-semibold text-white transition-colors hover:bg-red/85"
              onClick={handleClick}
            >
              ログアウト
            </button>
          </div>
        )}
      </h1>
      <section className="mt-4">
        {data.items === undefined ? (
          <p>{data.name}の冷蔵庫はまだ空っぽです。</p>
        ) : (
          <dl
            className={clsx(
              'grid gap-x-6 w-4/5 mx-auto bg-white/50 px-4 py-2 box-content rounded-lg divide-y divide-emerald/20 divide-dashed',
              isMyPage ? 'grid-cols-items-3' : 'grid-cols-items-2'
            )}
          >
            {data.items.map((item) => (
              <div
                className={clsx(
                  'grid grid-cols-subgrid items-center p-2',
                  isMyPage ? 'col-span-3' : 'col-span-2'
                )}
                key={item.id}
              >
                <dt>{item.name}</dt>
                <dd>{item.stock} 個</dd>
                {isMyPage && (
                  <dd>
                    <Link
                      href={`/update/${item.id}`}
                      className="block text-sm leading-tight bg-emerald text-white px-2 py-1.5 rounded-md hover:bg-emerald/85 transition-colors"
                    >
                      たべた
                      <br />
                      買った
                    </Link>
                  </dd>
                )}
              </div>
            ))}
          </dl>
        )}
      </section>
      <Link
        href="/"
        className="bg-white/50 hover:bg-white/80 py-2 px-4 w-fit mx-auto mt-8 rounded-lg flex items-center transition-colors"
      >
        <ChevronLeftIcon className="w-4 h-4 mt-0.5" />
        <span className="ml-2">みんなの冷蔵庫に戻る</span>
      </Link>
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
