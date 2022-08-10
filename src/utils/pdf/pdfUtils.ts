import { PDFDocument, StandardFonts, grayscale, PDFPage, PDFFont } from 'pdf-lib';
import download from 'downloadjs';
import { Client, NewSaleOrderedProduct, PaymentOptions } from '../../redux/services';
import { numberToCurrency, formatDate } from '..';

interface Config {
  page: {
    width: number;
    height: number;
    leftColX: number;
    rightColX: number;
    lineHeight: number;
  };
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

interface BankData {
  header: string;
  name: string;
  id: string;
  accountType: string;
  accountNumber: string;
}

export async function setPDFParams(): Promise<{
  pdfDoc: PDFDocument;
  page: PDFPage;
  config: Config;
}> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const pageConfig = {
    width: 545,
    height: 350,
    leftColX: 60,
    rightColX: 335,
    lineHeight: 15,
  };
  const config: Config = {
    page: pageConfig,
    fonts: {
      size_lg: 11,
      size_md: 10,
      size_sm: 9,
      style_Regular: helvetica,
      style_Bold: helveticaBold,
    },
    table: {
      x: {
        col1: pageConfig.leftColX + 5,
        col2: pageConfig.leftColX + 130,
        col3: pageConfig.leftColX + 235,
        col4: pageConfig.leftColX + 335,
      },
    },
  };
  return { pdfDoc, page, config };
}
export function addLeftHeader(page: PDFPage, clientInfo: Client, config: Config): void {
  const { name: clientName, idType, idNumber, addres1, addres2, city, department } = clientInfo;
  const {
    page: { height, leftColX },
    fonts: { style_Bold, style_Regular, size_md },
  } = config;
  const props = {
    x: leftColX,
    font: style_Regular,
    size: size_md,
  };

  page.drawText('CLIENTE', { ...props, font: style_Bold, y: height - 95 });
  page.drawText(clientName, { ...props, y: height - 107 });
  page.drawText(`${idType} ${idNumber}`, { ...props, y: height - 119 });
  page.drawText(`${addres1}. ${addres2}`, { ...props, y: height - 131 });
  page.drawText(`${city}, ${department}`, { ...props, y: height - 143 });
}

export function addRightHeader(page: PDFPage, bankData: BankData, config: Config): void {
  const { header, name, id, accountType, accountNumber } = bankData;
  const {
    page: { height, rightColX },
    fonts: { style_Bold, style_Regular, size_md },
  } = config;
  const props = {
    x: rightColX,
    font: style_Regular,
    size: size_md,
  };

  page.drawText(header, { ...props, font: style_Bold, y: height - 95 });
  page.drawText(name, { ...props, y: height - 107 });
  page.drawText(id, { ...props, y: height - 119 });
  page.drawText(accountType, { ...props, y: height - 131 });
  page.drawText(accountNumber, { ...props, y: height - 143 });
}

export function addInvoiceData(
  page: PDFPage,
  paymentTerm: PaymentOptions,
  docType: 'cuenta de cobro' | 'remisión',
  docNumber: number | undefined,
  config: Config,
  isInvoice = false
): void {
  const {
    page: { height, rightColX },
    fonts: { style_Bold, style_Regular, size_md },
  } = config;
  const props = {
    x: rightColX,
    font: style_Regular,
    size: size_md,
  };

  const invoiceDate = new Date();
  const dueDate = new Date();
  const formatedInvoiceDate = formatDate(invoiceDate, 'es', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  page.drawText(`${docType.toUpperCase()} N° ${docNumber}`, {
    ...props,
    font: style_Bold,
    y: height - 25,
  });
  page.drawText(`Fecha: ${formatedInvoiceDate}`, {
    ...props,
    y: height - 40,
  });
  if (isInvoice) {
    const formatedPaymentTerm = paymentTerm === 'contado' ? 0 : Number(paymentTerm);
    dueDate.setDate(invoiceDate.getDate() + formatedPaymentTerm);
    const formatedDueDate = formatDate(dueDate, 'es', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    page.drawText(`Vence: ${formatedDueDate}`, {
      ...props,
      y: height - 55,
    });
  }
}

export function addFooter(page: PDFPage, config: Config, observations?: string): void {
  const {
    page: { leftColX, rightColX },
    fonts: { style_Bold, style_Regular, size_md, size_sm },
  } = config;
  const propsBold = {
    font: style_Bold,
    size: size_md,
  };
  page.drawText('RECIBIDO POR:', {
    ...propsBold,
    x: leftColX,
    y: 50,
  });
  page.drawText('OBSERVACIONES:', {
    ...propsBold,
    x: rightColX,
    y: 50,
  });
  page.drawText(observations ?? '', {
    ...propsBold,
    font: style_Regular,
    x: rightColX,
    y: 35,
  });

  page.drawText(
    'DE LA TIERRA - Cll 6 sur # 50 - 30. Medellín - Cel. 304 4070005 - WP 305 4806327',
    { font: style_Regular, size: size_sm, x: leftColX * 2, y: 15 }
  );
}

export function addTableHeader(page: PDFPage, config: Config, hasPrices = true): void {
  const {
    page: { height },
    fonts: { style_Bold, size_md },
    table: {
      x: { col1, col2, col3, col4 },
    },
  } = config;
  const props = {
    font: style_Bold,
    size: size_md,
  };

  page.drawText('PRODUCTO', {
    ...props,
    x: col1,
    y: height - 175,
  });
  page.drawText('CANTIDAD', {
    ...props,
    x: hasPrices ? col2 : col3,
    y: height - 175,
  });
  if (hasPrices) {
    page.drawText('PRECIO', {
      ...props,
      x: col3,
      y: height - 175,
    });
    page.drawText('TOTAL', {
      ...props,
      x: col4,
      y: height - 175,
    });
  }
}

export function addProducts(
  page: PDFPage,
  config: Config,
  orderedProducts: NewSaleOrderedProduct[],
  total: number,
  subtotal: number,
  withholdingTax?: number,
  hasPrices = true
): void {
  let newLineY = 175;
  addTableHeader(page, config, hasPrices);
  const {
    page: { height, lineHeight },
    fonts: { style_Regular, size_sm },
    table: {
      x: { col1, col2, col3, col4 },
    },
  } = config;
  const props = {
    font: style_Regular,
    size: size_sm,
    y: height - newLineY,
  };

  orderedProducts.forEach((product) => {
    const price = product.price ?? 0;
    const discount = product.discount / 100;
    const discountedPrice = price - price * discount;
    newLineY += lineHeight;
    props.y = height - newLineY;
    page.drawText(product.productId ?? '', {
      ...props,
      x: col1,
    });
    page.drawText(String(product.quantity), {
      ...props,
      x: hasPrices ? col2 : col3,
    });

    if (hasPrices) {
      page.drawText(discountedPrice.toLocaleString('es-CO'), {
        ...props,
        x: col3,
      });
      page.drawText(product.rowTotal.toLocaleString('es-CO'), {
        ...props,
        x: col4,
      });
    }
  });

  if (hasPrices) {
    addTableFooter(page, config, newLineY, total, subtotal, withholdingTax);
  }
}

export function addTableFooter(
  page: PDFPage,
  config: Config,
  newLineY: number,
  total: number,
  subtotal: number,
  withholdingTax?: number
): void {
  const {
    page: { height, lineHeight },
    fonts: { style_Regular, size_sm },
    table: {
      x: { col3, col4 },
    },
  } = config;
  const props = {
    font: style_Regular,
    size: size_sm,
    y: height - newLineY,
  };
  page.drawLine({
    start: { x: col3, y: height - newLineY - 10 },
    end: { x: col4 + 50, y: height - newLineY - 10 },
  });
  newLineY += lineHeight + 5;
  if (withholdingTax) {
    // Subtotal
    props.y = height - newLineY;
    page.drawText('SUBTOTAL', {
      ...props,
      x: col3,
    });
    page.drawText(subtotal.toLocaleString('es-CO'), {
      ...props,
      x: col4,
    });

    // RteFuente
    newLineY += lineHeight;
    props.y = height - newLineY;
    page.drawText('Rte Fte', {
      ...props,
      x: col3,
    });
    page.drawText(`- ${withholdingTax.toLocaleString('es-CO')}`, {
      ...props,
      x: col4,
    });
  }

  // Total
  newLineY += lineHeight;
  props.y = height - newLineY;
  page.drawText('TOTAL A PAGAR', {
    ...props,
    x: col3,
  });
  page.drawText(numberToCurrency(total), {
    ...props,
    x: col4,
  });
}

export function addTableBorder(page: PDFPage, config: Config, tableBorderHeight: number): void {
  const {
    page: { leftColX, width },
  } = config;

  page.drawRectangle({
    x: leftColX,
    y: 122 - tableBorderHeight,
    width: width - 130,
    height: 65 + tableBorderHeight,
    borderWidth: 1,
    borderColor: grayscale(0.5),
    opacity: 0.5,
    borderOpacity: 0.75,
  });
}

/**
 * @param  {PDFPage} page
 * @param  {Config} config
 * @param  {string} logoUrl //Must be a PNG
 * @param  {PDFDocument} pdfDoc
 * @returns Promise
 */
export async function addLogo(
  page: PDFPage,
  config: Config,
  logoUrl: string,
  pdfDoc: PDFDocument
): Promise<void> {
  const {
    page: { leftColX, height },
  } = config;
  const pngImageBytes = await fetch(logoUrl).then((res) => res.arrayBuffer());
  const jpgImage = await pdfDoc.embedPng(pngImageBytes);
  page.drawImage(jpgImage, {
    x: leftColX,
    y: height - 80,
    width: 80,
    height: 70,
  });
}

export async function savePDF(pdfDoc: PDFDocument, fileName: string): Promise<void> {
  try {
    const pdfBytes = await pdfDoc.save();
    download(pdfBytes, `${fileName}.pdf`, 'application/pdf');
  } catch (error) {
    console.log(error);
  }
}
