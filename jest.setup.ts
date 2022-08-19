import '@testing-library/jest-dom/extend-expect';
import 'whatwg-fetch';
import { server } from '@/utils/test-utils/msw/mockServer';
import { mockStore } from '@/utils/test-utils';
import { userApi } from '@/redux/services';

beforeAll(() => {
  server.listen({
    onUnhandledRequest: ({ method, url }) => {
      // eslint-disable-next-line no-console
      console.error(`Error unhandled request method: ${method}, url: ${url}`);
    },
  });

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

afterEach(() => {
  server.resetHandlers();
  mockStore.dispatch(userApi.util.resetApiState());
});

afterAll(() => server.close());
