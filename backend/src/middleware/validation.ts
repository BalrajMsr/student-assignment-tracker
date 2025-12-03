/**
 * Validation middleware using express-validator
 * Provides reusable validation rules and error handling
 */
import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationChain } from 'express-validator';
import { CustomError } from './errorHandler';

/**
 * Runs validation chains and handles errors
 * Uses express-validator's standard pattern
 */
export const validateRequest = (validations: ValidationChain[]) => {
  return async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    // Run all validations
    await Promise.all(validations.map((validation) => validation.run(req)));
    
    // Get validation errors
    const errors = validationResult(req);
    
    if (errors.isEmpty()) {
      return next();
    }
    
    // Format error messages
    const errorMessages = errors.array().map((err) => err.msg);
    const error = new CustomError(
      `Validation failed: ${errorMessages.join(', ')}`,
      400
    );
    
    next(error);
  };
};

