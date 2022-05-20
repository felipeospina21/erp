import React from 'react';
import { TableContainer, Table, Thead, Tbody, Tr } from '@chakra-ui/react';

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
    <TableContainer
      overflow="auto"
      mb="1rem"
      border="1px solid"
      borderColor="brand.grey.50"
      borderRadius="xl"
      p="2rem"
    >
      <Table variant={variant} m={['auto']} size={size}>
        <Thead fontSize={['sm', 'md']}>
          <Tr>{Headers}</Tr>
        </Thead>
        <Tbody fontSize={'xs'}>{Rows}</Tbody>
      </Table>
    </TableContainer>
  );
}
