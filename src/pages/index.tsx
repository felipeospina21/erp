import React, { ReactElement, useEffect } from 'react';
import { Heading, Flex } from '@chakra-ui/react';
import { Layout } from '@/components/Shared';
import { useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/router';

export default function Home(): ReactElement {
  const user = useAppSelector((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!user.isLoggedin) {
      router.push('/login');
    }
  }, [user.isLoggedin, router]);

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
