import { thousandSeparator } from '../src/utils/utils';

test('convert number into string separating thousands with comma', () => {
  const value = thousandSeparator(1000);
  expect(value).toBe('1,000');
});

test('convert number ', () => {
  const value = thousandSeparator(5980.0, 2);
  expect(value).toBe('5,980.00');
});
