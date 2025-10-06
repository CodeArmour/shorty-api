/**
 * @copyright 2025 omarcode
 * @license Apach-2.0
 */

/**
 * Node modules
 */
import { Router } from "express";

/**
 * Routes
 */
import authRoute from '@/routes/v1/auth';
import userRoute from '@/routes/v1/user'

/**
 * Initial express router
 */
const router = Router();

router.get('/', (req, res) => {
    res.status(200).json({
        message: 'API is live',
        status: 'ok',
        version: '1.0.0',
        timestamp: new Date().toISOString(),
    });
});

// Auth routes
router.use('/auth', authRoute);
router.use('/users', userRoute)

export default router;