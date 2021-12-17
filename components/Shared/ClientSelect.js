import React from "react";
import { Select } from "@chakra-ui/react";

const ClientSelect = props => {
  return (
    <Select placeholder='Select option' size={props.size} m='1rem'>
      {props.options.map(client => (
        <option key={client.id}>{client.name}</option>
      ))}
    </Select>
  );
};

export default ClientSelect;
