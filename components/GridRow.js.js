import React from "react";
import { GridItem } from "@chakra-ui/react";

const GridRow = ({ obj }) => {
  return (
    <>
      {obj.map((col, rowIdx) => {
        const vals = Object.values(col);
        return vals.map((val, colIdx) => (
          <GridItem
            key={rowIdx}
            colStart={colIdx + 1}
            rowStart={rowIdx + 2}
            border='solid 1px red'>
            {val}
          </GridItem>
        ));
      })}
    </>
  );
};

export default GridRow;
