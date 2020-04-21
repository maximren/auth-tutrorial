import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

const validateAuth = (req: Request, res: Response, next: NextFunction) => {
  const jwt = req.header('Authorization');

  if (!jwt) {
    return res.send({
      status: 401,
      message: 'Access denied',
    });
  }

  try {
    const validateJwt = verify(jwt, process.env.SECRET_TOKEN);
    if (!validateJwt) {
      res.send({
        status: 400,
        message: 'Invalid token',
      });
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

export { validateAuth };
