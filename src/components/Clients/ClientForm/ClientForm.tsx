import { FormContainer } from '@/components/Shared';
import {
  Client,
  NewClientResponse, useCreateClientMutation, useGetClientsQuery,
  useUpdateClientMutation
} from '@/redux/services';
import { Button, Container } from '@chakra-ui/react';
import { nanoid } from '@reduxjs/toolkit';
import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { clientFields, ClientInput } from './';
export interface FormValues extends Omit<Client, 'discount'> {
  discount: string;
}

export interface ClientFormActions {
  action: 'update' | 'create';
}
export interface ClientsFormProps extends ClientFormActions {
  setDisplayModal: Dispatch<SetStateAction<boolean>>;
  clientId?: string;
}
export function ClientsForm({ clientId, action, setDisplayModal }: ClientsFormProps): JSX.Element {
  const [createClient, { isLoading }] = useCreateClientMutation();
  const [updateClient, { isLoading: isUpdating }] = useUpdateClientMutation();
  const { data: client } = useGetClientsQuery();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  function onSubmit(data: FormValues): void {
    const transformedData = { ...data, discount: Number(data.discount) };
    if (action === 'create') {
      createClient(transformedData);
    } else if (action === 'update') {
      const payload = { _id: clientId ?? '', update: { ...transformedData } };
      updateClient(payload);
    }

    setDisplayModal(false);
  }

  function getFieldValue(field: string): string {
    const filteredClient = client?.filter((client) => client._id === clientId)[0];
    const fieldValue = filteredClient?.[field as keyof NewClientResponse]?.toString();
    return fieldValue ?? '';
  }

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        {clientFields.map((field) => (
          <FormContainer
            key={nanoid()}
            id={field.name}
            label={field.label}
            isError={!!errors?.[field.name as keyof FormValues]}
            errorMessage='This field is required'>
            <ClientInput
              register={register}
              name={field.name}
              type={field.type}
              required={field.required}
              action={action}
              value={getFieldValue(field.name)}
            />
          </FormContainer>
        ))}
        <Button mt={4} colorScheme='teal' isLoading={isLoading || isUpdating} type='submit'>
          {action === 'create' ? 'Crear' : 'Actualizar'}
        </Button>
      </form>
    </Container>
  );
}

export default ClientsForm;
