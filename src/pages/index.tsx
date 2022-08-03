import { Layout } from '@/components/Shared';
import { checkAuth, IsAuth } from '@/utils/auth';
import { Flex, Heading } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import React, { ReactElement } from 'react';
const LoginPage = dynamic(() => import('@/pages/login'));
import { useAuth } from '../utils';
export default function Home({ isAuth }: IsAuth): ReactElement {
  useAuth(isAuth, '/');

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

Home.getInitialProps = checkAuth;
