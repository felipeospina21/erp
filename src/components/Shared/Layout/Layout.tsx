import React from 'react';
import { Box, ChakraProvider } from '@chakra-ui/react';
import SideNav from './Nav/SideNav';
import theme from '@/styles/theme';
import { AuthCheck } from '../AuthCheck/AuthCheck';

export interface LayoutProps {
  children: JSX.Element;
  hasNav?: boolean;
}

export function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <>
      <ChakraProvider theme={theme}>
        <SideNav />
        <AuthCheck>
          <Box as="main" bgColor="brand.bg">
            {children}
          </Box>
        </AuthCheck>
      </ChakraProvider>
    </>
  );
}

export default Layout;
