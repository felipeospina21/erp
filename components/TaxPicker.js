import React from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { saveSaleInfo, updateSales } from "../app/slices/salesSlice";
import SelectInput from "./Shared/SelectInput";

const TaxPicker = props => {
  const salesData = useSelector(state => state.sales.data);

  const handleChange = event => {
    const value = Number(event.target.value) / 100;
    // const name = event.target.name;
    dispatchEvent(updateSales({data:{...salesData,tax: value }}));
    // props.setCheckoutData({ ...props.checkoutData, tax: value });
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
      <SelectInput options={[19, 16]} size='lg' m='0' onChangeFn={handleChange} />
    </SimpleGrid>
  );
};

export default TaxPicker;
