import React from 'react';
import { render, cleanup, screen, within } from '@/utils/test-utils';
import userEvent from '@testing-library/user-event';
import ProductosPage from '@/pages/productos';
import { AuthCheck } from '@/components/Shared/AuthCheck/AuthCheck';

jest.mock('next/router', () => require('next-router-mock'));

afterEach(cleanup);

test('When unauthorized it should render login view ', async () => {
  render(<AuthCheck><ProductosPage /></AuthCheck>);
  expect(await screen.findByText(/loading/i)).toBeInTheDocument()
});

test('When authorized it should render skeleton while loading ', () => {
  render(<ProductosPage  />);
  expect(screen.getByTestId('cards-skeleton')).toBeInTheDocument()
});

test('When authorized it should render product cards after loading ', async () => {
  render(<ProductosPage  />);
  expect( await screen.findByText(/test prod 1/i)).toBeInTheDocument()
});


test('Click add stock button', async()=> {
  const user = userEvent.setup();
  render(<ProductosPage  />);
  const addStockInBatch = await screen.findByRole('button', {name:/adicionar inventarios/i})
  await user.click(addStockInBatch)
  await user.type( await screen.findByRole('textbox', {name: /prod 1/i}), '5')
  await user.click(screen.getByRole('button', { name:/actualizar/i}))
  
  const alert = await screen.findByRole('alert')
  expect(within(alert).getByText(/inventario actualizado/i)).toBeInTheDocument();  
})

describe('New product creation', () => {
  afterEach(cleanup);
  
  test('Success', async () => {
    const user = userEvent.setup();
    render(<ProductosPage />);
    await user.click(await screen.findByRole('button', {name: /agregar/i}))
    await screen.findByTestId('custom-modal')
    await user.type( screen.getByLabelText(/nombre/i), 'test name')
    await user.selectOptions( screen.getByLabelText(/categoria/i), 'test category')
    await user.type( screen.getByLabelText(/precio/i), '10000')
    await user.type( screen.getByRole('textbox', {name: /inventario/i} ), '10')
    await user.click(screen.getByRole('button', {name:/crear/i}))
  
    const alert = await screen.findByRole('alert')
    expect(within(alert).getByText(/nuevo producto creado/i)).toBeInTheDocument();
  });

});
test.todo('delete product')


