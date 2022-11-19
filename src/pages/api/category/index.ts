import type { NextApiRequest, NextApiResponse } from 'next';
import type { Category } from '@/server/models';
import { CategoryModel } from '@/server/models';
import { dbConnect, controllerResponse } from '@/server/utils';
import { findAll, createNewElement, deletetById } from '@/server/mongoose/helpers';

export default async function categoryHandler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case 'GET':
      const categories = findAll(CategoryModel);
      controllerResponse(categories, 200, 400, res);
      break;

    case 'POST':
      const newCategory = createNewElement(CategoryModel, req.body);
      controllerResponse(newCategory, 201, 400, res);
      break;

    case 'DELETE':
      const { _id: id } = req.body as Category;
      const deletedCategory = deletetById(CategoryModel, id);
      controllerResponse(deletedCategory, 200, 400, res);
      break;
  }
}
