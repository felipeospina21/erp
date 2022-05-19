import { CustomFormField, ControlledInput } from '@/components/Shared';
import { Client, Product, UpdateClient, UpdateClientValues } from '@/redux/services';
import { UserBody } from '@/redux/services/userApi';
import { Button, Container } from '@chakra-ui/react';
import { nanoid } from '@reduxjs/toolkit';
import { useForm, SubmitHandler } from 'react-hook-form';

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

export interface Fields {
  name: string;
  type: string;
  placeholder: string;
  label: string;
  required: boolean;
}

export interface ClientsFormProps {
  buttonText: string;
  controlled?: boolean;
  data?: Client | Product;
  isLoading: boolean;
  fields: Fields[];
  inputSize?: string;
  onSubmit: (data: any) => void | SubmitHandler<any>;
}
export function CustomForm({
  buttonText,
  isLoading,
  data,
  fields,
  onSubmit,
  inputSize = 'lg',
}: // controlled = false,
ClientsFormProps): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  return (
    <Container bgColor="inherit">
      <form onSubmit={handleSubmit(onSubmit)} style={{ backgroundColor: 'inherit' }}>
        {fields.map((field) => (
          <CustomFormField
            key={nanoid()}
            id={field.name}
            label={field.label}
            isError={!!errors?.[field.name as keyof FormValues]}
            isRequired={field.required}
            errorMessage="This field is required"
            variant={'floating'}
          >
            <ControlledInput
              register={register}
              name={field.name}
              required={field.required}
              type={field.type}
              value={
                data?.[field.name as keyof FormValues]
                  ? String(data?.[field.name as keyof FormValues])
                  : undefined
              }
              size={inputSize}
            />
            {/* {controlled ? (
              <ControlledInput
                register={register}
                name={field.name}
                required={field.required}
                type={field.type}
                value={field.type !== 'file' ? String(data?.[field.name as keyof FormValues]) : ''}
                size={inputSize}
              />
            ) : (
              <Input
                {...register(field.name as keyof FormValues, { required: field.required })}
                type={field.type}
                variant={field.type === 'file' ? 'flushed' : 'outline'}
                size={inputSize}
              />
            )} */}
          </CustomFormField>
        ))}
        <Button mt={4} colorScheme="teal" isLoading={isLoading} type="submit">
          {buttonText}
        </Button>
      </form>
    </Container>
  );
}

export default CustomForm;
