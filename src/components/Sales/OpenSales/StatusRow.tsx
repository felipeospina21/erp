import { SaleResponse } from '@/redux/services';
import { Box, HStack } from '@chakra-ui/react';
import React from 'react';
import { StatusPointer } from './StatusPointer';
import { StatusCell } from './StatusCell';
import { statusOptions } from './statusOptions';
import { style } from './style';
import { useUpdateStatus } from './hooks';
import useToggle from '@/hooks/useToggle';

interface StatusRowProps {
  sale: Partial<SaleResponse>;
}

export function StatusRow({ sale }: StatusRowProps): JSX.Element {
  const [modal, toggleModal] = useToggle();
  const [currStatus, setCurrStatus] = useUpdateStatus(
    sale._id,
    sale.status,
    sale.invoiceRef,
    toggleModal
  );

  if (modal) {
    console.log('modal');
  }
  // const [discounts, setDiscounts] = useState<{ concept: string; value: number }[] | undefined>(undefined)
  // const [creditNotes, setCreditNotes] = useState<{ concept: string; value: number }[] | undefined>(undefined)
  // const [updateSaleStatus] = useUpdateSaleStatusMutation();
  // const {data} = useGetSaleRefCountQuery()
  // const [updateInvoiceCount] = useUpdateInvoiceCountMutation()
  // const isMounted = useRef(false);

  // useEffect(() => {
  //   if(isMounted.current && currStatus === 'entregado' && !sale.invoiceRef){
  //     console.log(sale.invoiceRef)

  //     updateSaleStatus({id:sale._id ?? '', invoiceRef: data?.count.toString() , status: 'facturado', discounts, creditNotes})
  //   }else{
  //     isMounted.current = true
  //   }

  //   // if(currStatus === 'entregado' && !sale.invoiceRef){
  //   //   // updateInvoiceCount()
  //   // }
  // },[currStatus])

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
