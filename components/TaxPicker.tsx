import React from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import {  updateSalesData } from "../redux/slices/salesSlice/salesSlice";
import SelectInput from "./Shared/SelectInput";

const TaxPicker = ():JSX.Element => {
  const dispatch = useDispatch();

  const handleChange = (event:React.ChangeEvent<HTMLSelectElement>): void => {
    const value = Number(event.target.value) / 100;
    dispatch(updateSalesData({ tax: value }));

  };
  return (
    <SimpleGrid
      columns={2}
      spacing={1}
      justifyItems='end'
      fontSize='1.5rem'
      mt='1.5rem'
      w='100%'>
      <Box textAlign='right' fontSize='1.5rem' w='100%'>
        IVA (%):
      </Box>
      <SelectInput options={['19', '16']} size='lg' m='0' onChangeFn={handleChange} />
    </SimpleGrid>
  );
};

export default TaxPicker;
