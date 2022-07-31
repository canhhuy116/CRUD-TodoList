import { Request, Response, NextFunction } from 'express';

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.isAuth) {
    next();
  } else {
    res.redirect('/login');
  }
};
