import React, { useState } from 'react';
import { InfoTableContainer } from '@/components/Clients';
// import ClientsForm from '@/components/ClientsForm';
import ClientsForm from '@/components/Clients/ClientForm/ClientForm';
import { CustomModal } from '@/components/Shared';
import { useGetClientsQuery } from '@/redux/services';

const Clientes = (): JSX.Element => {
  const { data: clients } = useGetClientsQuery();
  const [displayModal, setDisplayModal] = useState(false);
  const fields = [
    {
      name: 'name',
      type: 'text',
      placeholder: 'cliente',
      label: 'Cliente',
      required: true,
    },
    {
      name: 'idType',
      type: 'text',
      placeholder: 'tipo doc',
      label: 'Tipo Doc',
      required: true,
    },
    { name: 'idNumber', type: 'text', placeholder: 'doc', label: 'doc', required: true },
    {
      name: 'addres1',
      type: 'text',
      placeholder: 'dirección 1',
      label: 'dirección 1',
      required: true,
    },
    {
      name: 'addres2',
      type: 'text',
      placeholder: 'dirección 2',
      label: 'dirección 2',
      required: false,
    },
    {
      name: 'city',
      type: 'text',
      placeholder: 'ciudad',
      label: 'ciudad',
      required: true,
    },
    {
      name: 'department',
      type: 'text',
      placeholder: 'departamento',
      label: 'departamento',
      required: true,
    },
    {
      name: 'email',
      type: 'text',
      placeholder: 'email',
      label: 'email',
      required: false,
    },
    {
      name: 'discount',
      type: 'number',
      placeholder: 'descuento',
      label: 'descuento',
      required: true,
    },
  ];

  return (
    <>
      <InfoTableContainer headerList={fields} data={clients ?? []} />

      <CustomModal
        title='Crear Cliente'
        isDisplayed={displayModal}
        setDisplayModal={setDisplayModal}>
        <ClientsForm fieldsData={fields} setDisplayModal={setDisplayModal} />
      </CustomModal>
    </>
  );
};

export default Clientes;
