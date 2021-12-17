import React, { useContext } from "react";
import { Td } from "@chakra-ui/react";
import { TableStylesContext } from "../../context/TableStylesContext";

const TableCellBody = props => {
  const [cellStyles, setCellStyles] = useContext(TableStylesContext);
  return (
    <Td border={cellStyles.border} textAlign={cellStyles.textAlign}>
      {props.children}
    </Td>
  );
};

export default TableCellBody;
