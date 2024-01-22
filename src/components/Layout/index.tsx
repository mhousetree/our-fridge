import clsx from 'clsx';
import { Noto_Sans_JP } from 'next/font/google';
import { Auth } from '../Auth';
import { Header } from '../Header';

type Props = {
  children: React.ReactNode;
};

const noto = Noto_Sans_JP({ subsets: ['latin'] });

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className={clsx('max-w-4xl mx-auto', noto.className)}>
      <Header />
      <main>
        <Auth>{children}</Auth>
      </main>
    </div>
  );
};
