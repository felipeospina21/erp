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
import { DeleteButton } from '@/components/Shared/IconButtons';
import { Edit } from '@/assets/icons';
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
      <Td fontSize="13px">{client.idType}</Td>
      <Td fontSize="13px">{client.idNumber}</Td>
      <Td fontSize="13px">{client.addres1}</Td>
      <Td fontSize="13px">{client.addres2}</Td>
      <Td fontSize="13px">{client.city}</Td>
      <Td fontSize="13px">{client.department}</Td>
      <Td fontSize="13px">{client.email}</Td>
      <Td fontSize="13px">{`${client.discount}%`}</Td>
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
          button={{
            text: 'actualizar',
            icon: <Edit />,
            variant: 'ghost',
            color: 'brand.green.500',
            size: 'md',
          }}
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
