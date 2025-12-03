/**
 * Assignment controller
 * Handles CRUD operations for assignments with proper authorization and error handling
 */
import { Request, Response } from 'express';
import Assignment from '../models/Assignment';
import { CustomError } from '../middleware/errorHandler';
import { asyncHandler } from '../middleware/errorHandler';
import mongoose from 'mongoose';

/**
 * Create a new assignment
 * @route POST /assignments
 */
export const createAssignment = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user?.id) {
      throw new CustomError('User not authenticated', 401);
    }

    const assignmentData = {
      ...req.body,
      userId: new mongoose.Types.ObjectId(req.user.id),
    };

    const assignment = await Assignment.create(assignmentData);

    res.status(201).json({
      success: true,
      message: 'Assignment created successfully',
      data: assignment,
    });
  }
);

/**
 * Get all assignments for the authenticated user
 * @route GET /assignments
 */
export const getAssignments = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user?.id) {
      throw new CustomError('User not authenticated', 401);
    }

    // Optional query parameters for filtering and sorting
    const { status, priority, sortBy = 'dueDate', sortOrder = 'asc' } = req.query;

    const query: any = {
      userId: new mongoose.Types.ObjectId(req.user.id),
    };

    if (status) {
      query.status = status;
    }

    if (priority) {
      query.priority = priority;
    }

    const sortOptions: any = {};
    const validSortFields = ['dueDate', 'createdAt', 'priority', 'status'];
    const sortField = validSortFields.includes(sortBy as string)
      ? sortBy
      : 'dueDate';
    sortOptions[sortField] = sortOrder === 'desc' ? -1 : 1;

    const assignments = await Assignment.find(query)
      .sort(sortOptions)
      .lean();

    res.json({
      success: true,
      count: assignments.length,
      data: assignments,
    });
  }
);

/**
 * Get a single assignment by ID
 * @route GET /assignments/:id
 */
export const getAssignmentById = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user?.id) {
      throw new CustomError('User not authenticated', 401);
    }

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new CustomError('Invalid assignment ID', 400);
    }

    const assignment = await Assignment.findOne({
      _id: id,
      userId: new mongoose.Types.ObjectId(req.user.id),
    });

    if (!assignment) {
      throw new CustomError('Assignment not found', 404);
    }

    res.json({
      success: true,
      data: assignment,
    });
  }
);

/**
 * Update an assignment
 * @route PUT /assignments/:id
 */
export const updateAssignment = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user?.id) {
      throw new CustomError('User not authenticated', 401);
    }

    const { id } = req.params;
    const updateData = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new CustomError('Invalid assignment ID', 400);
    }

    // Check if assignment exists and belongs to user
    const assignment = await Assignment.findOne({
      _id: id,
      userId: new mongoose.Types.ObjectId(req.user.id),
    });

    if (!assignment) {
      throw new CustomError('Assignment not found', 404);
    }

    // Update assignment
    const updatedAssignment = await Assignment.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    res.json({
      success: true,
      message: 'Assignment updated successfully',
      data: updatedAssignment,
    });
  }
);

/**
 * Delete an assignment
 * @route DELETE /assignments/:id
 */
export const deleteAssignment = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user?.id) {
      throw new CustomError('User not authenticated', 401);
    }

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new CustomError('Invalid assignment ID', 400);
    }

    // Check if assignment exists and belongs to user
    const assignment = await Assignment.findOne({
      _id: id,
      userId: new mongoose.Types.ObjectId(req.user.id),
    });

    if (!assignment) {
      throw new CustomError('Assignment not found', 404);
    }

    await Assignment.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Assignment deleted successfully',
    });
  }
);