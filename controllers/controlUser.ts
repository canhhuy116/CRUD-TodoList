import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/userModel';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

// @desc    Register new user
// @route   POST /api/users
// @access  Public

export const register = asyncHandler(async (req: Request, res: Response) => {
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
    name: name,
    username: username,
    password: hashPsw,
  });
  await user.save();

  if (user) {
    res.status(201).json({
      username: user.username,
      token: generateToken(user.id),
      refreshToken: generateRefreshToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { username, password } = req.body;

  // Check for user email
  const user = await UserModel.findOne({ username });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      username: user.username,
      token: generateToken(user.id),
      refreshToken: generateRefreshToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid credentials');
  }
});

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
export const getMe = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json(req.user);
});

export const refreshToken = asyncHandler(
  async (req: Request, res: Response) => {
    const { refreshtoken } = req.body;
    if (!refreshtoken) {
      res.status(400);
      throw new Error('Missing refresh Token');
    }
    const decoded = Object(
      jwt.verify(refreshtoken, process.env.JWT_RefreshToken)
    );
    const token = generateToken(decoded.id);
    const refToken = generateRefreshToken(decoded.id);
    res.status(200).json({
      token,
      refreshToken: refToken,
    });
  }
);

// Generate JWT
const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30s',
  });
};
// Generate JWT
const generateRefreshToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_RefreshToken, {
    expiresIn: '10h',
  });
};
