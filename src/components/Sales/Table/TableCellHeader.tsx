import React from 'react';
import { Th } from '@chakra-ui/react';

export interface TableCellHeaderProps {
  children: string;
}

export function TableCellHeader({ children }: TableCellHeaderProps): JSX.Element {
  return <Th textAlign="center">{children}</Th>;
}
