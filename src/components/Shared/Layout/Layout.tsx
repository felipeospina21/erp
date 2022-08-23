import React from 'react';
import { Box, ChakraProvider } from '@chakra-ui/react';
import SideNav from './Nav/SideNav';
import theme from '@/styles/theme';
import { AuthCheck } from '@/components/Shared';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

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
          <DndProvider backend={HTML5Backend}>
            <Box as="main" bgColor="brand.bg">
              {children}
            </Box>
          </DndProvider>
        </AuthCheck>
      </ChakraProvider>
    </>
  );
}

export default Layout;
