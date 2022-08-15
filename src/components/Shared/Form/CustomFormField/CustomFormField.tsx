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
  isDisabled?: boolean;
  margin?: string;
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
  isDisabled,
  margin = '1.5rem auto auto auto',
}: CustomFormFieldProps): JSX.Element {
  return (
    <FormControl
      variant={variant}
      isInvalid={isError}
      isRequired={isRequired}
      id={id}
      m={margin}
      bgColor="inherit"
      isDisabled={isDisabled}
    >
      <FormLabel htmlFor={id}>{label}</FormLabel>
      {children}
      {isError && <FormErrorMessage role="alert">{errorMessage}</FormErrorMessage>}
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}
