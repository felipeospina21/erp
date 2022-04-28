import React from 'react';
import { FormControl, FormLabel, FormHelperText, FormErrorMessage } from '@chakra-ui/react';

export interface FormContainerProps {
  children: JSX.Element | JSX.Element[];
  isError?: boolean;
  errorMessage?: string;
  helperText?: string;
  id: string;
  label: string;
}

export function FormContainer({
  children,
  isError,
  errorMessage,
  helperText,
  id,
  label,
}: FormContainerProps): JSX.Element {
  return (
    <FormControl isInvalid={isError}>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      {children}
      {isError && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}
