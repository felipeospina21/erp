import React from 'react';
import { Select } from '@chakra-ui/react';

export interface CustomSelectProps {
  borderRadius?: string;
  fontSize?: string | string[];
  id?: string;
  margin?: string;
  maxW?: string;
  name?: string;
  options: { id: string; name: string }[] | undefined;
  onChangeFn: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder: string;
  size: string;
  value?: string;
}

export function CustomSelect({
  borderRadius,
  fontSize,
  id,
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
      borderRadius={borderRadius ?? 'md'}
      name={name ?? placeholder}
      placeholder={placeholder}
      size={size}
      fontSize={fontSize ?? 'inherit'}
      maxW={maxW ?? 'inherit'}
      m={margin ?? '0'}
      onChange={onChangeFn}
      value={value}
      id={id}
    >
      {options?.map((option) => (
        <option key={option.id}>{option.name}</option>
      ))}
    </Select>
  );
}
