import React from "react";
import { Form, Formik, Field } from "formik";
import { Button, Container } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import FormField from "./FormField";
import { newClientData, resetNewClientData } from "../redux/slices/clientsSlice";

export interface FormValues {
  name: string;
  idType: string;
  idNumber: string;
  addres1: string;
  addres2: string;
  city: string;
  department: string;
  discount: string;
}
export interface FormContainerProps {
  fieldsData: {
    name: string;
    type: string;
    placeholder: string;
    label: string;
    required: boolean;
  }[];
  dispatchFn: () => void;
}
function FormContainer({ fieldsData, dispatchFn }: FormContainerProps): JSX.Element {
  const clients = useAppSelector(state => state.clients);
  const dispatch = useAppDispatch();

  const initialValues:FormValues = {
    name: "",
    idType: "",
    idNumber: "",
    addres1: "",
    addres2: "",
    city: "",
    department: "",
    discount: "",
  };

  // function validateName(value) {
  //   let error;
  //   if (!value) {
  //     error = "Name is required";
  //   } else if (value.toLowerCase() !== "naruto") {
  //     error = "Jeez! You're not a fan 😱";
  //   }
  //   return error;
  // }
  async function onSubmit(values:FormValues): Promise<any> {
    const promiseFn = new Promise((resolve, reject) => {
      resolve(dispatchFn());
      if (clients.status === "rejected") {
        reject(console.log(`Error al crear usuario' ${JSON.stringify(values, null, 2)}`));
      }
    });
    await promiseFn;
    dispatch(resetNewClientData());
    // onClose();
  }
  function handleChange(event) {
    const name = event.target.name;
    const type = event.target.type;
    const value = type === "number" ? Number(event.target.value) : event.target.value;
    dispatch(newClientData({ [name]: value }));
  }
  return (
    <Container>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {(props): JSX.Element => (
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
                  required={formField.required}
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
