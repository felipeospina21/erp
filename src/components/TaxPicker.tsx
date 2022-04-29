import React from 'react';
import { Box, SimpleGrid } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { updateSalesData } from '@/redux/slices/salesSlice';
import { CustomSelect } from './Shared';
import { nanoid } from '@reduxjs/toolkit';
import { useAppSelector } from '@/redux/hooks';

const TaxPicker = (): JSX.Element => {
  const tax = useAppSelector(state => state.sales.newSaleData.tax)
  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const { value } = event.target
    const formatedValue = Number(value) / 100;
    dispatch(updateSalesData({ tax: formatedValue }));
  };
  return (
    <SimpleGrid columns={2} spacing={1} justifyItems='end' fontSize='1.5rem' mt='1.5rem' w='100%'>
      <Box textAlign='right' fontSize='1.5rem' w='100%'>
        IVA (%):
      </Box>
      <CustomSelect
        options={[
          { id: nanoid(), name: '19' },
          { id: nanoid(), name: '16' },
        ]}
        size='lg'
        margin='0'
        maxW='10rem'
        placeholder='select'
        onChangeFn={handleChange}
        value={String(tax * 100)}
      />
    </SimpleGrid>
  );
};

export default TaxPicker;
