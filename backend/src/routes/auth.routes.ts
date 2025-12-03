/**
 * Authentication routes
 */
import { Router } from 'express';
import { register, login } from '../controllers/auth.controller';
import { validateRequest } from '../middleware/validation';
import {
  registerValidator,
  loginValidator,
} from '../validators/auth.validator';

const router = Router();

router.post('/register', validateRequest(registerValidator), register);
router.post('/login', validateRequest(loginValidator), login);

export default router;