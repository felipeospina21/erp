import React, { useContext } from "react";
import { Tr, Td, Select, IconButton, useToast } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { BiTrash } from "react-icons/bi";
import { TableStylesContext } from "../../context/TableStylesContext";
import { thousandSeparator } from "../../utils";
import TableCellBody from "./TableCellBody";
import InputCell from "./InputCell";

const TableRow = props => {
  const [cellStyles, setCellStyles] = useContext(TableStylesContext);
  const products = useSelector(state => state.products.list);
  const toast = useToast();

  const handleSelectChange = event => {
    const newRowsData = [...props.rowsData];
    let prodIndex = products
      .map(product => {
        return product.name;
      })
      .indexOf(event.target.value);

    newRowsData.map(row => {
      if (row.id === props.id) {
        (row.itemId = products[prodIndex].id),
          (row.item = products[prodIndex].name),
          (row.price = products[prodIndex].price),
          (row.stock = products[prodIndex].stock);
      }
    });
    props.setRowsData(newRowsData);
  };

  const handleInputChange = event => {
    const value = event.target.value;
    const newRowsData = [...props.rowsData];

    newRowsData.map(row => {
      const product = products.filter(product => product.id === row.itemId)[0];
      if (event.target.id === "quantity" && row.id === props.id) {
        row.quantity = parseInt(value);
        if (row.quantity > product.stock) {
          toast({
            title: "Inventario insuficiente",
            description: `La cantidad a vender de ${product.name} supera el inventario`,
            status: "error",
            duration: 8000,
            isClosable: true,
          });
        }
      } else if (event.target.id === "discount" && row.id === props.id) {
        const value = event.target.value;
        const netSubtotal = row.price * row.quantity;
        const grossSubTotal = netSubtotal - netSubtotal * value;
        row.discount = parseFloat(value);
        row.subtotal = parseFloat(grossSubTotal);
      }
      props.setRowsData(newRowsData);
    });
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

      <TableCellBody>{props.rowData.stock}</TableCellBody>
      <TableCellBody>{props.rowData.price}</TableCellBody>
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
      <TableCellBody>{`$${thousandSeparator(props.rowData.subtotal)}`}</TableCellBody>
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
