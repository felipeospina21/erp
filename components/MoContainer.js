import React from "react";
import { Box, Grid, GridItem } from "@chakra-ui/react";

const MoContainer = () => {
  return (
    <Grid
      gridTemplateColumns='repeat(3, 1fr)'
      border='1px solid grey'
      w='100%'
      h='100px'
      mt='0.5rem'>
      <GridItem colStart={1}>Criterio</GridItem>
      <GridItem colStart={2}>Tiempo producción</GridItem>
      <GridItem colStart={3}>Total</GridItem>

      <GridItem colStart={1}>Empleado</GridItem>
      <GridItem colStart={2}>0.16</GridItem>
      <GridItem colStart={3}>632.42</GridItem>
    </Grid>
  );
};

export default MoContainer;
