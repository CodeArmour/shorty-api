/**
 * @copyright 2025 omarcode
 * @license Apach-2.0
 */

/**
 * Custom modules
 */
import config from "@/config";

/**
 * Types
 */
import { CorsOptions } from 'cors';

// CORS configuration options
const corsOptions: CorsOptions = {
    // Custom origin validation function
    origin(requestOrigin, callback) {
        // Allow the request if origin exsists and is in the whitelist
        if (requestOrigin && config.CORS_WHITELIST.includes(requestOrigin)) {
            callback(null, true);
        } else {
            callback(
                // In development allow all origins; other, block with an erorr
                config.NODE_ENV === 'development' ? null : new Error('Not allowed by CORS'),
            );
        }
    },
};

export default corsOptions;