import { Layout } from '@/components/Shared';
import { Flex, Heading } from '@chakra-ui/react';

import React, { ReactElement } from 'react';

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
