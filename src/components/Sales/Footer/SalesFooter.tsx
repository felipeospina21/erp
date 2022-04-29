import { CustomButton } from '@/components/Shared';
import TaxPicker from '@/components/TaxPicker';
import ValueContainer from '@/components/ValueContainer';
import { RowData } from '@/pages/ventas';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  NewSaleResponse,
  Product,
  useSaveSaleMutation,
  useUpdateProductMutation,
} from '@/redux/services';
import { resetSale } from '@/redux/slices/salesSlice';
import { Box, Flex } from '@chakra-ui/react';
import React from 'react';

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
  const [
    saveSale,
    { isLoading: isSaveSaleLoading, isError: isSaveSaleError, error: saveSaleError },
  ] = useSaveSaleMutation();
  const salesData = useAppSelector((state) => state.sales);
  const dispatch = useAppDispatch();

  const resetInputs = (): void => {
    Array.from(document.querySelectorAll('input')).forEach((input) => (input.value = ''));
    Array.from(document.querySelectorAll('select')).forEach((select) => (select.value = ''));
    setRowsData([initialRowSate]);
    dispatch(resetSale());
  };

  async function handleNewSale(): Promise<void> {
    async function saveNewSale(): Promise<any> {
      const promises: Promise<NewSaleResponse | Product>[] = [];

      promises.push(saveSale(salesData.newSaleData).unwrap());

      rowsData.forEach((row) => {
        const newStock = row.stock - row.quantity;
        promises.push(updateProduct({ _id: row.productId, update: { stock: newStock } }).unwrap());
      });

      return Promise.all(promises);
    }

    if (!isSaveSaleLoading && !isSaveSaleError) {
      await saveNewSale();
      resetInputs();
    } else {
      throw saveSaleError;
    }
  }

  return (
    <Flex flexDir='column' align='flex-end' mr='2rem'>
      <Flex flexDir='column' justifyItems='center' alignItems='stretch' p='0 1rem' minW='400px'>
        <ValueContainer name='subtotal' value={salesData.newSaleData.subtotal} />
        <TaxPicker />
        <ValueContainer name='total' value={salesData.newSaleData.total} />
      </Flex>

      <Box mt='1rem'>
        <CustomButton variant='accept' status={isSalesBtnDisabled} onClick={handleNewSale}>
          Vender
        </CustomButton>
        <CustomButton variant='reject' onClick={resetInputs}>
          Borrar
        </CustomButton>
      </Box>
    </Flex>
  );
}
