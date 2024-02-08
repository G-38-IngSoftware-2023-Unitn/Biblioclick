import type { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export default async function gatewaysHandler(
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
    res.status(400).json(err.response.data);
  }
}