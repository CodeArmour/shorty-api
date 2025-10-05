/**
 * @copyright 2025 omarcode
 * @license Apach-2.0
 */

/**
 * Node Modules
 */
import { Router } from 'express';
import { body } from 'express-validator';

/**
 * Custom Modules
 */
import expressRateLimit from '@/lib/expressRateLimit';
/**
 * Controllers
 */
import register from '@/controllers/auth/register';
import login from '@/controllers/auth/login';
import logout from '@/controllers/auth/logout';
import refreshToken from '@/controllers/auth/refresh_token';

/**
 * Middlewares
 */
import validationError from '@/middlewares/validationError';
import authentication from '@/middlewares/authentication';

/**
 * Models
 */
import User from '@/models/user';

/**
 * Initial express router
 */
const router = Router();

router.post(
  '/register',
  expressRateLimit('basic'),
  body('name').trim().notEmpty().withMessage('name is required'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid Email')
    .custom(async (value) => {
      const userExists = await User.exists({ email: value }).exec();

      // Handle case when duplicate email found
      if (userExists) {
        throw new Error('This email is already in use');
      }
    }),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  body('role')
    .notEmpty()
    .withMessage('Role is required')
    .isIn(['user', 'admin'])
    .withMessage('Role is not support '),
  validationError,
  register
);

router.post(
  '/login',
  expressRateLimit('auth'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email adress'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('The password must be at least 8 characters'),
  validationError,
  login
);

router.delete(
  '/logout', 
  expressRateLimit('basic'), 
  authentication, 
  logout
);

router.get(
'/refresh-token',
expressRateLimit('basic'),
refreshToken,

);

router.post(
  '/forgot-password',
  expressRateLimit('basic'),
  validationError,
  

);
export default router;
