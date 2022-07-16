import { PDFDocument, StandardFonts, grayscale } from 'pdf-lib';
import download from 'downloadjs';
import { Client, NewSaleOrderedProduct, CheckoutData } from '../redux/services';
import { numberToCurrency, formatDate } from './';

export interface CreatePdfData extends CheckoutData {
  clientInfo: Client;
  orderedProducts: Array<NewSaleOrderedProduct>;
}
export async function createPdf(
  data: CreatePdfData,
  invoice?: number,
  observations?: string
): Promise<void> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const {
    clientInfo: {
      name: clientName,
      idType,
      idNumber,
      addres1,
      addres2,
      city,
      department,
      paymentTerm,
    },
    orderedProducts,
    subtotal,
    total,
    withholdingTax,
  } = data;
  const pageConfig = {
    width: 545,
    height: 350,
    leftColX: 60,
    rightColX: 335,
    lineHeight: 15,
  };

  const { width, height, leftColX, rightColX, lineHeight } = pageConfig;
  const tablePositionX = {
    col1: leftColX + 5,
    col2: leftColX + 130,
    col3: leftColX + 235,
    col4: leftColX + 335,
  };

  const fontStyles = {
    size: 10,
    font: helvetica,
  };

  function addInvoiceData(): void {
    const invoiceDate = new Date();
    const dueDate = new Date();
    const formatedPaymentTerm = paymentTerm === 'contado' ? 0 : Number(paymentTerm);
    dueDate.setDate(invoiceDate.getDate() + formatedPaymentTerm);
    const formatedInvoiceDate = formatDate(invoiceDate, 'es', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    const formatedDueDate = formatDate(dueDate, 'es', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    page.drawText(`CUENTA DE COBRO N° ${invoice}`, {
      ...fontStyles,
      font: helveticaBold,
      x: rightColX,
      y: height - 25,
    });
    page.drawText(`Fecha: ${formatedInvoiceDate}`, {
      ...fontStyles,
      x: rightColX,
      y: height - 40,
    });
    page.drawText(`Vence: ${formatedDueDate}`, {
      ...fontStyles,
      x: rightColX,
      y: height - 55,
    });
  }

  function addLeftHeader(): void {
    const props = {
      x: leftColX,
      ...fontStyles,
    };
    page.drawText('CLIENTE', { ...props, font: helveticaBold, y: height - 95 });
    page.drawText(clientName, { ...props, y: height - 107 });
    page.drawText(`${idType} ${idNumber}`, { ...props, y: height - 119 });
    page.drawText(`${addres1}. ${addres2}`, { ...props, y: height - 131 });
    page.drawText(`${city}, ${department}`, { ...props, y: height - 143 });
  }

  function addRightHeader(): void {
    const props = {
      x: rightColX,
      ...fontStyles,
    };
    page.drawText('DEBE A', { ...props, font: helveticaBold, y: height - 95 });
    page.drawText('Catalina Restrepo', { ...props, y: height - 107 });
    page.drawText('CC 1.039.454.392', { ...props, y: height - 119 });
    page.drawText('Ahorros Bancolombia', { ...props, y: height - 131 });
    page.drawText('N°693 657 886 85', { ...props, y: height - 143 });
  }

  function addTableHeader(): void {
    page.drawText('PRODUCTO', {
      ...fontStyles,
      font: helveticaBold,
      x: tablePositionX.col1,
      y: height - 175,
    });
    page.drawText('CANTIDAD', {
      ...fontStyles,
      font: helveticaBold,
      x: tablePositionX.col2,
      y: height - 175,
    });
    page.drawText('PRECIO', {
      ...fontStyles,
      font: helveticaBold,
      x: tablePositionX.col3,
      y: height - 175,
    });
    page.drawText('TOTAL', {
      ...fontStyles,
      font: helveticaBold,
      x: tablePositionX.col4,
      y: height - 175,
    });
  }
  let newLineY = 175;

  function addProducts(): void {
    addTableHeader();
    const props = { ...fontStyles, size: 9, y: height - newLineY };
    orderedProducts.forEach((product) => {
      const price = product.price ?? 0;
      const discount = product.discount / 100;
      const discountedPrice = price - price * discount;
      newLineY += lineHeight;
      props.y = height - newLineY;
      page.drawText(product.name ?? '', {
        ...props,
        x: tablePositionX.col1,
      });
      page.drawText(String(product.quantity), {
        ...props,
        x: tablePositionX.col2,
      });
      page.drawText(numberToCurrency(discountedPrice), {
        ...props,
        x: tablePositionX.col3,
      });
      page.drawText(numberToCurrency(product.rowTotal), {
        ...props,
        x: tablePositionX.col4,
      });
    });

    page.drawLine({
      start: { x: tablePositionX.col3, y: height - newLineY - 10 },
      end: { x: tablePositionX.col4 + 50, y: height - newLineY - 10 },
    });
    newLineY += lineHeight + 5;
    if (withholdingTax) {
      // Subtotal
      props.y = height - newLineY;
      page.drawText('SUBTOTAL', {
        ...props,
        x: tablePositionX.col3,
      });
      page.drawText(numberToCurrency(subtotal), {
        ...props,
        x: tablePositionX.col4,
      });

      // RteFuente
      newLineY += lineHeight;
      props.y = height - newLineY;
      page.drawText('Rte Fte', {
        ...props,
        x: tablePositionX.col3,
      });
      page.drawText(numberToCurrency(-withholdingTax), {
        ...props,
        x: tablePositionX.col4,
      });
    }

    // Total
    newLineY += lineHeight;
    props.y = height - newLineY;
    page.drawText('TOTAL A PAGAR', {
      ...props,
      x: tablePositionX.col3,
    });
    page.drawText(numberToCurrency(total), {
      ...props,
      x: tablePositionX.col4,
    });
  }

  function addFooter(): void {
    page.drawText('OBSERVACIONES:', {
      ...fontStyles,
      font: helveticaBold,
      x: leftColX,
      y: 50,
    });
    page.drawText(observations ?? '', {
      ...fontStyles,
      x: leftColX,
      y: 35,
    });
    page.drawText('RECIBIDO POR:', {
      ...fontStyles,
      font: helveticaBold,
      x: rightColX,
      y: 50,
    });
    page.drawText(
      'DE LA TIERRA - Cll 6 sur # 50 - 30. Medellín - Cel. 304 4070005 - WP 305 4806327',
      { ...fontStyles, size: 9, x: leftColX * 2, y: 15 }
    );
  }

  page.setSize(width, height);
  addInvoiceData();
  addLeftHeader();
  addRightHeader();
  addProducts();
  addFooter();
  page.drawRectangle({
    x: leftColX,
    y: 122 - orderedProducts.length * 15,
    width: width - 130,
    height: 65 + orderedProducts.length * 15,
    borderWidth: 1,
    borderColor: grayscale(0.5),
    opacity: 0.5,
    borderOpacity: 0.75,
  });

  const pngUrl =
    'https://res.cloudinary.com/felipeospina21/image/upload/v1654880464/logo_negro_ex0drc.png';
  const pngImageBytes = await fetch(pngUrl).then((res) => res.arrayBuffer());
  const jpgImage = await pdfDoc.embedPng(pngImageBytes);
  page.drawImage(jpgImage, {
    x: leftColX,
    y: height - 80,
    width: 80,
    height: 70,
  });

  try {
    const pdfBytes = await pdfDoc.save();
    download(pdfBytes, 'pdf-lib_creation_example.pdf', 'application/pdf');
  } catch (error) {
    console.log(error);
  }
}
