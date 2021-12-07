import React, { useState, useEffect, useContext } from "react";
import { Table, Thead, Tbody, Tr, Button, Box } from "@chakra-ui/react";
import TableRow from "./TableRow";
import TableCellHeader from "./TableCellHeader";
import { TableStylesProvider } from "../context/TableStylesContext";

const TableContainer = ({products, setTotal, rowsData, setRowsData}) => {
 
  const [header, setHeader] = useState([
    "Producto",
    "Stock",
    "Precio",
    "Cantidad",
    "Descuento",
    "Total",
  ]);

  const addRow = () => {
    const newRowId = rowsData.length + 1;
    setRowsData([...rowsData, { id: newRowId.toString(), subtotal: 0 }]);
  };

  const removeRow = id => {
    const rowId = id;
    const newRows = rowsData.filter(row => row.id !== rowId);
    setRowsData(newRows);
  };

  useEffect(() => {
    let newTotal = 0;
    rowsData.forEach(row => {
      newTotal = newTotal + row.subtotal;
    });
    setTotal(newTotal);
  }, [rowsData]);

  return (
    <TableStylesProvider>
      <Box overflow='auto' mb='1rem'>
        <Table variant='simple' maxW='1300px' m={["auto"]} size={["sm", "md"]}>
          <Thead fontSize={["sm", "md"]}>
            <Tr>
              {header.map(text => {
                return <TableCellHeader key={text}>{text}</TableCellHeader>;
              })}
            </Tr>
          </Thead>
          <Tbody fontSize={["sm", "md"]}>
            {rowsData.map(row => {
              return (
                <TableRow
                  key={row.id}
                  id={row.id}
                  products={products}
                  removeRow={removeRow}
                  rowsData={rowsData}
                  setRowsData={setRowsData}
                  rowData={row}
                />
              );
            })}
          </Tbody>
        </Table>
        <Button colorScheme='green' size='sm' my='1rem' onClick={addRow}>
          Add Row
        </Button>
      </Box>
    </TableStylesProvider>
  );
};

export default TableContainer;
