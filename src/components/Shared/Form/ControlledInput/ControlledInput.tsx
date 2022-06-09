import React, { useState, useRef, useLayoutEffect, ChangeEvent } from 'react';
import { Input } from '@chakra-ui/react';
import { UseFormRegister } from 'react-hook-form';
import { FormValues } from '@/components/Shared/Form';
import { Sizes } from '@/styles/types';

export interface ControlledInputProps {
  register: UseFormRegister<any>;
  required: boolean;
  name: string;
  type: string;
  value?: string;
  placeholder?: string;
  size?: Sizes;
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
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(passedValue ?? '');
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => setValue(event.target.value);

  useLayoutEffect(() => {
    const { current } = inputRef;
    const addStyle = (): void => current?.classList.add('valid');
    const removeStyle = (): void => current?.classList.remove('valid');

    current?.addEventListener('focus', addStyle);
    if (current?.value) {
      addStyle();
    }

    return () => {
      current?.removeEventListener('focus', removeStyle);
    };
  }, []);

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
        // className={value || type === 'file' ? 'valid' : undefined}
        bgColor="brand.bgLight"
        ref={inputRef}
      />
    </>
  );
}
