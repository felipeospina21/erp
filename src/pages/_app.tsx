import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import type { ReactElement } from 'react';
import type { NextPage } from 'next';
import { wrapper } from '@/redux/store';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactElement;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  isAuth: boolean;
};

function MyApp({ Component, isAuth, pageProps }: AppPropsWithLayout): JSX.Element {
  const getLayout = Component.getLayout ?? ((page) => page);
  return getLayout(<Component isAuth={isAuth} {...pageProps} />);
}

MyApp.getInitialProps = async () => {
  if (typeof window !== 'undefined') {
    const isAuth = sessionStorage.getItem('isAuth');
    if (isAuth) {
      return { isAuth: true };
    } else {
      return { isAuth: false };
    }
  }
  return {};
};

export default wrapper.withRedux(MyApp);
