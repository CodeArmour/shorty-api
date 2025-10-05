/**
 * @copyright 2025 omarcode
 * @license Apache-2.0
 */

/**
 * Custom modules
 */
import { logger } from '@/lib/winston';
import { verifyAccessToken } from '@/lib/jwt';

/**
 * Types
 */
import type { Request, Response, NextFunction } from 'express';
import { TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken';
import { TokenPayload } from '@/lib/jwt';

const authentication = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { authorization } = req.headers;

  // Handle case when client doesn't send request with accessToken
  if (!authorization) {
    res.status(401).json({
      code: 'TokenError',
      message: 'Access token is required',
    });
    return;
  }

  // Retrieve only token from authorization
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, accessToken] = authorization.split(' ');
  console.log(authorization, accessToken);

  try {
    // Get the user id to from jwt payload
    const { userId } = verifyAccessToken(accessToken) as TokenPayload;
    // Send the userId to next controller function
    req.userId = userId;

    next();
  } catch (error) {
    // Handle case when accessToken expired

    if (error instanceof TokenExpiredError) {
      res.status(401).json({
        code: 'AccessTokenError',
        message: 'Access token expired',
      });
      return;
    }

    if (error instanceof JsonWebTokenError) {
      res.status(401).json({
        code: 'AccessTokenError',
        message: 'Invalid access token',
      });
      return;
    }

    res.status(500).json({
      code: 'ServerError',
      message: 'Internal server error',
    });

    logger.error('Error while authenticating a user', error);
  }
};

export default authentication;
