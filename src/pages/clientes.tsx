import { clientFields, ClientRow } from '@/components/Clients';
import {
  ClientFormValues,
  CustomForm,
  CustomModal,
  CustomTable,
  Layout,
} from '@/components/Shared';
import { useCreateClientMutation, useGetClientsQuery } from '@/redux/services';
import { checkAuth, IsAuth } from '@/utils/auth';
import { Box, Th } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import Router from 'next/router';
import { ReactElement, useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
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
    <Box maxW="var(--maxPageWitdth)" m={['1rem', null, '1rem 2rem']}>
      <CustomTable
        Headers={clientFields.map((header) => {
          return <Th key={header.name}>{header.label}</Th>;
        })}
        Rows={clients?.map((dataRow) => {
          return <ClientRow key={dataRow._id} client={dataRow} />;
        })}
        variant="simple"
        size="sm"
      />
      <CustomModal
        title="Crear Cliente"
        isDisplayed={displayModal}
        setDisplayModal={setDisplayModal}
        button={{ icon: <FaPlus />, bgColor: 'brand.green.100', size: 'sm' }}
      >
        <CustomForm
          onSubmit={onSubmit}
          isLoading={isLoading}
          buttonText="crear"
          fields={clientFields}
        />
      </CustomModal>
    </Box>
  );
}

ClientesPage.getLayout = function getLayout(page: ReactElement): JSX.Element {
  return <Layout>{page}</Layout>;
};

ClientesPage.getInitialProps = checkAuth;
