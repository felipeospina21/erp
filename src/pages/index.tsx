import React from 'react';
import { Heading, Flex } from '@chakra-ui/react';

export default function Home(): JSX.Element {
  return (
    <Flex flexDir="column" align="center" justify="space-around" minH="100vh">
      <Heading as="h1" size="2xl" mb="2rem">
        Home
      </Heading>
    </Flex>
  );
}
