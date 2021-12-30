import React from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
} from "@chakra-ui/react";

const FormField = ({ field, form, ...props }) => {
  return (
    <FormControl
      isRequired
      isInvalid={form.errors[field.name] && form.touched[field.name]}
      m='1rem 0'>
      <FormLabel htmlFor={props.name}>{props.label}</FormLabel>
      <Input {...field} {...props} />
      <FormErrorMessage>{form.errors[field.name]}</FormErrorMessage>
      <FormHelperText ml='0.5rem'>texto de ayuda del input</FormHelperText>
    </FormControl>
  );
};

export default FormField;
