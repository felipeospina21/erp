import React from 'react';
import { Table, Thead, Tbody, Box } from '@chakra-ui/react';

export interface CustomTableProps {
  Headers: JSX.Element | JSX.Element[];
  Rows: JSX.Element | JSX.Element[];
}

export function CustomTable({ Headers, Rows }: CustomTableProps): JSX.Element {
  return (
    <Box overflow="auto" mb="1rem">
      <Table variant="simple" maxW="1300px" m={['auto']}>
        <Thead fontSize={['sm', 'md']}>{Headers}</Thead>
        <Tbody fontSize={['sm', 'md']}>{Rows}</Tbody>
      </Table>
    </Box>
  );
}
