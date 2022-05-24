import { Fields } from '@/components/Shared';

export const mockFormFields: Fields[] = [
  {
    name: 'name',
    type: 'string',
    placeholder: 'name',
    label: 'name',
    required: true,
  },
  {
    name: 'lastname',
    type: 'string',
    placeholder: 'lastname',
    label: 'lastname',
    required: false,
  },
  {
    name: 'email',
    type: 'email',
    placeholder: 'email',
    label: 'email',
    required: true,
  },
  {
    name: 'password',
    type: 'password',
    placeholder: 'password',
    label: 'password',
    required: true,
  },
  {
    name: 'age',
    type: 'number',
    placeholder: 'age',
    label: 'age',
    required: true,
  },
];
