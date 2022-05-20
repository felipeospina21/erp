import React, { ReactElement, useEffect } from 'react';
import { Grid, GridItem, Container, Heading } from '@chakra-ui/react';
import Image from 'next/image';
import loginImg from '@/assets/login.png';
import { CustomForm, Layout } from '@/components/Shared';
import { useLoginMutation, UserBody } from '@/redux/services/userApi';
import { loginFields } from '@/components/Login';
import { useRouter } from 'next/router';
import { setUser } from '@/redux/slices/userSlice';
import { useAppDispatch } from '@/redux/hooks';

export interface LoginProps {
  token: string;
}
export default function Login(): JSX.Element {
  const [login, { data, isLoading, isSuccess, error }] = useLoginMutation();
  const router = useRouter();
  const dispatch = useAppDispatch();

  function loginUser(data: UserBody): void {
    login(data);
  }

  useEffect(() => {
    if (isSuccess && data?.user) {
      router.push('/');
      sessionStorage.setItem('isAuth', 'true');
      dispatch(setUser(data?.user));
    }
  }, [isSuccess, error, router, dispatch, data?.user]);

  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={6} alignItems="flex-start">
      <GridItem>
        <Heading as="h1" mt="4rem" textAlign="center">
          Login
        </Heading>

        <Container marginTop="10rem" bgColor="var(--bgColor-light)">
          <CustomForm
            onSubmit={loginUser}
            isLoading={isLoading}
            buttonText="Login"
            fields={loginFields}
          />
        </Container>
      </GridItem>
      <GridItem w="100%" h="90%">
        <Image
          src={loginImg}
          alt="doodle"
          layout="responsive"
          objectFit="scale-down"
          objectPosition={'right top'}
        />
      </GridItem>
    </Grid>
  );
}

Login.getLayout = function getLayout(page: ReactElement): JSX.Element {
  return <Layout hasNav={false}>{page}</Layout>;
};
