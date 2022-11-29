import type { NextApiRequest, NextApiResponse } from 'next';
import { Sale, SaleModel } from '@/server/models';
import { dbConnect, controllerResponse } from '@/server/utils';
import { updateById } from '@/server/mongoose/helpers';

export default async function updateStatusHandler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const {
    method,
    body,
    query: { id },
  } = req;
  await dbConnect();

  switch (method) {
    case 'PUT':
      const { status, invoiceRef, discounts, creditNotes } = body as Sale;
      const sale = (await updateById(SaleModel, id as string, {
        status,
        invoiceRef,
        discounts,
        creditNotes,
      })) as Sale;
      controllerResponse(sale, 200, 400, res);
      break;
  }
}
