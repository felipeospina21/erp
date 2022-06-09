import React from 'react';
import { Td } from '@chakra-ui/react';

export interface TableCellBodyProps {
  children: string | number | undefined | JSX.Element;
}

export function TableCellBody(props: TableCellBodyProps): JSX.Element {
  return <Td textAlign="center">{props.children}</Td>;
}
