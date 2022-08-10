export interface TableHeader {
  title: string;
  id: string;
}
export const tableHeader: TableHeader[] = [
  {
    title: 'Producto',
    id: 'product',
  },
  {
    title: 'Stock',
    id: 'stock',
  },
  {
    title: 'Precio',
    id: 'price',
  },
  {
    title: 'Cantidad',
    id: 'quantity',
  },
  {
    title: 'Descuento',
    id: 'discount',
  },
  {
    title: 'Transporte (und)',
    id: 'shipping',
  },
  {
    title: 'Total',
    id: 'total',
  },
  {
    title: '',
    id: 'action',
  },
];
