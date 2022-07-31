import { Request, Response } from 'express';
import md5 from 'md5';
import { UserModel } from '../models/modelUser';

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username });

    if (!user) {
      return res.redirect('/login');
    }

    const isMatch = md5(password) === user.password;

    if (!isMatch) {
      return res.redirect('/login');
    }
    req.session.isAuth = true;
    req.session.username = user.username;
    res.redirect('/todos');
  } catch (error) {
    res.status(500).json({ Error: error });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    let user = await UserModel.findOne({ username });

    if (user) {
      return res.redirect('/register');
    }

    const hasdPsw = md5(password);

    user = new UserModel({
      username,
      password: hasdPsw,
    });

    await user.save();
    res.redirect('/login');
  } catch (error) {
    res.status(500).json({ Error: error });
  }
};

export const Gettodos = (req: Request, res: Response) => {
  const username = req.session.username;
  res.status(200).json(username);
};

export const logout = (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.redirect('/login');
  });
};
