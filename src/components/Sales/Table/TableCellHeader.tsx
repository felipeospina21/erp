import React, { useContext } from 'react';
import { Th } from '@chakra-ui/react';
import { TableStylesContext } from '../../../context/TableStylesContext';

export interface TableCellHeaderProps {
  children: string;
}

export function TableCellHeader({ children }: TableCellHeaderProps): JSX.Element {
  const [cellStyles] = useContext(TableStylesContext);

  return <Th textAlign={cellStyles.textAlign}>{children}</Th>;
}
