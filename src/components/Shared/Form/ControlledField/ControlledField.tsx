import { Input } from '@chakra-ui/react';
import React from 'react';
import { CustomFormField } from '../CustomFormField';
import { useController, UseControllerProps } from 'react-hook-form';
import { ModifiedProduct } from '@/components/Products/ProductForm/ProductForm';

type FormValues = Omit<ModifiedProduct, 'stock' | 'price' | 'image'>;

export function ControlledField(props: UseControllerProps<FormValues>): JSX.Element {
  const { field, fieldState } = useController(props);
  return (
    <CustomFormField
      id="name"
      label="Nombre"
      // isError={!!errors?.name}
      // isRequired={true}
      errorMessage="This field is required"
      variant={'floating'}
    >
      <Input {...field} placeholder={props.name} />
      <p>{fieldState.error ? 'invalid' : 'valid'}</p>
    </CustomFormField>
  );
}
