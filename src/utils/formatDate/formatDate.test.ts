import { formatDate } from './formatDate';

describe('It should return a string with the format d/m/yyyy', () => {
  test('passing a date object as a parameter', () => {
    const date = new Date('December 17, 1995 03:24:00');
    expect(formatDate(date, 'es-CO')).toBe('17/12/1995');
  });

  test('passing a number as a parameter', () => {
    const date = 123456789;
    expect(formatDate(date, 'es-CO')).toBe('2/1/1970');
  });
});

describe('It should return a string with the format related below', () => {
  const formatObj: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };

  test('passing a date object as a parameter', () => {
    const date = new Date('December 17, 1995 03:24:00');
    expect(formatDate(date, 'es-CO', formatObj)).toBe('17 de dic. de 1995');
  });

  test('passing a number as a parameter', () => {
    const date = 123456789;
    expect(formatDate(date, 'es-CO', formatObj)).toBe('2 de ene. de 1970');
  });
});
