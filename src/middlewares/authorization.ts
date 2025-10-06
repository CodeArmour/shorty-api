/**
 * @copyright 2025 omarcode
 * @license Apach-2.0
 */

/**
 * Custom Modules
 */
import { logger } from '@/lib/winston';

/**
 * Models
 */
import User from '@/models/user';

/**
 * Types
 */
import type { Request, Response, NextFunction } from 'express';
type Role = 'user' | 'admin';

const authorization = (role: Role[]) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const userId = req.userId;

    try {
      const user = await User.findById(userId).select('role').lean().exec();

      if (!user) {
        res.status(403).json({
          code: 'AuthorizationError',
          message: 'You dont have an acount, please register to get access',
        });
        return;
      }

      if (!role.includes(user.role)) {
        res.status(403).json({
          code: 'AuthorizationError',
          message: 'You dont have a permission to access this feature',
        });
        return;
      }

      next();
    } catch (error) {
      res.status(500).json({
        code: 'ServerError',
        message: 'Internal server error',
      });
      logger.error('Error during authorization:', error);
    }
  };
};

export default authorization;
