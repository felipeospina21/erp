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
import { updateStockAndDocRef } from 'services/updateStockAndDocRef';
import { createPackingList } from '@/utils/pdf/createPackingList';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addNewDeliveryToList, Delivery, resetSale } from '@/redux/slices/salesSlice';

export interface ActionButtonsProps {
  pageMaxW: string;
  isSalesBtnDisabled?: boolean;
}

export function ActionButtons({ isSalesBtnDisabled, pageMaxW }: ActionButtonsProps): JSX.Element {
  const { data: saleRequest } = useGetSaleRefCountQuery();
  const [updateSaleRef] = useUpdateSaleRefCountMutation();
  const [updateProductStockAvailable] = useUpdateProductStockAvailableMutation();
  const [updateProductStockReserved] = useUpdateProductStockReservedMutation();
  const [
    saveSale,
    { isLoading: isSaveSaleLoading, isError: isSaveSaleError, error: saveSaleError },
  ] = useSaveSaleMutation();
  const salesData = useAppSelector((state) => state.sales);
  const { deliveriesList, client, checkoutData } = salesData;
  const toast = useToast();
  const dispatch = useAppDispatch();

  function addNewDelivery(): void {
    dispatch(addNewDeliveryToList());
  }

  async function handleNewSale(): Promise<void> {
    const saleRef = saleRequest?.count ?? 0;
    async function newSale(idx: number, delivery: Delivery): Promise<void> {
      const { productsList, summary } = delivery;
      const orderedProducts =
        productsList?.map(({ item, discount, quantity, rowTotal }) => ({
          item,
          discount,
          quantity,
          rowTotal,
        })) ?? [];

      await saveSale({
        clientId: client?._id ?? '',
        ...checkoutData,
        ...summary,
        orderedProducts,
        status: '',
        saleRequestRef: String(saleRef + idx),
      }).unwrap();

      await updateStockAndDocRef(
        delivery,
        updateSaleRef,
        updateProductStockAvailable,
        updateProductStockReserved
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
    <Flex
      justify="space-between"
      align="center"
      m={['2rem 2rem', null, null, null, null, '2rem auto']}
      w={[null, null, null, null, null, '95%']}
      maxW={pageMaxW}
    >
      <Button variant="primary" m="0.5rem 3rem" p="1rem" fontSize="sm" onClick={addNewDelivery}>
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
