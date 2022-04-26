import React from 'react';
import { Flex } from '@chakra-ui/react';
import Card from './Card';
import { Product } from '../../redux/services';

export interface CardsContainerProps {
  data: Product[];
}

export default function CardsContainer({ data }: CardsContainerProps): JSX.Element {
  return (
    <Flex m='1rem' w='100%' wrap='wrap'>
      {data?.map((product) => (
        <Card key={product._id} product={product} />
      ))}
    </Flex>
  );
}
