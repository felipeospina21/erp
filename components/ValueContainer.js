import React from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { thousandSeparator } from "../utils";

const ValueContainer = props => {
  const text = props.name.replace(/\w\S*/g, w => w.replace(/^\w/, c => c.toUpperCase()));
  const value = props.value;
  return (
    <SimpleGrid columns={2} spacing={1}>
      <Box textAlign='right' fontSize='1.5rem' mt='1.5rem' w='100%'>
        {text}
      </Box>
      <Box textAlign='right' fontSize='1.5rem' mt='1.5rem' w='100%'>
        {/* {`$${thousandSeparator(value, 2)}`} */}
      </Box>
    </SimpleGrid>
  );
};

export default ValueContainer;
