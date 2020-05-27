import { Request, Response } from 'express';
import User from '../models/User';

const getUsers = async (req: Request, res: Response) => {
  res.header('Access-Control-Allow-Origin', '*');

  const page: any = parseInt(req.query.page as any);
  const limit: number = parseInt(req.query.limit as any);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit

  let next = {};

  if (endIndex < (await User.find()).length) {
    next = {
      page: page + 1,
      limit
    }
  }

  try {
    const users = await User.find().select('-password').limit(limit).skip(startIndex).exec();
    
    res.send({
      status: 200,
      users,
      next
    });
  } catch (error) {
    console.log(error);

    res.send({
      status: 400,
      message: 'Users not found',
    });
  }
};

const getTargetUser = async (req: Request, res: Response) => {
  try {
    const targetUser = await User.findOne({ _id: req.params.id });

    res.send({
      status: 200,
      user: targetUser,
    });
  } catch (error) {
    res.send({
      status: 400,
      message: 'User not found',
    });
  }
};

const editUser = async (req: Request, res: Response) => {
  try {
    await User.updateOne(
      { _id: req.params.id },
      {
        $set: {
          ...(req.body.name ? { name: req.body.name } : {}),
          ...(req.body.empDepartment ? { empDepartment: req.body.empDepartment } : {}),
          ...(req.body.empActive ? { empActive: req.body.empActive } : {}),
        },
      },
    );
    res.send({
      status: 200,
      id: req.params.id,
    });
  } catch (error) {
    res.send({
      status: 400,
      message: error,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    await User.deleteOne({ _id: req.params.id });
    res.send({
      status: 200,
      id: parseInt(req.params.id),
    });
  } catch (error) {
    res.send({
      status: 400,
      message: error,
    });
  }
};

export { getUsers, editUser, deleteUser, getTargetUser };
