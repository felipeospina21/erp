import type { NextApiRequest, NextApiResponse } from 'next';
import { User, UserModel } from '@/server/models';
import { dbConnect, controllerResponse } from '@/server/utils';
import { createNewElement } from '@/server/mongoose/helpers';

type UserId = User['_id'];

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { method, body } = req;
  await dbConnect();

  switch (method) {
    case 'POST':
      const payload = body as User;
      const newUser = (await createNewElement(UserModel, payload)) as User;
      controllerResponse<{ id: UserId }>({ id: newUser._id }, 201, 400, res);
      break;
  }
}
