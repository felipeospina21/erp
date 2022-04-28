import React from 'react';
import { Box, SimpleGrid } from '@chakra-ui/react';
import { numberToCurrency } from '../utils/utils';

export interface ValueContainerProps {
  name: string;
  value: number;
}

const ValueContainer = ({ name, value }: ValueContainerProps): JSX.Element => {
  const text = name.replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));

  return (
    <SimpleGrid columns={2} spacing={1}>
      <Box textAlign='right' fontSize='1.5rem' mt='1.5rem' w='100%'>
        {text}
      </Box>
      <Box textAlign='right' fontSize='1.5rem' mt='1.5rem' w='100%'>
        {numberToCurrency(value)}
      </Box>
    </SimpleGrid>
  );
};

export default ValueContainer;
