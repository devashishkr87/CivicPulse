"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- reason: Express error object can be anything
err, _req, res, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- reason: NextFunction type doesn't strictly match middleware signature in all cases
_next) => {
    console.error(err);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- reason: casting to access dynamic error properties
    const status = err.status || 500;
    res.status(status).json({
        error: true,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- reason: casting to access dynamic error properties
        message: err.message || 'An unexpected error occurred',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- reason: casting to access dynamic error properties
        code: err.code || 'SERVER_ERROR',
    });
};
exports.errorHandler = errorHandler;
