import { IconButton, Td, Tr, useToast } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { MdClear } from 'react-icons/md';
import { TableStylesContext } from '../../../context/TableStylesContext';
import type { RowData } from '@/pages/ventas';
import { NewSaleOrderedProduct, useGetProductsQuery } from '@/redux/services';
import { numberToCurrency } from '@/utils/index';
import { InputCell, TableCellBody } from './';
import { useAppDispatch } from '@/redux/hooks';
import { updateSalesData } from '@/redux/slices/salesSlice';
import { CustomSelect } from '@/components/Shared';

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
  const dispatch = useAppDispatch();

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
    let orderedProducts: NewSaleOrderedProduct[] = [];

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
        const value = Number(event.target.value) / 100;
        const price = product?.price ?? 0;
        const netSubtotal = price * row.quantity;
        const grossSubTotal = netSubtotal - netSubtotal * value;
        row.discount = value;
        row.subtotal = grossSubTotal;
      }
      setRowsData(newRowsData);

      const orderedProduct = {
        item: row.productId,
        listId: row.id.toString(),
        discount: row.discount,
        quantity: row.quantity,
        subtotal: row.subtotal,
      };
      orderedProducts = [...orderedProducts, orderedProduct];
    });

    dispatch(updateSalesData({ orderedProducts }));
  };

  return (
    <Tr>
      <Td p="0" w={['170px', 'auto']} maxW="300px">
        <CustomSelect
          id={rowData.id.toString()}
          placeholder="Select option"
          onChangeFn={handleSelectChange}
          size="sm"
          borderRadius="md"
          fontSize={['sm', 'md']}
          options={products?.map((prod) => ({ id: prod._id, name: prod.name }))}
        />
      </Td>

      <TableCellBody>{rowData.stock.toLocaleString()}</TableCellBody>
      <TableCellBody>{numberToCurrency(rowData.price)}</TableCellBody>
      <TableCellBody>
        <InputCell
          id="quantity"
          handleInputChange={handleInputChange}
          textAlign={cellStyles.textAlign}
        />
      </TableCellBody>
      <TableCellBody>
        <InputCell
          id="discount"
          handleInputChange={handleInputChange}
          textAlign={cellStyles.textAlign}
        />
      </TableCellBody>
      <TableCellBody>{numberToCurrency(rowData.subtotal)}</TableCellBody>
      <TableCellBody>
        <IconButton
          onClick={(): void => {
            removeRow(id);
          }}
          aria-label="eliminar fila"
          icon={<MdClear />}
          colorScheme="red"
          size="md"
          variant="ghost"
        />
      </TableCellBody>
    </Tr>
  );
}
