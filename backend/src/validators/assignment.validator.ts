/**
 * Validation rules for assignment endpoints
 */
import { body, param } from 'express-validator';

export const createAssignmentValidator = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 3, max: 100 })
    .withMessage('Title must be between 3 and 100 characters')
    .escape(),

  body('subject')
    .trim()
    .notEmpty()
    .withMessage('Subject is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Subject must be between 2 and 50 characters')
    .escape(),

  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Description must not exceed 1000 characters')
    .escape(),

  body('dueDate')
    .notEmpty()
    .withMessage('Due date is required')
    .isISO8601()
    .withMessage('Due date must be a valid ISO 8601 date')
    .custom((value: string) => {
      const dueDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (dueDate < today) {
        throw new Error('Due date cannot be in the past');
      }
      return true;
    }),

  body('status')
    .optional()
    .isIn(['Pending', 'In Progress', 'Completed', 'Overdue'])
    .withMessage('Status must be one of: Pending, In Progress, Completed, Overdue'),

  body('priority')
    .optional()
    .isIn(['Low', 'Medium', 'High'])
    .withMessage('Priority must be one of: Low, Medium, High'),
];

export const updateAssignmentValidator = [
  param('id')
    .notEmpty()
    .withMessage('Assignment ID is required')
    .isMongoId()
    .withMessage('Invalid assignment ID'),

  body('title')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Title cannot be empty')
    .isLength({ min: 3, max: 100 })
    .withMessage('Title must be between 3 and 100 characters')
    .escape(),

  body('subject')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Subject cannot be empty')
    .isLength({ min: 2, max: 50 })
    .withMessage('Subject must be between 2 and 50 characters')
    .escape(),

  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Description must not exceed 1000 characters')
    .escape(),

  body('dueDate')
    .optional()
    .isISO8601()
    .withMessage('Due date must be a valid ISO 8601 date')
    .custom((value: string) => {
      if (value) {
        const dueDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (dueDate < today) {
          throw new Error('Due date cannot be in the past');
        }
      }
      return true;
    }),

  body('status')
    .optional()
    .isIn(['Pending', 'In Progress', 'Completed', 'Overdue'])
    .withMessage('Status must be one of: Pending, In Progress, Completed, Overdue'),

  body('priority')
    .optional()
    .isIn(['Low', 'Medium', 'High'])
    .withMessage('Priority must be one of: Low, Medium, High'),
];

export const assignmentIdValidator = [
  param('id')
    .notEmpty()
    .withMessage('Assignment ID is required')
    .isMongoId()
    .withMessage('Invalid assignment ID'),
];

