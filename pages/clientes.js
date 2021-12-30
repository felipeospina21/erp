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
  const [createForm, setCreateForm] = useState(false);
  const fields = [
    { name: "name", type: "text", placeholder: "cliente", label: "Cliente" },
    { name: "idType", type: "text", placeholder: "tipo doc", label: "Tipo Doc" },
    { name: "idNumber", type: "text", placeholder: "doc", label: "doc" },
    { name: "addres1", type: "text", placeholder: "dirección 1", label: "dirección 1" },
    { name: "addres2", type: "text", placeholder: "dirección 2", label: "dirección 2" },
    { name: "city", type: "text", placeholder: "ciudad", label: "ciudad" },
    {
      name: "department",
      type: "text",
      placeholder: "departamento",
      label: "departamento",
    },
    { name: "discount", type: "number", placeholder: "descuento", label: "descuento" },
  ];

  return (
    <>
      <InfoTableContainer headerList={fields} data={clients.list} />
      <Btn color='teal' size='sm' my='1rem' onClick={() => setCreateForm(!createForm)}>
        Crear Cliente
      </Btn>
      <ModalContainer title='Crear Cliente' >
        <FormContainer
          fieldsData={fields}
          hideForm={setCreateForm}
          dispatchFn={() => dispatch(createClient({ db, newClientData }))}
        />
      </ModalContainer>
      {createForm ? (
        <FormContainer
          fieldsData={fields}
          hideForm={setCreateForm}
          dispatchFn={() => dispatch(createClient({ db, newClientData }))}
        />
      ) : null}
      {/* {createForm ? (
        <CreateForm
          fields={fields}
          stateObj={clientObj}
          setStateObj={setClientObj}
          hideForm={setCreateForm}
          dispatchFn={() => dispatch(createClient({ db, clientObj }))}
        />
      ) : null} */}
    </>
  );
};

export default Clientes;
