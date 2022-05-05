export function formatDate(
  date: number | Date | undefined,
  locale?: string | string[] | undefined,
  options?: Intl.DateTimeFormatOptions | undefined
): string {
  return new Intl.DateTimeFormat(locale, options).format(date);
}
