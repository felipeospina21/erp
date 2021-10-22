import React, { useState } from "react";
import { Table, Thead, Tbody, Tr, Th } from "@chakra-ui/react";
import TableRow from "./TableRow";

const TableContainer = (props) => {

  return (
    <Table variant='simple'>
      <Thead>
        <Tr>
          <Th>Producto</Th>
          <Th>Precio</Th>
          <Th isNumeric>Inventario</Th>
        </Tr>
      </Thead>
      <Tbody>
       <TableRow products={props.products} />
      </Tbody>
    </Table>
  );
};

export default TableContainer;
