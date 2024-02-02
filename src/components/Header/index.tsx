import { News } from '@/types/news';
import { User } from '@/types/user';
import { fetchAsyncToJson } from '@/utils/fetch';
import clsx from 'clsx';
import { Timestamp } from 'firebase-admin/firestore';
import { useSession } from 'next-auth/react';
import { Kaisei_HarunoUmi } from 'next/font/google';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { IconUser } from '../IconUser';
import { TwitterLoginButton } from '../TwitterLoginButton';

const logo = Kaisei_HarunoUmi({ weight: '700', subsets: ['latin'] });

type Props = {
  isHome?: boolean;
};

export const Header: React.FC<Props> = ({ isHome = false }) => {
  const { data: session } = useSession();
  const [user, setUser] = useState<User>();
  const [news, setNews] =
    useState<{ userName: string; news: News; updatedAt: Timestamp }[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (session?.user.id !== undefined) {
      fetchAsyncToJson<User>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/${session?.user.id}`
      ).then((data) => {
        setUser(data);
      });
    }
    setIsLoading(false);
  }, [setUser, setIsLoading, session]);

  useEffect(() => {
    fetchAsyncToJson<{ userName: string; news: News; updatedAt: Timestamp }[]>(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/news`
    ).then((data) => {
      setNews(data);
    });
  }, [setNews]);

  const renderLoginOrProfile = useCallback(() => {
    if (isLoading) {
      return <></>;
    } else if (session?.user.id === undefined) {
      return <TwitterLoginButton />;
    } else if (!user) {
      return <></>;
    } else {
      return (
        <Link
          href={`/personal/${user.id}`}
          className="hover:bg-white/80 p-2 transition-colors rounded-lg text-light-text hover:text-emerald"
        >
          <div className="flex items-center">
            <IconUser isNameHidden user={user} />
          </div>
        </Link>
      );
    }
  }, [session, user, isLoading]);

  const renderNewsBar = useCallback(() => {
    if (news === undefined || news.length === 0) {
      return <></>;
    } else {
      return (
        <div className="bg-citron w-screen h-6 absolute left-0 top-0 flex justify-center space-x-4 items-center overflow-hidden">
          <div className="max-w-2xl flex items-center space-x-4">
            <p className="w-max break-keep font-bold text-sm">最新情報</p>
            <ul className="flex space-y-5 justify-center w-max flex-col animate-news sp:animate-news-sp">
              {news.map((item, index) => {
                let operation = '';
                switch (item.news.type) {
                  case 'new':
                    operation = '新しく入れました！';
                    break;
                  case 'eat':
                    operation = '食べました！';
                    break;
                  case 'buy':
                    operation = '買ってきました！';
                    break;
                }

                return (
                  <li key={index} className="text-sm w-max">
                    {item.userName}
                    <span className="text-xs">さんが</span>
                    {item.news.item}
                    <span className="text-xs">を</span>
                    {item.news.number}
                    <span className="text-xs">個{operation}</span>
                  </li>
                );
              })}
              <li className="text-sm w-max">
                {news[0].userName}
                <span className="text-xs">さんが</span>
                {news[0].news.item}
                <span className="text-xs">を</span>
                {news[0].news.number}
                <span className="text-xs">
                  個
                  {news[0].news.type === 'new'
                    ? '新しく入れました！'
                    : news[0].news.type === 'eat'
                    ? '食べました！'
                    : '買ってきました！'}
                </span>
              </li>
            </ul>
          </div>
        </div>
      );
    }
  }, [news]);

  return (
    <header
      className={clsx(
        'flex py-4 items-center',
        isHome ? 'justify-end mt-6' : 'justify-between'
      )}
    >
      {isHome ? (
        renderNewsBar()
      ) : (
        <h1 className={clsx('text-3xl', logo.className)}>
          <Link href="/" className="text-red">
            みんなの冷蔵庫
          </Link>
        </h1>
      )}
      {renderLoginOrProfile()}
    </header>
  );
};
