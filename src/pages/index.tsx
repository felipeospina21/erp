import React from 'react';
import { Heading, Flex } from '@chakra-ui/react';
import { CardsContainer } from '../components/Home';
import { useGetProductsQuery } from '../redux/services';

export default function Home(): JSX.Element {
  const { data: products } = useGetProductsQuery();
  return (
    <Flex flexDir='column' align='center' justify='space-around' minH='100vh'>
      <Heading as='h1' size='2xl' mb='2rem'>
        Products
      </Heading>
      <CardsContainer data={products ?? []} />
    </Flex>
  );
}
