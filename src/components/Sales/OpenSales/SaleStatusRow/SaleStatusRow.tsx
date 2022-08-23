import { SaleResponse } from '@/redux/services';
import { HStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { SaleStatusMarker } from './SaleStatusMarker';
import { SaleStatusReceiver } from './SaleStatusReceiver';

interface SaleStatusRowProps {
  statuses: string[];
  venta: Partial<SaleResponse>;
}

export function SaleStatusRow({ statuses, venta }: SaleStatusRowProps): JSX.Element {
  const [currStatus, setCurrStatus] = useState(venta.status);
  return (
    <HStack mt="1rem" spacing={0}>
      {statuses.map((status, idx) => {
        return currStatus === status ? (
          <SaleStatusMarker key={idx} status={status} setMarker={setCurrStatus} />
        ) : (
          <SaleStatusReceiver
            key={idx}
            status={status}
            statusIdx={idx}
            currStatusIdx={statuses.indexOf(currStatus ?? '')}
          />
        );
      })}
    </HStack>
  );
}
