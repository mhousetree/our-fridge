import { User } from '@/types/user';
import { fetchAsyncToJson } from '@/utils/fetch';
import clsx from 'clsx';
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
            <IconUser user={user} />
          </div>
        </Link>
      );
    }
  }, [session, user, isLoading]);

  return (
    <header
      className={clsx(
        'flex py-4 items-center',
        isHome ? 'justify-end' : 'justify-between'
      )}
    >
      {!isHome && (
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
