import type { NextApiRequest, NextApiResponse } from 'next';
import { type WithholdingTax, WithholdingTaxModel } from '@/server/models';
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
      const taxConcept = (await findById(WithholdingTaxModel, id as string)) as WithholdingTax;
      controllerResponse(taxConcept, 200, 400, res);
      break;
  }
}
