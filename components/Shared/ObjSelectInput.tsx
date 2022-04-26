import React from "react";
import { Select } from "@chakra-ui/react";

export interface ObjSelectInputProps {
  name: string;
  title: string;
  size: string;
  options: { id: number; name: string }[];
  onChangeFn: () => void;
}
const ObjSelectInput = (props: ObjSelectInputProps): JSX.Element => {
  return (
    <Select name={props.name} placeholder={props.title} size={props.size} m='1rem' onChange={props.onChangeFn}>
      {props.options.map((option) => (
        <option key={option.id}>{option.name}</option>
      ))}
    </Select>
  );
};

export default ObjSelectInput;
