import type { NextApiRequest, NextApiResponse } from 'next';
import { ClientModel } from '@/server/models';
import { Client } from '@/server/models';
import { dbConnect, controllerResponse } from '@/server/utils';
import { findAll, createNewElement, deletetById, updateById } from '@/server/mongoose/helpers';
import { transformRetailer } from '@/server/middleware';

export default async function categoryHandler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { method, body } = req;
  const { _id: id } = body as Client;
  await dbConnect();
  let transformedBody;
  if (body) transformedBody = transformRetailer(req);
  else transformedBody = body;

  switch (method) {
    case 'GET':
      const clients = await findAll(ClientModel, 'name');
      controllerResponse(clients, 200, 400, res);
      break;

    case 'POST':
      const newClient = await createNewElement(ClientModel, transformedBody);
      controllerResponse(newClient, 201, 400, res);
      break;

    case 'DELETE':
      const deletedClient = await deletetById(ClientModel, id);
      controllerResponse(deletedClient, 200, 400, res);
      break;

    case 'Put':
      const { addres1, addres2, city, department, discount, email, name, paymentTerm, retailer } =
        transformedBody;
      const update = {
        addres1,
        addres2,
        city,
        department,
        discount,
        email,
        name,
        paymentTerm,
        retailer,
      };
      const updatedClient = await updateById(ClientModel, id, update);
      controllerResponse(updatedClient, 200, 400, res);
      break;
  }
}
