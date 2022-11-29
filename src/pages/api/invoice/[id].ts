import type { NextApiRequest, NextApiResponse } from 'next';
import { InvoiceModel } from '@/server/models';
import { dbConnect, controllerResponse } from '@/server/utils';
import { findById } from '@/server/mongoose/helpers';

export default async function invoiceByIdHandler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const {
    method,
    query: { id },
  } = req;
  await dbConnect();

  switch (method) {
    case 'GET':
      const invoice = await findById(InvoiceModel, id as string);
      controllerResponse(invoice, 200, 400, res);
      break;
  }
}
