import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import type { ReactElement } from 'react';
import type { NextPage } from 'next';

type NextPageWithLayout<P = Record<string, never>, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactElement;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  isAuth: boolean;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout): JSX.Element {
  const getLayout = Component.getLayout ?? ((page): JSX.Element => page);
  return getLayout(<Component {...pageProps} />);
}
