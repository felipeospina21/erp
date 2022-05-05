import React from 'react';
import { FormControl, FormLabel, FormHelperText, FormErrorMessage } from '@chakra-ui/react';

export interface CustomFormFieldProps {
  children: JSX.Element | JSX.Element[];
  isError?: boolean;
  errorMessage?: string;
  helperText?: string;
  id: string;
  label: string;
}

export function CustomFormField({
  children,
  isError,
  errorMessage,
  helperText,
  id,
  label,
}: CustomFormFieldProps): JSX.Element {
  return (
    <FormControl isInvalid={isError} id={id} mt="1rem">
      <FormLabel htmlFor={id}>{label}</FormLabel>
      {children}
      {isError && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}
