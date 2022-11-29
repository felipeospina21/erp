import type { NextApiRequest, NextApiResponse } from 'next';
import type { Product } from '@/server/models';
import { ProductModel } from '@/server/models';
import { dbConnect, controllerResponse } from '@/server/utils';
import { findAll, createNewElement, deletetById, updateById } from '@/server/mongoose/helpers';

interface UpdateProduct extends Pick<Product, 'category' | 'name' | 'image'> {
  price?: number;
  stockAvailable?: number;
}

export default async function productHandler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { method } = req;
  await dbConnect();
  const { _id: id, category, name, price, stockAvailable, image } = req.body as Product;

  switch (method) {
    case 'GET':
      const products = (await findAll(ProductModel, 'name')) as Product[];
      controllerResponse(products, 200, 400, res);
      break;

    case 'POST':
      const payload: Product = req.body;
      const newProduct = await createNewElement(ProductModel, payload);
      controllerResponse(newProduct, 201, 400, res);
      break;

    case 'PUT':
      const update: UpdateProduct = {
        category,
        name,
        image,
      };
      if (price) update.price = Number(price);
      if (stockAvailable) update.stockAvailable = Number(stockAvailable);
      const updatedProduct = await updateById(ProductModel, id, update);
      controllerResponse(updatedProduct, 200, 400, res);
      break;

    case 'DELETE':
      const deletedProduct = (await deletetById(ProductModel, id)) as Product;
      controllerResponse(deletedProduct, 200, 400, res);
      break;
  }
}
