import type { NextApiRequest, NextApiResponse } from 'next';
import { ProductModel, Product } from '@/server/models';
import { dbConnect } from '@/server/utils';
import { findById, updateById } from '@/server/mongoose/helpers';

export default async function updateStockInBatchHandler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case 'PUT':
      const body = req.body;
      const newStockPromises = [];
      for (const key in body) {
        const { stockAvailable: currentStock } = (await findById(
          ProductModel,
          key,
          'stockAvailable -_id -category'
        )) as Product;
        const newStock = Number(currentStock) + Number(body[key]);
        newStockPromises.push(updateById(ProductModel, key, { stockAvailable: newStock }));
      }

      try {
        await Promise.all(newStockPromises);
        res.status(200).json({ message: 'Productos actualizados' });
      } catch (error) {
        res.status(400).json({ message: 'Error al actualizar inventario' });
      }
      break;
  }
}
