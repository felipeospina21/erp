import React from "react";
import { Input } from "@chakra-ui/react";

const InputCell = (props) => {
  return (
    <Input
      id={props.id}
      onChange={props.handleInputChange}
      textAlign={props.textAlign}
      size='sm'
      variant='unstyled'
      
    />
  );
};

export default InputCell;
