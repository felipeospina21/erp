import React, { ReactElement, useEffect, useState } from 'react';
import { checkAuth, createPdf, IsAuth } from '../utils';
import { salesData } from '@/mockData/salesData';
import { ConditionalSelect } from '@/components/Shared/Form/ConditionalSelect/ConditionalSelect';
import { useGetCitiesQuery } from '@/redux/services';
import { ControlledField } from '@/components/Shared/Form/ControlledField/ControlledField';
import { useForm } from 'react-hook-form';
import { ModifiedProduct } from '@/components/Products/ProductForm/ProductForm';
import { Layout } from '@/components/Shared';
import Router from 'next/router';
import dynamic from 'next/dynamic';
const LoginPage = dynamic(() => import('@/pages/login'));

type FormValues = Omit<ModifiedProduct, 'stock' | 'price' | 'image'>;

export default function CostosPage({ isAuth }: IsAuth): JSX.Element {
  const [inputVals, setInputVals] = useState({ deps: '', cities: '' });
  const { data: cities } = useGetCitiesQuery(inputVals.deps);
  function handleChange(event: React.ChangeEvent<HTMLSelectElement>): void {
    const { value, name } = event.target;
    setInputVals({ ...inputVals, [name]: value });
  }

  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      name: '',
      category: '',
    },
    mode: 'onChange',
  });

  const onSubmit = (data: FormValues) => console.log(data);

  useEffect(() => {
    if (isAuth) return; // do nothing if the user is logged in
    Router.replace('/productos', '/login', { shallow: true });
  }, [isAuth]);

  if (!isAuth) {
    return <LoginPage />;
  }

  return (
    <div>
      <button onClick={() => createPdf(salesData, 100)}>pdf</button>
      <ConditionalSelect handleChange={handleChange} cityOptions={cities} />

      <form onSubmit={handleSubmit(onSubmit)}>
        <ControlledField control={control} name="name" rules={{ required: true }} />
        <ControlledField control={control} name="category" rules={{ required: true }} />
        <input type="submit" />
      </form>
    </div>
  );
}

CostosPage.getLayout = function getLayout(page: ReactElement): JSX.Element {
  return <Layout>{page}</Layout>;
};

CostosPage.getInitialProps = checkAuth;
