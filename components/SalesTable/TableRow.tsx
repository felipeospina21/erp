import React, { useContext } from "react";
import { Tr, Td, Select, IconButton, useToast } from "@chakra-ui/react";
import { useAppSelector } from "../../redux/hooks";
import { BiTrash } from "react-icons/bi";
import { TableStylesContext } from "../../context/TableStylesContext";
import { thousandSeparator } from "../../utils";
import TableCellBody from "./TableCellBody";
import InputCell from "./InputCell";
import { Product } from "../../redux/slices/productsSlice";

export interface TableRowProps {
  id: number;
  rowsData: Product[];
  rowData: Product;
  setRowsData: (rowsData: Product[]) => void;
  removeRow: (id: number) => void;
}
const TableRow = (props: TableRowProps): JSX.Element => {
  const [cellStyles] = useContext(TableStylesContext);
  const products = useAppSelector((state) => state.products.list);
  const toast = useToast();

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const newRowsData = [...props.rowsData];
    const prodIndex = products
      .map((product) => {
        return product.name;
      })
      .indexOf(event.target.value);

    newRowsData.map((row) => {
      if (row.id === props.id) {
        (row.itemId = String(products[prodIndex].id)),
          (row.item = products[prodIndex].name),
          (row.price = products[prodIndex].price),
          (row.stock = products[prodIndex].stock);
      }
    });
    props.setRowsData(newRowsData);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    const newRowsData = [...props.rowsData];

    newRowsData.map((row) => {
      const product = products.filter((product) => product.id === row.itemId)[0];
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
        const value = Number(event.target.value);
        const price = row.price ?? 0;
        const netSubtotal = price * row.quantity;
        const grossSubTotal = netSubtotal - netSubtotal * value;
        row.discount = value;
        row.subtotal = grossSubTotal;
      }
      props.setRowsData(newRowsData);
    });
  };

  return (
    <Tr>
      <Td p='0' w={["170px", "auto"]} maxW='300px' border={cellStyles.border}>
        <Select placeholder='Select option' onChange={handleSelectChange} size='sm' fontSize={["sm", "md"]}>
          {products.map((product) => {
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
        <InputCell id='quantity' handleInputChange={handleInputChange} textAlign={cellStyles.textAlign} />
      </TableCellBody>
      <TableCellBody>
        <InputCell id='discount' handleInputChange={handleInputChange} textAlign={cellStyles.textAlign} />
      </TableCellBody>
      <TableCellBody>{`$${thousandSeparator(props.rowData.subtotal)}`}</TableCellBody>
      <TableCellBody>
        <IconButton
          onClick={(): void => {
            props.removeRow(props.id);
          }}
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
