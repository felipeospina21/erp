import React, { useState } from 'react';
import { Tr, Td, Button } from '@chakra-ui/react';
import { CustomModal } from '@/components/Shared';
import { NewClientResponse, useDeleteClientMutation } from '@/redux/services';
import ClientForm from '../../ClientForm';

export interface ClientRowProps {
  client: NewClientResponse;
}
export function ClientRow({ client }: ClientRowProps): JSX.Element {
  const [displayModal, setDisplayModal] = useState(false);
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
        <CustomModal
          title='Actualizar Cliente'
          isDisplayed={displayModal}
          setDisplayModal={setDisplayModal}>
          <ClientForm action='update' setDisplayModal={setDisplayModal} clientId={client._id}/>
        </CustomModal>
      </Td>
    </Tr>
  );
}

export default ClientRow;
