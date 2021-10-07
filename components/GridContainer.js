import React from "react";
import { Grid, Input} from "@chakra-ui/react";
import GridRow from "./GridRow.js";
import GridHeader from "./GridHeader.js";

const GridContainer = ({ templateCol, header, data }) => {
  return (
    <Grid
      gridTemplateColumns={`repeat(${templateCol})`}
      border='1px solid grey'
      w='100%'
      h='100px'
      mt='0.5rem'>
      <GridHeader obj={header}/>
      <GridRow obj={data}/>
      <Input size='xs'/>
      <Input size='xs'/>
    </Grid>
  );
};

export default GridContainer;
