import { CustomButton, CustomFormField } from '@/components/Shared';
import { RowData } from '@/pages/ventas';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  ConsecutiveResponse,
  NewSaleResponse,
  Product,
  useGetInvoiceCountQuery,
  useSaveSaleMutation,
  useUpdateInvoiceCountMutation,
  useUpdateProductStockAvailableMutation,
} from '@/redux/services';
import {
  addInvoiceObservations,
  isInvoiceObservationsTextInvalid,
  resetSale,
} from '@/redux/slices/salesSlice';
import useDebounce from '@/utils/hooks/useDebounce';
import { createPdf } from '@/utils/utils';
import { Box, Flex, Textarea, useToast } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import TaxPicker from './TaxPicker';
import ValueContainer from './ValueContainer';

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
  const { data: invoice } = useGetInvoiceCountQuery();
  const [updateInvoiceCount] = useUpdateInvoiceCountMutation();
  const [updateProductStock] = useUpdateProductStockAvailableMutation();
  const [
    saveSale,
    { isLoading: isSaveSaleLoading, isError: isSaveSaleError, error: saveSaleError },
  ] = useSaveSaleMutation();
  const salesData = useAppSelector((state) => state.sales);
  const { productsList, client, checkoutData, invoiceObservations } = salesData;
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
    async function saveNewSale(): Promise<any> {
      const promises: Promise<NewSaleResponse | Product | ConsecutiveResponse>[] = [];
      const invoiceRef = invoice ? String(invoice.count + 1) : '';
      const orderedProducts =
        productsList?.map(({ item, discount, quantity, rowTotal }) => ({
          item,
          discount,
          quantity,
          rowTotal,
        })) ?? [];
      promises.push(
        saveSale({
          clientId: client?._id ?? '',
          ...checkoutData,
          orderedProducts,
          invoiceRef,
          status: 'alistamiento',
          saleRequestRef: '1',
        }).unwrap()
      );
      promises.push(updateInvoiceCount().unwrap());

      productsList?.forEach(({ stock, quantity, item }) => {
        promises.push(
          updateProductStock({
            _id: item,
            stockAvailable: stock - quantity,
          }).unwrap()
        );
      });

      return Promise.all(promises);
    }

    if (!isSaveSaleLoading && !isSaveSaleError) {
      const invoiceNum = invoice?.count ? invoice?.count + 1 : undefined;
      await saveNewSale();
      await createPdf(
        { clientInfo: client, ...checkoutData, orderedProducts: productsList ?? [] },
        invoiceNum,
        textValue
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
