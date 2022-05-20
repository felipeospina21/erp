import {
  Button,
  Flex,
  Icon,
  Table,
  TableContainer as TableWrapper,
  Tbody,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { FaPlusCircle } from 'react-icons/fa';
import { TableCellHeader, TableRow } from './';
import { RowData } from '@/pages/ventas';

export interface TableContainerProps {
  pageMaxW: string;
  header: {
    title: string;
    id: string;
  }[];
  rowsData: RowData[];
  setRowsData: (rowsData: RowData[]) => void;
  salesBtnDisabled: boolean;
  setSalesBtnDisabled: (salesBtnDisabled: boolean) => void;
}

export function TableContainer({
  pageMaxW,
  header,
  rowsData,
  setRowsData,
  salesBtnDisabled,
  setSalesBtnDisabled,
}: TableContainerProps): JSX.Element {
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
    <Flex flexDir="column" align="flex-start" m="auto" maxW={pageMaxW} overflow="auto" mb="1rem">
      <TableWrapper
        border="1px solid"
        borderColor="brand.grey.50"
        borderRadius="xl"
        p="2rem 0.5rem"
        w="100%"
        display="flex"
        justifyContent="center"
      >
        <Table variant="simple" w="90%" m={['auto']} colorScheme="blackAlpha">
          <Thead fontSize={['sm', 'md']}>
            <Tr>
              {header.map(({ title, id }) => {
                return <TableCellHeader key={id}>{title}</TableCellHeader>;
              })}
            </Tr>
          </Thead>
          <Tbody fontSize={['xs', 'sm']}>
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
      </TableWrapper>
      <Button
        variant="ghost"
        color="brand.green.600"
        size="sm"
        my="1rem"
        ml={[null, '1rem', '2rem', '4rem']}
        leftIcon={<Icon as={FaPlusCircle} />}
        onClick={addRow}
      >
        Row
      </Button>
    </Flex>
  );
}
