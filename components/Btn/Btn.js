import React from "react";
import { Button } from "@chakra-ui/react";

const Btn = props => {
  return (
    <Button
      isDisabled={props.status}
      colorScheme={props.color}
      w='8rem'
      m='0.5rem 1rem'
      p='0.5rem 2rem'
      onClick={props.onClick}>
      {props.children}
    </Button>
  );
};

export default Btn;
