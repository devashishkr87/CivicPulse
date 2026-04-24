"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const candidates_controller_1 = require("@/controllers/candidates.controller");
const router = (0, express_1.Router)();
router.get('/', candidates_controller_1.getCandidates);
exports.default = router;
