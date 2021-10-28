import React from "react";
import { Td } from "@chakra-ui/react";

const TableCellBody = props => {
  return (
    <Td border={props.cellStyles.border} textAlign={props.cellStyles.textAlign}>
      {props.children}
    </Td>
  );
};

export default TableCellBody;
