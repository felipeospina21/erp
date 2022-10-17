import type { Config } from './types';
import { PDFFont } from 'pdf-lib';

type PDFConfigTheme = Pick<Config, 'page' | 'y'>;

export function pdfConfig(
  config: PDFConfigTheme,
  font: { regular: PDFFont; bold: PDFFont }
): Config {
  const { page, y } = config;
  return {
    page,
    y: {
      _1: page.height - y._1,
      _2: page.height - y._2,
      _3: page.height - y._3,
      _f1: y._f1,
      _f2: y._f2,
      _f3: y._f3,
      _logo: page.height - y._logo,
    },
    lineHeight: {
      _12: 12,
      _15: 15,
    },
    fonts: {
      size_lg: 11,
      size_md: 10,
      size_sm: 9,
      style_Regular: font.regular,
      style_Bold: font.bold,
    },
    table: {
      x: {
        col1: page.leftColX + 5,
        col2: page.leftColX + 130,
        col3: page.leftColX + 235,
        col4: page.leftColX + 335,
      },
    },
  };
}
