import type { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { RequestMethod, createMocks } from 'node-mocks-http';

export async function gatewaysHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // API call

  const config : AxiosRequestConfig = {
    url: req.url,
    method: req.method,
    headers: req.headers,
    data: req.body,
  }

  try {
    const response: AxiosResponse = await axios(config);
    // Return JSON
    res.status(200).json(response.data);
  } catch (err: any) {
    // Check if we got a useful response
    // console.log(err.response.data);
    res.status(400).json(err.response.data);
  }
}

export function mockRequestResponse(method: RequestMethod = 'GET') {
  const {
      req,
      res,
  }: {
      req: NextApiRequest, res: NextApiResponse
  } = createMocks({ method });

  req.headers = {
      'content-type': 'application/json',
    };

  return {req, res};
}