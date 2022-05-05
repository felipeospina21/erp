import React, { useState } from "react";
// import { Icon } from "@chakra-ui/react";
// import { FaPlusCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { createClient } from "../app/slices/clientsSlice";
import db from "../firebase/clientApp";
import CreateForm from "../components/InfoTable/CreateForm";
import InfoTableContainer from "../components/InfoTable/InfoTableContainer";
import Btn from "../components/Shared/Btn";
import FormContainer from "../components/FormContainer";
import ModalContainer from "../components/ModalContainer";

const Clientes = () => {
  const clients = useSelector(state => state.clients);
  const newClientData = useSelector(state => state.clients.newClient);
  const dispatch = useDispatch();
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
          dispatchFn={() => dispatch(createClient({ db, newClientData }))}
        />
      </ModalContainer>
  
    </>
  );
};

export default Clientes;
