import LoginForm from '@/components/Login/LoginForm/LoginForm';
import { NoAuthLayout } from '@/components/Shared';
import { LoginData, useLoginMutation } from '@/redux/services/api/userApi';
import type { CustomError } from '@/redux/services/customBaseQuery';
import { Container, Grid, GridItem, Heading, useToast } from '@chakra-ui/react';
import Image from 'next/image';
import Router from 'next/router';
import React, { ReactElement, useEffect } from 'react';

export interface LoginProps {
  token: string;
}
export default function Login(): JSX.Element {
  const [login, { data, isLoading, isSuccess, isError, error }] = useLoginMutation({
    fixedCacheKey: 'user-data',
  });
  const toast = useToast();
  const err = error as CustomError | undefined;
  const errMsg = err?.data.message ?? 'network error, please try again';

  function loginUser(data: LoginData): void {
    login(data);
  }

  useEffect(() => {
    if (isSuccess && data?.user) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('userId', data.user.id);
      }
      Router.push('/');
    } else if (isError) {
      toast({
        title: 'Login Error',
        description: `${errMsg}`,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
    return () => {
      toast.closeAll();
    };
  }, [isSuccess, isError, errMsg, toast, data?.user]);

  return (
    <>
      {/* Mobile Heading */}
      <Heading
        display={['inherit', null, 'none']}
        as="h1"
        mt={['1rem', '2rem', '4rem']}
        textAlign="center"
      >
        Login
      </Heading>

      <Grid
        templateColumns={['repeat(1, 1fr)', null, 'repeat(2, 1fr)']}
        gap={[2, null, 6]}
        alignItems="flex-start"
      >
        <GridItem rowStart={[2, null, 1]}>
          <Heading
            display={['none', null, 'inherit']}
            as="h1"
            mt={['1rem', '4rem']}
            textAlign="center"
          >
            Login
          </Heading>

          <Container
            margin={['2rem 0', null, '10rem auto']}
            p={['0', 'auto']}
            bgColor="var(--bgColor)"
          >
            <LoginForm onSubmit={loginUser} isLoading={isLoading} buttonText="Login" />
          </Container>
        </GridItem>
        <GridItem
          w={['70%', '60%', '100%']}
          h="100vh"
          m="auto"
          display="flex"
          flexDir="column"
          justifyContent="center"
          bg={['none', null, ' #fefefe']}
        >
          <Image
            src="/logo.png"
            alt="doodle"
            width={400}
            height={400}
            layout="responsive"
            objectFit={'scale-down'}
          />
        </GridItem>
      </Grid>
    </>
  );
}

Login.getLayout = function getLayout(page: ReactElement): JSX.Element {
  return <NoAuthLayout>{page}</NoAuthLayout>;
};
