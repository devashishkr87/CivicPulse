"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandidateModel = void 0;
const mongoose_1 = require("mongoose");
const CandidateSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    party: { type: String, required: true },
    constituency: { type: String, required: true },
    state: { type: String, required: true },
    education: { type: String, default: 'Not disclosed' },
    criminal_cases: { type: Number, default: 0, min: 0 },
    assets: { type: Number, required: true }, // integer lakhs
    liabilities: { type: Number, required: true }, // integer lakhs
    profile_image: { type: String, default: '' }, // empty = use initials avatar
});
// Compound index for efficient state+constituency queries
CandidateSchema.index({ state: 1, constituency: 1 });
exports.CandidateModel = (0, mongoose_1.model)('Candidate', CandidateSchema);
