import { CustomFormField } from '@/components/Shared';
import { Container, Input } from '@chakra-ui/react';
import { nanoid } from '@reduxjs/toolkit';
import React from 'react';
import { productsFields } from './fields/productFields';

export default function ProductForm(): JSX.Element {
  return (
    <Container>
      {productsFields.map((field) => (
        <CustomFormField key={nanoid()} id={field.name} label={field.label}>
          <Input
            type={field.type}
            size="lg"
            variant={field.type === 'file' ? 'flushed' : 'outline'}
          />
        </CustomFormField>
      ))}
    </Container>
  );
}
