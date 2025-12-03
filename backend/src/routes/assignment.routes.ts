/**
 * Assignment routes
 */
import { Router } from 'express';
import { auth } from '../middleware/auth';
import {
  getAssignments,
  getAssignmentById,
  createAssignment,
  updateAssignment,
  deleteAssignment,
} from '../controllers/assignment.controller';
import { validateRequest } from '../middleware/validation';
import {
  createAssignmentValidator,
  updateAssignmentValidator,
  assignmentIdValidator,
} from '../validators/assignment.validator';

const router = Router();

// All routes require authentication
router.use(auth);

router.get('/', getAssignments);
router.get('/:id', validateRequest(assignmentIdValidator), getAssignmentById);
router.post('/', validateRequest(createAssignmentValidator), createAssignment);
router.put(
  '/:id',
  validateRequest(updateAssignmentValidator),
  updateAssignment
);
router.delete('/:id', validateRequest(assignmentIdValidator), deleteAssignment);

export default router;
