import { Flex, Spinner } from '@chakra-ui/react';
import React from 'react';

export function LargeSpinner(): JSX.Element {
  return (
    <Flex justify="center" align="center" h="80vh">
      <Spinner size="xl" />
    </Flex>
  );
}
