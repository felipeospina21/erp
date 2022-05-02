import React, { useState } from 'react';
import { Tr, Td, Button } from '@chakra-ui/react';
import { CustomModal } from '@/components/Shared';
import { Client, useDeleteClientMutation, useUpdateClientMutation } from '@/redux/services';
import { CustomForm } from '@/components/Shared/Form';
import { clientFields } from '../../ClientForm';

export interface ClientRowProps {
  client: Client;
}
export function ClientRow({ client }: ClientRowProps): JSX.Element {
  const [displayModal, setDisplayModal] = useState(false);
  const [deleteClient] = useDeleteClientMutation();
  const [updateClient, { isLoading }] = useUpdateClientMutation();

  function handleDelete(clientId: string): void {
    deleteClient({ _id: clientId });
  }

  function onSubmit(values: any): void {
    const payload = { _id: client._id ?? '', update: { ...values } };
    updateClient(payload);
    setDisplayModal(false);
  }

  return (
    <Tr>
      <Td>{client.name}</Td>
      <Td>{client.idType}</Td>
      <Td>{client.idNumber}</Td>
      <Td>{client.addres1}</Td>
      <Td>{client.addres2}</Td>
      <Td>{client.city}</Td>
      <Td>{client.department}</Td>
      <Td>{`${client.discount}%`}</Td>
      <Td>
        <Button
          onClick={(): void => {
            handleDelete(client._id ?? '');
          }}
        >
          eliminar
        </Button>
      </Td>
      <Td>
        <CustomModal
          title="Actualizar Cliente"
          isDisplayed={displayModal}
          setDisplayModal={setDisplayModal}
        >
          <CustomForm
            data={client}
            onSubmit={onSubmit}
            buttonText="modificar"
            fields={clientFields}
            isLoading={isLoading}
            controlled
          />
        </CustomModal>
      </Td>
    </Tr>
  );
}

export default ClientRow;
