import React from 'react';
import { Box, ChakraProvider } from '@chakra-ui/react';
import SideNav from './SideNav';
import theme from '@/styles/theme';

export interface LayoutProps {
  children: JSX.Element;
  hasNav?: boolean;
}

export function Layout({ children, hasNav = true }: LayoutProps): JSX.Element {
  const shouldHaveNav = hasNav;
  return (
    <>
      <ChakraProvider theme={theme}>
        {shouldHaveNav && <SideNav />}
        <Box as="main" bgColor="brand.bg">
          {children}
        </Box>
      </ChakraProvider>
    </>
  );
}

export default Layout;
