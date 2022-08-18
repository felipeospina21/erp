import React from 'react';
import { Box, ChakraProvider } from '@chakra-ui/react';
import theme from '@/styles/theme';

export interface NoAuthLayoutProps {
  children: JSX.Element;
}

export function NoAuthLayout({ children }: NoAuthLayoutProps): JSX.Element {
  return (
    <>
      <ChakraProvider theme={theme}>
        <Box as="main" bgColor="brand.bg">
          {children}
        </Box>
      </ChakraProvider>
    </>
  );
}

export default NoAuthLayout;
