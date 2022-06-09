import React from 'react';
import { render, cleanup, screen, waitFor, within } from '@/utils/test-utils';
import userEvent from '@testing-library/user-event';
import Login from '../src/pages/login';
import Router from 'next/router';
import mockRouter from 'next-router-mock';

jest.mock('next/router', () => require('next-router-mock'));

afterEach(cleanup);

beforeEach(() => {
  mockRouter.setCurrentUrl('/login');
});

test('On successful login it should redirect to Home page', async () => {
  const user = userEvent.setup();
  render(<Login />);
  await user.type(screen.getByLabelText(/email/i), 'test@email.com');
  await user.type(screen.getByLabelText(/password/i), '1234567890');
  await user.click(screen.getByRole('button', { name: /login/i }));
  await waitFor(() => {
    expect(Router.pathname).toBe('/');
  });
});

describe('On login error it should not redirect &', ()=>{
  it('should render wrong password error toast', async () => {
    const user = userEvent.setup();
    render(<Login />);
    await user.type(screen.getByLabelText(/email/i), 'unauthorized@email.com');
    await user.type(screen.getByLabelText(/password/i), '1234567890');
    await user.click(screen.getByRole('button', { name: /login/i }));
    const alert = await screen.findByRole('alert');
    expect(within(alert).getByText(/wrong password/i)).toBeInTheDocument();
    expect(Router.pathname).toBe('/login')
  });

  it('should render user not found error toast', async () => {
    const user = userEvent.setup();
    render(<Login />);
    await user.type(screen.getByLabelText(/email/i), 'notfound@email.com');
    await user.type(screen.getByLabelText(/password/i), '1234567890');
    await user.click(screen.getByRole('button', { name: /login/i }));
    const alert = await screen.findByRole('alert');
    expect(within(alert).getByText(/user not found/i)).toBeInTheDocument();
    expect(Router.pathname).toBe('/login')
  });

  it('should render network error toast', async () => {
    const user = userEvent.setup();
    render(<Login />);
    await user.type(screen.getByLabelText(/email/i), 'nonetwork@email.com');
    await user.type(screen.getByLabelText(/password/i), '1234567890');
    await user.click(screen.getByRole('button', { name: /login/i }));
    const alert = await screen.findByRole('alert');
    expect(within(alert).getByText(/network error/i)).toBeInTheDocument();
    expect(Router.pathname).toBe('/login')
  });
})

