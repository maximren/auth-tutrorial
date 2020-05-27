import { Request, Response } from 'express';
import User from '../models/User';
import paginationOptions from '../helpers/pagination';

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({}, '-password', {
      ...paginationOptions(req.query),
      sort: {
        date: -1,
      },
    });
    res.send({
      status: 200,
      users,
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
          ...(req.body.empDepartment
            ? { empDepartment: req.body.empDepartment }
            : {}),
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
