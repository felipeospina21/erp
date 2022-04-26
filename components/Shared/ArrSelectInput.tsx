import React from "react";
import { Select } from "@chakra-ui/react";

export interface ArrSelectInputProps {
  title: string;
  size: string;
  name: string;
  options: string[];
  onChangeFn: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const ArrSelectInput = (props: ArrSelectInputProps): JSX.Element => {
  return (
    <Select name={props.name} placeholder={props.title} size={props.size} m='1rem' onChange={props.onChangeFn}>
      {props.options.map((option) => (
        <option key={option}>{option}</option>
      ))}
    </Select>
  );
};

export default ArrSelectInput;
