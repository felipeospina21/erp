import React, { ReactElement } from 'react';
import { Grid, GridItem, Input, Container, Heading } from '@chakra-ui/react';
import Image from 'next/image';
import loginImg from '@/assets/login.png';
import { CustomButton, CustomFormField, Layout } from '@/components/Shared';

// export interface loginProps {
// }

export default function Login(): ReactElement {
  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={6} alignItems="flex-start">
      <GridItem>
        <Heading as="h1" mt="4rem" textAlign="center">
          Login
        </Heading>
        <Container marginTop="10rem">
          <CustomFormField id="username" label="Email">
            <Input type="email" borderColor="brand.grey.200" />
          </CustomFormField>
          <CustomFormField id="password" label="Password">
            <Input type="password" borderColor="brand.grey.200" />
          </CustomFormField>
          <CustomButton
            variant="accept"
            margin="2rem auto"
            width="10rem"
            onClick={() => console.log('login')}
          >
            Login
          </CustomButton>
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
