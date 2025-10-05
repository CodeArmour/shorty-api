/**
 * @copyright 2025 omarcode
 * @license Apache-2.0
 */

/**
 * Custom Modules
 */
import { verifyRefreshToken, generateAccessToken } from '@/lib/jwt';
import { logger } from '@/lib/winston';

/**
 * Types
 */
import type { Request, Response } from 'express';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { TokenPayload } from '@/lib/jwt';

const refreshToken = async (req: Request, res: Response): Promise<void> => {
  // Retrieve refreshToken from cookies
  const { refreshToken } = req.cookies;

  // Handle case when refresh token doesn't exist
  if (!refreshToken) {
    res.status(401).json({
      code: 'Unauthorized',
      message: 'Refresh token required',
    });
    return;
  }

  try {
    // Get the payload data after verifying token
    const { userId } = verifyRefreshToken(refreshToken) as TokenPayload;

    // Generate new accessToken
    const accessToken = generateAccessToken({ userId });

    // Response the access token with success status
    res.status(200).json({
      accessToken,
    });
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      res.status(401).json({
        code: 'RefreshTokenError',
        message: 'Refresh token expired',
      });
      return;
    }

    if (error instanceof JsonWebTokenError) {
      res.status(401).json({
        code: 'RefreshTokenError',
        message: 'Invalid refresh token',
      });
      return;
    }
    res.status(500).json({
      code: 'ServerError',
      message: 'Internal server error',
    });
    logger.error('Error during getting a refresh token', error);
  }
};

export default refreshToken;
