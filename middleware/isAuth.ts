import { Request, Response, NextFunction } from 'express';
import { UserModel } from '../models/modelUser';

export const isAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const username = req.session.username;
  const user = await UserModel.findOne({ username });
  if (user && req.session.isAuth) {
    next();
  } else {
    res.status(400).json({
      message: 'Invalid user data',
    });
  }
};
