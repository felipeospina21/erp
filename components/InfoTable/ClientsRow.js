import React from "react";
import { Tr, Td } from "@chakra-ui/react";

const ClientsRow = props => {
  return (
    <Tr>
      <Td>{props.data.name}</Td>
      <Td>{props.data.idType}</Td>
      <Td>{props.data.idNumber}</Td>
      <Td>{props.data.addres1}</Td>
      <Td>{props.data.addres2}</Td>
      <Td>{props.data.city}</Td>
      <Td>{props.data.department}</Td>
      <Td>{`${props.data.discount}%`}</Td>
    </Tr>
  );
};

export default ClientsRow;
