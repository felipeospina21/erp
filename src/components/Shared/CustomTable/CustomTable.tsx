import React from 'react';
import { Table, Thead, Tbody, Box, Tr } from '@chakra-ui/react';

export interface CustomTableProps {
  Headers: JSX.Element | JSX.Element[];
  Rows: JSX.Element | JSX.Element[] | undefined;
  variant?: 'simple' | 'striped' | 'unstyled';
  size?: 'sm' | 'md' | 'lg';
}

export function CustomTable({
  Headers,
  Rows,
  size,
  variant = 'simple',
}: CustomTableProps): JSX.Element {
  return (
    <Box overflow="auto" mb="1rem">
      <Table variant={variant} maxW="1300px" m={['auto']} size={size}>
        <Thead fontSize={['sm', 'md']}>
          <Tr>{Headers}</Tr>
        </Thead>
        <Tbody fontSize={['sm', 'md']}>{Rows}</Tbody>
      </Table>
    </Box>
  );
}
