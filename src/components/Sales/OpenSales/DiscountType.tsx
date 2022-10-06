import React from 'react';
import { Flex, Input } from '@chakra-ui/react';
import { CustomFormField } from '@/components/Shared';
import type { ChangeEvent } from 'react';
import type { Discount } from './InvoiceOptions';
import { useSetDiscounts } from './hooks/useSetDiscounts';

interface DiscountType {
  id: number;
  setDiscounts: (discount: Discount) => void;
}
export function DiscountType({ id, setDiscounts }: DiscountType): JSX.Element {
  const [discount, setDiscount] = useSetDiscounts(setDiscounts);

  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    const { value, name } = e.target;

    if (name === 'nombre') {
      setDiscount((prev) => ({ ...prev, name: value }));
    } else if (name === 'valor') {
      const formatedValue = Number(value);
      setDiscount((prev) => ({ ...prev, value: formatedValue }));
    }
  }

  return (
    <Flex gap={10}>
      <CustomFormField id={`discountName${id}`} label="nombre" margin="1rem 0">
        <Input type="text" name="nombre" value={discount.name} onChange={handleChange} />
      </CustomFormField>
      <CustomFormField id={`discountValue${id}`} label="valor" margin="1rem 0">
        <Input type="number" name="valor" value={discount.value} onChange={handleChange} />
      </CustomFormField>
    </Flex>
  );
}
