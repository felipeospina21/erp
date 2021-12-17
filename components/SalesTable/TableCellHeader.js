import React, { useContext } from "react";
import { Th } from "@chakra-ui/react";
import { TableStylesContext } from "../../context/TableStylesContext";

const TableCellHeader = ({ children }) => {
  const [cellStyles, setCellStyles] = useContext(TableStylesContext);

  return (
    <Th textAlign={cellStyles.textAlign} border={cellStyles.border}>
      {children}
    </Th>
  );
};

export default TableCellHeader;
