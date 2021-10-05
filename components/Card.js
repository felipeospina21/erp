import React from "react";
import { Box } from "@chakra-ui/react";
import MoContainer from "./MoContainer";

const Card = () => {
  return (
    <Box border='1px solid black' h='300px' w='300px' m='1rem'>
      <h1>test card</h1>
      <MoContainer/>
    </Box>
  );
};

export default Card;
