import { InputField } from '@/components/Shared/Forms';

export const productFields: Array<InputField> = [
  {
    name: 'name',
    type: 'text',
    placeholder: 'nombre',
    label: 'Nombre',
    required: true,
  },
  {
    name: 'category',
    type: 'select',
    placeholder: 'category',
    label: 'Category',
    required: true,
    options: [],
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
  // {
  //   name: 'image',
  //   type: 'file',
  //   placeholder: 'imagen',
  //   label: 'Imagen',
  //   required: false,
  // },
];
