import { CustomButton, CustomFormField } from '@/components/Shared';
import { RowData } from '@/pages/ventas';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  useGetSaleRefCountQuery,
  useSaveSaleMutation,
  useUpdateProductStockAvailableMutation,
  useUpdateProductStockReservedMutation,
  useUpdateSaleRefCountMutation,
} from '@/redux/services';
import {
  addInvoiceObservations,
  isInvoiceObservationsTextInvalid,
  resetSale,
} from '@/redux/slices/salesSlice';
import useDebounce from '@/utils/hooks/useDebounce';
import { Box, Flex, Textarea, useToast } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import TaxPicker from './TaxPicker';
import ValueContainer from './ValueContainer';
import { saveNewSale } from 'services/createSale';

export interface SalesFooterProps {
  pageMaxW: string;
  initialRowSate: RowData;
  isSalesBtnDisabled: boolean;
  setRowsData: React.Dispatch<React.SetStateAction<RowData[]>>;
}

export function SalesFooter({
  pageMaxW,
  initialRowSate,
  isSalesBtnDisabled,
  setRowsData,
}: SalesFooterProps): JSX.Element {
  const [textValue, setTextValue] = useDebounce('', 1000);
  const { data: saleRequest } = useGetSaleRefCountQuery();
  const [updateSaleRef] = useUpdateSaleRefCountMutation();
  const [updateProductStockAvailable] = useUpdateProductStockAvailableMutation();
  const [updateProductStockReserved] = useUpdateProductStockReservedMutation();
  const [
    saveSale,
    { isLoading: isSaveSaleLoading, isError: isSaveSaleError, error: saveSaleError },
  ] = useSaveSaleMutation();
  const salesData = useAppSelector((state) => state.sales);
  const { invoiceObservations } = salesData;
  const { subtotal, total, withholdingTax } = useAppSelector((state) => state.sales.checkoutData);
  const dispatch = useAppDispatch();
  const toast = useToast();

  const resetInputs = (): void => {
    Array.from(document.querySelectorAll('input')).forEach((input) => (input.value = ''));
    Array.from(document.querySelectorAll('select')).forEach((select) => (select.value = ''));
    setRowsData([initialRowSate]);
    dispatch(resetSale());
  };

  function handleTextAreaChange(e: React.ChangeEvent<HTMLTextAreaElement>): void {
    const { value } = e.target;
    setTextValue(value);
  }

  async function handleNewSale(): Promise<void> {
    if (!isSaveSaleLoading && !isSaveSaleError) {
      saveNewSale(
        salesData,
        saleRequest,
        saveSale,
        updateSaleRef,
        updateProductStockAvailable,
        updateProductStockReserved
      );
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

  useEffect(() => {
    dispatch(addInvoiceObservations(textValue));
  }, [textValue, dispatch]);

  useEffect(() => {
    if (textValue.length > 50) {
      dispatch(isInvoiceObservationsTextInvalid(true));
    } else {
      dispatch(isInvoiceObservationsTextInvalid(false));
    }
  }, [textValue, dispatch]);

  return (
    <Flex
      maxW={pageMaxW}
      flexDir={['column', null, null, 'row']}
      justify="space-between"
      m={['2rem 2rem', null, null, null, null, '2rem auto']}
      w={[null, null, null, null, null, '95%']}
    >
      <Box w={['100%', null, null, '50rem']}>
        <CustomFormField
          id="observations"
          label="Observaciones"
          isError={invoiceObservations?.areInvalid}
          errorMessage={`La longitud maxima de caracteres permitida es 50`}
        >
          <Textarea
            isInvalid={invoiceObservations?.areInvalid}
            focusBorderColor="none"
            borderRadius="2xl"
            bgColor="brand.bgLight"
            onChange={handleTextAreaChange}
          />
        </CustomFormField>
      </Box>

      <Flex maxW={pageMaxW} flexDir="column" align="flex-end" mr="2rem">
        <Flex flexDir="column" justifyItems="center" alignItems="stretch" m="0 2.5rem" minW="400px">
          <ValueContainer name="subtotal" value={subtotal} />
          <TaxPicker />
          {withholdingTax && <ValueContainer name="Rte Fuente" sign="-" value={withholdingTax} />}
          <ValueContainer name="total" value={total} />
        </Flex>

        <Box mt="1rem">
          <CustomButton
            fontSize="sm"
            variant="accept"
            status={isSalesBtnDisabled}
            onClick={handleNewSale}
          >
            Vender
          </CustomButton>
          <CustomButton fontSize="sm" variant="reject" onClick={resetInputs}>
            Borrar
          </CustomButton>
        </Box>
      </Flex>
    </Flex>
  );
}
