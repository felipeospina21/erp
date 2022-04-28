import type { Client } from '@/redux/services';
import { useCreateClientMutation } from '@/redux/services';
import { Button, Container, Input } from '@chakra-ui/react';
import React, { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { FormContainer } from '../../Shared';
import { nanoid } from '@reduxjs/toolkit';

export interface FormValues extends Omit<Client, 'discount'> {
  discount: string;
}

export interface ClientsFormProps {
  fieldsData: {
    name: string;
    type: string;
    placeholder: string;
    label: string;
    required: boolean;
  }[];
  setDisplayModal: Dispatch<SetStateAction<boolean>>;
}
export function ClientsForm({ fieldsData, setDisplayModal }: ClientsFormProps): JSX.Element {
  const [createClient, { isLoading }] = useCreateClientMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  function onSubmit(data:FormValues): void {
    const payload = { ...data, discount: Number(data.discount) };
    createClient(payload);
    setDisplayModal(false);
  }

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fieldsData.map((field) => (
          <FormContainer
            key={nanoid()}
            id={field.name}
            label={field.label}
            isError={!!errors?.[field.name as keyof FormValues]}
            errorMessage='This field is required'>
            <Input {...register(field.name as keyof FormValues, { required: field.required })} type={field.type} />
          </FormContainer>
        ))}
        <Button mt={4} colorScheme='teal' isLoading={isLoading} type='submit'>
          Submit
        </Button>
      </form>
    </Container>
  );
}

export default ClientsForm;
