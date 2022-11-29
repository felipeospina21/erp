import type { NextApiRequest, NextApiResponse } from 'next';
import { Sale, SaleModel } from '@/server/models';
import { dbConnect, controllerResponse } from '@/server/utils';
import { findAll, createNewElement } from '@/server/mongoose/helpers';
import { transformPaymentTerm, updateStatusOnSale } from '@/server/middleware';

export default async function saleHandler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case 'GET':
      const sales = (await findAll(SaleModel)) as Sale[];
      controllerResponse(sales, 200, 400, res);
      break;

    case 'POST':
      const reqWithPaymentTerm = transformPaymentTerm(req);
      const reqWithUpdatedStatus = updateStatusOnSale(reqWithPaymentTerm);
      const payload = (await reqWithUpdatedStatus).body as Sale;
      const newSale = (await createNewElement(SaleModel, payload)) as Sale;
      controllerResponse(newSale, 201, 400, res);
      break;
  }
}
