import React from 'react';
import { TableContainer, Table, Thead, Tbody, Tr } from '@chakra-ui/react';
import { Sizes, TableVariants } from '@/styles/types';

export interface CustomTableProps {
  Headers: JSX.Element | JSX.Element[];
  Rows: JSX.Element | JSX.Element[] | undefined;
  variant?: TableVariants;
  size?: Exclude<Sizes, 'xs'>;
}

export function CustomTable({
  Headers,
  Rows,
  size = 'md',
  variant = 'simple',
}: CustomTableProps): JSX.Element {
  return (
    <TableContainer overflow="auto" mb="1rem" p="2rem">
      <Table variant={variant} m={['auto']} size={size} colorScheme="blackAlpha">
        <Thead fontSize={['sm', 'md']}>
          <Tr>{Headers}</Tr>
        </Thead>
        <Tbody fontSize={'xs'}>{Rows}</Tbody>
      </Table>
    </TableContainer>
  );
}
