import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Button,
  Box,
  Icon,
  TableContainer as Wrapper,
} from '@chakra-ui/react';
import { FaPlusCircle } from 'react-icons/fa';
import TableRow from './TableRow';
import TableCellHeader from './TableCellHeader';
import { TableStylesProvider } from '../../context/TableStylesContext';
// import type { Product } from "../../redux/services";
import { RowData } from '../../pages/ventas';

export interface TableContainerProps {
  header: {
    title: string;
    id: string;
  }[];
  rowsData: RowData[];
  setRowsData: (rowsData: RowData[]) => void;
  salesBtnDisabled: boolean;
  setSalesBtnDisabled: (salesBtnDisabled: boolean) => void;
}

const TableContainer = ({
  header,
  rowsData,
  setRowsData,
  salesBtnDisabled,
  setSalesBtnDisabled,
}: TableContainerProps): JSX.Element => {
  const addRow = (): void => {
    salesBtnDisabled ? null : setSalesBtnDisabled(true);
    const newRowId = rowsData.length + 1;
    setRowsData([
      ...rowsData,
      {
        id: newRowId,
        item: '',
        subtotal: 0,
        quantity: 0,
        stock: 0,
        productId: '',
        price: 0,
        discount: 0,
      },
    ]);
  };

  const removeRow = (id: number): void => {
    const rowId = id;
    const newRows = rowsData.filter((row) => row.id !== rowId);
    setRowsData(newRows);
  };

  return (
    <TableStylesProvider>
      <Box overflow='auto' mb='1rem'>
        <Wrapper border='1px solid' borderColor='brand.grey.100' borderRadius='md' p='2rem 0.5rem'>
          <Table variant='simple' maxW='1300px' m={['auto']}>
            <Thead fontSize={['sm', 'md']}>
              <Tr>
                {header.map(({ title, id }) => {
                  return <TableCellHeader key={id}>{title}</TableCellHeader>;
                })}
              </Tr>
            </Thead>
            <Tbody fontSize={['sm', 'md']}>
              {rowsData.map((row) => {
                return (
                  <TableRow
                    key={row.id}
                    id={row.id ?? 0}
                    removeRow={removeRow}
                    rowsData={rowsData}
                    setRowsData={setRowsData}
                    rowData={row}
                  />
                );
              })}
            </Tbody>
          </Table>
        </Wrapper>
        <Button
          colorScheme='teal'
          size='sm'
          my='1rem'
          leftIcon={<Icon as={FaPlusCircle} />}
          onClick={addRow}>
          Row
        </Button>
      </Box>
    </TableStylesProvider>
  );
};

export default TableContainer;
