import React from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { Wrap, WrapItem } from '@chakra-ui/react';
import { CustomSelect, CustomFormField } from '@/components/Shared';
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
        <CustomFormField label="Cliente" id="client">
          <CustomSelect
            name="clientName"
            placeholder="Cliente"
            options={clients?.map((client) => ({
              id: client._id ?? nanoid(),
              name: client.name,
            }))}
            size="lg"
            onChangeFn={handleSelect}
            value={newSaleData.clientName}
          />
        </CustomFormField>
      </WrapItem>
      <WrapItem w="20rem">
        <CustomFormField label="Ciudad" id="ciudad">
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
        </CustomFormField>
      </WrapItem>
      <WrapItem w="20rem">
        <CustomFormField label="Canal" id="channel">
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
        </CustomFormField>
      </WrapItem>
    </Wrap>
  );
}
