import { Textarea } from '@chakra-ui/react';
import React from 'react';
import { CustomFormField } from '../Shared';

export interface ObservationsProps {
  handleTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isValid?: boolean;
}

export function Observations({ isValid, handleTextChange }: ObservationsProps): JSX.Element {
  return (
    <CustomFormField
      id="observations"
      label="Observaciones"
      isError={!isValid}
      errorMessage={`La longitud maxima de caracteres permitida es 50`}
      margin="0 auto 1rem auto"
    >
      <Textarea
        isInvalid={!isValid}
        focusBorderColor="none"
        borderRadius="2xl"
        borderColor="brand.grey.100"
        onChange={handleTextChange}
      />
    </CustomFormField>
  );
}
