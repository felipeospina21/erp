import React from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { thousandSeparator } from "../utils";

const ValueContainer = props => {
  return (
    <SimpleGrid columns={2} spacing={1}>
      <Box textAlign='right' fontSize='1.5rem' mt='1.5rem' w='100%'>
        {`${props.text}`}
      </Box>
      <Box textAlign='right' fontSize='1.5rem' mt='1.5rem' w='100%'>
        {`$${thousandSeparator(props.value, 2)}`}
      </Box>
    </SimpleGrid>
  );
};

export default ValueContainer;
