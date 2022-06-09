import React from 'react';
import { Box, FormLabel, Select } from '@chakra-ui/react';
import { Sizes } from '@/styles/types';

export interface CustomSelectProps {
  borderRadius?: string;
  borderColor?: string;
  fontSize?: string | string[];
  id?: string;
  margin?: string;
  maxW?: string;
  minW?: string;
  name?: string;
  options: { id: string; name: string }[] | undefined;
  onChangeFn: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder: string;
  size: Sizes;
  value?: string;
  label?: string;
  container?: {
    width?: string | Array<string | null>;
    margin?: string | Array<string | null>;
  };
}

export function CustomSelect({
  borderRadius,
  borderColor,
  fontSize,
  id,
  name,
  margin,
  maxW,
  minW,
  placeholder,
  size,
  options,
  onChangeFn,
  value,
  label,
  container,
}: CustomSelectProps): JSX.Element {
  return (
    <Box w={container?.width} m={container?.margin}>
      {label && <FormLabel htmlFor={id}>{label}</FormLabel>}
      <Select
        borderRadius={borderRadius ?? 'md'}
        borderColor={borderColor ?? 'brand.grey.100'}
        name={name ?? placeholder}
        placeholder={placeholder}
        size={size}
        fontSize={fontSize ?? 'inherit'}
        maxW={maxW ?? 'inherit'}
        minW={minW ?? 'inherit'}
        m={margin ?? '0'}
        onChange={onChangeFn}
        value={value}
        id={id}
      >
        {options?.map((option) => (
          <option key={option.id}>{option.name}</option>
        ))}
      </Select>
    </Box>
  );
}
