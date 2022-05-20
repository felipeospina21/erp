import { clientFields, ClientRow } from '@/components/Clients';
import {
  CustomModal,
  CustomTable,
  ClientFormValues,
  CustomForm,
  Layout,
} from '@/components/Shared';
import { useCreateClientMutation, useGetClientsQuery } from '@/redux/services';
import { Box, Th } from '@chakra-ui/react';
import { ReactElement, useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import { IsAuth } from '../utils';
import { useRouter } from 'next/router';

export default function ClientesPage({ isAuth }: IsAuth): ReactElement {
  const [displayModal, setDisplayModal] = useState(false);
  const { data: clients } = useGetClientsQuery();
  const [createClient, { isLoading }] = useCreateClientMutation();
  const router = useRouter();

  function onSubmit(data: ClientFormValues): void {
    const transformedData = { ...data, discount: Number(data.discount) };
    createClient(transformedData);
    setDisplayModal(false);
  }

  useEffect(() => {
    if (!isAuth) {
      router.push('/login');
    }
  }, [isAuth, router]);

  if (!isAuth) {
    return <>Not authorized</>;
  }

  return (
    <Box maxW="var(--maxPageWitdth)" m="auto">
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

ClientesPage.getInitialProps = async () => {
  if (typeof window !== 'undefined') {
    const isAuth = sessionStorage.getItem('isAuth');
    if (isAuth) {
      return { isAuth: true };
    } else {
      return { isAuth: false };
    }
  }
  return {};
};
