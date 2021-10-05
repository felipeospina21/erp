import React from "react";
import { GridItem } from "@chakra-ui/react";

const GridHeader = ({ obj }) => {
  return (
    <>
      {obj.map((col, idx) => {
        return (
          <GridItem key={idx} colStart={idx + 1} border='solid 1px red'>
            {col}
          </GridItem>
        );
      })}
    </>
  );
};

export default GridHeader;
