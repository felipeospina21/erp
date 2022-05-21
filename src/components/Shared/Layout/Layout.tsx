import React from 'react';
import { Box, ChakraProvider } from '@chakra-ui/react';
import SideNav from './SideNav';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import theme from '@/styles/theme';

export interface LayoutProps {
  children: JSX.Element;
  hasNav?: boolean;
}

export function Layout({ children, hasNav = true }: LayoutProps): JSX.Element {
  return (
    <>
      <Provider store={store}>
        <ChakraProvider theme={theme}>
          {hasNav && <SideNav />}
          <Box as="main">{children}</Box>
        </ChakraProvider>
      </Provider>
    </>
  );
}

export default Layout;
