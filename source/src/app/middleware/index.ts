import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';


export function authMiddleware(handler: NextApiHandler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    console.log("token1",token)

    // const decoded = verifyToken(token);
    // if (!decoded) {
    //   return res.status(401).json({ error: 'Invalid token' });
    // }

    // req.userId = decoded.userId;
    return handler(req, res);
  };
}