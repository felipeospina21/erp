import React from 'react';
import { Input, ResponsiveValue } from '@chakra-ui/react';

export interface InputCellProps {
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  id: string;
  textAlign: ResponsiveValue<any> | undefined;
  variant?: 'outline' | 'filled' | 'flushed' | 'unstyled';
}
export function InputCell({
  id,
  textAlign,
  variant,
  handleInputChange,
}: InputCellProps): JSX.Element {
  return (
    <Input
      id={id}
      onChange={handleInputChange}
      textAlign={textAlign}
      borderColor="brand.grey.100"
      borderRadius="md"
      size="sm"
      variant={variant ?? 'unstyled'}
    />
  );
}
