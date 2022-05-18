import { Fields } from '@/components/Shared/Form';

export const loginFields: Fields[] = [
  {
    name: 'email',
    type: 'email',
    placeholder: 'name@email.com',
    label: 'Email',
    required: true,
  },
  {
    name: 'password',
    type: 'password',
    placeholder: '',
    label: 'Password',
    required: true,
  },
];
