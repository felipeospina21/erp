import { PDFDocument, grayscale, PDFPage, PDFFont } from 'pdf-lib';
import download from 'downloadjs';
import type { Client, NewSaleOrderedProduct, PaymentOptions } from '@/redux/services';
import { numberToCurrency, formatDate, FontsConfig } from '..';
import type { Config, BankData } from './types';
import { Discount } from '@/components/Sales/OpenSales/InvoiceOptions';

interface Props {
  x: number | number[];
  y: number;
  font: PDFFont;
  size: number;
  lineSpace: number;
}

type TextStyle = 'bold' | 'regular' | 'boldFirst';

function getLineHeight(y: number, i: number, lineSpace: number): number {
  return y - i * lineSpace;
}

function drawTextBlock(
  list: Array<string>,
  page: PDFPage,
  props: Props,
  font: FontsConfig,
  textStyle: TextStyle
): void {
  list.forEach((text, idx) => {
    if (idx === 0 && textStyle === 'boldFirst') props.font = font.style_Bold;
    else if (textStyle === 'bold') props.font = font.style_Bold;
    else props.font = font.style_Regular;

    if (Array.isArray(props.x)) {
      page.drawText(text, {
        ...props,
        x: props.x[idx],
        y: getLineHeight(props.y, idx, props.lineSpace),
      });
    }

    if (typeof props.x === 'number') {
      page.drawText(text, {
        ...props,
        x: props.x,
        y: getLineHeight(props.y, idx, props.lineSpace),
      });
    }
  });
}

export async function createPDF(): Promise<{
  pdfDoc: PDFDocument;
  page: PDFPage;
}> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();

  return { pdfDoc, page };
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
    page: { rightColX },
    fonts: { style_Bold, style_Regular, size_md },
    y,
  } = config;
  const props = {
    x: rightColX,
    y: y._1,
    font: style_Regular,
    size: size_md,
    lineSpace: 15,
  };

  const invoiceDate = new Date();
  const dueDate = new Date();
  const formatedInvoiceDate = formatDate(invoiceDate, 'es', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  let formatedDueDate;
  const docTypeHeader = `${docType.toUpperCase()} N° ${docNumber}`;
  const dateHeader = `Fecha: ${formatedInvoiceDate}`;
  const textsList = [docTypeHeader, dateHeader];

  if (isInvoice) {
    const formatedPaymentTerm = paymentTerm === 'contado' ? 0 : Number(paymentTerm);
    dueDate.setDate(invoiceDate.getDate() + formatedPaymentTerm);
    formatedDueDate = formatDate(dueDate, 'es', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    const dueDateHeader = `Vence: ${formatedDueDate}`;
    textsList.push(dueDateHeader);
  }

  drawTextBlock(textsList, page, props, { style_Regular, style_Bold }, 'boldFirst');
}

export function addLeftHeader(page: PDFPage, clientInfo: Client, config: Config): void {
  const { name: clientName, idType, idNumber, addres1, addres2, city, department } = clientInfo;
  const {
    y,
    page: { leftColX },
    fonts: { style_Bold, style_Regular, size_md },
  } = config;
  const props = {
    x: leftColX,
    y: y._2,
    lineSpace: 12,
    font: style_Regular,
    size: size_md,
  };
  const clientId = `${idType} ${idNumber}`;
  const clientAddress = `${addres1}. ${addres2}`;
  const clientCity = `${city}, ${department}`;
  const linesText = ['CLIENTE', clientName, clientId, clientAddress, clientCity];

  drawTextBlock(linesText, page, props, { style_Regular, style_Bold }, 'boldFirst');
}

export function addRightHeader(page: PDFPage, bankData: BankData, config: Config): void {
  const { header, name, id, accountType, accountNumber } = bankData;
  const {
    y,
    page: { rightColX },
    fonts: { style_Bold, style_Regular, size_md },
  } = config;
  const props = {
    x: rightColX,
    y: y._2,
    lineSpace: 12,
    font: style_Regular,
    size: size_md,
  };

  const textsList = [header, name, id, accountType, accountNumber];
  drawTextBlock(textsList, page, props, { style_Regular, style_Bold }, 'boldFirst');
}

export function addTableHeader(page: PDFPage, config: Config, hasPrices = true): void {
  const {
    y,
    fonts: { style_Regular, style_Bold, size_md },
    table: {
      x: { col1, col2, col3, col4 },
    },
  } = config;
  const xArr = [col1];
  const textList = ['PRODUCTO', 'CANTIDAD'];
  if (hasPrices) {
    xArr.push(col2, col3, col4);
    textList.push('PRECIO', 'TOTAL');
  } else {
    xArr.push(col3);
  }
  const props = {
    x: xArr,
    y: y._3,
    lineSpace: 0,
    font: style_Bold,
    size: size_md,
  };

  drawTextBlock(textList, page, props, { style_Regular, style_Bold }, 'bold');
}

export function addProducts(
  page: PDFPage,
  config: Config,
  orderedProducts: Array<NewSaleOrderedProduct>,
  total: number,
  subtotal: number,
  withholdingTax?: number,
  hasPrices = true,
  discounts?: Discount[]
): void {
  let newLineY = config.page.height - config.y._3;
  addTableHeader(page, config, hasPrices);
  const {
    page: { height },
    lineHeight,
    y,
    fonts: { style_Regular, size_sm, style_Bold },
    table: {
      x: { col1, col2, col3, col4 },
    },
  } = config;
  const xArr = [col1];
  if (hasPrices) {
    xArr.push(col2, col3, col4);
  } else {
    xArr.push(col3);
  }
  const props = {
    font: style_Regular,
    size: size_sm,
    y: y._3,
    x: xArr,
    lineSpace: 0,
  };

  orderedProducts.forEach((product) => {
    const price = product.price ?? 0;
    const discount = product.discount / 100;
    const discountedPrice = price - price * discount;

    const id = product.productId ?? '';
    const quantity = String(product.quantity);
    const textList = [id, quantity];
    if (hasPrices) {
      const newDiscPrice = discountedPrice.toLocaleString('es-CO');
      const newRowTotal = product.rowTotal.toLocaleString('es-CO');
      textList.push(newDiscPrice, newRowTotal);
    }

    newLineY += lineHeight._15;
    props.y = height - newLineY;
    drawTextBlock(textList, page, props, { style_Regular, style_Bold }, 'regular');
  });

  if (hasPrices) {
    addTableFooter(page, config, newLineY, total, subtotal, withholdingTax, discounts);
  }
}

export function addTableFooter(
  page: PDFPage,
  config: Config,
  newLineY: number,
  total: number,
  subtotal: number,
  withholdingTax?: number,
  discounts?: Discount[]
): void {
  const {
    page: { height },
    lineHeight,
    fonts: { style_Regular, style_Bold, size_sm },
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
  newLineY += lineHeight._15 + 5;

  function drawFooterText(concept: string, value: string): void {
    props.y = height - newLineY;
    page.drawText(concept, {
      ...props,
      x: col3,
    });
    page.drawText(value, {
      ...props,
      x: col4,
    });
    newLineY += lineHeight._15;
  }

  if (withholdingTax || (discounts && discounts[0].concept)) {
    // Subtotal
    drawFooterText('SUBTOTAL', subtotal.toLocaleString('es-CO'));
  }

  if (withholdingTax) {
    // withholdingTax
    drawFooterText('Rte Fte', `- ${withholdingTax.toLocaleString('es-CO')}`);
  }

  if (discounts && discounts[0].concept) {
    // discounts
    for (const discount of discounts) {
      if (discount.concept && discount.value) {
        const concept = `Dto ${discount.concept} (${discount.value}%)`;
        const calculatedVal = subtotal * (discount.value / 100);
        const value = `- ${calculatedVal.toLocaleString('es-CO')}`;
        drawFooterText(concept, value);
      }
    }
  }

  // Total
  props.y = height - newLineY;
  props.font = style_Bold;
  drawFooterText('TOTAL A PAGAR', numberToCurrency(total));
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

export function addFooter(page: PDFPage, config: Config, observations?: string): void {
  const {
    page: { leftColX, rightColX },
    fonts: { style_Bold, style_Regular, size_md, size_sm },
  } = config;
  const propsBold = {
    font: style_Bold,
    size: size_md,
    y: config.y._f1,
  };

  const textList = [
    'RECIBIDO POR:',
    'OBSERVACIONES:',
    observations ?? '',
    'DE LA TIERRA - Cll 6 sur # 50 - 30. Medellín - Cel. 324 6813404 - WP 305 4806327',
  ];
  const props = [
    { ...propsBold, x: leftColX },
    { ...propsBold, x: rightColX },
    { ...propsBold, font: style_Regular, y: config.y._f2, x: rightColX },
    { ...propsBold, font: style_Regular, y: config.y._f3, x: leftColX * 2, size: size_sm },
  ];
  textList.forEach((text, i) => {
    page.drawText(text, { ...props[i] });
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
    page: { leftColX },
    y,
  } = config;
  const pngImageBytes = await fetch(logoUrl).then((res) => res.arrayBuffer());
  const jpgImage = await pdfDoc.embedPng(pngImageBytes);
  page.drawImage(jpgImage, {
    x: leftColX,
    y: y._logo,
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
