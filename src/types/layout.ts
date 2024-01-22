import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';

export type GetLayout<P> = (page: ReactElement<P>) => ReactNode;

export type NextPageWithLayout<
  P = Record<keyof unknown, unknown>,
  IP = P
> = NextPage<P, IP> & {
  getLayout: GetLayout<P>;
};

export type AppPropsWithLayout<P = Record<keyof unknown, unknown>> =
  AppProps<P> & {
    Component: NextPageWithLayout;
  };
