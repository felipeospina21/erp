import React, { useState, useContext } from "react";
import { Tr, Td, Select, IconButton, Input } from "@chakra-ui/react";
import { BiTrash } from "react-icons/bi";
import TableCellBody from "./TableCellBody";
import InputCell from "./InputCell";
import { TableStylesContext } from "../context/TableStylesContext";

const TableRow = props => {
  const [item, setItem] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [cellStyles, setCellStyles] = useContext(TableStylesContext);

  const handleSelectChange = event => {
    let prodIndex = props.products
      .map(product => {
        return product.name;
      })
      .indexOf(event.target.value);
    setItem(props.products[prodIndex].name);
    setPrice(props.products[prodIndex].price);
    setStock(props.products[prodIndex].quantity);
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
    const newRowsData = [...props.rowsData];
    newRowsData.forEach(row => {
      if (row["id"] === props.id) {
        row["item"] = item;
        row["q"] = quantity;
        row["subtotal"] = newSubtotal;
      }
    });
    props.setRowsData(newRowsData);
  };

  return (
    <Tr>
      <Td p='0' w={["170px", "auto"]} maxW='300px' border={cellStyles.border}>
        <Select
          placeholder='Select option'
          onChange={handleSelectChange}
          size='sm'
          fontSize={["sm", "md"]}>
          {props.products.map(product => {
            return (
              <option key={product.id} value={product.name}>
                {product.name}
              </option>
            );
          })}
        </Select>
      </Td>
      <TableCellBody>{stock}</TableCellBody>
      <TableCellBody>{price}</TableCellBody>
      <TableCellBody>
        <InputCell
          id='quantity'
          handleInputChange={handleInputChange}
          textAlign={cellStyles.textAlign}
        />
      </TableCellBody>
      <TableCellBody>
        <InputCell
          id='discount'
          handleInputChange={handleInputChange}
          textAlign={cellStyles.textAlign}
        />
      </TableCellBody>
      <TableCellBody>{subtotal}</TableCellBody>
      <TableCellBody>
        {" "}
        <IconButton
          onClick={() => props.removeRow(props.id)}
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
