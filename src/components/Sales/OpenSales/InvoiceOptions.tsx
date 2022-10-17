import React, { useState, Dispatch, SetStateAction } from 'react';
import type { ChangeEvent } from 'react';
import { Observations } from '../Observations';
import useDebounce from '@/hooks/useDebounce';
import { useValidateTextLen } from './hooks/useValidateTextLen';
import { InvoiceDiscounts } from './InvoiceDiscounts';
import { DiscountType } from './DiscountType';
import { AddButton, CustomButton } from '@/components/Shared';
import {
  useGetClientByIdQuery,
  useGetInvoiceCountQuery,
  useGetSalesQuery,
  useUpdateInvoiceCountMutation,
  useUpdateSaleStatusMutation,
} from '@/redux/services';
import { createInvoice } from '@/utils/pdf';

export type Discount = { id?: number; concept: string; value: number };

interface InvoiceOptionsProps {
  saleId: string;
  setDisplayModal: Dispatch<SetStateAction<boolean>>;
}

export default function InvoiceOptions({
  saleId,
  setDisplayModal,
}: InvoiceOptionsProps): JSX.Element {
  const [textValue, setTextValue] = useDebounce('', 1000);
  const isValid = useValidateTextLen(textValue);
  const newDiscount = { id: 0, concept: '', value: 0 };
  const [discounts, setDiscounts] = useState<Discount[]>([newDiscount]);
  const { data: invoice } = useGetInvoiceCountQuery();
  const { sale } = useGetSalesQuery(undefined, {
    selectFromResult: ({ data }) => ({ sale: data?.find((elem) => elem._id === saleId) }),
  });
  const { data: client } = useGetClientByIdQuery(sale?.clientId?._id ?? '');
  const [updateSale] = useUpdateSaleStatusMutation();
  const [updateInvoiceRef] = useUpdateInvoiceCountMutation();

  function handleTextAreaChange(e: ChangeEvent<HTMLTextAreaElement>): void {
    const { value } = e.target;
    setTextValue(value);
  }

  function addDiscount(): void {
    const discountsCopy = [...discounts];
    discountsCopy.push({ ...newDiscount, id: discounts.length });
    setDiscounts(discountsCopy);
  }

  function saveInvoice(): void {
    //TODO:
    // get invoice consecutive, should add 1?
    const newCount = invoice ? invoice.count + 1 : undefined;
    // api call to update sale with invoice ref, discounts, new status
    if (newCount) {
      updateSale({
        id: saleId,
        invoiceRef: newCount.toString(),
        status: 'facturado',
        discounts,
      });
    }
    // update invoice consecutive
    updateInvoiceRef();
    // get sale data from api cache. filter array with saleId
    // create pdf invoice, createInvoice({data: data from step above , docNumber: invoiceRef, observations: textValue})
    if (sale && client) createInvoice(sale, client, newCount, textValue, discounts);
    // close modal
    setDisplayModal(false);
    // in case of error show toast
  }

  return (
    <>
      <Observations isValid={isValid} handleTextChange={handleTextAreaChange} />
      <InvoiceDiscounts>
        <>
          {discounts.map((discount, idx) => (
            <DiscountType key={idx} id={idx} discounts={discounts} setDiscounts={setDiscounts} />
          ))}
        </>
        <AddButton
          ariaLabel="agregar descuento"
          variant="accept_outline"
          size="sm"
          onClick={addDiscount}
        />
        <CustomButton variant="primary" onClick={saveInvoice}>
          crear factura
        </CustomButton>
      </InvoiceDiscounts>
    </>
  );
}
