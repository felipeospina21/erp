import type { NextApiRequest, NextApiResponse } from 'next';
import { Product, ProductModel, Sale, SaleModel } from '@/server/models';
import { dbConnect, controllerResponse } from '@/server/utils';
import { findById, updateById } from '@/server/mongoose/helpers';

export default async function cancelDocHandler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const {
    method,
    query: { id },
  } = req;
  await dbConnect();

  switch (method) {
    case 'PUT':
      const { orderedProducts } = (await updateById(SaleModel, id as string, {
        status: 'anulado',
      })) as Sale;

      for (const { item, quantity } of orderedProducts) {
        const { stockAvailable: currentAvailable, stockReserved: currentReserved } =
          (await findById(ProductModel, item._id, 'stockAvailable stockReserved')) as Product;

        (await updateById(ProductModel, item._id, {
          stockAvailable: currentAvailable + quantity,
          stockReserved: currentReserved - quantity,
        })) as Product;
      }

      controllerResponse({ message: 'sale canceled' }, 200, 400, res);
      break;
  }
}
