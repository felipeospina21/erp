import React, { useState } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { Wrap, WrapItem } from '@chakra-ui/react';
import { CustomSelect, FormContainer } from '../../Shared';
import { useAppDispatch } from '../../../redux/hooks';
import { updateSalesData } from '../../../redux/slices/salesSlice';
import { useGetClientsQuery } from '../../../redux/services';

export function SalesHeader(): JSX.Element {
  const [selectedValue, setSelectedValue] = useState({
    deliveryCity: '',
    channel: '',
    clientName: '',
  });
  const { data: clients } = useGetClientsQuery();
  const dispatch = useAppDispatch();
  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const { name, value } = event.target;
    setSelectedValue({ ...selectedValue, [name]: value });
    dispatch(updateSalesData({ [name]: value }));
  };

  return (
    <Wrap spacing='30px' m='2rem auto' justify='space-evenly'>
      <WrapItem w='20rem'>
        <FormContainer label='Cliente' id='client'>
          <CustomSelect
            name='clientName'
            placeholder='Cliente'
            options={clients?.map((client) => ({ id: client._id, name: client.name }))}
            size='lg'
            onChangeFn={handleSelect}
            value={selectedValue.clientName}
          />
        </FormContainer>
      </WrapItem>
      <WrapItem w='20rem'>
        <FormContainer label='Ciudad' id='ciudad'>
          <CustomSelect
            name='deliveryCity'
            placeholder='Ciudad'
            options={[
              { id: nanoid(), name: 'Medellín' },
              { id: nanoid(), name: 'Bogota' },
            ]}
            size='lg'
            onChangeFn={handleSelect}
            value={selectedValue.deliveryCity}
          />
        </FormContainer>
      </WrapItem>
      <WrapItem w='20rem'>
        <FormContainer label='Canal' id='channel'>
          <CustomSelect
            name='channel'
            placeholder='Canal'
            options={[
              { id: nanoid(), name: 'Directo' },
              { id: nanoid(), name: 'Tercero' },
            ]}
            size='lg'
            onChangeFn={handleSelect}
            value={selectedValue.channel}
          />
        </FormContainer>
      </WrapItem>
    </Wrap>
  );
}
