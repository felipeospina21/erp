import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import type { Client } from '@/redux/services';
import { useCreateClientMutation } from '@/redux/services';
import { newClientData, resetNewClientData } from '@/redux/slices/clientsSlice/clientsSlice';
import { Button, Container } from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import React, { Dispatch, SetStateAction } from 'react';
import ClientsFormField from './ClientsFormField';

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
function ClientsForm({ fieldsData, setDisplayModal }: ClientsFormProps): JSX.Element {
  const [createClient, { isLoading }] = useCreateClientMutation();
  const clients = useAppSelector((state) => state.clients);
  const dispatch = useAppDispatch();

  const initialValues: Client = {
    name: '',
    idType: '',
    idNumber: '',
    addres1: '',
    addres2: '',
    city: '',
    department: '',
    discount: 0,
    email: '',
  };

  function onSubmit(): void {
    createClient(clients.newClient);
    dispatch(resetNewClientData());
    setDisplayModal(false);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { name, type } = event.target;
    const value = type === 'number' ? Number(event.target.value) : event.target.value;
    dispatch(newClientData({ field: name, value }));
  }
  return (
    <Container>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {(): JSX.Element => (
          <Form>
            {fieldsData.map((formField) => {
              return (
                <Field
                  key={formField.name}
                  value={
                    clients?.newClient[formField.name as keyof Client]
                      ? clients.newClient[formField.name as keyof Client]
                      : ''
                  }
                  required={formField.required}
                  name={formField.name}
                  type={formField.type}
                  label={formField.label}
                  placeholder={formField.placeholder}
                  onChange={handleChange}
                  // validate={validateName}
                  component={ClientsFormField}
                />
              );
            })}
            <Button mt={4} colorScheme='teal' isLoading={isLoading} type='submit'>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export default ClientsForm;
