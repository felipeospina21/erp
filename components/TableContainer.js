import React, { useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Button } from "@chakra-ui/react";
import TableRow from "./TableRow";
import TableCellHeader from "./TableCellHeader";

const TableContainer = props => {
  const [rows, setRows] = useState([{ id: "1", item: null, q: null }]);
  const [cellStyles, setCellStyles] = useState({
    textAlign: "center",
    border: "1px solid black",
  });
  const [header, setHeader] = useState([
    "Producto",
    "Stock",
    "Precio",
    "Cantidad",
    "Descuento",
    "Total",
  ]);
  const borderStyle = "1px solid black";

  const addRow = () => {
    const newRowId = rows.length + 1;
    setRows([...rows, { id: newRowId.toString() }]);
  };

  const removeRow = id => {
    const rowId = id;
    const newRows = rows.filter(row => row.id !== rowId);
    setRows(newRows);
  };
  return (
    <>
      <Table variant='simple' maxW='1300px' m={["auto"]} size={["sm", "md"]}>
        <Thead fontSize={["sm", "md"]}>
          <Tr>
            {header.map(text => {
              return (
                <TableCellHeader key={text} cellStyles={cellStyles}>
                  {text}
                </TableCellHeader>
              );
            })}
          </Tr>
        </Thead>
        <Tbody fontSize={["sm", "md"]}>
          {rows.map(row => {
            return (
              <TableRow
                key={row.id}
                id={row.id}
                cellStyles={cellStyles}
                products={props.products}
                removeRow={removeRow}
              />
            );
          })}
        </Tbody>
      </Table>
      <Button colorScheme='green' size='sm' mt='1rem' onClick={addRow}>
        Add Row
      </Button>
    </>
  );
};

export default TableContainer;
