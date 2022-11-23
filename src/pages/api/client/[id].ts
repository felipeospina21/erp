import type { NextApiRequest, NextApiResponse } from 'next';
import { ClientModel } from '@/server/models';
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
      const client = await findById(ClientModel, id as string);
      controllerResponse(client, 200, 400, res);
      break;
  }
}
