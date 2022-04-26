import React, { useState } from "react";
import { Table, Thead, Tbody, Tr, Button, Box, Icon } from "@chakra-ui/react";
import { FaPlusCircle } from "react-icons/fa";
import TableRow from "./TableRow";
import TableCellHeader from "./TableCellHeader";
import { TableStylesProvider } from "../../context/TableStylesContext";
// import type { Product } from "../../redux/services";
import { RowData } from "../../pages/ventas";

export interface TableContainerProps {
  rowsData: RowData[];
  setRowsData: (rowsData: RowData[]) => void;
  salesBtnDisabled: boolean;
  setSalesBtnDisabled: (salesBtnDisabled: boolean) => void;
}

const TableContainer = ({
  rowsData,
  setRowsData,
  salesBtnDisabled,
  setSalesBtnDisabled,
}: TableContainerProps): JSX.Element => {
  const [header] = useState(["Producto", "Stock", "Precio", "Cantidad", "Descuento", "Total"]);

  const addRow = (): void => {
    salesBtnDisabled ? null : setSalesBtnDisabled(true);
    const newRowId = rowsData.length + 1;
    setRowsData([...rowsData, { id: newRowId, subtotal: 0, quantity: 0, stock: 0, productId:'', discount: 0 }]);
  };

  const removeRow = (id: number): void => {
    const rowId = id;
    const newRows = rowsData.filter((row) => row.id !== rowId);
    setRowsData(newRows);
  };

  return (
    <TableStylesProvider>
      <Box overflow='auto' mb='1rem'>
        <Table variant='simple' maxW='1300px' m={["auto"]}>
          <Thead fontSize={["sm", "md"]}>
            <Tr>
              {header.map((text) => {
                return <TableCellHeader key={text}>{text}</TableCellHeader>;
              })}
            </Tr>
          </Thead>
          <Tbody fontSize={["sm", "md"]}>
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
        <Button colorScheme='teal' size='sm' my='1rem' leftIcon={<Icon as={FaPlusCircle} />} onClick={addRow}>
          Row
        </Button>
      </Box>
    </TableStylesProvider>
  );
};

export default TableContainer;
