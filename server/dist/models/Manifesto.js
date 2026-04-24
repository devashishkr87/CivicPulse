"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManifestoModel = void 0;
const mongoose_1 = require("mongoose");
const ManifestoSchema = new mongoose_1.Schema({
    party: { type: String, required: true, unique: true },
    summary: {
        economy: { type: String, required: true },
        education: { type: String, required: true },
        healthcare: { type: String, required: true },
    },
});
ManifestoSchema.index({ party: 1 });
exports.ManifestoModel = (0, mongoose_1.model)('Manifesto', ManifestoSchema);
