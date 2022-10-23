import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useGetwithholdingTaxQuery } from '@/redux/services';
import { updateDeliverySummary } from '@/redux/slices/salesSlice';
import { Box, Flex } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import TaxPicker from './TaxPicker';
import ValueContainer from './ValueContainer';
import { Observations } from '../../Observations';
import { useValidateTextLen } from '../../OpenSales/hooks/useValidateTextLen';
import { useObservations } from './hooks';

export interface SalesFooterProps {
  pageMaxW: string;
  deliveryId: number;
}

export function SaleSummary({ pageMaxW, deliveryId }: SalesFooterProps): JSX.Element {
  const { data: withholdingTaxQuery } = useGetwithholdingTaxQuery('62d19e8a3a4b06e0eed05d2d');
  const salesData = useAppSelector((state) => state.sales);
  const { deliveriesList } = salesData;
  const {
    productsList,
    summary: { subtotal, total, withholdingTax, tax },
  } = deliveriesList[deliveryId];
  const dispatch = useAppDispatch();
  const [observations, setObservations] = useObservations(deliveryId);
  const areObservationsValid = useValidateTextLen(observations);

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
        <Observations isValid={areObservationsValid} handleTextChange={setObservations} />
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
