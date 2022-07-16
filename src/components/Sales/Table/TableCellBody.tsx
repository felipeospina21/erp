import React from 'react';
import { Td } from '@chakra-ui/react';

export interface TableCellBodyProps {
  children: string | number | undefined | JSX.Element;
  id?: string;
}

export function TableCellBody(props: TableCellBodyProps): JSX.Element {
  return <Td textAlign="center">{props.children}</Td>;
}
