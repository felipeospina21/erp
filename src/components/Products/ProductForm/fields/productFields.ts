import { Fields } from '@/components/Shared/Form';

export const productsFields: Fields[] = [
  {
    name: 'name',
    type: 'text',
    placeholder: 'nombre',
    label: 'Nombre',
    required: true,
  },
  {
    name: 'alias',
    type: 'text',
    placeholder: 'alias',
    label: 'Alias',
    required: true,
  },
  {
    name: 'price',
    type: 'number',
    placeholder: 'precio',
    label: 'Precio',
    required: true,
  },
  {
    name: 'stock',
    type: 'number',
    placeholder: 'inventario',
    label: 'Inventario',
    required: true,
  },
  {
    name: 'image',
    type: 'file',
    placeholder: 'imagen',
    label: 'Imagen',
    required: false,
  },
];
