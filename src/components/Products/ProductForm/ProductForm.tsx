import { CustomFormField } from '@/components/Shared';
import { Product } from '@/redux/services';
import { Button, Container, Input, Select } from '@chakra-ui/react';
import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

interface ProductFormProps {
  onSubmit: (data: any) => void | SubmitHandler<any>;
  buttonText: string;
  categories: Array<{ _id: string; name: string }>;
  defaultValues?: Product;
  isLoading?: boolean;
}

export interface ModifiedProduct extends Omit<Product, 'category'> {
  category: string;
}

export type ProductFormValues = ModifiedProduct | FormData;

export default function ProductForm({
  onSubmit,
  buttonText,
  categories,
  defaultValues,
  isLoading,
}: ProductFormProps): JSX.Element {
  const {
    register,
    handleSubmit,
    control,
    // formState: { errors },
  } = useForm<ProductFormValues>();

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CustomFormField
          id="name"
          label="Nombre"
          // isError={!!errors?.name}
          isRequired={true}
          errorMessage="This field is required"
          variant={'floating'}
        >
          <Controller
            name="name"
            control={control}
            defaultValue={defaultValues?.name ?? ''}
            rules={{ required: true }}
            render={({ field: inputField }): JSX.Element => <Input {...inputField} />}
          />
        </CustomFormField>

        <CustomFormField
          id="category"
          label="Categoria"
          // isError={!!errors?.category as keyof FormValues}
          isRequired={true}
          errorMessage="This field is required"
          variant={'floating'}
        >
          <Controller
            name="category"
            control={control}
            defaultValue={defaultValues?.category._id}
            rules={{ required: true }}
            render={({ field: inputField }): JSX.Element => (
              <Select placeholder="Select option" {...inputField}>
                {categories.map(({ name, _id }) => (
                  <option key={_id} value={_id}>
                    {name}
                  </option>
                ))}
              </Select>
            )}
          />
        </CustomFormField>

        <CustomFormField
          id="price"
          label="Precio"
          // isError={!!errors?.name}
          isRequired={true}
          errorMessage="This field is required"
          variant={'floating'}
        >
          <Controller
            name="price"
            control={control}
            defaultValue={defaultValues?.price ?? 0}
            rules={{ required: true }}
            render={({ field: inputField }): JSX.Element => <Input {...inputField} />}
          />
        </CustomFormField>

        <CustomFormField
          id="stock"
          label="Inventario"
          // isError={!!errors?.name}
          isRequired={true}
          errorMessage="This field is required"
          variant={'floating'}
        >
          <Controller
            name="stock"
            control={control}
            defaultValue={defaultValues?.stock ?? 0}
            rules={{ required: true }}
            render={({ field: inputField }): JSX.Element => <Input {...inputField} />}
          />
        </CustomFormField>

        <CustomFormField
          id="image"
          label="Imagen"
          // isError={!!errors?.name}
          isRequired={false}
          errorMessage="This field is required"
          variant={'floating'}
        >
          <Input type="file" variant="flushed" {...register('image', { required: false })} />
        </CustomFormField>
        <Button m="1.5rem auto 0 auto" variant={'primary'} type="submit" isLoading={isLoading}>
          {buttonText}
        </Button>
      </form>
    </Container>
  );
}
