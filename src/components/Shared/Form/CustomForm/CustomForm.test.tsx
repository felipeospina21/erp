import React from 'react';
import { render, screen } from '@testing-library/react';
import { CustomForm } from './CustomForm';
import { mockFormFields } from '@/mockData/formFields';
import userEvent from '@testing-library/user-event';

const mockSubmission = jest.fn();

const requiredFieldsCount = mockFormFields.filter(({ required }) => required).length;

test('input value should chage when typing', async () => {
  const user = userEvent.setup();
  render(
    <CustomForm
      buttonText="submit"
      isLoading={false}
      fields={mockFormFields}
      onSubmit={mockSubmission}
    />
  );

  const nameInput = screen.getByLabelText(/firstname/i);
  await user.type(nameInput, 'carlos');
  expect(nameInput).toHaveValue('carlos');
});

test('should validate all required fields', async () => {
  const user = userEvent.setup();
  render(
    <CustomForm
      buttonText="submit"
      isLoading={false}
      fields={mockFormFields}
      onSubmit={mockSubmission}
    />
  );
  const submitBtn = screen.getByRole('button', { name: /submit/i });
  await user.click(submitBtn);
  expect(await screen.findAllByRole('alert')).toHaveLength(requiredFieldsCount);
  expect(mockSubmission).not.toBeCalled();
});

test('when required fields are correct it should submit form', async () => {
  const user = userEvent.setup();
  render(
    <CustomForm
      buttonText="submit"
      isLoading={false}
      fields={mockFormFields}
      onSubmit={mockSubmission}
    />
  );

  await user.type(screen.getByLabelText(/firstname/i), 'carlos');
  await user.type(screen.getByLabelText(/age/i), '5');
  await user.type(screen.getByLabelText(/email/i), 'carlos@email.com');
  await user.type(screen.getByLabelText(/password/i), '123456');
  const submitBtn = screen.getByRole('button', { name: /submit/i });
  await user.click(submitBtn);

  expect(screen.queryAllByRole('alert')).toHaveLength(0);
  expect(mockSubmission).toHaveBeenCalledTimes(1);
});
