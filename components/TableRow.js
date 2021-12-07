import React, { useState, useContext } from "react";
import { Tr, Td, Select, IconButton, Input } from "@chakra-ui/react";
import { BiTrash } from "react-icons/bi";
import TableCellBody from "./TableCellBody";
import InputCell from "./InputCell";
import { TableStylesContext } from "../context/TableStylesContext";
import { thousandSeparator } from "../utils";

const TableRow = props => {
  const [cellStyles, setCellStyles] = useContext(TableStylesContext);
  const [rowData, setRowData] = useState(props.rowData);

  const handleSelectChange = event => {
    let prodIndex = props.products
      .map(product => {
        return product.name;
      })
      .indexOf(event.target.value);

    setRowData({
      ...rowData,
      itemId: props.products[prodIndex].id,
      item: props.products[prodIndex].name,
      price: props.products[prodIndex].price,
      stock: props.products[prodIndex].quantity,
    });
  };

  const handleInputChange = event => {
    const value = event.target.value;
    if (event.target.id === "quantity") {
      setRowData({ ...rowData, quantity: parseInt(value) });
    } else if (event.target.id === "discount") {
      const netSubtotal = rowData.price * rowData.quantity;
      const grossSubTotal = netSubtotal - netSubtotal * value;
      const newSubtotal = parseFloat(grossSubTotal);
      const newDiscount = parseFloat(value);
      setRowData({ ...rowData, discount: newDiscount, subtotal: newSubtotal });
      updateRowsData(newDiscount, newSubtotal);
    }
  };

  const updateRowsData = (newDiscount, newSubtotal) => {
    const newRowsData = [...props.rowsData];
    newRowsData.forEach(row => {
      if (row["id"] === props.id) {
        (row.item = rowData.item),
          (row.itemId = rowData.itemId),
          (row.price = rowData.price),
          (row.stock = rowData.stock),
          (row.quantity = rowData.quantity),
          (row.discount = newDiscount),
          (row.subtotal = newSubtotal);
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
      <TableCellBody>{rowData.stock}</TableCellBody>
      <TableCellBody>{rowData.price}</TableCellBody>
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
      <TableCellBody>{thousandSeparator(rowData.subtotal)}</TableCellBody>
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
