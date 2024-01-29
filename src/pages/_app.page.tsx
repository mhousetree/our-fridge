import '@/styles/globals.css';
import { AppPropsWithLayout } from '@/types/layout';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';

const App = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout<{ session: Session }>) => {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <SessionProvider session={session}>
      <Head>
        <title>みんなの冷蔵庫</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      {getLayout(<Component {...pageProps} />)}
    </SessionProvider>
  );
};

export default App;
