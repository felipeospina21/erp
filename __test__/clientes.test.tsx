import React from 'react';
import { render, cleanup, screen, within } from '@/utils/test-utils/customRender';
import userEvent from '@testing-library/user-event';
import ClientesPage from '@/pages/clientes'
import { clients } from '@/utils/test-utils/mockData'

afterEach(cleanup);

const { name: clientName, idNumber } = clients[0]

test('should render table with clients data, { name, idNubmer } ', async () => {
  render(<ClientesPage/>)
  await screen.findByRole('table')
  await screen.findByRole('gridcell', { name: clientName })
  await screen.findByRole('gridcell', { name: idNumber })
 });

test('When clicking create new client button it should open the form', async () => {
  const user = userEvent.setup();
  render(<ClientesPage/>);

  const newClientBtn = await screen.findByRole('button', { name: /nuevo cliente/i })
  await user.click(newClientBtn)

  const form = await screen.findByRole('form', { name: 'new-client-form' })
  const nameInput = await within(form).findByRole('textbox', { name: /cliente/i })

  expect(form).toBeInTheDocument()
  expect(nameInput).toBeInTheDocument()
});