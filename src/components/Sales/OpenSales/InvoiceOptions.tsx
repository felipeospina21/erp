import React, { useState } from 'react';
import type { ChangeEvent } from 'react';
import { Observations } from '../Observations';
import useDebounce from '@/hooks/useDebounce';
import { useValidateTextLen } from './hooks/useValidateTextLen';
import { InvoiceDiscounts } from './InvoiceDiscounts';
import { DiscountType } from './DiscountType';

export type Discount = { name: string; value: number };

export default function InvoiceOptions(): JSX.Element {
  const [textValue, setTextValue] = useDebounce('', 1000);
  const isValid = useValidateTextLen(textValue);
  const newDiscount = { name: '', value: 0 };
  const [discounts, setDiscounts] = useState<Discount[]>([newDiscount]);

  function handleTextAreaChange(e: ChangeEvent<HTMLTextAreaElement>): void {
    const { value } = e.target;
    setTextValue(value);
  }

  function addDiscount(): void {
    const discountsCopy = [...discounts];
    discountsCopy.push(newDiscount);
    setDiscounts(discountsCopy);
  }

  function handleDiscounts(discount: Discount): void {
    const newDiscounts = discounts.map((elem) => {
      if (elem.name === discount.name) {
        return { ...elem, ...discount };
      } else {
        return elem;
      }
    });
    setDiscounts(newDiscounts);
  }

  return (
    <>
      <Observations isValid={isValid} handleTextChange={handleTextAreaChange} />
      <InvoiceDiscounts addDiscount={addDiscount}>
        {discounts.map((discount, idx) => (
          <DiscountType key={idx} id={idx} setDiscounts={handleDiscounts} />
        ))}
      </InvoiceDiscounts>
    </>
  );
}
