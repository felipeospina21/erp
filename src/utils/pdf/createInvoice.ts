import { Client, NewSaleOrderedProduct, OrderedProduct } from '@/redux/services';
import { addInvoiceData } from '@/utils/pdf';
import { StandardFonts } from 'pdf-lib';
import { CreatePdfData } from './createPackingList';
import {
  addFooter,
  addLeftHeader,
  addLogo,
  addProducts,
  addRightHeader,
  // addTableBorder,
  savePDF,
  createPDF,
} from './pdfUtils';
import { pdfConfig } from './pdfConfig';
import { Discount } from '@/components/Sales/OpenSales/InvoiceOptions';

export interface CreateInvoice extends CreatePdfData {
  orderedProducts: Array<OrderedProduct>;
}

// export type InvoiceProducts = Pick<NewSaleOrderedProduct, 'quantity' | 'price' | 'discount' | 'productId' | 'rowTotal'>

export async function createInvoice(
  data: CreateInvoice,
  client: Client,
  docNumber?: number,
  observations?: string,
  discounts?: Discount[]
): Promise<void> {
  const { pdfDoc, page } = await createPDF();
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const invoiceConfig = {
    page: {
      width: 545,
      height: 700,
      leftColX: 60,
      rightColX: 335,
    },
    y: {
      _1: 55,
      _2: 140,
      _3: 235,
      _f1: 115,
      _f2: 85,
      _f3: 15,
      _logo: 100,
    },
  };

  const config = pdfConfig(invoiceConfig, { regular: helvetica, bold: helveticaBold });

  const { orderedProducts, subtotal, total, withholdingTax, paymentTerm } = data;
  const bankData = {
    header: 'DEBE A',
    name: 'Marcela Murillo Ramirez',
    id: 'CC 43.204.148',
    accountType: 'Ahorros Bancolombia',
    accountNumber: 'N°102 822034 31',
  };
  // const tableBorderHight = orderedProducts.length * 15;
  const formatedOrderedProducts: Array<NewSaleOrderedProduct> = orderedProducts.map(
    ({ quantity, rowTotal, discount, item, rowId }) => ({
      quantity,
      rowTotal,
      discount,
      rowId,
      item: item.name,
      productId: item.name,
      price: item.price,
      stock: item.stockAvailable,
    })
  );

  page.setSize(config.page.width, config.page.height);
  addInvoiceData(
    page,
    paymentTerm ?? client.paymentTerm,
    'cuenta de cobro',
    docNumber,
    config,
    true
  );
  addLeftHeader(page, client, config);
  addRightHeader(page, bankData, config);
  addProducts(
    page,
    config,
    formatedOrderedProducts,
    total,
    subtotal,
    withholdingTax,
    true,
    discounts
  );
  addFooter(page, config, observations);
  // addTableBorder(page, config, tableBorderHight);

  await addLogo(
    page,
    config,
    'https://res.cloudinary.com/felipeospina21/image/upload/v1654880464/logo_negro_ex0drc.png',
    pdfDoc
  );

  await savePDF(pdfDoc, `C. cobro N° ${docNumber} - ${client.name.toUpperCase()} - DLT`);
}
