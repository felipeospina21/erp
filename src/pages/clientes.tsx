import { clientFields, ClientRow } from '@/components/Clients';
import { CustomModal, CustomTable, ClientFormValues, CustomForm } from '@/components/Shared';
import { useCreateClientMutation, useGetClientsQuery } from '@/redux/services';
import { Th } from '@chakra-ui/react';
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

const Clientes = (): JSX.Element => {
  const [displayModal, setDisplayModal] = useState(false);
  const { data: clients } = useGetClientsQuery();
  const [createClient, { isLoading }] = useCreateClientMutation();

  function onSubmit(data: ClientFormValues): void {
    const transformedData = { ...data, discount: Number(data.discount) };
    createClient(transformedData);
    setDisplayModal(false);
  }

  return (
    <>
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
        button={{ icon: <FaPlus />, bgColor: 'brand.green.100', size: 'md' }}
      >
        <CustomForm
          onSubmit={onSubmit}
          isLoading={isLoading}
          buttonText="crear"
          fields={clientFields}
        />
      </CustomModal>
    </>
  );
};

export default Clientes;
