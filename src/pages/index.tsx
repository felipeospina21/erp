import React, { ReactElement, useEffect } from 'react';
import { Heading, Flex } from '@chakra-ui/react';
import { Layout } from '@/components/Shared';
import { IsAuth } from '../utils';
import dynamic from 'next/dynamic';
import Router from 'next/router';
const LoginPage = dynamic(() => import('@/pages/login'));
export default function Home({ isAuth }: IsAuth): ReactElement {
  useEffect(() => {
    if (isAuth) return; // do nothing if the user is logged in
    Router.replace('/', '/login', { shallow: true });
  }, [isAuth]);

  if (!isAuth) {
    return <LoginPage />;
  }

  return (
    <Flex flexDir="column" align="center" justify="space-around" minH="100vh">
      <Heading as="h1" size="2xl" mb="2rem">
        Home
      </Heading>
    </Flex>
  );
}

Home.getLayout = function getLayout(page: ReactElement): JSX.Element {
  return <Layout>{page}</Layout>;
};
