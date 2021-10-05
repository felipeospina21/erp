import React from "react";
import { Box } from "@chakra-ui/react";
import GridContainer from "./GridContainer";

const Card = () => {
  const header = ["Criterio", "Tiempo Producción", "Total"];
  const data = [
    {
      concept: "Empleado",
      time: 0.14,
      total: 632.42,
    },
    {
      concept: "Supervisor",
      time: 0.04,
      total: 740.42,
    },
  ];
  return (
    <Box border='1px solid black' h='300px' w='300px' m='1rem'>
      <h1>test card</h1>
      <GridContainer templateCol={`${header.length}, 1fr`} header={header} data={data} />
    </Box>
  );
};

export default Card;
