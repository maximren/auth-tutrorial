import { Request, Response } from 'express';

const getPosts = async (req: Request, res: Response) => {
  res.send({
    title: 'kek',
    description: 'lolkek',
  });
};

export { getPosts };
