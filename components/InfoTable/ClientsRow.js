import React from "react";
import { Tr, Td, Button } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { deleteClient, updateClient } from "../../redux/slices/clientsSlice";
import db from "../../firebase/clientApp";
import ModalContainer from "../ModalContainer";

const ClientsRow = props => {
  const dispatch = useDispatch();

  function handleDelete(clientId) {
    dispatch(deleteClient({ db, clientId }));
  }
  function handleUpdate(clientId) {
    const updatedClientData = { name: "test" };
    dispatch(updateClient({ db, clientId, updatedClientData }));
  }
  return (
    <Tr>
      <Td>{props.data.name}</Td>
      <Td>{props.data.idType}</Td>
      <Td>{props.data.idNumber}</Td>
      <Td>{props.data.addres1}</Td>
      <Td>{props.data.addres2}</Td>
      <Td>{props.data.city}</Td>
      <Td>{props.data.department}</Td>
      <Td>{`${props.data.discount}%`}</Td>
      <Td>
        <Button onClick={() => handleDelete(props.data.id)}>eliminar</Button>
      </Td>
      <Td>
        {/* <Button onClick={() => handleUpdate(props.data.id)}>actualizar</Button> */}

        <ModalContainer title='Actualizar Cliente'>
          <p>text test</p>
        </ModalContainer>
      </Td>
    </Tr>
  );
};

export default ClientsRow;
