/**
 * @copyright 2025 omarcode
 * @license Apach-2.0
 */

/**
 * Node Modules
 */
import mongoose from "mongoose";

/**
 * Generate custom mongoose id
 */
export const generateMongooseId = () => new mongoose.Types.ObjectId();