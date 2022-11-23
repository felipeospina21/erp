import type { NextApiRequest, NextApiResponse } from 'next';
import { Consecutive, ConsecutiveModel } from '@/server/models';
import { dbConnect, controllerResponse } from '@/server/utils';
import { findById, updateById } from '@/server/mongoose/helpers';

export default async function consecutiveHandler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case 'PUT':
      const { _id: id } = req.body;
      const { count } = (await findById(ConsecutiveModel, id)) as Consecutive;
      const updateCount = await updateById(ConsecutiveModel, id, { count: count + 1 });
      controllerResponse(updateCount, 200, 400, res);
      break;
  }
}
