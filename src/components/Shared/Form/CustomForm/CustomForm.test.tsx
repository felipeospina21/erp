import React from 'react';
import { render, screen } from '@testing-library/react';
import { CustomForm } from './CustomForm';
import { mockFormFields } from '@/mockData/formFields';
import user from '@testing-library/user-event';

const mockSubmission = jest.fn((data) => {
  console.log(data);
});

beforeEach(() => {
  render(
    <CustomForm
      buttonText="submit"
      isLoading={false}
      fields={mockFormFields}
      onSubmit={mockSubmission}
    />
  );
});

test('input value should chage when typing', () => {
  const nameInput = screen.getByLabelText(/name/i);
  user.type(nameInput, 'carlos');
  expect(nameInput).toHaveValue('carlos');
});
