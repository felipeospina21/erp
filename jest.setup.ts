import '@testing-library/jest-dom/extend-expect';
import { server } from '@/utils/test-utils/msw/mockServer'
import { mockStore } from '@/utils/test-utils';
import { userApi } from '@/redux/services';

beforeAll(() =>
  server.listen({
    onUnhandledRequest: ({  method, url }) => {
      // eslint-disable-next-line no-console
      console.error(`Error unhandled request method: ${method}, url: ${url}`);
    }
  })
);

afterEach(() => {
  server.resetHandlers()
  mockStore.dispatch(userApi.util.resetApiState())
});

afterAll(() => server.close());