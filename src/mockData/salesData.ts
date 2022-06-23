import { CreatePdfData } from '../utils';

export const salesData: CreatePdfData = {
  subtotal: 66940,
  tax: 0.19,
  total: 79658.59999999999,
  deliveryCity: 'Medellin',
  paymentTerm: 'contado',
  clientInfo: {
    _id: 'RuE5YEQLvuosfiBPW0eL',
    addres1: 'calle 8 # 25-114',
    addres2: 'local 230',
    city: 'medellin',
    department: 'Antioquia',
    discount: 20,
    idNumber: '900720364-1',
    idType: 'nit',
    name: 'Merka lo nuestro',
    paymentTerm: 'contado',
    retailer: true,
  },
  orderedProducts: [
    {
      discount: 0.2,
      quantity: 1,
      rowTotal: 19600,
      item: '6266c792374bc1a4f1d1f8ef',
      name: 'Ghee 200 gr',
      price: 200000,
      stock: 100,
      rowId: 1,
    },
  ],
};
