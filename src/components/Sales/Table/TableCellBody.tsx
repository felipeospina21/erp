import React, { useContext } from 'react';
import { Td } from '@chakra-ui/react';
import { TableStylesContext } from '../../../context/TableStylesContext';

export interface TableCellBodyProps {
  children: string | number | undefined | JSX.Element;
}

export function TableCellBody(props: TableCellBodyProps): JSX.Element {
  const [cellStyles] = useContext(TableStylesContext);
  return <Td textAlign={cellStyles.textAlign}>{props.children}</Td>;
}
