import type { NextApiRequest, NextApiResponse } from 'next';
import type { WithholdingTax } from '@/server/models';
import { WithholdingTaxModel } from '@/server/models';
import { dbConnect, controllerResponse } from '@/server/utils';
import { findAll, createNewElement, updateById } from '@/server/mongoose/helpers';

export default async function withholdingTaxHandler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { method, body } = req;
  await dbConnect();

  switch (method) {
    case 'GET':
      const taxConcepts = (await findAll(WithholdingTaxModel, 'concept')) as WithholdingTax[];
      controllerResponse(taxConcepts, 200, 400, res);
      break;

    case 'POST':
      const payload = body as WithholdingTax;
      const newTaxConcept = (await createNewElement(WithholdingTaxModel, {
        ...payload,
        percentage: payload.percentage / 100,
      })) as WithholdingTax;
      controllerResponse(newTaxConcept, 201, 400, res);
      break;

    case 'PUT':
      const { _id, concept, base, percentage } = body as WithholdingTax;
      const updateTaxConcept = (await updateById(WithholdingTaxModel, _id, {
        concept,
        base,
        percentage: percentage / 100,
      })) as WithholdingTax;
      controllerResponse(updateTaxConcept, 200, 400, res);
      break;
  }
}
