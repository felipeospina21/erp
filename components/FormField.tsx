import React from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
} from "@chakra-ui/react";

export interface FormFieldProps {
  field: any;
  form: any;
  required: boolean;
  name: string;
  label:string;
  placeholder:string;
  onChange: (event:React.ChangeEvent<HTMLInputElement>)=>void
}
const FormField = ({ field, form, ...props }:FormFieldProps):JSX.Element => {
  return (
    <FormControl
      isRequired={props.required}
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
