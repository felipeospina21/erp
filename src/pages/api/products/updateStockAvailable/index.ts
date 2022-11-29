import type { NextApiRequest, NextApiResponse } from 'next';
import { ProductModel, Product } from '@/server/models';
import { dbConnect, controllerResponse } from '@/server/utils';
import { findById, updateById } from '@/server/mongoose/helpers';

interface UpdateProductStockAvailable extends Product {
  quantity: number;
}

export default async function updateStockAvailableHandler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case 'PUT':
      const { _id: id, quantity } = req.body as UpdateProductStockAvailable;
      const { stockAvailable: currentStock } = (await findById(
        ProductModel,
        id,
        'stockAvailable -_id -category'
      )) as Product;
      let update;
      if (currentStock >= quantity) {
        update = { stockAvailable: currentStock - quantity };
      } else {
        update = { stockAvailable: 0 };
      }
      const updatedProduct = await updateById(ProductModel, id, update);
      controllerResponse(updatedProduct, 200, 400, res);
      break;
  }
}
