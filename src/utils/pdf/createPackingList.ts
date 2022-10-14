import { CheckoutData, Client, NewSaleOrderedProduct, SaleSummary } from '@/redux/services';
import { addInvoiceData } from '@/utils/pdf';
import { StandardFonts } from 'pdf-lib';
import {
  addFooter,
  addLeftHeader,
  addLogo,
  addProducts,
  addTableBorder,
  savePDF,
  createPDF,
} from './pdfUtils';

export interface CreatePdfData extends SaleSummary, Partial<CheckoutData> {
  clientInfo: Client;
}

export interface CreatePackingList extends CreatePdfData {
  orderedProducts: Array<NewSaleOrderedProduct>;
}

export async function createPackingList(
  data: CreatePackingList,
  docRef: number,
  idx: number,
  observations?: string
): Promise<void> {
  const { pdfDoc, page } = await createPDF();
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const pageConfig = {
    width: 545,
    height: 350,
    leftColX: 60,
    rightColX: 335,
    lineHeight: 15,
  };

  const config = {
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

  const { clientInfo, orderedProducts, subtotal, total, withholdingTax } = data;
  const tableBorderHight = orderedProducts.length * 5;
  const newRef = docRef + idx;

  page.setSize(config.page.width, config.page.height);
  addInvoiceData(page, clientInfo.paymentTerm, 'remisión', newRef, config);
  addLeftHeader(page, clientInfo, config);

  addProducts(page, config, orderedProducts, total, subtotal, withholdingTax, false);
  addFooter(page, config, observations);
  addTableBorder(page, config, tableBorderHight);

  await addLogo(
    page,
    config,
    'https://res.cloudinary.com/felipeospina21/image/upload/v1654880464/logo_negro_ex0drc.png',
    pdfDoc
  );

  await savePDF(pdfDoc, `Remisión N° ${newRef} - ${clientInfo.name.toUpperCase()} - DLT`);
}
