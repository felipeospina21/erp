import { SalesHeader, TableContainer, tableHeader, ActionButtons } from '@/components/Sales';
import { Layout } from '@/components/Shared';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { resetSale } from '@/redux/slices/salesSlice';
import { checkAuth, IsAuth } from '@/utils/auth';
import dynamic from 'next/dynamic';
import React, { ReactElement, useEffect, useState } from 'react';
import { useAuth } from '../utils';
const LoginPage = dynamic(() => import('@/pages/login'));

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

export default function VentasPage({ isAuth }: IsAuth): ReactElement {
  const [isSalesBtnDisabled, setSalesBtnDisabled] = useState(true);
  const { deliveriesList } = useAppSelector((state) => state.sales);
  const dispatch = useAppDispatch();
  useAuth(isAuth, '/ventas');

  useEffect(() => {
    return () => {
      dispatch(resetSale());
    };
  }, []);

  if (!isAuth) {
    return <LoginPage />;
  }

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

      <ActionButtons />
    </>
  );
}

VentasPage.getLayout = function getLayout(page: ReactElement): JSX.Element {
  return <Layout>{page}</Layout>;
};

VentasPage.getInitialProps = checkAuth;
