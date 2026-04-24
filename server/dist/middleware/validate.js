"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAIChat = exports.validateAIVerify = exports.validateAIExplain = exports.validateMatch = exports.validateRequest = void 0;
const express_validator_1 = require("express-validator");
const validateRequest = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: true,
            message: errors.array()[0]?.msg ?? 'Validation failed',
            code: 'VALIDATION_ERROR',
        });
    }
    next();
};
exports.validateRequest = validateRequest;
exports.validateMatch = [
    (0, express_validator_1.body)('state').isString().notEmpty(),
    (0, express_validator_1.body)('constituency').isString().notEmpty(),
    (0, express_validator_1.body)('priorities.economy').isInt({ min: 1, max: 5 }),
    (0, express_validator_1.body)('priorities.education').isInt({ min: 1, max: 5 }),
    (0, express_validator_1.body)('priorities.healthcare').isInt({ min: 1, max: 5 }),
    (0, express_validator_1.body)('priorities.environment').isInt({ min: 1, max: 5 }),
    exports.validateRequest,
];
exports.validateAIExplain = [
    (0, express_validator_1.body)('topic').isString().notEmpty(),
    exports.validateRequest,
];
exports.validateAIVerify = [
    (0, express_validator_1.body)('claim').isString().isLength({ min: 10 }),
    exports.validateRequest,
];
exports.validateAIChat = [
    (0, express_validator_1.body)('message').isString().notEmpty(),
    exports.validateRequest,
];
