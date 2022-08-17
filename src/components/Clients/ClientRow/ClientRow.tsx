import React, { useState } from 'react';
import { Tr, Td } from '@chakra-ui/react';
import { CustomModal } from '@/components/Shared';
import { Client, useDeleteClientMutation, useUpdateClientMutation } from '@/redux/services';
import { DeleteButton, EditButton } from '@/components/Shared/IconButtons';
import { ConfirmationAlert } from '@/components/Shared/Overlay/ConfirmationAlert/ConfirmationAlert';
import { SubmitHandler } from 'react-hook-form';
import ClientForm, { ClientFormValues } from '../ClientForm/ClientForm';
import { useConfirmDelete } from '@/utils/hooks';

export interface ClientRowProps {
  client: Client;
}

export function ClientRow({ client }: ClientRowProps): JSX.Element {
  const [displayModal, setDisplayModal] = useState(false);
  const [displayAlert, setDisplayAlert] = useState(false);
  const [deleteClient, { isLoading: isDeleteLoading }] = useDeleteClientMutation();
  const [updateClient, { isLoading }] = useUpdateClientMutation();
  const setConfirmDelete = useConfirmDelete(handleDelete);

  function onSubmit(data: ClientFormValues): void | SubmitHandler<ClientFormValues> {
    const payload = { _id: client._id ?? '', ...data };
    updateClient(payload);
    setDisplayModal(false);
  }

  async function handleDelete(): Promise<{ data: Client } | { error: unknown }> {
    return await deleteClient({ _id: client?._id ?? '' });
  }

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
          <ClientForm
            update
            onSubmit={onSubmit}
            isLoading={isLoading}
            defaultValues={{ ...client }}
            buttonText="Actualizar"
            idTypes={[
              { _id: 'CC', name: 'CC' },
              { _id: 'NIT', name: 'NIT' },
              { _id: 'Pasaporte', name: 'Pasaporte' },
              { _id: 'Otro', name: 'Otro' },
            ]}
            paymentTerm={[
              { _id: 'contado', name: 'contado' },
              { _id: '15', name: '15' },
              { _id: '30', name: '30' },
              { _id: '60', name: '60' },
            ]}
          />
        </CustomModal>
      </Td>
    </Tr>
  );
}

export default ClientRow;
