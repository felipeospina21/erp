import { useEffect, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import type { Discount } from '../InvoiceOptions';

type UseDiscounts = [discount: Discount, setDiscount: Dispatch<SetStateAction<Discount>>];

export function useSetDiscounts(
  id: number,
  discounts: Discount[],
  setDiscounts: React.Dispatch<React.SetStateAction<Discount[]>>
): UseDiscounts {
  const [discount, setDiscount] = useState<Discount>({ id, concept: undefined, value: undefined });

  useEffect(() => {
    const newDiscounts = discounts.map((elem) => {
      if (elem.id === discount?.id) {
        return discount;
      } else {
        return elem;
      }
    });
    setDiscounts(newDiscounts);
  }, [discount]);

  return [discount, setDiscount];
}
