import React from 'react';
import { Box, SimpleGrid } from '@chakra-ui/react';
import { numberToCurrency } from '@/utils/index';

export interface ValueContainerProps {
  name: string;
  value: number;
  sign?: '-' | '+';
}

const ValueContainer = ({ name, value, sign }: ValueContainerProps): JSX.Element => {
  const text = name.replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));

  return (
    <SimpleGrid columns={2} spacing={1}>
      <Box textAlign="right" mt="0.5rem" w="100%" fontWeight="500">
        {text}
      </Box>
      <Box textAlign="right" mt="0.5rem" w="100%" fontWeight="500">
        {sign} {numberToCurrency(value)}
      </Box>
    </SimpleGrid>
  );
};

export default ValueContainer;
