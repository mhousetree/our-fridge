import { User } from '@/types/user';
import { fetchAsyncToJson } from '@/utils/fetch';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import { Kaisei_HarunoUmi } from 'next/font/google';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { IconUser } from '../IconUser';
import { TwitterLoginButton } from '../TwitterLoginButton';

const logo = Kaisei_HarunoUmi({ weight: '700', subsets: ['latin'] });

export const Header: React.FC = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState<User>();
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (session !== undefined) {
      fetchAsyncToJson<User>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/${session?.user.id}`
      ).then((data) => {
        setUser(data);
        setLoading(false);
      });
    }
  }, [setUser, setLoading, session]);

  if (isLoading) return <p>Loading</p>;
  if (!user) return <p>Error</p>;

  return (
    <header className="flex justify-between py-4">
      <h1 className={clsx('text-3xl', logo.className)}>
        <Link href="/" className="text-red">
          みんなの冷蔵庫
        </Link>
      </h1>

      {session ? (
        <div className="flex items-center">
          <IconUser user={user} />
          <span className="ml-1">としてログイン中</span>
        </div>
      ) : (
        <TwitterLoginButton />
      )}
    </header>
  );
};
