import { IconButton, Td, Tr, useToast } from '@chakra-ui/react';
import React from 'react';
import { MdClear } from 'react-icons/md';
import { useGetProductsQuery } from '@/redux/services';
import { numberToCurrency } from '@/utils/index';
import { InputCell, TableCellBody } from './';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { updateProductsList } from '@/redux/slices/salesSlice';
import { CustomSelect } from '@/components/Shared';

export interface TableRowProps {
  id: number;
  removeRow: (id: number) => void;
}

export function TableRow({ id, removeRow }: TableRowProps): JSX.Element {
  const { data: products } = useGetProductsQuery();
  const saleClient = useAppSelector((state) => state.sales.client);
  const productsList = useAppSelector((state) => state.sales.productsList);
  const product = productsList?.filter((product) => product.rowId === id)[0];
  const toast = useToast();
  const dispatch = useAppDispatch();

  function calculateTotal(price = 0, quantity = 0, discount = 0): number {
    const netSubtotal = price * quantity;
    const grossSubTotal = netSubtotal - netSubtotal * (discount / 100);
    return grossSubTotal;
  }

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const { value } = event.target;

    if (products) {
      const { _id, price, stock, name } = products?.filter((product) => product.name === value)[0];
      const rowTotal = calculateTotal(price);
      dispatch(
        updateProductsList({
          item: _id,
          rowId: id,
          stock,
          price,
          name,
          rowTotal,
          discount: saleClient.discount,
        })
      );
    }
  };

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { value, id: inputId } = event.target;
    if (product) {
      const { price, quantity, discount, stock, name } = product;

      if (inputId === 'quantity') {
        const newQuantity = Number(value);

        if (newQuantity > stock) {
          toast({
            title: 'Inventario insuficiente',
            description: `La cantidad a vender de ${name} supera el inventario`,
            status: 'error',
            duration: 8000,
            isClosable: true,
          });
        }

        const rowTotal = calculateTotal(price, newQuantity, discount);
        dispatch(updateProductsList({ rowId: id, quantity: newQuantity, rowTotal }));
      }

      if (inputId === 'discount') {
        const newDiscount = Number(value);
        const rowTotal = calculateTotal(price, quantity, newDiscount);

        dispatch(updateProductsList({ rowId: id, discount: newDiscount, rowTotal }));
      }
    }
  }

  return (
    <Tr>
      <Td p="0" w={['170px', 'auto']} maxW="300px">
        <CustomSelect
          id={id.toString()}
          placeholder="Select option"
          onChangeFn={handleSelectChange}
          size="sm"
          borderRadius="md"
          options={products?.map((prod) => ({ _id: prod._id, name: prod.name }))}
        />
      </Td>

      <TableCellBody>{product?.stock.toLocaleString()}</TableCellBody>
      <TableCellBody>{numberToCurrency(product?.price ?? 0)}</TableCellBody>
      <TableCellBody>
        <InputCell
          id="quantity"
          handleInputChange={handleInputChange}
          textAlign="center"
          variant="outline"
          value={product?.quantity?.toLocaleString() ?? ''}
        />
      </TableCellBody>
      <TableCellBody>
        <InputCell
          id="discount"
          handleInputChange={handleInputChange}
          textAlign="center"
          variant="outline"
          value={
            product?.discount?.toLocaleString() ?? saleClient?.discount?.toLocaleString() ?? ''
          }
        />
      </TableCellBody>
      <TableCellBody>{numberToCurrency(product?.rowTotal ?? 0)}</TableCellBody>
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
