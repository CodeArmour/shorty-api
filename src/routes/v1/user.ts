/**
 * @copyright 2025 omarcode
 * @license Apach-2.0
 */

/**
 * Node Modules
 */
import { Router } from 'express';

/**
 * Custom Modules
 */
import expressRateLimit from '@/lib/expressRateLimit';
/**
 * Controllers
 */
import getCurrentUser from '@/controllers/user/get_current_user';

/**
 * Middlewares
 */
import authentication from '@/middlewares/authentication';
import authorization from '@/middlewares/authorization';


/**
 * Initial express router
 */
const router = Router();

router.get(
    '/current',
    expressRateLimit('basic'),
    authentication,
    authorization(['user', 'admin']),
    getCurrentUser,
);

export default router;