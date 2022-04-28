import React, { useState } from 'react';
import { InfoTableContainer } from '@/components/Clients';
// import ClientsForm from '@/components/ClientsForm';
import ClientsForm from '@/components/Clients/ClientForm/ClientForm';
import { CustomModal } from '@/components/Shared';
import { useGetClientsQuery } from '@/redux/services';

const Clientes = (): JSX.Element => {
  const { data: clients } = useGetClientsQuery();
  const [displayModal, setDisplayModal] = useState(false);


  return (
    <>
      <InfoTableContainer data={clients ?? []} />

      <CustomModal
        title='Crear Cliente'
        isDisplayed={displayModal}
        setDisplayModal={setDisplayModal}>
        <ClientsForm action='create' setDisplayModal={setDisplayModal} />
      </CustomModal>
    </>
  );
};

export default Clientes;
