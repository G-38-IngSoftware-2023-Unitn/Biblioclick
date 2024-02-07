import type { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosResponse } from 'axios';

export default async function gatewaysHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {

//   // Gateway UID must be a string
//   if (typeof req.query.gatewayID !== 'string') {
//     res.status(400).json({ err: 'Invalid gateway ID' });
//     return;
//   }

//   // Query params
//   const { gatewayID } = req.query;
  // Notehub values
  // API path
  const endpoint = `/api/auth/logout`;
  // API headers
  

  // API call
  try {
    const response: AxiosResponse = await axios.get(endpoint);
    // Return JSON
    res.status(200).json(response.data);
  } catch (err) {
    // Check if we got a useful response
    console.log(err);
    if (axios.isAxiosError(err)) {
      if (err.response && err.response.status === 404) {
        // Return 404 error
        res.status(404).json({ err: 'Unable to find device' });
      }
    } else {
      // Return 500 error
      res.status(500).json({ err: 'Failed to fetch Gateway data' });
    }
  }
}