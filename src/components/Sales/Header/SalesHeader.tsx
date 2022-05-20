import React from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { Flex } from '@chakra-ui/react';
import { CustomSelect } from '@/components/Shared';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { SalesData, updateSalesData } from '@/redux/slices/salesSlice';
import { Client, useGetClientsQuery } from '@/redux/services';

export interface SalesHeaderProps {
  pageMaxW: string;
}

export function SalesHeader({ pageMaxW }: SalesHeaderProps): JSX.Element {
  const { data: clients } = useGetClientsQuery();
  const newSaleData = useAppSelector((state) => state.sales.newSaleData);
  const dispatch = useAppDispatch();

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const { name, value } = event.target;
    if (name === 'clientName') {
      const filteredClient = clients?.filter(
        (client) => client.name.toLowerCase() === value.toLowerCase()
      )[0];
      dispatch(
        updateSalesData({
          clientId: filteredClient?._id,
          clientInfo: { ...filteredClient } as Client,
        })
      );
    }
    dispatch(updateSalesData({ [name as keyof SalesData]: value }));
  };

  return (
    <Flex
      maxW={pageMaxW}
      spacing="30px"
      m="2rem auto"
      p="1rem"
      justify="space-evenly"
      flexDir={['column', 'row', 'row']}
      wrap={['nowrap', 'nowrap', 'wrap']}
    >
      <CustomSelect
        name="clientName"
        placeholder="Cliente"
        options={clients?.map((client) => ({
          id: client._id ?? nanoid(),
          name: client.name,
        }))}
        size="md"
        onChangeFn={handleSelect}
        value={newSaleData.clientName}
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
          { id: nanoid(), name: 'Medellín' },
          { id: nanoid(), name: 'Bogota' },
        ]}
        size="md"
        onChangeFn={handleSelect}
        value={newSaleData.deliveryCity}
        maxW="18rem"
        minW="10rem"
        fontSize="sm"
        label="Ciudad"
        container={{ width: ['12rem', null, '15rem'], margin: '0.5rem auto' }}
      />

      <CustomSelect
        name="salesChannel"
        placeholder="Canal"
        options={[
          { id: nanoid(), name: 'Directo' },
          { id: nanoid(), name: 'Tercero' },
        ]}
        size="md"
        onChangeFn={handleSelect}
        value={newSaleData.salesChannel}
        maxW="18rem"
        minW="10rem"
        fontSize="sm"
        label="Canal"
        container={{ width: ['12rem', null, '15rem'], margin: '0.5rem auto' }}
      />
    </Flex>
  );
}
