import type { NextApiRequest, NextApiResponse } from 'next';
import { ProductModel, Product } from '@/server/models';
import { dbConnect, controllerResponse } from '@/server/utils';
import { findById, updateById } from '@/server/mongoose/helpers';

interface UpdateProductStockReserved extends Product {
  method: 'add' | 'substract';
}

type UpdateProductData = Pick<Product, 'stockReserved'>;

export default async function updateStockReservedHandler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case 'PUT':
      const { _id: id, stockReserved, method } = req.body as UpdateProductStockReserved;
      let update = (await findById(
        ProductModel,
        id,
        'stockReserved -_id -category'
      )) as UpdateProductData;

      switch (method) {
        case 'add':
          update = { stockReserved: Number(update.stockReserved) + Number(stockReserved) };
          break;
        case 'substract':
          update = { stockReserved: update.stockReserved - Number(stockReserved) };
          break;
        default:
          break;
      }

      const updatedProduct = await updateById(ProductModel, id, update);
      controllerResponse(updatedProduct, 200, 400, res);
      break;
  }
}
