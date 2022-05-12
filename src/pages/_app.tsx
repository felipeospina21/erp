import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import type { ReactElement } from 'react';
import type { NextPage } from 'next';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactElement;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout): JSX.Element {
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(<Component {...pageProps} />);
  // return (
  //   <Provider store={store}>
  //     <ChakraProvider theme={theme}>
  //       <Layout>
  //         <Component {...pageProps} />
  //       </Layout>
  //     </ChakraProvider>
  //   </Provider>
  // );
}

export default MyApp;
