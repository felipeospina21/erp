import React from 'react';
import { render, cleanup, screen, within } from '@/utils/test-utils';
import userEvent from '@testing-library/user-event';
import ProductosPage from '@/pages/productos';
import preloadAll from 'jest-next-dynamic';
import { AuthCheck } from '@/components/Shared/AuthCheck/AuthCheck';

jest.mock('next/router', () => require('next-router-mock'));

afterEach(cleanup);
beforeEach(async () => await preloadAll())

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

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

describe('New product creation', () => {
  afterEach(cleanup);
  beforeEach(async () => await preloadAll())
  
  test('Success', async () => {
    const user = userEvent.setup();
    render(<ProductosPage />);
    await user.click(await screen.findByRole('button', {name: /agregar/i}))
    await screen.findByTestId('custom-modal')
    await user.type( screen.getByLabelText(/nombre/i), 'test name')
    await user.selectOptions( screen.getByLabelText(/categoria/i), 'test category')
    await user.type( screen.getByLabelText(/precio/i), '10000')
    await user.type( screen.getByLabelText(/inventario/i), '10')
    await user.click(screen.getByRole('button', {name:/crear/i}))
  
    const alert = await screen.findByRole('alert')
    expect(within(alert).getByText(/nuevo producto creado/i)).toBeInTheDocument();
  });

});

test.skip('Click update product and change name', async()=> {
  const user = userEvent.setup();
  render(<ProductosPage  />);
  const [modalContainer] = await screen.findAllByTestId('modal-container')
  const editButton = await within(modalContainer).findByRole('button', {name:/editar/i})
  await user.click(editButton)
  await screen.findByText(/actualizar producto/i)
  await user.type( screen.getByLabelText(/nombre/i), 'updated test name')
  const modal = screen.getByTestId('custom-modal')
  const updateBtn = within(modal).getByRole('button', {name:/modificar/i})
  await user.click(updateBtn)
  const product = await screen.findAllByText(/test prod/i)
  screen.debug(product)
  expect(product[0]).toBeInTheDocument()
})

test.todo('delete product')


