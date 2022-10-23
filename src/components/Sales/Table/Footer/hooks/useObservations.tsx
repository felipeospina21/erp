import useDebounce from '@/hooks/useDebounce';
import { useAppDispatch } from '@/redux/hooks';
import { addInvoiceObservations } from '@/redux/slices/salesSlice';
import type { ChangeEvent } from 'react';
import { useEffect } from 'react';

type UseObservations = [text: string, setText: (e: ChangeEvent<HTMLTextAreaElement>) => void];

export function useObservations(deliveryId: number): UseObservations {
  const [textValue, setTextValue] = useDebounce('', 1000);
  const dispatch = useAppDispatch();

  function handleTextAreaChange(e: ChangeEvent<HTMLTextAreaElement>): void {
    const { value } = e.target;
    setTextValue(value);
  }

  useEffect(() => {
    dispatch(addInvoiceObservations({ deliveryId, observations: textValue }));
  }, [deliveryId, textValue, dispatch]);

  return [textValue, handleTextAreaChange];
}
