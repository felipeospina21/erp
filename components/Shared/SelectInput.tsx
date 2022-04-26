import React from 'react';
import { Select } from '@chakra-ui/react';

export interface SelectInputProps {
  size: string;
  options: string[];
  m?: string;
  onChangeFn: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
const SelectInput = ({ size, options, m, onChangeFn }: SelectInputProps): JSX.Element => {
  return (
    <Select placeholder='Select option' size={size} m={m ?? '0'} maxW='5rem' onChange={onChangeFn}>
      {options.map((element) => (
        <option key={element}>{element}</option>
      ))}
    </Select>
  );
};

export default SelectInput;
