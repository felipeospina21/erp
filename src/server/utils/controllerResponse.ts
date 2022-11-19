import type { NextApiResponse } from 'next';

export async function controllerResponse(
  servicePromise: Promise<any>,
  resStatus: number,
  errStatus: number,
  res: NextApiResponse
) {
  try {
    const response = await servicePromise;
    res.status(resStatus).json(response);
  } catch (error) {
    res.status(errStatus).json({ error });
  }
}
