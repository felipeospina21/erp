import React from "react";
import { Select } from "@chakra-ui/react";

const SelectInput = props => {
  return (
    <Select
      placeholder='Select option'
      size={props.size}
      m='0'
      maxW='5rem'
      onChange={props.onChangeFn}>
      {props.options.map(element => (
        <option key={element}>{element}</option>
      ))}
    </Select>
  );
};

export default SelectInput;
