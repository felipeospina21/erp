import type { Client } from '@/server/models';
import type { NextApiRequest } from 'next';

export interface ClientBody extends Omit<Client, 'retailer'> {
  retailer: string;
}

export function transformRetailer(req: NextApiRequest): Client {
  const { retailer } = req.body as ClientBody;
  if (retailer === 'si') req.body.retailer = true;
  else req.body.retailer = false;
  return req.body as Client;
}
