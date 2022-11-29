import type { NextApiRequest, NextApiResponse } from 'next';
import { Sale, SaleModel } from '@/server/models';
import { dbConnect, controllerResponse } from '@/server/utils';
import { findById } from '@/server/mongoose/helpers';

export default async function saleByIdHandler(
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
      const sale = (await findById(SaleModel, id as string)) as Sale;
      controllerResponse(sale, 200, 400, res);
      break;
  }
}
