import type { NextApiRequest, NextApiResponse } from 'next';
import { CategoryModel } from '@/server/models';
import { dbConnect, controllerResponse } from '@/server/utils';
import { findById } from '@/server/mongoose/helpers';

export default async function categoryIdHandler(
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
      const product = await findById(CategoryModel, id as string);
      controllerResponse(product, 200, 400, res);
      break;
  }
}
