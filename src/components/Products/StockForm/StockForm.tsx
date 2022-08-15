import { Product } from '@/redux/services';
import React from 'react';
import { Button, Container, Input } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CustomFormField } from '@/components/Shared';

export interface StockFormProps {
  products: Product[] | undefined;
  onSubmit: (data: any) => void | SubmitHandler<any>;
  isLoading?: boolean;
}

export interface StockFormValues {
  productName: string;
  stockAvailable: number;
}

export default function StockForm({ products, isLoading, onSubmit }: StockFormProps): JSX.Element {
  const { register, handleSubmit } = useForm<StockFormValues>();
  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        {products?.map((product) => (
          <CustomFormField key={product._id} id={product.name} label={product.name}>
            <Input {...register(product._id as keyof StockFormValues)} />
          </CustomFormField>
        ))}
        <Button m="1.5rem auto 0 auto" variant={'primary'} type="submit" isLoading={isLoading}>
          Actualizar
        </Button>
      </form>
    </Container>
  );
}
