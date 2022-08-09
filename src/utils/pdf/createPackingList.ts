import { CheckoutData, Client, NewSaleOrderedProduct } from '@/redux/services';
import { addInvoiceData } from '@/utils/pdf';
import {
  addFooter,
  addLeftHeader,
  addLogo,
  addProducts,
  addTableBorder,
  savePDF,
  setPDFParams,
} from './pdfUtils';

export interface CreatePdfData extends CheckoutData {
  clientInfo: Client;
  orderedProducts: Array<NewSaleOrderedProduct>;
}

export async function createPackingList(
  data: CreatePdfData,
  docRef?: number,
  observations?: string
): Promise<void> {
  const { clientInfo, orderedProducts, subtotal, total, withholdingTax } = data;
  const tableBorderHight = orderedProducts.length * 5;

  const { pdfDoc, page, config } = await setPDFParams();
  page.setSize(config.page.width, config.page.height);
  addInvoiceData(page, clientInfo.paymentTerm, 'remisión', docRef, config);
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

  await savePDF(pdfDoc, `Remisión N° ${docRef} - ${clientInfo.name.toUpperCase()} - DLT`);
}
