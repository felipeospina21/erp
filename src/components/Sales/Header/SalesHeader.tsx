import React from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { Wrap, WrapItem } from '@chakra-ui/react';
import { CustomSelect, FormContainer } from '@/components/Shared';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { SalesData, updateSalesData } from '@/redux/slices/salesSlice';
import { useGetClientsQuery } from '@/redux/services';

export function SalesHeader(): JSX.Element {
  const { data: clients } = useGetClientsQuery();
  const newSaleData = useAppSelector((state) => state.sales.newSaleData);
  const dispatch = useAppDispatch();

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const { name, value } = event.target;
    if (name === 'clientName') {
      const clientId = clients?.filter(
        (client) => client.name.toLowerCase() === value.toLowerCase()
      )[0]?._id;
      dispatch(updateSalesData({ clientInfo: clientId }));
    }
    dispatch(updateSalesData({ [name as keyof SalesData]: value }));
  };

  return (
    <Wrap spacing="30px" m="2rem auto" justify="space-evenly">
      <WrapItem w="20rem">
        <FormContainer label="Cliente" id="client">
          <CustomSelect
            name="clientName"
            placeholder="Cliente"
            options={clients?.map((client) => ({
              id: client._id,
              name: client.name,
            }))}
            size="lg"
            onChangeFn={handleSelect}
            value={newSaleData.clientName}
          />
        </FormContainer>
      </WrapItem>
      <WrapItem w="20rem">
        <FormContainer label="Ciudad" id="ciudad">
          <CustomSelect
            name="deliveryCity"
            placeholder="Ciudad"
            options={[
              { id: nanoid(), name: 'Medellín' },
              { id: nanoid(), name: 'Bogota' },
            ]}
            size="lg"
            onChangeFn={handleSelect}
            value={newSaleData.deliveryCity}
          />
        </FormContainer>
      </WrapItem>
      <WrapItem w="20rem">
        <FormContainer label="Canal" id="channel">
          <CustomSelect
            name="salesChannel"
            placeholder="Canal"
            options={[
              { id: nanoid(), name: 'Directo' },
              { id: nanoid(), name: 'Tercero' },
            ]}
            size="lg"
            onChangeFn={handleSelect}
            value={newSaleData.salesChannel}
          />
        </FormContainer>
      </WrapItem>
    </Wrap>
  );
}
