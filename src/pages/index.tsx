import React, { ReactElement } from 'react';
import { Heading, Flex } from '@chakra-ui/react';
import { Layout } from '@/components/Shared';

export default function Home(): ReactElement {
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
