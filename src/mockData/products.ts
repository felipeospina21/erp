import { Product } from '@/redux/services';

export const mockProducts: Product[] = [
  {
    _id: 'abc',
    category: { _id: '1', name: 'test prod' },
    name: 'test prod 1',
    price: 1000,
    stockAvailable: 100,
    image:
      'https://static5.depositphotos.com/1000270/486/i/600/depositphotos_4869272-stock-photo-bengal-cat-in-light-brown.jpg',
  },
  {
    _id: 'def',
    category: { _id: '2', name: 'test prod 2' },
    name: 'test prod 2',
    price: 1000,
    stockAvailable: 100,
    image:
      'https://static5.depositphotos.com/1000270/486/i/600/depositphotos_4869272-stock-photo-bengal-cat-in-light-brown.jpg',
  },
];
