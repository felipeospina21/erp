import React, { useState } from "react";
// import { Icon } from "@chakra-ui/react";
// import { FaPlusCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { createClient } from "../app/slices/clientsSlice";
import db from "../firebase/clientApp";
import CreateForm from "../components/InfoTable/CreateForm";
import InfoTableContainer from "../components/InfoTable/InfoTableContainer";
import Btn from "../components/Shared/Btn";

const Clientes = () => {
  const clients = useSelector(state => state.clients.list);
  const dispatch = useDispatch();
  const [createForm, setCreateForm] = useState(false);
  const [clientObj, setClientObj] = useState({});
  const fields = [
    { fieldName: "name", fieldType: "text", title: "cliente" },
    { fieldName: "idType", fieldType: "text", title: "tipo doc" },
    { fieldName: "idNumber", fieldType: "text", title: "doc" },
    { fieldName: "addres1", fieldType: "text", title: "dirección 1" },
    { fieldName: "addres2", fieldType: "text", title: "dirección 2" },
    { fieldName: "city", fieldType: "text", title: "ciudad" },
    { fieldName: "department", fieldType: "text", title: "departamento" },
    { fieldName: "discount", fieldType: "number", title: "descuento" },
  ];
  return (
    <>
      <InfoTableContainer headerList={fields} data={clients} />
      <Btn color='teal' size='sm' my='1rem' onClick={() => setCreateForm(!createForm)}>
        Crear Cliente
      </Btn>
      {createForm ? (
        <CreateForm
          fields={fields}
          stateObj={clientObj}
          setStateObj={setClientObj}
          hideForm={setCreateForm}
          dispatchFn={() => dispatch(createClient({ db, clientObj }))}
        />
      ) : null}
    </>
  );
};

export default Clientes;
