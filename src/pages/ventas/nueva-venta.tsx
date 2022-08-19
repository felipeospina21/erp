import { SalesHeader, TableContainer, tableHeader, ActionButtons } from '@/components/Sales';
import { Layout } from '@/components/Shared';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { resetSale } from '@/redux/slices/salesSlice';
import React, { ReactElement, useEffect, useState } from 'react';

export interface RowData {
  id: string;
  item: string;
  subtotal: number;
  stock: number;
  quantity: number;
  discount: number;
  price: number;
  productId: string;
}

export default function NewSale(): ReactElement {
  const [isSalesBtnDisabled, setSalesBtnDisabled] = useState(true);
  const { deliveriesList } = useAppSelector((state) => state.sales);
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetSale());
    };
  }, []);

  return (
    <>
      <SalesHeader pageMaxW={'var(--maxPageWitdth)'} />
      {deliveriesList.map((element, id) => (
        <TableContainer
          key={id}
          pageMaxW={'var(--maxPageWitdth)'}
          header={tableHeader}
          deliveryId={id}
          deliveryData={element}
          salesBtnDisabled={isSalesBtnDisabled}
          setSalesBtnDisabled={setSalesBtnDisabled}
        />
      ))}

      <ActionButtons pageMaxW={'var(--maxPageWitdth)'} />
    </>
  );
}

NewSale.getLayout = function getLayout(page: ReactElement): JSX.Element {
  return <Layout>{page}</Layout>;
};
