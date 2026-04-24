"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const manifesto_controller_1 = require("@/controllers/manifesto.controller");
const router = (0, express_1.Router)();
router.get('/:party', manifesto_controller_1.getManifesto);
exports.default = router;
