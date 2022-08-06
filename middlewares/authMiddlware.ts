import jwt, { TokenExpiredError } from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { UserModel } from '../models/userModel';
import { Request, Response, NextFunction } from 'express';

const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      try {
        // Get token from header
        token = req.headers.authorization.split(' ')[1];

        if (token === '') {
          res.status(200).json({
            code: 401,
            msg: 'Not token',
          });
        }
        // Verify token
        const decoded = Object(jwt.verify(token, process.env.JWT_SECRET));

        // Get user from the token
        req.user = await UserModel.findById(decoded.id).select('-password');

        return next();
      } catch (error) {
        if (error instanceof TokenExpiredError) {
          res.status(200).json({
            code: 401,
            msg: error.message,
          });
        } else {
          res.status(200).json({
            code: 500,
            msg: error,
          });
        }
      }
    }

    if (!token) {
      res.status(200).json({
        code: 401,
        msg: 'Not authorized, no token',
      });
    }
  }
);

export default protect;
