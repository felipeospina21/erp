import React from "react";
import { Form, Formik, Field } from "formik";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  Stack,
  InputGroup,
  InputLeftElement,
  Container,
} from "@chakra-ui/react";
import Btn from "./Shared/Btn";
import FormField from "./FormField";

function FormikTest() {
  function validateName(value) {
    let error;
    if (!value) {
      error = "Name is required";
    } else if (value.toLowerCase() !== "naruto") {
      error = "Jeez! You're not a fan 😱";
    }
    return error;
  }

  return (
    <Formik
      initialValues={{ name: "Sasuke" }}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 1000);
      }}>
      {props => (
        <Form>
          <FormField data={{id: 'name', placeholder: 'nombre', label: ' Nombre'} } validationFn={validateName}/>
          <FormField data={{id: 'apellido', placeholder: 'apellido', label: ' Apellido'}} validationFn={validateName}/>
          <FormField data={{id: 'correo', placeholder: 'correo', label: ' Correo'}} validationFn={validateName}/>

          {/* <Field name='name' validate={validateName}>
            {({ field, form }) => {
              console.log(form.errors)
              return (
                <FormControl isInvalid={form.errors.name && form.touched.name}>
                  <FormLabel htmlFor='name'>First name</FormLabel>
                  <Input {...field} id='name' placeholder='name' />
                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
              );
            }}
          </Field> */}
          {/* <Field name='lastname' validate={validateName}>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.name && form.touched.name}>
                <FormLabel htmlFor='name'>last name</FormLabel>
                <Input {...field} id='name' placeholder='name' />
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
              </FormControl>
            )}
          </Field> */}
          <Button mt={4} colorScheme='teal' isLoading={props.isSubmitting} type='submit'>
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default FormikTest;
