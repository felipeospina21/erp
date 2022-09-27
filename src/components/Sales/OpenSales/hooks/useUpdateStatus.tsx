import { useGetSalesQuery, useUpdateSaleStatusMutation } from '@/redux/services';
import { useState, useEffect, useCallback } from 'react';
import type { SetStateAction, Dispatch } from 'react';

export type UseUpdateStatus = [
  currStatus: string | undefined,
  setCurrStatus: Dispatch<SetStateAction<string | undefined>>
];

export function useUpdateStatus(
  status: string | undefined,
  saleId: string | undefined
): UseUpdateStatus {
  const [currStatus, setCurrStatus] = useState(status);
  const [updateSaleStatus] = useUpdateSaleStatusMutation();

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
    if (currStatus && saleId && cachedSale?.status !== currStatus) {
      updateStatus({ id: saleId, status: currStatus });
    }
  }, [currStatus, status, cachedSale?.status, saleId, updateStatus]);

  return [currStatus, setCurrStatus];
}
