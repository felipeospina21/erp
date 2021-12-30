import React from "react";
import { Form, Formik, Field } from "formik";
import { Button, Container } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import Btn from "./Shared/Btn";
import FormField from "./FormField";
import { newClientData } from "../app/slices/clientsSlice";

function FormContainer({ fieldsData, dispatchFn, hideForm }) {
  const clients = useSelector(state => state.clients);
  const dispatch = useDispatch();

  function validateName(value) {
    let error;
    if (!value) {
      error = "Name is required";
    } else if (value.toLowerCase() !== "naruto") {
      error = "Jeez! You're not a fan 😱";
    }
    return error;
  }
  async function onSubmit(values) {
    const promiseFn = new Promise((resolve, reject) => {
      resolve(dispatchFn());
      if (clients.status === "rejected") {
        reject(console.log(`Error al crear usuario' ${JSON.stringify(values, null, 2)}`));
      }
    });
    await promiseFn;
    hideForm(false);
  }
  function handleChange(event) {
    const name = event.target.name;
    const type = event.target.type;
    const value = type === "number" ? Number(event.target.value) : event.target.value;
    dispatch(newClientData({ [name]: value }));
  }
  return (
    <Container>
      <Formik
        initialValues={{
          name: "",
          idType: "",
          idNumber: "",
          addres1: "",
          addres2: "",
          city: "",
          department: "",
          discount: "",
        }}
        onSubmit={onSubmit}>
        {props => (
          <Form>
            {fieldsData.map(formField => {
              return (
                <Field
                  key={formField.name}
                  value={
                    clients.newClient[formField.name]
                      ? clients.newClient[formField.name]
                      : ""
                  }
                  name={formField.name}
                  type={formField.type}
                  label={formField.label}
                  placeholder={formField.placeholder}
                  onChange={handleChange}
                  // validate={validateName}
                  component={FormField}
                />
              );
            })}
            <Button
              mt={4}
              colorScheme='teal'
              isLoading={props.isSubmitting}
              type='submit'>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export default FormContainer;
