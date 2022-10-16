import { PDFFont } from 'pdf-lib';

export interface FontsConfig {
  style_Regular: PDFFont;
  style_Bold: PDFFont;
}

export interface PageConfig {
  width: number;
  height: number;
  leftColX: number;
  rightColX: number;
}

export type ConfigProperty = { [val: string]: number };

export interface Config {
  page: PageConfig;
  y: ConfigProperty;
  lineHeight: ConfigProperty;
  fonts: {
    size_lg: number;
    size_md: number;
    size_sm: number;
    style_Regular: PDFFont;
    style_Bold: PDFFont;
  };
  table: {
    x: {
      col1: number;
      col2: number;
      col3: number;
      col4: number;
    };
  };
}

export interface BankData {
  header: string;
  name: string;
  id: string;
  accountType: string;
  accountNumber: string;
}
