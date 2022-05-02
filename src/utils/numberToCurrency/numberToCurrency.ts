export function numberToCurrency(num: number, locale?: string, currency?: string): string {
  return num.toLocaleString(locale ?? 'es-CO', {
    style: 'currency',
    currency: currency ?? 'COP',
  });
}
