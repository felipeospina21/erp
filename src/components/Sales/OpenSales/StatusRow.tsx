import { SaleResponse } from '@/redux/services';
import { Box, HStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { StatusPointer } from './StatusPointer';
import { StatusCell } from './StatusCell';
import { statusOptions } from './statusOptions';
import { style } from './style';
import { useUpdateStatus } from './hooks';
import InvoiceModal from './InvoiceModal';
import InvoiceOptions from './InvoiceOptions';

interface StatusRowProps {
  sale: Exclude<SaleResponse, 'orderedProducts' | 'clientInfo' | 'createdAt' | 'updatedAt'>;
}

export function StatusRow({ sale }: StatusRowProps): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currStatus, setCurrStatus] = useUpdateStatus(
    sale._id,
    sale.status,
    sale.invoiceRef,
    setIsModalOpen
  );

  return (
    <>
      <InvoiceModal title="Factura" isDisplayed={isModalOpen} setDisplayModal={setIsModalOpen}>
        <InvoiceOptions />
      </InvoiceModal>

      <HStack mt="1rem" spacing={0}>
        <Box sx={{ ...style, cursor: 'inherit' }}>{sale.saleRequestRef}</Box>
        <Box sx={{ ...style, cursor: 'inherit', minWidth: '200px' }}>{sale.clientId?.name}</Box>
        {statusOptions.map((status, idx) => {
          return currStatus === status ? (
            <StatusPointer key={idx} status={status} setMarker={setCurrStatus} />
          ) : (
            <StatusCell
              key={idx}
              status={status}
              statusIdx={idx}
              currStatusIdx={statusOptions.indexOf(currStatus ?? '')}
            />
          );
        })}
      </HStack>
    </>
  );
}
