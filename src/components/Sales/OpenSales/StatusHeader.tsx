import { Flex, HStack } from '@chakra-ui/react';
import React from 'react';
import { statusOptions } from './statusOptions';

export function StatusHeader(): JSX.Element {
  return (
    <HStack>
      <Flex w="auto" minW="100px" justify="center">
        Pedido
      </Flex>
      <Flex w="auto" minW="200px" justify="center">
        Cliente
      </Flex>
      {statusOptions.map((status) => (
        <Flex key={status} w="auto" minW="100px" justify="center" textTransform="capitalize">
          {status}
        </Flex>
      ))}
    </HStack>
  );
}
