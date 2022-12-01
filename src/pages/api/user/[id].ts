import type { NextApiRequest, NextApiResponse } from 'next';
import { User, UserModel } from '@/server/models';
import { dbConnect, controllerResponse } from '@/server/utils';
import { findById } from '@/server/mongoose/helpers';

export default async function userByIdHandler(
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
      const user = (await findById(UserModel, id as string, '-password')) as User;
      controllerResponse(user, 200, 400, res);
      break;
  }
}
