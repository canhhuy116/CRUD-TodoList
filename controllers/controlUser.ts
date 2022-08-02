import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/modelUser';
import passport from 'passport';

const CLIENT_URL = 'http://localhost:3000/';

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      req.session.isAuth = true;
      req.session.username = user.username;
      res.json({
        data: {
          _id: user.id,
          name: user.name,
          username: user.username,
        },
        cookie: req.session,
      });
    } else {
      res.status(400);
      throw new Error('Invalid credentials');
    }
  } catch (error) {
    res.status(500).json({ Error: error });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { name, username, password } = req.body;

    if (!name || !username || !password) {
      res.status(400);
      throw new Error('Please add all fields');
    }

    // Check if user exists
    let userExists = await UserModel.findOne({ username });

    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashPsw = await bcrypt.hash(password, salt);

    // create user
    const user = new UserModel({
      name,
      username,
      password: hashPsw,
    });

    await user.save();
    if (user) {
      res.status(201).json({
        data: {
          _id: user.id,
          name: user.name,
          username: user.username,
        },
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  } catch (error) {
    res.status(500).json({ Error: error });
  }
};

export const dashboard = (req: Request, res: Response) => {
  const username = req.session.username;
  res.status(200).json(username);
};

export const logout = async (req: Request, res: Response) => {
  try {
    req.session.destroy((err) => {
      if (err) throw err;
      res.status(200).json({
        message: 'Logout',
      });
    });
  } catch (error) {
    res.status(500).json({ Error: error });
  }
};

export const loginFailed = async (req: Request, res: Response) => {
  res.status(401).json({
    success: false,
    message: 'failure',
  });
};

export const loginGG = async (req: Request, res: Response) => {
  try {
    passport.authenticate('google', { scope: ['profile'] });
  } catch (error) {
    res.status(500).json({ Error: error });
  }
};

export const loginGoogleCB = async (req: Request, res: Response) => {
  try {
    passport.authenticate('google', {
      successRedirect: CLIENT_URL,
      failureRedirect: '/login/failed',
    });
  } catch (error) {
    res.status(500).json({ Error: error });
  }
};
