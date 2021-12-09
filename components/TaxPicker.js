import React from "react";
import { Box, Input, SimpleGrid } from "@chakra-ui/react";

const TaxPicker = props => {
  const handleChange = event => {
    props.setTax(event.target.value);
  };
  return (
    <SimpleGrid
      columns={2}
      spacing={1}
      textAlign='right'
      fontSize='1.5rem'
      mt='1.5rem'
      w='100%'>
      <Box textAlign='right' fontSize='1.5rem' w='100%'>
        IVA (%):
      </Box>
      <Input
        textAlign='center'
        w='9rem'
        size='xl'
        variant='unstyled'
        value={props.value}
        onChange={handleChange}
      />
    </SimpleGrid>
  );
};

export default TaxPicker;
