import React from "react";
import { Th } from "@chakra-ui/react";

const TableCellHeader = ({ cellStyles, children }) => {
  return (
    <Th textAlign={cellStyles.textAlign} border={cellStyles.border}>
      {children}
    </Th>
  );
};

export default TableCellHeader;
