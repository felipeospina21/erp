import type { NextApiRequest, NextApiResponse } from 'next';
import { Sale, SaleModel } from '@/server/models';
import { dbConnect, controllerResponse } from '@/server/utils';
import { findAll, createNewElement } from '@/server/mongoose/helpers';

export default async function saleHandler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { method, body } = req;
  await dbConnect();

  switch (method) {
    case 'GET':
      const sales = (await findAll(SaleModel)) as Sale[];
      controllerResponse(sales, 200, 400, res);
      break;

    case 'POST':
      // TODO: add transformPaymentTerm, updateStatusOnSale middlewares
      const payload: Sale = body;
      const newSale = (await createNewElement(SaleModel, payload)) as Sale;
      controllerResponse(newSale, 201, 400, res);
      break;
  }
}
