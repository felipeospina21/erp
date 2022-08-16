import { ConfirmationAlert, DeleteButton } from '@/components/Shared';
import { SaleResponse, useDeleteSaleMutation } from '@/redux/services';
import { formatDate } from '@/utils/formatDate';
import { useConfirmDelete } from '@/utils/hooks/useConfirmDelete';
import { numberToCurrency } from '@/utils/numberToCurrency';
import { Td, Tr } from '@chakra-ui/react';
import React, { useState } from 'react';

export interface SaleRowProps {
  saleData: SaleResponse;
}

export function SaleRow({
  saleData: { createdAt, saleRequestRef, status, total, clientId, _id },
}: SaleRowProps): JSX.Element {
  const [deleteSale, { isLoading: isDeleteLoading }] = useDeleteSaleMutation();
  const [displayAlert, setDisplayAlert] = useState(false);
  const setConfirmDelete = useConfirmDelete(handleDelete);

  async function handleDelete(): Promise<{ data: SaleResponse } | { error: unknown }> {
    return await deleteSale(_id);
  }

  return (
    <Tr>
      <Td fontSize="13px" textAlign="center">
        {saleRequestRef}
      </Td>
      <Td fontSize="13px" textAlign="center">
        {clientId?.name}
      </Td>
      <Td fontSize="13px" textAlign="center">
        {numberToCurrency(total)}
      </Td>
      <Td fontSize="13px" textAlign="center">
        {formatDate(Date.parse(createdAt ?? ''), 'es', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })}
      </Td>
      <Td fontSize="13px" textAlign="center">
        {status}
      </Td>
      <Td>
        <ConfirmationAlert
          header="Desea Eliminar?"
          body={`Seguro desea eliminar de forma permanente el documento ${saleRequestRef}?`}
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
      </Td>
    </Tr>
  );
}
