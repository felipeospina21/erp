import React from "react";
import { Box } from "@chakra-ui/react";
import { thousandSeparator } from "../utils";

const ValueContainer = props => {
  return (
    <Box textAlign='right' fontSize='1.5rem' mt='1.5rem' w='100%'>
      {`${props.text} ${thousandSeparator(props.value)}`}
    </Box>
  );
};

export default ValueContainer;
