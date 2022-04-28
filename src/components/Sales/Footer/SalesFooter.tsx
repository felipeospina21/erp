import React from 'react';
import { Flex, Box } from '@chakra-ui/react';
import { CustomButton } from '../../Shared';
import TaxPicker from '../../TaxPicker';
import ValueContainer from '../../ValueContainer';
import { resetState } from '../../../redux/slices/salesSlice';
import { useSaveSaleMutation, useUpdateProductMutation } from '../../../redux/services';
import { RowData } from '../../../pages/ventas';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';

export interface SalesFooterProps {
  initialRowSate: RowData;
  isSalesBtnDisabled: boolean;
  rowsData: RowData[];
  setRowsData: React.Dispatch<React.SetStateAction<RowData[]>>;
}

export function SalesFooter({
  initialRowSate,
  isSalesBtnDisabled,
  rowsData,
  setRowsData,
}: SalesFooterProps): JSX.Element {
  const [updateProduct] = useUpdateProductMutation();
  const [saveSale] = useSaveSaleMutation();
  const salesData = useAppSelector((state) => state.sales);
  const dispatch = useAppDispatch();

  const handleReset = (): void => {
    Array.from(document.querySelectorAll('input')).forEach((input) => (input.value = ''));
    Array.from(document.querySelectorAll('select')).forEach((select) => (select.value = ''));
    setRowsData([initialRowSate]);
    dispatch(resetState());
  };

  const handleNewSale = (): void => {
    // Decrease Stock
    // TODO: create api for updating multiple items
    rowsData.forEach((row) => {
      const newStock = row.stock - row.quantity;
      updateProduct({ _id: row.productId, update: { stock: newStock } });
    });

    saveSale(salesData.data);
    handleReset();
  };

  return (
    <Flex flexDir='column' align='flex-end' mr='2rem'>
      <Flex flexDir='column' justifyItems='center' alignItems='stretch' p='0 1rem' minW='400px'>
        <ValueContainer name='subtotal' value={salesData.data.subtotal} />
        <TaxPicker />
        <ValueContainer name='total' value={salesData.data.total} />
      </Flex>

      <Box mt='1rem'>
        <CustomButton variant='accept' status={isSalesBtnDisabled} onClick={handleNewSale}>
          Vender
        </CustomButton>
        <CustomButton variant='reject' onClick={handleReset}>
          Borrar
        </CustomButton>
      </Box>
    </Flex>
  );
}
