import type { NextApiRequest, NextApiResponse } from 'next';
import { Invoice, InvoiceModel } from '@/server/models';
import { dbConnect, controllerResponse } from '@/server/utils';
import { findById, updateById } from '@/server/mongoose/helpers';

export default async function invoiceHandler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case 'PUT':
      const { _id: id } = req.body;
      const { count } = (await findById(InvoiceModel, id)) as Invoice;
      const updateInvoice = await updateById(InvoiceModel, id, { count: count + 1 });
      controllerResponse(updateInvoice, 200, 400, res);
      break;
  }
}
