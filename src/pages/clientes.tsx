import { clientFields, ClientRow } from '@/components/Clients';
import ClientForm from '@/components/Clients/ClientForm/ClientForm';
import { ClientFormValues, CustomModal, CustomTable, Layout } from '@/components/Shared';
import { AddButton } from '@/components/Shared/IconButtons/AddButton/AddButton';
import { useCreateClientMutation, useGetClientsQuery } from '@/redux/services';
import { checkAuth, IsAuth } from '@/utils/auth';
import { Box, Th } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import Router from 'next/router';
import { ReactElement, useEffect, useState } from 'react';
const LoginPage = dynamic(() => import('@/pages/login'));

export default function ClientesPage({ isAuth }: IsAuth): ReactElement {
  const [displayModal, setDisplayModal] = useState(false);
  const { data: clients } = useGetClientsQuery();
  const [createClient, { isLoading }] = useCreateClientMutation();

  function onSubmit(data: ClientFormValues): void {
    const transformedData = { ...data, discount: Number(data.discount) };
    createClient(transformedData);
    setDisplayModal(false);
  }

  useEffect(() => {
    if (isAuth) return; // do nothing if the user is logged in
    Router.replace('/clientes', '/login', { shallow: true });
  }, [isAuth]);

  if (!isAuth) {
    return <LoginPage />;
  }

  return (
    <Box
      maxW="var(--maxPageWitdth)"
      m={['1rem', null, '1rem 2rem']}
      bgColor="brand.bgLight"
      borderRadius="3xl"
      boxShadow={'var(--boxShadow)'}
    >
      <CustomTable
        Headers={clientFields.map((header) => (
          <Th key={header.name} textAlign="center" p="1rem">
            {header.label}
          </Th>
        ))}
        Rows={clients?.map((dataRow) => (
          <ClientRow key={dataRow._id} client={dataRow} />
        ))}
        variant="simple"
        size="sm"
      />
      <CustomModal
        title="Crear Cliente"
        isDisplayed={displayModal}
        setDisplayModal={setDisplayModal}
        iconButton={
          <AddButton size="sm" margin="1.5rem" onClick={(): void => setDisplayModal(true)} />
        }
      >
        <ClientForm
          // setDisplayModal={setDisplayModal}
          onSubmit={onSubmit}
          isLoading={isLoading}
          buttonText="Crear"
          idTypes={[
            { _id: 'CC', name: 'CC' },
            { _id: 'NIT', name: 'NIT' },
            { _id: 'Pasaporte', name: 'Pasaporte' },
            { _id: 'Otro', name: 'Otro' },
          ]}
          paymentTerm={[
            { _id: 'contado', name: 'contado' },
            { _id: '15', name: '15' },
            { _id: '30', name: '30' },
            { _id: '60', name: '60' },
          ]}
        />
      </CustomModal>
    </Box>
  );
}

ClientesPage.getLayout = function getLayout(page: ReactElement): JSX.Element {
  return <Layout>{page}</Layout>;
};

ClientesPage.getInitialProps = checkAuth;
