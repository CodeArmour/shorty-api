/**
 * @copyright 2025 omarcode
 * @license Apache-2.0
 */

/**
 * Types
 */
import { Type } from "mongoose";

declare global {
    namespace Express {
        interface Request {
            userId?: Type.ObjectId;
        }
    }
}