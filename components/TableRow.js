import React, { useState } from "react";
import { Tr, Td, Select, IconButton, NumberInput, Input } from "@chakra-ui/react";
import { BiTrash } from "react-icons/bi";
import TableCellBody from "./TableCellBody";

const TableRow = ({ products, cellStyles, removeRow, id }) => {
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);

  const handleChange = event => {
    let prodIndex = products
      .map(product => {
        return product.name;
      })
      .indexOf(event.target.value);
    setPrice(products[prodIndex].price);
    setStock(products[prodIndex].quantity);
  };
  return (
    <Tr>
      <Td p='0' w={["170px", "auto"]} maxW='300px' border={cellStyles.border}>
        <Select
          placeholder='Select option'
          onChange={handleChange}
          size='sm'
          fontSize={["sm", "md"]}>
          {products.map(product => {
            return (
              <option key={product.id} value={product.name}>
                {product.name}
              </option>
            );
          })}
        </Select>
      </Td>
      <TableCellBody cellStyles={cellStyles}>{stock}</TableCellBody>
      <TableCellBody cellStyles={cellStyles}>{price}</TableCellBody>
      <TableCellBody cellStyles={cellStyles}>
        <Input />
      </TableCellBody>
      <TableCellBody cellStyles={cellStyles}>
        <Input />
      </TableCellBody>
      <TableCellBody cellStyles={cellStyles}>{price}</TableCellBody>
      <TableCellBody cellStyles={cellStyles}>
        {" "}
        <IconButton
          onClick={() => removeRow(id)}
          aria-label='eliminar fila'
          icon={<BiTrash />}
          colorScheme='red'
          size='sm'
          variant='ghost'
        />
      </TableCellBody>
    </Tr>
  );
};

export default TableRow;
