import { CustomButton } from '@/components/Shared';
import { Box, Button, Flex, useToast } from '@chakra-ui/react';
import React from 'react';
import {
  useGetSaleRefCountQuery,
  useSaveSaleMutation,
  useUpdateProductStockAvailableMutation,
  useUpdateProductStockReservedMutation,
  useUpdateSaleRefCountMutation,
} from '@/redux/services';
import { saveNewSale } from 'services/createSale';
import { createPackingList } from '@/utils/pdf/createPackingList';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addNewDeliveryToList, Delivery, resetSale } from '@/redux/slices/salesSlice';

export interface ActionButtonsProps {
  isSalesBtnDisabled?: boolean;
}

export function ActionButtons({ isSalesBtnDisabled }: ActionButtonsProps): JSX.Element {
  const { data: saleRequest } = useGetSaleRefCountQuery();
  const [updateSaleRef] = useUpdateSaleRefCountMutation();
  const [updateProductStockAvailable] = useUpdateProductStockAvailableMutation();
  const [updateProductStockReserved] = useUpdateProductStockReservedMutation();
  const [
    saveSale,
    { isLoading: isSaveSaleLoading, isError: isSaveSaleError, error: saveSaleError },
  ] = useSaveSaleMutation();
  const salesData = useAppSelector((state) => state.sales);
  const { deliveriesList, client } = salesData;
  const toast = useToast();
  const dispatch = useAppDispatch();

  function addNewDelivery(): void {
    dispatch(addNewDeliveryToList());
  }

  async function handleNewSale(): Promise<void> {
    const saleRef = saleRequest?.count ?? 0;
    async function newSale(idx: number, delivery: Delivery): Promise<void> {
      await saveNewSale(
        salesData,
        delivery,
        saleRef,
        saveSale,
        updateSaleRef,
        updateProductStockAvailable,
        updateProductStockReserved,
        idx
      );

      await createPackingList(
        { clientInfo: client, orderedProducts: delivery.productsList ?? [], ...delivery.summary },
        saleRef,
        idx
      );
    }

    for (let i = 0; i < deliveriesList.length; i++) {
      const delivery = deliveriesList[i];
      await newSale(i, delivery);
    }

    if (!isSaveSaleLoading && !isSaveSaleError) {
      resetInputs();
      toast({
        title: 'Success',
        description: 'Sale succesfully registered.',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    } else if (isSaveSaleError) {
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

  const resetInputs = (): void => {
    Array.from(document.querySelectorAll('input')).forEach((input) => (input.value = ''));
    Array.from(document.querySelectorAll('select')).forEach((select) => (select.value = ''));
    dispatch(resetSale());
  };

  return (
    <Flex justify="space-between" align="center" m="2rem auto">
      <Button variant="primary" m="0.5rem 3rem" p="1rem" onClick={addNewDelivery}>
        Agregar entrega
      </Button>
      <Box m="auto 4rem">
        <CustomButton
          fontSize="sm"
          variant="accept"
          status={isSalesBtnDisabled}
          onClick={handleNewSale}
        >
          Guardar
        </CustomButton>
        <CustomButton fontSize="sm" variant="reject" onClick={resetInputs}>
          Borrar
        </CustomButton>
      </Box>
    </Flex>
  );
}
