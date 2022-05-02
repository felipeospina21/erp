import React, { useState } from 'react';
import { clientFields, InfoTableContainer } from '@/components/Clients';
import { CustomModal } from '@/components/Shared';
import { useGetClientsQuery, useCreateClientMutation } from '@/redux/services';
import { CustomForm } from '@/components/Shared/Form';
import { FaPlus } from 'react-icons/fa';

const Clientes = (): JSX.Element => {
  const [displayModal, setDisplayModal] = useState(false);
  const { data: clients } = useGetClientsQuery();
  const [createClient, { isLoading }] = useCreateClientMutation();

  function onSubmit(data: any): void {
    const transformedData = { ...data, discount: Number(data.discount) };
    createClient(transformedData);
    setDisplayModal(false);
  }

  return (
    <>
      <InfoTableContainer data={clients ?? []} />

      <CustomModal
        title="Crear Cliente"
        isDisplayed={displayModal}
        setDisplayModal={setDisplayModal}
        button={{ icon: <FaPlus />, bgColor: 'brand.green.100' }}
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
