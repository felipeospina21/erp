import { render, screen } from '@/utils/test-utils';
import preloadAll from 'jest-next-dynamic';
import React from 'react';
import HomePage from '../src/pages/index';

jest.mock('next/router', () => require('next-router-mock'));

test('should render home title when authorized', () => {
  render(<HomePage isAuth={true} />);
  expect(screen.getByText(/home/i)).toBeInTheDocument();
});

test('should not render home page when not authorized, instead it should render login', async () => {
  await preloadAll();
  render(<HomePage isAuth={false} />);
  await screen.findByRole('heading', { level: 1, name: /login/i });
  expect(screen.queryByText(/home/i)).not.toBeInTheDocument();
});
