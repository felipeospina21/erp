import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import Layout from '../components/Shared/Layout/Layout';
import { store } from '../redux/store';
import { Provider } from 'react-redux';
import '../styles/globals.css';
import theme from '../styles/theme';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
