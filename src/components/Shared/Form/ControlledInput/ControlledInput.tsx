import React, { useState, ChangeEvent } from 'react';
import { Input } from '@chakra-ui/react';
import { UseFormRegister } from 'react-hook-form';
import { FormValues } from '@/components/Shared/Form';

export interface ControlledInputProps {
  register: UseFormRegister<any>;
  required: boolean;
  name: string;
  type: string;
  value?: string;
  placeholder?: string;
  size?: string;
}
export function ControlledInput({
  register,
  required,
  name,
  type,
  placeholder,
  size = 'lg',
  value: passedValue,
}: ControlledInputProps): JSX.Element {
  const [value, setValue] = useState(passedValue ?? undefined);
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => setValue(event.target.value);

  return (
    <>
      <Input
        {...register(name as keyof FormValues, { required: required })}
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder ?? ''}
        size={size}
        variant={type === 'file' ? 'flushed' : 'outline'}
        className={value || type === 'file' ? 'valid' : undefined}
      />
    </>
  );
}
