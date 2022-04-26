import React from 'react';
import { Tr, Td, Button } from '@chakra-ui/react';
import ModalContainer from '../ModalContainer';
import { NewClientResponse, useDeleteClientMutation } from '../../redux/services';

export interface ClientsRowProps {
  client: NewClientResponse;
}
const ClientsRow = ({ client }: ClientsRowProps): JSX.Element => {
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
        <ModalContainer title='Actualizar Cliente'>
          <p>text test</p>
        </ModalContainer>
      </Td>
    </Tr>
  );
};

export default ClientsRow;
