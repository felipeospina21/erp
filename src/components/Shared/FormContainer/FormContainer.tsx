import React from 'react';
import { FormControl, FormLabel, FormHelperText } from '@chakra-ui/react';

export interface FormContainerProps {
  children: JSX.Element;
  helperText?: string;
  id: string;
  label: string;
}

export function FormContainer({ children, helperText, id, label }: FormContainerProps): JSX.Element {
  return (
    <FormControl>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      {children}
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}
