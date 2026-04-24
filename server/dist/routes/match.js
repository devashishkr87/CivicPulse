"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const match_controller_1 = require("@/controllers/match.controller");
const validate_1 = require("@/middleware/validate");
const router = (0, express_1.Router)();
router.post('/', validate_1.validateMatch, match_controller_1.postMatch);
exports.default = router;
