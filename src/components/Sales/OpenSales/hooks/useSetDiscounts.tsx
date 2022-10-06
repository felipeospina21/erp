import { useEffect, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import type { Discount } from '../InvoiceOptions';

type UseDiscounts = [discount: Discount, setDiscount: Dispatch<SetStateAction<Discount>>];

export function useSetDiscounts(setDiscounts: (discount: Discount) => void): UseDiscounts {
  const [discount, setDiscount] = useState({ name: '', value: 0 });

  useEffect(() => {
    setDiscounts(discount);
  }, [discount]);

  return [discount, setDiscount];
}
