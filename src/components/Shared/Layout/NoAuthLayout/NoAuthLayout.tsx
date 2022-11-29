import React from 'react';
import { Box, ChakraProvider } from '@chakra-ui/react';
import theme from '@/styles/theme';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';

export interface NoAuthLayoutProps {
  children: JSX.Element;
}

export function NoAuthLayout({ children }: NoAuthLayoutProps): JSX.Element {
  return (
    <>
      <Provider store={store}>
        <ChakraProvider theme={theme}>
          <Box as="main" bgColor="brand.bg">
            {children}
          </Box>
        </ChakraProvider>
      </Provider>
    </>
  );
}

export default NoAuthLayout;
