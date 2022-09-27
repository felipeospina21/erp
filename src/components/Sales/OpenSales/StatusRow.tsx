import { SaleResponse } from '@/redux/services';
import { Box, HStack } from '@chakra-ui/react';
import React from 'react';
import { StatusPointer } from './StatusPointer';
import { StatusCell } from './StatusCell';
import { statusOptions } from './statusOptions';
import { style } from './style';
import { useUpdateStatus } from './hooks';

interface StatusRowProps {
  sale: Partial<SaleResponse>;
}

export function StatusRow({ sale }: StatusRowProps): JSX.Element {
  const [currStatus, setCurrStatus] = useUpdateStatus(sale.status, sale._id);

  return (
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
  );
}
