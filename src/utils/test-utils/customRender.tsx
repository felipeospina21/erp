import React, { FC, ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '@/styles/theme';
import { mockStore } from '@/utils/test-utils';

const AllTheProviders: FC = ({ children }) => {
  return (
    <Provider store={mockStore}>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </Provider>
  );
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
