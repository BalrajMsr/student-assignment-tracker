/**
 * Authentication controller
 * Handles user registration and login with proper error handling
 */
import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { CustomError } from '../middleware/errorHandler';
import { asyncHandler } from '../middleware/errorHandler';
import { env } from '../config/env';

/**
 * Register a new user
 * @route POST /auth/register
 */
export const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new CustomError('Email already registered', 409);
  }

  // Hash password
  const saltRounds = 12;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  // Generate JWT token
  const token = jwt.sign({ id: user._id.toString() }, env.JWT_SECRET, {
    expiresIn: '7d',
  });

  // Set token in HTTP-only cookie
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: {
      token, // Also return in body for flexibility
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    },
  });
});

/**
 * Login user
 * @route POST /auth/login
 */
export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Find user and include password for comparison
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new CustomError('Invalid email or password', 401);
  }

  // Verify password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new CustomError('Invalid email or password', 401);
  }

  // Generate JWT token
  const token = jwt.sign({ id: user._id.toString() }, env.JWT_SECRET, {
    expiresIn: '7d',
  });

  // Set token in HTTP-only cookie
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.json({
    success: true,
    message: 'Login successful',
    data: {
      token, // Also return in body for flexibility
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    },
  });
});