import React, { useState, useEffect } from "react";
import { Table, Thead, Tbody, Tr, Button, Box } from "@chakra-ui/react";
import TableRow from "./TableRow";
import TableCellHeader from "./TableCellHeader";
import ValueContainer from "./ValueContainer";
import TaxPicker from "./TaxPicker";

const TableContainer = props => {
  const [rowsData, setRowsData] = useState([
    { id: "1", item: null, q: null, subtotal: 0 },
  ]);
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
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);

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
          {rowsData.map(row => {
            return (
              <TableRow
                key={row.id}
                id={row.id}
                cellStyles={cellStyles}
                products={props.products}
                removeRow={removeRow}
                rowsData={rowsData}
                setRowsData={setRowsData}
              />
            );
          })}
        </Tbody>
      </Table>
      <Button colorScheme='green' size='sm' mt='1rem' onClick={addRow}>
        Add Row
      </Button>
      <Box float='right' justifyItems='right' m='1rem 5rem 1rem auto'>
        <ValueContainer text='Subtotal: ' value={total} />
        <TaxPicker value={tax} setTax={setTax} />
        <ValueContainer text='Total: ' value={total * (1 + tax / 100)} />
      </Box>
    </>
  );
};

export default TableContainer;
