import React, { useState } from "react";
import { Tr, Td, Select, IconButton, NumberInput, Input } from "@chakra-ui/react";
import { BiTrash } from "react-icons/bi";
import TableCellBody from "./TableCellBody";

const TableRow = ({
  products,
  cellStyles,
  removeRow,
  id,
  rowsData,
  setRowsData,
}) => {
  const [item, setItem] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [subtotal, setSubtotal] = useState(0);

  const handleSelectChange = event => {
    let prodIndex = products
      .map(product => {
        return product.name;
      })
      .indexOf(event.target.value);
    setItem(products[prodIndex].name);
    setPrice(products[prodIndex].price);
    setStock(products[prodIndex].quantity);
  };

  const handleInputChange = event => {
    const value = event.target.value;
    if (event.target.id === "quantity") {
      setQuantity(parseInt(value));
    } else if (event.target.id === "discount") {
      setDiscount(parseFloat(value));
      const netSubtotal = price * quantity;
      const grossSubTotal = netSubtotal - netSubtotal * value;
      const newSubtotal = parseFloat(grossSubTotal);
      setSubtotal(newSubtotal);
      updateRowsData(newSubtotal);
    }
  };

  const updateRowsData = newSubtotal => {
    const newRowsData = [...rowsData];
    newRowsData.forEach(row => {
      if (row["id"] === id) {
        row["item"] = item;
        row["q"] = quantity;
        row["subtotal"] = newSubtotal;
      }
    });
    setRowsData(newRowsData);
  };

  return (
    <Tr>
      <Td p='0' w={["170px", "auto"]} maxW='300px' border={cellStyles.border}>
        <Select
          placeholder='Select option'
          onChange={handleSelectChange}
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
        <Input id='quantity' onChange={handleInputChange} />
      </TableCellBody>
      <TableCellBody cellStyles={cellStyles}>
        <Input id='discount' onChange={handleInputChange} />
      </TableCellBody>
      <TableCellBody cellStyles={cellStyles}>{subtotal}</TableCellBody>
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
