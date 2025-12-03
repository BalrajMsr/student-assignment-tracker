/**
 * Authentication middleware
 * Validates JWT tokens and attaches user information to request
 */
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { CustomError } from './errorHandler';
import { env } from '../config/env';

/**
 * Middleware to authenticate requests using JWT
 * Extracts token from Authorization header or cookies and verifies it
 */
export const auth = (req: Request, _res: Response, next: NextFunction): void => {
  try {
    // Try to get token from Authorization header first
    let token: string | undefined;
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    } else {
      // Fallback to cookie if header is not present
      token = req.cookies?.token;
    }

    if (!token) {
      throw new CustomError('No token provided', 401);
    }

    try {
      const decoded = jwt.verify(token, env.JWT_SECRET) as jwt.JwtPayload & {
        id: string;
      };

      if (!decoded.id) {
        throw new CustomError('Invalid token payload', 401);
      }

      req.user = decoded;
      next();
    } catch (err) {
      if (err instanceof jwt.TokenExpiredError) {
        throw new CustomError('Token expired', 401);
      } else if (err instanceof jwt.JsonWebTokenError) {
        throw new CustomError('Invalid token', 401);
      }
      throw err;
    }
  } catch (err) {
    next(err);
  }
};