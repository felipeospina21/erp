import React from 'react';
import { createPdf } from '../utils';
import { salesData } from '@/mockData/salesData';

export default function CostosPage(): JSX.Element {
  return (
    <div>
      <button onClick={() => createPdf(salesData, 100)}>pdf</button>
    </div>
  );
}
