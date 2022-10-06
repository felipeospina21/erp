import { Button } from '@chakra-ui/react';
import React from 'react';

interface InvoiceDiscounts {
  children: JSX.Element[];
  addDiscount: () => void;
}
export function InvoiceDiscounts({ children, addDiscount }: InvoiceDiscounts): JSX.Element {
  return (
    <>
      <p>Descuentos</p>
      {children}
      <Button mt="1rem" onClick={addDiscount}>
        agregar
      </Button>
    </>
  );
}
