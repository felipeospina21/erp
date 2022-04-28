import React from 'react';
import { Box } from '@chakra-ui/react';
import SideNav from './SideNav';

export interface LayoutProps {
  children: JSX.Element;
}

export function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <>
      <SideNav />
      <Box as='main' m='1rem 2rem'>
        {children}
      </Box>
    </>
  );
}

export default Layout;
