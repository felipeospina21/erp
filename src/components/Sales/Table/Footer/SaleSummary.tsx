import { CustomFormField } from '@/components/Shared';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  addInvoiceObservations,
  isInvoiceObservationsTextInvalid,
} from '@/redux/slices/salesSlice';
import useDebounce from '@/utils/hooks/useDebounce';
import { Box, Flex, Textarea } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import TaxPicker from './TaxPicker';
import ValueContainer from './ValueContainer';

export interface SalesFooterProps {
  pageMaxW: string;
}

export function SaleSummary({ pageMaxW }: SalesFooterProps): JSX.Element {
  const [textValue, setTextValue] = useDebounce('', 1000);
  const salesData = useAppSelector((state) => state.sales);
  const { invoiceObservations, checkoutData } = salesData;
  const { subtotal, total, withholdingTax } = checkoutData;
  const dispatch = useAppDispatch();

  function handleTextAreaChange(e: React.ChangeEvent<HTMLTextAreaElement>): void {
    const { value } = e.target;
    setTextValue(value);
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
          <TaxPicker />
          {withholdingTax && <ValueContainer name="Rte Fuente" sign="-" value={withholdingTax} />}
          <ValueContainer name="total" value={total} />
        </Flex>
      </Flex>
    </Flex>
  );
}
