import React from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { createClient } from "../redux/slices/clientsSlice";
import db from "../firebase/clientApp";
import InfoTableContainer from "../components/InfoTable/InfoTableContainer";
import FormContainer from "../components/FormContainer";
import ModalContainer from "../components/ModalContainer";

const Clientes = (): JSX.Element => {
  const clients = useAppSelector((state) => state.clients);
  const newClientData = useAppSelector((state) => state.clients.newClient);
  const dispatch = useAppDispatch();
  const fields = [
    {
      name: "name",
      type: "text",
      placeholder: "cliente",
      label: "Cliente",
      required: true,
    },
    {
      name: "idType",
      type: "text",
      placeholder: "tipo doc",
      label: "Tipo Doc",
      required: true,
    },
    { name: "idNumber", type: "text", placeholder: "doc", label: "doc", required: true },
    {
      name: "addres1",
      type: "text",
      placeholder: "dirección 1",
      label: "dirección 1",
      required: true,
    },
    {
      name: "addres2",
      type: "text",
      placeholder: "dirección 2",
      label: "dirección 2",
      required: false,
    },
    {
      name: "city",
      type: "text",
      placeholder: "ciudad",
      label: "ciudad",
      required: true,
    },
    {
      name: "department",
      type: "text",
      placeholder: "departamento",
      label: "departamento",
      required: true,
    },
    {
      name: "discount",
      type: "number",
      placeholder: "descuento",
      label: "descuento",
      required: true,
    },
  ];

  return (
    <>
      <InfoTableContainer headerList={fields} data={clients.list} />

      <ModalContainer title='Crear Cliente'>
        <FormContainer
          fieldsData={fields}
          dispatchFn={(): void => {
            dispatch(createClient({ db, newClientData }));
          }}
        />
      </ModalContainer>
    </>
  );
};

export default Clientes;
