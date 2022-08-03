import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/userModel';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

// @desc    Register new user
// @route   POST /api/users
// @access  Public

export const register = asyncHandler(async (req: Request, res: Response) => {
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

    if (user) {
      res.status(201).json({
        data: {
          _id: user.id,
          name: user.name,
          username: user.username,
          token: generateToken(user.id),
        },
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  } catch (error) {
    res.status(500).json({ Error: error });
  }
});

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public

export const login = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // Check for user email
    const user = await UserModel.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        name: user.name,
        username: user.username,
        token: generateToken(user.id),
      });
    } else {
      res.status(400);
      throw new Error('Invalid credentials');
    }
  } catch (error) {
    res.status(500).json({ Error: error });
  }
});

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
export const getMe = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json(req.user);
});

// Generate JWT
const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
};
