import { CheckoutData, Client, NewSaleOrderedProduct } from '@/redux/services';
import { addInvoiceData } from '@/utils/pdf';
import {
  addFooter,
  addLeftHeader,
  addLogo,
  addProducts,
  addRightHeader,
  addTableBorder,
  savePDF,
  setPDFParams,
} from './pdfUtils';

export interface CreatePdfData extends CheckoutData {
  clientInfo: Client;
  orderedProducts: Array<NewSaleOrderedProduct>;
}

export async function createInvoice(
  data: CreatePdfData,
  docNumber?: number,
  observations?: string
): Promise<void> {
  const { clientInfo, orderedProducts, subtotal, total, withholdingTax } = data;
  const bankData = {
    header: 'DEBE A',
    name: 'Catalina Restrepo',
    id: 'CC 1.039.454.392',
    accountType: 'Ahorros Bancolombia',
    accountNumber: 'N°693 657 886 85',
  };
  const tableBorderHight = orderedProducts.length * 15;

  const { pdfDoc, page, config } = await setPDFParams();
  page.setSize(config.page.width, config.page.height);
  addInvoiceData(page, clientInfo.paymentTerm, 'cuenta de cobro', docNumber, config, true);
  addLeftHeader(page, clientInfo, config);
  addRightHeader(page, bankData, config);
  addProducts(page, config, orderedProducts, total, subtotal, withholdingTax);
  addFooter(page, config, observations);
  addTableBorder(page, config, tableBorderHight);

  await addLogo(
    page,
    config,
    'https://res.cloudinary.com/felipeospina21/image/upload/v1654880464/logo_negro_ex0drc.png',
    pdfDoc
  );

  await savePDF(pdfDoc, `C. cobro N° ${docNumber} - ${clientInfo.name.toUpperCase()} - DLT`);
}
