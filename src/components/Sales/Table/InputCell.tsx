import React from 'react';
import { Input, ResponsiveValue } from '@chakra-ui/react';

export interface InputCellProps {
  id: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  textAlign: ResponsiveValue<any> | undefined;
}
export function InputCell(props: InputCellProps): JSX.Element {
  return (
    <Input
      id={props.id}
      onChange={props.handleInputChange}
      textAlign={props.textAlign}
      size="sm"
      variant="unstyled"
    />
  );
}
