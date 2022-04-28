import React from 'react';
import { Tr, Td, Button } from '@chakra-ui/react';
import { CustomModal } from '@/components/Shared';
import { NewClientResponse, useDeleteClientMutation } from '@/redux/services';

export interface ClientsRowProps {
  client: NewClientResponse;
}
export function ClientsRow({ client }: ClientsRowProps): JSX.Element {
  const [deleteClient] = useDeleteClientMutation();

  function handleDelete(clientId: string): void {
    deleteClient({ _id: clientId });
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
          }}>
          eliminar
        </Button>
      </Td>
      <Td>
        <CustomModal title='Actualizar Cliente'>
          <p>text test</p>
        </CustomModal>
      </Td>
    </Tr>
  );
}

export default ClientsRow;
