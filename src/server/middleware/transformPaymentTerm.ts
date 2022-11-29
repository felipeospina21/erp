import type { Sale } from '@/server/models';
import type { NextApiRequest } from 'next';

export interface SaleBody extends Omit<Sale, 'paymentTerm'> {
  paymentTerm: string;
}

export function transformPaymentTerm(req: NextApiRequest): NextApiRequest {
  const { paymentTerm } = req.body as SaleBody;
  const isPaymentTermContado = paymentTerm.toLowerCase() === 'contado';

  if (isPaymentTermContado) req.body.paymentTerm = 0;
  else req.body.paymentTerm = parseInt(paymentTerm);
  return req;
}
