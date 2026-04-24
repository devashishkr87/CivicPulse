"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const constituencies_controller_1 = require("@/controllers/constituencies.controller");
const router = (0, express_1.Router)();
router.get('/', constituencies_controller_1.getConstituencies);
exports.default = router;
