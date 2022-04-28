import { IconButton, Select, Td, Tr, useToast } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { BiTrash } from 'react-icons/bi';
import { TableStylesContext } from '../../../context/TableStylesContext';
import type { RowData } from '../../../pages/ventas';
import { useGetProductsQuery } from '../../../redux/services';
import { thousandSeparator } from '../../../utils/utils';
import { InputCell, TableCellBody } from './';

export interface TableRowProps {
  id: number;
  rowsData: RowData[];
  rowData: RowData;
  setRowsData: (rowsData: RowData[]) => void;
  removeRow: (id: number) => void;
}

export function TableRow({
  id,
  rowsData,
  rowData,
  setRowsData,
  removeRow,
}: TableRowProps): JSX.Element {
  const [cellStyles] = useContext(TableStylesContext);
  const { data: products } = useGetProductsQuery();
  const toast = useToast();

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const prodIndex = products
      ?.map((product) => {
        return product.name;
      })
      .indexOf(event.target.value);

    const newRowsData = rowsData?.map((row) => {
      if (row.id === id) {
        row.productId = products?.[prodIndex ?? 0]._id ?? '';
        row.item = products?.[prodIndex ?? 0].name ?? '';
        row.price = products?.[prodIndex ?? 0].price ?? 0;
        row.stock = products?.[prodIndex ?? 0].stock ?? 0;
      }
      return row;
    });
    setRowsData(newRowsData);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    const newRowsData = [...rowsData];

    newRowsData.map((row) => {
      const product = products?.filter((product) => product._id === row.productId)[0];
      if (event.target.id === 'quantity' && row.id === id) {
        row.quantity = parseInt(value);
        const prodStock = product?.stock ?? 0;
        if (row.quantity > prodStock) {
          toast({
            title: 'Inventario insuficiente',
            description: `La cantidad a vender de ${product?.name} supera el inventario`,
            status: 'error',
            duration: 8000,
            isClosable: true,
          });
        }
      } else if (event.target.id === 'discount' && row.id === id) {
        const value = Number(event.target.value);
        const price = product?.price ?? 0;
        const netSubtotal = price * row.quantity;
        const grossSubTotal = netSubtotal - netSubtotal * value;
        row.discount = value;
        row.subtotal = grossSubTotal;
      }
      setRowsData(newRowsData);
    });
  };

  return (
    <Tr>
      <Td p='0' w={['170px', 'auto']} maxW='300px'>
        <Select
          placeholder='Select option'
          onChange={handleSelectChange}
          size='sm'
          fontSize={['sm', 'md']}>
          {products?.map((product) => {
            return (
              <option key={product._id} value={product.name}>
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
      <TableCellBody>{`$${thousandSeparator(rowData.subtotal)}`}</TableCellBody>
      <TableCellBody>
        <IconButton
          onClick={(): void => {
            removeRow(id);
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
}
