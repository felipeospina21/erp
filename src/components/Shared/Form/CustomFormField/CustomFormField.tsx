import React from 'react';
import { FormControl, FormLabel, FormHelperText, FormErrorMessage } from '@chakra-ui/react';

export interface CustomFormFieldProps {
  children: JSX.Element | JSX.Element[];
  isError?: boolean;
  isRequired?: boolean;
  errorMessage?: string;
  helperText?: string;
  id: string;
  label: string;
  variant?: 'floating';
}

export function CustomFormField({
  children,
  isError,
  isRequired,
  errorMessage,
  helperText,
  id,
  label,
  variant,
}: CustomFormFieldProps): JSX.Element {
  return (
    <FormControl
      variant={variant}
      isInvalid={isError}
      isRequired={isRequired}
      id={id}
      mt="1.5rem"
      bgColor="inherit"
    >
      {children}
      {isError && <FormErrorMessage role="alert">{errorMessage}</FormErrorMessage>}
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      <FormLabel htmlFor={id}>{label}</FormLabel>
    </FormControl>
  );
}
