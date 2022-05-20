import React from 'react';
import { Box, Skeleton, SkeletonText } from '@chakra-ui/react';

export interface CardSkeletonProps {
  height?: string;
  width?: string;
  lines?: number;
}

export function CardSkeleton({
  height = '400px',
  width = '300px',
  lines = 4,
}: CardSkeletonProps): JSX.Element {
  return (
    <Box
      border="var(--border-100)"
      borderRadius="2xl"
      boxShadow={'var(--boxShadow)'}
      h={height}
      w={width}
      m="1rem"
      p="2rem 1rem"
    >
      <Skeleton w="100%" h="120px" borderRadius="xl" />
      <SkeletonText mt="20" noOfLines={lines} spacing="4" />
    </Box>
  );
}
