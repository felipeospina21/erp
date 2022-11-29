import type { NextApiRequest, NextApiResponse } from 'next';
import { ConsecutiveModel } from '@/server/models';
import { dbConnect, controllerResponse } from '@/server/utils';
import { findById } from '@/server/mongoose/helpers';

export default async function clientHandler(
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
      const consecutive = await findById(ConsecutiveModel, id as string);
      controllerResponse(consecutive, 200, 400, res);
      break;
  }
}
