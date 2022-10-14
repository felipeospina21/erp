import type { Config, PageConfig } from './types';
import { PDFFont } from 'pdf-lib';

export function pdfConfig(page: PageConfig, font: { regular: PDFFont; bold: PDFFont }): Config {
  return {
    page,
    y: {
      _1: page.height - 25,
      _2: page.height - 95,
      _3: page.height - 175,
      _4: page.height - 1,
      _5: page.height - 1,
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
