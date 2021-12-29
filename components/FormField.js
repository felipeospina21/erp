import React from "react";
import { Field } from "formik";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
} from "@chakra-ui/react";

const FormField = ({ validationFn, data }) => {
  return (
    <Field name='name' validate={validationFn}>
      {({ field, form }) => {
        return (
          <FormControl isInvalid={form.errors.name && form.touched.name}>
            <FormLabel htmlFor={data.id}>{data.label}</FormLabel>
            <Input {...field} id={data.id} placeholder={data.placeholder} />
            <FormErrorMessage>{form.errors.name}</FormErrorMessage>
          </FormControl>
        );
      }}
    </Field>
  );
};

export default FormField;
