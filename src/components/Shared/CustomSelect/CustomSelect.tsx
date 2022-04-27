import React from 'react';
import { Select } from '@chakra-ui/react';

export interface CustomSelectProps {
  name?: string;
  margin?: string;
  maxW?: string;
  placeholder: string;
  size: string;
  options: { id: string; name: string }[] | undefined;
  onChangeFn: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
}

export function CustomSelect({
  name,
  margin,
  maxW,
  placeholder,
  size,
  options,
  onChangeFn,
  value,
}: CustomSelectProps): JSX.Element {
  return (
    <Select
      name={name ?? placeholder}
      placeholder={placeholder}
      size={size}
      maxW={maxW ?? 'inherit'}
      m={margin ?? '0'}
      onChange={onChangeFn}
      value={value}>
      {options?.map((option) => (
        <option key={option.id}>{option.name}</option>
      ))}
    </Select>
  );
}
