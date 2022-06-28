import { CustomFormField } from '@/components/Shared';
import { Button, Container, Input } from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';

interface LoginFormFields {
  email: string;
  password: string;
}

export interface LoginFormProps {
  onSubmit: (data: any) => void;
  buttonText: string;
  isLoading?: boolean;
}

export default function LoginForm({
  onSubmit,
  buttonText,
  isLoading,
}: LoginFormProps): JSX.Element {
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<LoginFormFields>();
  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CustomFormField
          id="email"
          label="Email"
          // isError={!!errors?.name}
          isRequired={true}
          errorMessage="This field is required"
          variant={'floating'}
        >
          <Input {...register('email')} type="email" bgColor="brand.bgLight" />
        </CustomFormField>

        <CustomFormField
          id="password"
          label="Password"
          // isError={!!errors?.name}
          isRequired={true}
          errorMessage="This field is required"
          variant={'floating'}
        >
          <Input {...register('password')} type="password" bgColor="brand.bgLight" />
        </CustomFormField>

        <Button m="1.5rem auto 0 auto" variant={'primary'} type="submit" isLoading={isLoading}>
          {buttonText}
        </Button>
      </form>
    </Container>
  );
}
