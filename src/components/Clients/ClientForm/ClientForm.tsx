import { CustomFormField } from '@/components/Shared';
import { Client, useGetCitiesQuery, useGetDepartmentsQuery } from '@/redux/services';
import { Button, Container, Input, Radio, RadioGroup, Select, Stack } from '@chakra-ui/react';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

export interface ClientFormProps {
  buttonText: string;
  idTypes: Array<{ _id: string; name: string }>;
  paymentTerm: Array<{ _id: string; name: string }>;
  update?: boolean;
  defaultValues?: Client;
  isLoading?: boolean;
  onSubmit: (data: ClientFormValues) => void;
}

export interface ClientFormValues extends Omit<Client, 'discount'> {
  discount: string;
}

export default function ClientForm({
  buttonText,
  idTypes,
  paymentTerm,
  defaultValues,
  isLoading,
  onSubmit,
  update,
}: ClientFormProps): JSX.Element {
  const {
    handleSubmit,
    control,
    watch,
    // formState: { errors },
  } = useForm<ClientFormValues>();
  const watchDepartment = watch('department', '');
  const { data: departments } = useGetDepartmentsQuery();
  const { data: cities } = useGetCitiesQuery(defaultValues?.department ?? watchDepartment);

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)} role="form" aria-label="new-client-form">
        <CustomFormField
          id="name"
          label="Cliente"
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
          id="idType"
          label="Tipo Doc"
          // isError={!!errors?.category as keyof FormValues}
          isRequired={true}
          isDisabled={update}
          errorMessage="This field is required"
          variant={'floating'}
        >
          <Controller
            name="idType"
            control={control}
            defaultValue={defaultValues?.idType}
            rules={{ required: true }}
            render={({ field: inputField }): JSX.Element => (
              <Select placeholder="Select option" {...inputField}>
                {idTypes.map(({ name, _id }) => (
                  <option key={_id} value={name}>
                    {name}
                  </option>
                ))}
              </Select>
            )}
          />
        </CustomFormField>

        <CustomFormField
          id="idNumber"
          label="Doc"
          // isError={!!errors?.name}
          isRequired={true}
          isDisabled={update}
          errorMessage="This field is required"
          variant={'floating'}
        >
          <Controller
            name="idNumber"
            control={control}
            defaultValue={defaultValues?.idNumber ?? ''}
            rules={{ required: true }}
            render={({ field: inputField }): JSX.Element => <Input {...inputField} />}
          />
        </CustomFormField>

        <CustomFormField
          id="addres1"
          label="dirección 1"
          // isError={!!errors?.name}
          isRequired={true}
          errorMessage="This field is required"
          variant={'floating'}
        >
          <Controller
            name="addres1"
            control={control}
            defaultValue={defaultValues?.addres1 ?? ''}
            rules={{ required: true }}
            render={({ field: inputField }): JSX.Element => <Input {...inputField} />}
          />
        </CustomFormField>

        <CustomFormField
          id="addres2"
          label="dirección 2"
          // isError={!!errors?.name}
          isRequired={false}
          // errorMessage="This field is required"
          variant={'floating'}
        >
          <Controller
            name="addres2"
            control={control}
            defaultValue={defaultValues?.addres2 ?? ''}
            rules={{ required: false }}
            render={({ field: inputField }): JSX.Element => <Input {...inputField} />}
          />
        </CustomFormField>

        <CustomFormField
          id="department"
          label="Departamento"
          // isError={!!errors?.category as keyof FormValues}
          isRequired={true}
          errorMessage="This field is required"
          variant={'floating'}
        >
          <Controller
            name="department"
            control={control}
            defaultValue={defaultValues?.department}
            rules={{ required: true }}
            render={({ field: inputField }): JSX.Element => (
              <Select placeholder="Select option" {...inputField}>
                {departments?.map(({ name, _id }) => (
                  <option key={_id} value={_id}>
                    {name}
                  </option>
                ))}
              </Select>
            )}
          />
        </CustomFormField>

        <CustomFormField
          id="city"
          label="Ciudad"
          // isError={!!errors?.category as keyof FormValues}
          isRequired={true}
          errorMessage="This field is required"
          variant={'floating'}
        >
          <Controller
            name="city"
            control={control}
            defaultValue={defaultValues?.city}
            rules={{ required: true }}
            render={({ field: inputField }): JSX.Element => (
              <Select placeholder="Select option" {...inputField}>
                {cities?.map(({ name, _id }) => (
                  <option key={_id} value={_id}>
                    {name}
                  </option>
                ))}
              </Select>
            )}
          />
        </CustomFormField>

        <CustomFormField
          id="email"
          label="Email"
          // isError={!!errors?.name}
          isRequired={false}
          // errorMessage="This field is required"
          variant={'floating'}
        >
          <Controller
            name="email"
            control={control}
            defaultValue={defaultValues?.email ?? ''}
            rules={{ required: false }}
            render={({ field: inputField }): JSX.Element => <Input {...inputField} type="email" />}
          />
        </CustomFormField>

        <CustomFormField
          id="discount"
          label="Descuento"
          // isError={!!errors?.name}
          isRequired={true}
          // errorMessage="This field is required"
          variant={'floating'}
        >
          <Controller
            name="discount"
            control={control}
            defaultValue={defaultValues?.discount?.toString() ?? ''}
            rules={{ required: true }}
            render={({ field: inputField }): JSX.Element => <Input {...inputField} type="number" />}
          />
        </CustomFormField>

        <CustomFormField
          id="paymentTerm"
          label="Pago"
          // isError={!!errors?.category as keyof FormValues}
          isRequired={true}
          errorMessage="This field is required"
          variant={'floating'}
        >
          <Controller
            name="paymentTerm"
            control={control}
            defaultValue={defaultValues?.paymentTerm}
            rules={{ required: true }}
            render={({ field: inputField }): JSX.Element => (
              <Select placeholder="Select option" {...inputField}>
                {paymentTerm?.map(({ name, _id }) => (
                  <option key={_id} value={_id}>
                    {name}
                  </option>
                ))}
              </Select>
            )}
          />
        </CustomFormField>

        <CustomFormField
          id="retailer"
          label="Distribuidor"
          // isError={!!errors?.category as keyof FormValues}
          isRequired={true}
          errorMessage="This field is required"
          variant={'floating'}
        >
          <Controller
            name="retailer"
            control={control}
            defaultValue={defaultValues?.retailer}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur } }): JSX.Element => (
              <RadioGroup onBlur={onBlur} onChange={onChange}>
                <Stack direction="row">
                  <Radio value="si">Si</Radio>
                  <Radio value="no">No</Radio>
                </Stack>
              </RadioGroup>
            )}
          />
        </CustomFormField>

        <Button m="1.5rem auto 0 auto" variant={'primary'} type="submit" isLoading={isLoading}>
          {buttonText}
        </Button>
      </form>
    </Container>
  );
}
