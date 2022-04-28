import React from 'react';
import { Input } from '@chakra-ui/react';
import { UseFormRegister } from 'react-hook-form';
import { ClientFormActions, FormValues } from '../ClientForm';
import { ControlledInput } from '@/components/Shared/ControlledInput/ControlledInput';

export interface CustomInputProps extends ClientFormActions {
  register: UseFormRegister<FormValues>;
  required: boolean;
  name: string;
  type: string;
  value?: string;
}

export function ClientInput({
  register,
  required,
  name,
  type,
  action,
  value,
}: CustomInputProps): JSX.Element {
  return action === 'create' ? (
    <Input {...register(name as keyof FormValues, { required: required })} type={type} />
  ) : (
    <ControlledInput
      register={register}
      name={name}
      required={required}
      type={type}
      value={value}
    />
  );
}
