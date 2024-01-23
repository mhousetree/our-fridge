import clsx from 'clsx';
import { Noto_Sans_JP } from 'next/font/google';
import { useRouter } from 'next/router';
import { Auth } from '../Auth';
import { Header } from '../Header';

type Props = {
  children: React.ReactNode;
};

const noto = Noto_Sans_JP({ subsets: ['latin'], weight: ['400', '600'] });

export const Layout: React.FC<Props> = ({ children }) => {
  const router = useRouter();

  return (
    <div className={clsx('max-w-2xl mx-auto sp:px-4', noto.className)}>
      <Header isHome={router.pathname === '/'} />
      <main className="pb-8">
        <Auth>{children}</Auth>
      </main>
    </div>
  );
};
