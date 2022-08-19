import { CustomFormField } from '@/components/Shared';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useGetwithholdingTaxQuery } from '@/redux/services';
import {
  addInvoiceObservations,
  isInvoiceObservationsTextInvalid,
  updateDeliverySummary,
} from '@/redux/slices/salesSlice';
import useDebounce from 'hooks/useDebounce';
import { Box, Flex, Textarea } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import TaxPicker from './TaxPicker';
import ValueContainer from './ValueContainer';

export interface SalesFooterProps {
  pageMaxW: string;
  deliveryId: number;
}

export function SaleSummary({ pageMaxW, deliveryId }: SalesFooterProps): JSX.Element {
  const { data: withholdingTaxQuery } = useGetwithholdingTaxQuery('62d19e8a3a4b06e0eed05d2d');
  const [textValue, setTextValue] = useDebounce('', 1000);
  const salesData = useAppSelector((state) => state.sales);
  const { deliveriesList } = salesData;
  const {
    productsList,
    summary: { subtotal, total, withholdingTax, tax },
    invoiceObservations,
  } = deliveriesList[deliveryId];
  const dispatch = useAppDispatch();

  function handleTextAreaChange(e: React.ChangeEvent<HTMLTextAreaElement>): void {
    const { value } = e.target;
    setTextValue(value);
  }

  useEffect(() => {
    dispatch(addInvoiceObservations({ deliveryId, observations: textValue }));
  }, [deliveryId, textValue, dispatch]);

  useEffect(() => {
    if (textValue.length > 50) {
      dispatch(isInvoiceObservationsTextInvalid({ deliveryId, isInvalid: true }));
    } else {
      dispatch(isInvoiceObservationsTextInvalid({ deliveryId, isInvalid: false }));
    }
  }, [deliveryId, textValue, dispatch]);

  useEffect(() => {
    const newSubtotal = productsList.reduce(
      (accumulator, product) => accumulator + product.rowTotal,
      0
    );
    dispatch(updateDeliverySummary({ key: 'subtotal', value: newSubtotal ?? 0, deliveryId }));
  }, [productsList, dispatch, deliveryId]);

  useEffect(() => {
    let withholding = 0;
    if (withholdingTaxQuery && subtotal > withholdingTaxQuery.base) {
      withholding = subtotal * (withholdingTaxQuery.percentage ?? 0);
      dispatch(updateDeliverySummary({ key: 'withholdingTax', value: withholding, deliveryId }));
    }
    const newTotal = subtotal * (1 + tax) - withholding;
    dispatch(updateDeliverySummary({ key: 'total', value: newTotal, deliveryId }));
  }, [subtotal, tax, withholdingTaxQuery, dispatch, deliveryId]);

  return (
    <Flex
      maxW={pageMaxW}
      flexDir={['column', null, null, 'row']}
      justify="space-between"
      m={['0 2rem', null, null, null, null, '0 auto']}
      w={[null, null, null, null, null, '95%']}
    >
      <Box w={['100%', null, null, '50rem']}>
        <CustomFormField
          id="observations"
          label="Observaciones"
          isError={invoiceObservations?.areInvalid}
          errorMessage={`La longitud maxima de caracteres permitida es 50`}
          margin="0 auto 1rem auto"
        >
          <Textarea
            isInvalid={invoiceObservations?.areInvalid}
            focusBorderColor="none"
            borderRadius="2xl"
            borderColor="brand.grey.100"
            onChange={handleTextAreaChange}
          />
        </CustomFormField>
      </Box>

      <Flex maxW={pageMaxW} flexDir="column" align="flex-end" mr="2rem">
        <Flex flexDir="column" justifyItems="center" alignItems="stretch" m="0 2.5rem" minW="400px">
          <ValueContainer name="subtotal" value={subtotal} />
          <TaxPicker deliveryId={deliveryId} />
          {withholdingTax && <ValueContainer name="Rte Fuente" sign="-" value={withholdingTax} />}
          <ValueContainer name="total" value={total} />
        </Flex>
      </Flex>
    </Flex>
  );
}
