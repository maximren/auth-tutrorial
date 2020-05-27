import { Request, Response } from 'express';
import { genSalt, hash, compare } from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import User from '../models/User';
import { validateSignup, validateSignip } from '../helpers/validation';
import { IUser } from '../types/user.interface';

const signup = async (req: Request, res: Response) => {
  const salt = await genSalt(10);
  const hashPassword = await hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
    empDepartment: req.body.empDepartment,
    empActive: req.body.empActive
  });

  const { error } = await validateSignup(req.body);

  if (error) {
    return res.send({
      status: 400,
      message: error.details[0].message,
    });
  }

  const isEmailExist: IUser = await User.findOne({ email: req.body.email });

  if (isEmailExist) {
    return res.send({
      status: 400,
      message: 'This email has already exist',
    });
  }

  try {
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (error) {
    console.log(error);
  }
};

const signin = async (req: Request, res: Response) => {
  const { error } = await validateSignip(req.body);

  console.log(req.body)

  if (error) {
    return res.send({
      status: 400,
      message: error.details[0].message,
    });
  }

  const user: IUser = await User.findOne({ email: req.body.email });
  
  if (!user) {
    return res.send({
      status: 400,
      message: 'Email or password are wrong',
    });
  }

  const isPasswordValid = await compare(req.body.password, user.password);

  if (!isPasswordValid) {
    return res.send({
      status: 400,
      message: 'Email or password are wrong',
    });
  }

  try {
    const genJwt = jwt.sign({ id: user._id }, process.env.SECRET_TOKEN);
    res.header('Authorization', genJwt);
    res.send({
      status: 200,
      message: genJwt,
      id: user._id,
    })
  } catch (error) {
    console.log(error);
  }
};

export { signup, signin };
