import { Box, Skeleton, Stack } from '@chakra-ui/react';
import React from 'react';

export function TableSkeleton(): JSX.Element {
  return (
    <Box
      h="40vh"
      m="4rem"
      border="var(--border-100)"
      borderRadius="2xl"
      boxShadow={'var(--boxShadow)'}
    >
      <Stack p="2rem" spacing={10}>
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
      </Stack>
    </Box>
  );
}
