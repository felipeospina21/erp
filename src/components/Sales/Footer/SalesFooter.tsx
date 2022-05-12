import { CustomButton } from '@/components/Shared';
import { RowData } from '@/pages/ventas';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  NewSaleResponse,
  Product,
  useSaveSaleMutation,
  useUpdateProductStockMutation,
} from '@/redux/services';
import { resetSale } from '@/redux/slices/salesSlice';
import { Box, Flex, useToast } from '@chakra-ui/react';
import React from 'react';
import TaxPicker from './TaxPicker';
import ValueContainer from './ValueContainer';

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
  const [updateProductStock] = useUpdateProductStockMutation();
  const [
    saveSale,
    { isLoading: isSaveSaleLoading, isError: isSaveSaleError, error: saveSaleError },
  ] = useSaveSaleMutation();
  const salesData = useAppSelector((state) => state.sales);
  const dispatch = useAppDispatch();
  const toast = useToast();

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
        promises.push(
          updateProductStock({
            _id: row.productId,
            stock: newStock,
          }).unwrap()
        );
      });

      return Promise.all(promises);
    }

    if (!isSaveSaleLoading && !isSaveSaleError) {
      await saveNewSale();
      resetInputs();
      toast({
        title: 'Success',
        description: 'Sale succesfully registered.',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Error',
        description: "oops! something didn't work as expected. Try later",
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      throw saveSaleError;
    }
  }

  return (
    <Flex flexDir="column" align="flex-end" mr="2rem">
      <Flex flexDir="column" justifyItems="center" alignItems="stretch" m="0 2.5rem" minW="400px">
        <ValueContainer name="subtotal" value={salesData.newSaleData.subtotal} />
        <TaxPicker />
        <ValueContainer name="total" value={salesData.newSaleData.total} />
      </Flex>

      <Box mt="1rem">
        <CustomButton variant="accept" status={isSalesBtnDisabled} onClick={handleNewSale}>
          Vender
        </CustomButton>
        <CustomButton variant="reject" onClick={resetInputs}>
          Borrar
        </CustomButton>
      </Box>
    </Flex>
  );
}
