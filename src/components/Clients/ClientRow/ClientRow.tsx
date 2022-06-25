import React, { useState, useEffect } from 'react';
import { Tr, Td } from '@chakra-ui/react';
import { CustomModal } from '@/components/Shared';
import {
  Client,
  UpdateClientValues,
  useDeleteClientMutation,
  useUpdateClientMutation,
} from '@/redux/services';
import { CustomForm } from '@/components/Shared/Form';
import { clientFields } from '../ClientForm';
import { DeleteButton, EditButton } from '@/components/Shared/IconButtons';
import { ConfirmationAlert } from '@/components/Shared/Overlay/ConfirmationAlert/ConfirmationAlert';
import { SubmitHandler } from 'react-hook-form';

export interface ClientRowProps {
  client: Client;
}

export function ClientRow({ client }: ClientRowProps): JSX.Element {
  const [displayModal, setDisplayModal] = useState(false);
  const [displayAlert, setDisplayAlert] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteClient, { isLoading: isDeleteLoading }] = useDeleteClientMutation();
  const [updateClient, { isLoading }] = useUpdateClientMutation();

  function onSubmit(values: UpdateClientValues): void | SubmitHandler<UpdateClientValues> {
    const payload = { _id: client._id ?? '', update: { ...values } };
    updateClient(payload);
    setDisplayModal(false);
  }

  useEffect(() => {
    if (confirmDelete) {
      deleteClient({ _id: client?._id ?? '' });
      setConfirmDelete(false);
    }
  }, [confirmDelete, client?._id, deleteClient]);

  return (
    <Tr>
      <Td fontSize="13px">{client.name}</Td>
      <Td fontSize="13px" textAlign="center">
        {client.idType}
      </Td>
      <Td fontSize="13px" textAlign="center">
        {client.idNumber}
      </Td>
      <Td fontSize="13px" textAlign="center">
        {client.addres1}
      </Td>
      <Td fontSize="13px" textAlign="center">
        {client.addres2}
      </Td>
      <Td fontSize="13px" textAlign="center">
        {client.city}
      </Td>
      <Td fontSize="13px" textAlign="center">
        {client.department}
      </Td>
      <Td fontSize="13px" textAlign="center">
        {client.email}
      </Td>
      <Td fontSize="13px" textAlign="center">{`${client.discount}%`}</Td>
      <Td fontSize="13px" textAlign="center">
        {client.paymentTerm}
      </Td>
      <Td fontSize="13px" textAlign="center">
        {client.retailer ? 'si' : 'no'}
      </Td>

      <Td display="flex">
        <ConfirmationAlert
          header="Desea Eliminar?"
          body={`Seguro desea eliminar de forma permanente el cliente ${client.name}?`}
          button={
            <DeleteButton
              isLoading={isDeleteLoading}
              size="md"
              onClick={(): void => {
                setDisplayAlert(true);
              }}
            />
          }
          setConfirmation={setConfirmDelete}
          isOpen={displayAlert}
          toggleDisplay={setDisplayAlert}
        />

        <CustomModal
          title="Actualizar Cliente"
          isDisplayed={displayModal}
          setDisplayModal={setDisplayModal}
          iconButton={<EditButton size="md" onClick={(): void => setDisplayModal(true)} />}
        >
          <CustomForm
            data={client}
            onSubmit={onSubmit}
            button={{ text: 'modificar' }}
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
