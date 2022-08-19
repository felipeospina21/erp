import { Flex, Skeleton } from '@chakra-ui/react';
import React from 'react';
import { CardSkeleton } from './CardSkeleton';

export interface CardsSkeletonProps {
  cards: number;
}

export function CardsSkeleton({ cards }: CardsSkeletonProps): JSX.Element {
  const cardsArr = [] as JSX.Element[];
  for (let i = 0; i < cards; i++) {
    cardsArr.push(<CardSkeleton key={i} />);
  }
  return (
    <Flex
      data-testid="cards-skeleton"
      flexDir="column"
      align="center"
      justify="space-around"
      m="5rem auto"
    >
      <Skeleton borderRadius="md" h="40px" w="40px" />
      <Flex justify="center" m="1rem" w="100%" wrap="wrap">
        {cardsArr.map((card) => card)}
      </Flex>
    </Flex>
  );
}
