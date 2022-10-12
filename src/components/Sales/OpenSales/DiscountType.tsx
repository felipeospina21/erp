import React from 'react';
import { Flex, Input } from '@chakra-ui/react';
import { CustomFormField } from '@/components/Shared';
import type { ChangeEvent } from 'react';
import type { Discount } from './InvoiceOptions';
import { useSetDiscounts } from './hooks/useSetDiscounts';

interface DiscountType {
  id: number;
  discounts: Discount[];
  setDiscounts: React.Dispatch<React.SetStateAction<Discount[]>>;
}
export function DiscountType({ id, discounts, setDiscounts }: DiscountType): JSX.Element {
  const [discount, setDiscount] = useSetDiscounts(id, discounts, setDiscounts);

  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    const { value, name } = e.target;

    if (name === 'concepto') {
      setDiscount((prev) => ({ ...prev, concept: value }));
    } else if (name === 'valor') {
      const formatedValue = Number(value);
      setDiscount((prev) => ({ ...prev, value: formatedValue }));
    }
  }

  return (
    <Flex gap={10}>
      <CustomFormField id={`discountName${id}`} label="concepto" margin="1rem 0">
        <Input type="text" name="concepto" value={discount.concept} onChange={handleChange} />
      </CustomFormField>
      <CustomFormField id={`discountValue${id}`} label="valor (%)" margin="1rem 0">
        <Input type="number" name="valor" value={discount.value} onChange={handleChange} />
      </CustomFormField>
    </Flex>
  );
}
