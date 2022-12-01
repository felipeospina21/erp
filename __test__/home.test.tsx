import { AuthCheck } from '@/components/Shared/AuthCheck/AuthCheck';
import { render, screen } from '@/utils/test-utils';
import preloadAll from 'jest-next-dynamic';
import React from 'react';
import HomePage from '../src/pages/index';

jest.mock('next/router', () => require('next-router-mock'));

test('should render home title when authorized', () => {
  render(<HomePage />);
  expect(screen.getByText(/home/i)).toBeInTheDocument();
});

test('should not render home page when not authorized, instead it should render login', async () => {
  await preloadAll();
  render(
    <AuthCheck>
      <HomePage />
    </AuthCheck>
  );
  await screen.findByText(/loading/i);
  expect(screen.queryByText(/home/i)).not.toBeInTheDocument();
});
