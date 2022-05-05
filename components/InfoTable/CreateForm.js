import React from "react";
import { useFormik } from "formik";
import {
  Form,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Stack,
  InputGroup,
  InputLeftElement,
  Container,
} from "@chakra-ui/react";
import Btn from "../Shared/Btn";

const CreateForm = props => {
  function handleChange(event) {
    const name = event.target.name;
    const type = event.target.type;
    const value = type === "number" ? Number(event.target.value) : event.target.value;
    props.setStateObj({ ...props.stateObj, [name]: value });
  }

  function handleClick() {
    props.dispatchFn();
    props.hideForm(false);
  }
  return (
    <Container mt='2rem'>
      <Stack spacing={4}>
        {props.fields.map(field => {
          return (
            <InputGroup key={field.fieldName}>
              {/* <InputLeftElement
              pointerEvents='none'
              // children={<PhoneIcon color='gray.300' />}
            >
              {field}
            </InputLeftElement> */}
              <Input
                name={field.fieldName}
                type={field.fieldType}
                placeholder={field.title}
                onChange={handleChange}
              />
            </InputGroup>
          );
        })}
        <Btn color='green' onClick={handleClick}>
          Guardar
        </Btn>
      </Stack>
    </Container>
  );
};

export default CreateForm;
