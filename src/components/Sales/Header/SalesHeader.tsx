import React from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { Flex } from '@chakra-ui/react';
import { CustomSelect, CustomFormField } from '@/components/Shared';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { SalesData, updateSalesData } from '@/redux/slices/salesSlice';
import { Client, useGetClientsQuery } from '@/redux/services';

export function SalesHeader(): JSX.Element {
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
    <Flex spacing="30px" m="2rem auto" p="1rem" justify="space-evenly">
      <CustomFormField label="Cliente" id="client">
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
          maxW="15rem"
          fontSize="sm"
        />
      </CustomFormField>

      <CustomFormField label="Ciudad" id="ciudad">
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
          maxW="15rem"
          fontSize="sm"
        />
      </CustomFormField>
      <CustomFormField label="Canal" id="channel">
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
          maxW="15rem"
          fontSize="sm"
        />
      </CustomFormField>
    </Flex>
  );
}
