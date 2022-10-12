import React from 'react';

interface InvoiceDiscounts {
  children: JSX.Element[];
}
export function InvoiceDiscounts({ children }: InvoiceDiscounts): JSX.Element {
  return (
    <>
      <p>Descuentos</p>
      {children}
    </>
  );
}
