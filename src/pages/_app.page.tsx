import '@/styles/globals.css';
import { AppPropsWithLayout } from '@/types/layout';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

const App = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout<{ session: Session }>) => {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <SessionProvider session={session}>
      {getLayout(<Component {...pageProps} />)}
    </SessionProvider>
  );
};

export default App;
