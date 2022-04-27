import React from "react";
import { Input, Stack, InputGroup, Container } from "@chakra-ui/react";
import CustomButton from "../Shared/CustomButton/CustomButton";

export interface CreateFormProps {
  stateObj: any;
  fields: {
    fieldName: string;
    fieldType: string;
    title: string;
  }[];
  setStateObj: (stateObj: any) => void;
  dispatchFn: () => void;
  hideForm: (hide: boolean) => void;
}

const CreateForm = (props: CreateFormProps): JSX.Element => {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const name = event.target.name;
    const type = event.target.type;
    const value = type === "number" ? Number(event.target.value) : event.target.value;
    props.setStateObj({ ...props.stateObj, [name]: value });
  }

  function handleClick(): void {
    props.dispatchFn();
    props.hideForm(false);
  }

  return (
    <Container mt='2rem'>
      <Stack spacing={4}>
        {props.fields.map((field) => {
          return (
            <InputGroup key={field.fieldName}>
              <Input name={field.fieldName} type={field.fieldType} placeholder={field.title} onChange={handleChange} />
            </InputGroup>
          );
        })}
        <CustomButton color='green' onClick={handleClick}>
          Guardar
        </CustomButton>
      </Stack>
    </Container>
  );
};

export default CreateForm;
