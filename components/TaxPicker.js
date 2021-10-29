import React from "react";
import { HStack, Box, Input } from "@chakra-ui/react";

const TaxPicker = props => {
  const handleChange = event => {
    props.setTax(event.target.value);
  };
  return (
    <HStack textAlign='right' fontSize='1.5rem' mt='1.5rem' w='100%'>
      <Box w='93%'>IVA (%): </Box>
      <Input
        textAlign='right'
        w='7%'
        size='xl'
        variant='unstyled'
        value={props.value}
        onChange={handleChange}
      />
    </HStack>
  );
};

export default TaxPicker;
