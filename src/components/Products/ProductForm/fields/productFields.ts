export interface ClientFields {
  name: string;
  type: string;
  placeholder: string;
  label: string;
  required: boolean;
}
export const productsFields: ClientFields[] = [
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
