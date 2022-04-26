import React from "react";
import { Select } from "@chakra-ui/react";

export interface ObjSelectInputProps {
  name: string;
  title: string;
  size: string;
  options: { id: string; name: string }[] | undefined;
  onChangeFn: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}
const ObjSelectInput = ({name, title, size, options, onChangeFn}: ObjSelectInputProps): JSX.Element => {
  return (
    <Select name={name} placeholder={title} size={size} m='1rem' onChange={onChangeFn}>
      {options?.map((option) => (
        <option key={option.id}>{option.name}</option>
      ))}
    </Select>
  );
};

export default ObjSelectInput;
