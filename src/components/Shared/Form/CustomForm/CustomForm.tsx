import { CustomFormField, ControlledInput } from '@/components/Shared';
import { Client, Product, UpdateClient, UpdateClientValues } from '@/redux/services';
import { UserBody } from '@/redux/services/userApi';
import { Sizes } from '@/styles/types';
import { Button, Container, Input, Radio, RadioGroup, Select, Stack } from '@chakra-ui/react';
import { nanoid } from '@reduxjs/toolkit';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

export interface ClientFormValues extends Omit<Client, 'discount'> {
  discount: string;
}

export type FormValues =
  | ClientFormValues
  | Omit<Product, 'image'>
  | UpdateClient
  | FormData
  | UpdateClientValues
  | UserBody;

export interface InputField {
  name: string;
  type: string;
  placeholder: string;
  label: string;
  required: boolean;
  options?: Array<undefined | { _id: string; name: string }>;
}

export interface CustomFormProps {
  fields: Array<InputField>;
  isLoading: boolean;
  controlled?: boolean;
  data?: Client | Product;
  inputSize?: Sizes;
  button: {
    text: string;
    width?: string | string[];
    margin?: string | string[];
  };
  onSubmit: (data: any) => void | SubmitHandler<any>;
}
export function CustomForm({
  isLoading,
  data,
  fields,
  onSubmit,
  button: { width, text, margin = '1.5rem auto 0 auto' },
  inputSize = 'lg',
  controlled = false,
}: CustomFormProps): JSX.Element {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>();

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field) => {
          const inputValue = data?.[field.name as keyof FormValues]
            ? String(data?.[field.name as keyof FormValues])
            : undefined;

          const FormInput = controlled ? (
            <Controller
              name={field.name as keyof FormValues}
              control={control}
              render={({ field: inputField }): JSX.Element => (
                <ControlledInput
                  controller={inputField}
                  register={register}
                  name={field.name}
                  required={field.required}
                  type={field.type}
                  value={field.type !== 'file' ? inputValue : ''}
                  size={inputSize}
                />
              )}
            />
          ) : (
            <Controller
              name={field.name as keyof FormValues}
              control={control}
              render={({ field: inputField }): JSX.Element => (
                <Input
                  {...inputField}
                  {...register(field.name as keyof FormValues, { required: field.required })}
                  type={field.type}
                  variant={field.type === 'file' ? 'flushed' : 'outline'}
                  size={inputSize}
                  bgColor="brand.bgLight"
                />
              )}
            />
          );

          const SelectInput = (
            <Controller
              name={field.name as keyof FormValues}
              control={control}
              render={({ field: selectField }): JSX.Element => (
                <Select {...selectField} placeholder="Select option">
                  {field.options?.map((option) => (
                    <option key={option?._id} value={option?._id}>
                      {option?.name}
                    </option>
                  ))}
                </Select>
              )}
            />
          );

          const RadioInput = (
            <Controller
              name={field.name as keyof FormValues}
              control={control}
              render={({ field: radioField }): JSX.Element => (
                <RadioGroup {...radioField}>
                  <Stack direction="row">
                    <Radio value="si">Si</Radio>
                    <Radio value="no">No</Radio>
                  </Stack>
                </RadioGroup>
              )}
            />
          );
          return (
            <CustomFormField
              key={nanoid()}
              id={field.name}
              label={field.label}
              isError={!!errors?.[field.name as keyof FormValues]}
              isRequired={field.required}
              errorMessage="This field is required"
              variant={'floating'}
            >
              {field.type === 'select' ? SelectInput : <></>}
              {field.type === 'radio' ? RadioInput : <></>}
              {field.type !== 'select' && field.type !== 'radio' ? FormInput : <></>}
            </CustomFormField>
          );
        })}
        <Button m={margin} variant={'primary'} isLoading={isLoading} type="submit" w={width}>
          {text}
        </Button>
      </form>
    </Container>
  );
}

export default CustomForm;
