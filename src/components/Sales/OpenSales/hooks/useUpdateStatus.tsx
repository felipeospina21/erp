import { useGetSalesQuery, useUpdateSaleStatusMutation } from '@/redux/services';
import { useState, useEffect, useCallback, useRef } from 'react';
import type { SetStateAction, Dispatch } from 'react';

export type UseUpdateStatus = [
  currStatus: string | undefined,
  setCurrStatus: Dispatch<SetStateAction<string | undefined>>
];

export function useUpdateStatus(
  saleId: string | undefined,
  status: string | undefined,
  invoiceRef: string | undefined,
  openModal: () => void
): UseUpdateStatus {
  const [currStatus, setCurrStatus] = useState(status);
  const [updateSaleStatus] = useUpdateSaleStatusMutation();
  // const {data} = useGetSaleRefCountQuery()
  const isMounted = useRef(false);

  const { cachedSale } = useGetSalesQuery(undefined, {
    selectFromResult: ({ data }) => ({
      cachedSale: data?.find((sale) => sale._id === saleId),
    }),
  });

  const updateStatus = useCallback((args) => {
    updateSaleStatus(args);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (currStatus && currStatus !== 'entregado' && saleId && cachedSale?.status !== currStatus) {
      updateStatus({ id: saleId, status: currStatus });
    }

    if (isMounted.current && currStatus === 'entregado' && !invoiceRef) {
      openModal();
      // updateSaleStatus({id:saleId ?? '', invoiceRef: data?.count.toString() , status: 'facturado'})
    } else {
      isMounted.current = true;
    }
  }, [currStatus]);

  return [currStatus, setCurrStatus];
}
