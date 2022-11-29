import type { NextApiRequest } from 'next';
import type { Sale, OrderedProduct, Product } from '@/server/models';
import { ProductModel } from '@/server/models';
import { findById } from '@/server/mongoose/helpers';

interface ResOrderedProduct extends Omit<OrderedProduct, 'item'> {
  item: string;
}

interface SaleBody extends Omit<Sale, 'orderedProducts'> {
  orderedProducts: ResOrderedProduct[];
}

export async function updateStatusOnSale(req: NextApiRequest): Promise<NextApiRequest> {
  const { orderedProducts } = req.body as SaleBody;
  for await (const { item, quantity } of orderedProducts) {
    const { stockAvailable } = (await findById(
      ProductModel,
      item,
      'stockAvailable -_id -category'
    )) as Product;
    if (quantity > stockAvailable) {
      req.body.status = 'producción';
      break;
    } else {
      req.body.status = 'alistamiento';
    }
  }

  return req;
}
