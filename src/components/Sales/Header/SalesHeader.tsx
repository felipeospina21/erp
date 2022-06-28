import React from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { Flex } from '@chakra-ui/react';
import { CustomSelect } from '@/components/Shared';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  addNewSaleClient,
  updateCheckoutData,
  updateClientPaymentTerm,
} from '@/redux/slices/salesSlice';
import { PaymentOptions, useGetClientsQuery } from '@/redux/services';
import { paymentTerms } from '@/components/Clients';

export interface SalesHeaderProps {
  pageMaxW: string;
}

export function SalesHeader({ pageMaxW }: SalesHeaderProps): JSX.Element {
  const { data: clients } = useGetClientsQuery();
  const salesData = useAppSelector((state) => state.sales);
  const dispatch = useAppDispatch();

  const handleClientSelect = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const { value } = event.target;
    if (clients) {
      const selectedClient = clients.filter((client) => client.name === value)[0];
      dispatch(dispatch(addNewSaleClient({ ...selectedClient })));
      dispatch(dispatch(updateClientPaymentTerm(selectedClient.paymentTerm)));
    }
  };

  const handleCitySelect = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const { value } = event.target;
    dispatch(updateCheckoutData({ key: 'deliveryCity', value }));
  };

  const handlePaymentSelect = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const { value } = event.target;
    dispatch(updateClientPaymentTerm(value as PaymentOptions));
  };

  return (
    <Flex
      maxW={pageMaxW}
      spacing="30px"
      m={['2rem 2rem', null, null, null, null, '2rem auto']}
      w={[null, null, null, null, null, '95%']}
      p="1rem 0"
      justify="space-evenly"
      flexDir={['column', 'row']}
      wrap={['nowrap', 'wrap']}
      bgColor="brand.bgLight"
      borderRadius="3xl"
      boxShadow={'var(--boxShadow)'}
    >
      <CustomSelect
        name="clientName"
        placeholder="Cliente"
        options={clients?.map((client) => ({
          _id: client._id ?? nanoid(),
          name: client.name,
        }))}
        size="md"
        onChangeFn={handleClientSelect}
        value={salesData.client?.name}
        maxW="18rem"
        minW="10rem"
        fontSize="sm"
        label="Cliente"
        container={{ width: ['12rem', null, '15rem'], margin: '0.5rem auto' }}
      />

      <CustomSelect
        name="deliveryCity"
        placeholder="Ciudad"
        options={[
          { _id: nanoid(), name: 'Medellín' },
          { _id: nanoid(), name: 'Bogota' },
        ]}
        size="md"
        onChangeFn={handleCitySelect}
        value={salesData.checkoutData?.deliveryCity}
        maxW="18rem"
        minW="10rem"
        fontSize="sm"
        label="Ciudad"
        container={{ width: ['12rem', null, '15rem'], margin: '0.5rem auto' }}
      />

      <CustomSelect
        name="paymentTerm"
        placeholder="Pago"
        options={paymentTerms}
        size="md"
        onChangeFn={handlePaymentSelect}
        value={String(salesData.checkoutData?.paymentTerm)}
        maxW="18rem"
        minW="10rem"
        fontSize="sm"
        label="Pago"
        container={{ width: ['12rem', null, '15rem'], margin: '0.5rem auto' }}
      />
    </Flex>
  );
}
