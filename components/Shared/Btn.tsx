import React from "react";
import { Button } from "@chakra-ui/react";

export interface BtnProps {
  status: boolean;
  color: string;
  children: string;
  onClick: () => void;
}

const Btn = (props: BtnProps): JSX.Element => {
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
