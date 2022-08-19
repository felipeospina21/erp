import { ConfirmationAlert, DeleteButton } from '@/components/Shared';
import { DeleteSale, SaleResponse, useCancelSaleMutation } from '@/redux/services';
import { formatDate } from '@/utils/formatDate';
import { useConfirmDelete } from '@/utils/hooks/useConfirmDelete';
import { numberToCurrency } from '@/utils/numberToCurrency';
import { Td, Tr } from '@chakra-ui/react';
import React, { useState } from 'react';

export interface SaleRowProps {
  saleData: SaleResponse;
}

export function SaleRow({
  saleData: { createdAt, saleRequestRef, status, total, clientId, _id, invoiceRef },
}: SaleRowProps): JSX.Element {
  const [cancelSale, { isLoading: isDeleteLoading }] = useCancelSaleMutation();
  const [displayAlert, setDisplayAlert] = useState(false);
  const setConfirmDelete = useConfirmDelete(handleDelete);
  const isDisabled = status !== 'alistamiento' && status !== 'producción';

  async function handleDelete(): Promise<{ data: DeleteSale } | { error: unknown }> {
    return await cancelSale(_id);
  }

  return (
    <Tr style={status === 'anulado' ? { opacity: '0.6', textDecoration: 'gray line-through' } : {}}>
      <Td fontSize="13px" textAlign="center">
        {saleRequestRef}
      </Td>
      <Td fontSize="13px" textAlign="center">
        {invoiceRef ?? ''}
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
          header="Desea Anular?"
          body={`Seguro desea anular el documento ${saleRequestRef}?`}
          button={
            <DeleteButton
              ariaLabel="eliminar documento"
              isLoading={isDeleteLoading}
              isDisabled={isDisabled}
              color={isDisabled ? 'gray' : 'custom.red.500'}
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
