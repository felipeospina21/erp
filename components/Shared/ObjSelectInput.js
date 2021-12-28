import React from "react";
import { Select } from "@chakra-ui/react";

const ObjSelectInput = props => {
  return (
    <Select
      name={props.name}
      placeholder={props.title}
      size={props.size}
      m='1rem'
      onChange={props.onChangeFn}>
      {props.options.map(option => (
        <option key={option.id}>{option.name}</option>
      ))}
    </Select>
  );
};

export default ObjSelectInput;
